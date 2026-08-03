"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Um contêiner marítimo, construído por geometria.
 *
 * Caixa com cor chapada nunca lê como contêiner. O que identifica o objeto são
 * três coisas, e nenhuma delas é a proporção:
 *
 *   1. Corrugação. O perfil ondulado das laterais e das portas.
 *   2. Cantoneiras. Os oito blocos de canto, que é por onde ele é içado e
 *      travado. São o detalhe que mais grita "isto é intermodal".
 *   3. Barras de travamento. As quatro hastes verticais nas portas, com as
 *      manoplas.
 *
 * Tudo procedural, porque contêiner é objeto regular e repetitivo: geometria
 * gerada chega perto de um modelo real por zero byte de asset e sem nenhuma
 * questão de licença. Para o navio a conta é outra, porque casco tem curva.
 *
 * Dimensões reais de um 20 pés: 6,06 por 2,44 por 2,59 metros.
 */

export const CONTAINER = { l: 6.06, w: 2.44, h: 2.59 } as const;

/** Quantas ondas de corrugação por metro. Um contêiner real tem cerca de 9. */
const RIBS_PER_METER = 9;
const RIB_DEPTH = 0.035;
const CASTING = 0.17;

export interface ContainerMeshProps {
  color?: string;
  /** Referências dos dois grupos de porta, para animar a abertura de fora. */
  leftDoorRef?: React.Ref<THREE.Group>;
  rightDoorRef?: React.Ref<THREE.Group>;
  /** Marcação estampada na lateral. */
  code?: string;
}

/** Painel corrugado. As ondas são instâncias finas, não textura. */
function Corrugated({
  width,
  height,
  color,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
}: {
  width: number;
  height: number;
  color: string;
  rotation?: [number, number, number];
  position?: [number, number, number];
}) {
  const ribs = useMemo(() => {
    const count = Math.max(2, Math.round(width * RIBS_PER_METER));
    const pitch = width / count;
    return Array.from(
      { length: count },
      (_, i) => -width / 2 + pitch * (i + 0.5),
    );
  }, [width]);

  const pitch = width / ribs.length;

  return (
    <group position={position} rotation={rotation}>
      {/* Chapa de fundo */}
      <mesh>
        <boxGeometry args={[width, height, 0.04]} />
        <meshStandardMaterial color={color} roughness={0.82} metalness={0.18} />
      </mesh>
      {/* As ondas. Uma a cada passo, salientes, deixando a luz raspar e
          criando a sombra que identifica o perfil. */}
      {ribs.map((x, i) =>
        i % 2 === 0 ? (
          <mesh key={x} position={[x, 0, RIB_DEPTH / 2]}>
            <boxGeometry args={[pitch * 0.62, height * 0.93, RIB_DEPTH]} />
            <meshStandardMaterial
              color={color}
              roughness={0.78}
              metalness={0.2}
            />
          </mesh>
        ) : null,
      )}
    </group>
  );
}

/** As oito cantoneiras. É o detalhe mais reconhecível do objeto. */
function CornerCastings({ color = "#4a4f52" }: { color?: string }) {
  const { l, w, h } = CONTAINER;
  const positions = useMemo(() => {
    const out: Array<[number, number, number]> = [];
    for (const sx of [-1, 1])
      for (const sy of [-1, 1])
        for (const sz of [-1, 1])
          out.push([
            (sx * (w - CASTING)) / 2,
            (sy * (h - CASTING)) / 2,
            (sz * (l - CASTING)) / 2,
          ]);
    return out;
  }, [l, w, h]);

  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[CASTING, CASTING, CASTING]} />
          <meshStandardMaterial
            color={color}
            roughness={0.6}
            metalness={0.55}
          />
        </mesh>
      ))}
    </>
  );
}

/** Uma folha de porta: corrugação, duas barras de travamento e as manoplas. */
function DoorLeaf({ color }: { color: string }) {
  const { w, h } = CONTAINER;
  const leaf = w / 2;

  return (
    <group>
      <Corrugated width={leaf} height={h * 0.94} color={color} />
      {[-leaf * 0.24, leaf * 0.24].map((x) => (
        <group key={x} position={[x, 0, 0.07]}>
          {/* Haste */}
          <mesh>
            <cylinderGeometry args={[0.028, 0.028, h * 0.9, 8]} />
            <meshStandardMaterial
              color="#6f7679"
              roughness={0.45}
              metalness={0.7}
            />
          </mesh>
          {/* Manopla */}
          <mesh position={[0.05, 0, 0.03]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.05, 0.22, 0.05]} />
            <meshStandardMaterial
              color="#8a9295"
              roughness={0.4}
              metalness={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function ContainerMesh({
  color = "#b4472f",
  leftDoorRef,
  rightDoorRef,
}: ContainerMeshProps) {
  const { l, w, h } = CONTAINER;
  const half = w / 4;

  return (
    <group>
      {/* Laterais corrugadas */}
      <Corrugated
        width={l}
        height={h}
        color={color}
        rotation={[0, Math.PI / 2, 0]}
        position={[-w / 2, 0, 0]}
      />
      <Corrugated
        width={l}
        height={h}
        color={color}
        rotation={[0, -Math.PI / 2, 0]}
        position={[w / 2, 0, 0]}
      />
      {/* Teto e piso */}
      <mesh position={[0, h / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[w, l, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.88} metalness={0.12} />
      </mesh>
      <mesh position={[0, -h / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[w, l, 0.06]} />
        <meshStandardMaterial color="#43484b" roughness={0.95} />
      </mesh>
      {/* Fundo, ao fim do corpo */}
      <mesh position={[0, 0, -l / 2]}>
        <boxGeometry args={[w, h, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.88} />
      </mesh>
      {/* Interior escuro, para o vão ler como vazio e não como parede */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[w - 0.14, h - 0.14, l - 0.14]} />
        <meshStandardMaterial
          color="#2a2f31"
          roughness={1}
          side={THREE.BackSide}
        />
      </mesh>

      <CornerCastings />

      {/* Portas, com a dobradiça na aresta. O grupo pai fica na quina e a
          folha é filha deslocada meia largura, então girar o pai gira a porta
          em torno da aresta, como acontece de verdade. */}
      <group ref={leftDoorRef} position={[-w / 2, 0, l / 2]}>
        <group position={[half, 0, 0]}>
          <DoorLeaf color={color} />
        </group>
      </group>
      <group ref={rightDoorRef} position={[w / 2, 0, l / 2]}>
        <group position={[-half, 0, 0]}>
          <DoorLeaf color={color} />
        </group>
      </group>
    </group>
  );
}
