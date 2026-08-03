"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-motion-preference";
import { useViewportGeometry } from "@/hooks/use-viewport-geometry";
import { cameraAt, doorOpening, explosion } from "./camera-path";
import { ContainerMesh } from "./container-mesh";
import { ContactShadow, Cyclorama, ProceduralEnvironment } from "./studio";

/**
 * A cena: UM contêiner, estudado.
 *
 * Já teve mar, navio, corredor e névoa aqui. Cada elemento pedia a própria
 * calibragem, e o conjunto ficou abstrato demais para se reconhecer o assunto.
 * Cortar para um objeto só resolveu quatro problemas de uma vez: some a
 * calibragem de névoa, some o enquadramento do navio, some a disputa entre
 * cena e texto, e o que sobra é justamente a coisa de que a página fala.
 *
 * Sem névoa. Sem luz interna vazando. Sem partícula. O registro é o de página
 * de produto, que é o que um site sério de comércio exterior comporta.
 */

const BACKDROP = new THREE.Color("#e8e4dc");

/** Cor do objeto. Óxido contido, não vermelho de brinquedo. */
const SHELL = "#a8503a";

interface SceneProps {
  progress: MotionValue<number>;
  className?: string;
}

export function JourneyScene({ progress, className }: SceneProps) {
  const reduced = useReducedMotion();
  const wide = useViewportGeometry() === "wide";

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "low-power", alpha: false }}
        shadows="soft"
        camera={{ fov: 38, near: 0.1, far: 120, position: [0, 0.6, 17] }}
        onCreated={({ gl }) => {
          gl.setClearColor(BACKDROP, 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <Rig progress={progress} reduced={reduced} wide={wide} />
        <ProceduralEnvironment />
        <Lighting />
        <Subject progress={progress} />
        <Cyclorama />
        <ContactShadow />
      </Canvas>
    </div>
  );
}

function Rig({
  progress,
  reduced,
  wide,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  wide: boolean;
}) {
  const { camera, invalidate } = useThree();
  const target = useRef(0);
  const eased = useRef(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      target.current = v;
      invalidate();
    });
    return unsubscribe;
  }, [progress, invalidate]);

  useLayoutEffect(() => {
    target.current = progress.get();
    eased.current = target.current;
    place(camera, target.current, wide);
    invalidate();
  }, [camera, progress, invalidate, wide]);

  useFrame(() => {
    if (reduced) {
      place(camera, target.current, wide);
      return;
    }
    // 0.10 e nao 0.12: com o track 41% mais curto a camera recebe mais
    // deslocamento por pixel de scroll, e amortecer mais devolve parte da
    // suavidade que o track curto tirou. Abaixo de 0.09 comeca a parecer
    // desconectado do dedo.
    const next = eased.current + (target.current - eased.current) * 0.1;
    eased.current = next;
    place(camera, next, wide);
    if (Math.abs(target.current - next) > 0.0002) invalidate();
  });

  return null;
}

function place(camera: THREE.Camera, p: number, wide: boolean) {
  const { position, target } = cameraAt(p, wide);
  camera.position.copy(position);
  camera.lookAt(target);
}

/** O objeto, com portas e vista explodida dirigidas pelo scroll. */
function Subject({ progress }: { progress: MotionValue<number> }) {
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progress.get();

    const angle = doorOpening(p) * THREE.MathUtils.degToRad(118);
    if (leftRef.current) leftRef.current.rotation.y = angle;
    if (rightRef.current) rightRef.current.rotation.y = -angle;

    // A vista explodida ergue o corpo e afasta as portas. Erguer é o que faz o
    // olho entender que as peças se soltaram, e não que a câmera recuou.
    const e = explosion(p);
    if (bodyRef.current) bodyRef.current.position.y = e * 0.55;
    if (leftRef.current) leftRef.current.position.x = -1.22 - e * 1.1;
    if (rightRef.current) rightRef.current.position.x = 1.22 + e * 1.1;
  });

  return (
    <group ref={bodyRef}>
      <ContainerMesh
        color={SHELL}
        leftDoorRef={leftRef}
        rightDoorRef={rightRef}
      />
    </group>
  );
}

/**
 * Luz de estúdio: principal, preenchimento e contorno.
 *
 * Sem luz dentro do objeto. A versão anterior tinha uma, e ela vazava pelas
 * portas abertas lavando o chão de laranja. Interior escuro é o correto:
 * contêiner aberto mostra um vão escuro, e é isso que lê como profundidade.
 */
function Lighting() {
  return (
    <>
      {/* Ambiente baixa: quem preenche agora é o mapa de ambiente, que traz
          direção. Manter 1.5 aqui achataria o volume que o mapa cria. */}
      <ambientLight intensity={0.35} color="#e8eef2" />
      <directionalLight
        position={[7, 11, 8]}
        intensity={2.4}
        color="#fff6ea"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      {/* Preenchimento frio do lado oposto: sem ele a face na sombra fecha em
          preto e a caixa perde volume. */}
      <directionalLight position={[-8, 4, -6]} intensity={0.7} color="#c3d4de" />
      {/* Contorno por trás, que separa o objeto do fundo claro. */}
      <directionalLight position={[0, 6, -12]} intensity={0.9} color="#ffffff" />
    </>
  );
}
