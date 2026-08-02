"use client";

import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * O estúdio: ciclorama, ambiente e sombra de contato.
 *
 * O fundo antigo eram dois planos chapados que se encontravam numa linha reta
 * e dura na altura do olho. Três defeitos somados: a linha denunciava que eram
 * dois planos, os dois tinham luminância uniforme, e o objeto não refletia
 * nada porque não havia ambiente para refletir.
 */

/**
 * Ciclorama.
 *
 * A solução de estúdio fotográfico: o chão curva para cima e vira parede sem
 * nenhuma aresta de encontro. O degradê que aparece na curva NÃO é gradiente
 * pintado, é a luz caindo numa superfície que muda de ângulo. É por isso que
 * funciona e um gradiente não funcionaria.
 */
export function Cyclorama() {
  const geometry = useMemo(() => {
    const FLOOR = 72; // precisa passar do maior raio de câmera da jornada
    const FILLET = 14; // raio da curva onde chão vira parede
    const WALL = 46; // altura da parede
    const WIDTH = 150;

    // Perfil no plano XY, onde X vira profundidade e Y vira altura.
    const shape = new THREE.Shape();
    shape.moveTo(FLOOR, 0);
    shape.lineTo(-FILLET, 0);
    shape.quadraticCurveTo(-FILLET * 1.9, 0, -FILLET * 1.9, FILLET);
    shape.lineTo(-FILLET * 1.9, WALL);

    // Espessura zero: é uma casca, não um sólido. `steps` alto para a curva
    // ficar contínua no sombreado em vez de facetada.
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: WIDTH,
      bevelEnabled: false,
      curveSegments: 32,
      steps: 1,
    });
    geo.translate(0, 0, -WIDTH / 2);
    /*
     * O perfil está em XY extrudado em Z. Girar leva a largura da extrusão
     * para X e a profundidade do perfil para Z.
     *
     * Cheguei a inverter o sinal achando que a profundidade estava trocada.
     * Não estava, e inverter piorou. O defeito era de ESCALA: a câmera chega a
     * raio 30 no mobile e o chão só avançava 26, então ela saía de dentro da
     * concha e passava a ver o verso da parede, que é DoubleSide. Nas batidas
     * de raio curto nada aparecia de errado. Medido: com o ciclorama desligado
     * a batida de chegada voltava a aparecer normalmente.
     *
     * Regra que fica: a concha precisa comportar o MAIOR raio de câmera da
     * jornada, com folga.
     */
    geo.rotateY(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow position={[0, -1.32, 0]}>
      <meshStandardMaterial
        color="#e4e0d8"
        roughness={0.96}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Ambiente procedural.
 *
 * Sem isto o metal não tem o que refletir e as faces ficam chapadas. Um
 * degradê equirretangular gerado em canvas, passado pelo PMREM, dá às
 * cantoneiras e às barras de travamento um especular que MUDA conforme a
 * câmera orbita. É o que separa caixa colorida de objeto de metal.
 *
 * Gerado em código de propósito: nenhum HDRI baixado, nenhum byte de asset,
 * nenhuma licença a conferir.
 */
export function ProceduralEnvironment() {
  const gl = useThree((state) => state.gl);

  const envMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#ffffff"); // zênite, a fonte principal
    grad.addColorStop(0.42, "#e9eef2");
    grad.addColorStop(0.55, "#d5d1c8"); // linha do horizonte
    grad.addColorStop(1, "#9d9a93"); // nadir, o chão refletido
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;

    const pmrem = new THREE.PMREMGenerator(gl);
    const map = pmrem.fromEquirectangular(texture).texture;
    texture.dispose();
    pmrem.dispose();
    return map;
  }, [gl]);

  // Libera a textura quando o componente sai. O `attach` cuida de ligar e
  // desligar do scene, mas não descarta a GPU memory.
  useEffect(() => () => envMap?.dispose(), [envMap]);

  if (!envMap) return null;

  /*
   * `attach="environment"` em vez de `scene.environment = map`.
   *
   * Atribuir direto é mutar um objeto vindo de hook, o que a regra
   * react-hooks/immutability reprova. E ela tem razão prática: o R3F desfaz o
   * attach sozinho no unmount, coisa que a atribuição manual não fazia. O
   * fundo continua sendo o ciclorama, porque isto é `environment` e não
   * `background`: serve só para reflexo.
   */
  return <primitive attach="environment" object={envMap} />;
}

/**
 * Sombra de contato.
 *
 * A sombra direcional resolve a direção da luz, mas não ancora o objeto: ela é
 * mole e nasce longe da base. O que diz "está pousado" é uma mancha curta e
 * escura logo embaixo, e é isso aqui.
 *
 * Textura de gradiente radial em canvas em vez de um segundo passe de sombra:
 * custa um draw call e nenhuma resolução de shadow map.
 */
export function ContactShadow({
  y = -1.3,
  width = 7,
  depth = 3.4,
}: {
  y?: number;
  width?: number;
  depth?: number;
}) {
  const texture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(46,40,33,0.55)");
    g.addColorStop(0.45, "rgba(46,40,33,0.26)");
    g.addColorStop(1, "rgba(46,40,33,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  if (!texture) return null;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        opacity={0.9}
      />
    </mesh>
  );
}
