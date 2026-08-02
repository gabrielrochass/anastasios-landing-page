import * as THREE from "three";

/**
 * O caminho da câmera em torno de UM objeto.
 *
 * A versão anterior tinha mar, navio, corredor e contêiner. Cada um exigia a
 * própria calibragem de enquadramento, de luz e de névoa, e o resultado foi
 * quatro coisas medianas em vez de uma boa. O cliente cortou, e estava certo.
 *
 * Agora existe um objeto só, e a jornada é o estudo dele: aproximar, girar,
 * abrir, desmontar, recompor. É a gramática de página de produto, que é
 * exatamente o registro sóbrio que um site de comércio exterior pede.
 *
 *   0.000 a 0.145  aproximação frontal, o objeto fechado
 *   0.145 a 0.290  giro para três quartos
 *   0.290 a 0.440  órbita continua, altura sobe
 *   0.440 a 0.575  giro sem texto, o objeto sozinho
 *   0.575 a 0.735  as portas abrem
 *   0.735 a 0.885  vista explodida, os painéis se afastam
 *   0.885 a 1.000  recompõe e afasta
 */

/**
 * Onde o objeto se apoia no quadro.
 *
 * DESKTOP: à direita, com a coluna da esquerda livre para o texto.
 *
 * MOBILE: em cima, com o texto embaixo. E aqui estava um erro meu que só
 * apareceu medindo: eu usava deslocamento FIXO em unidades de mundo (-6.3).
 * Mas o raio da câmera muda a cada batida, e deslocamento fixo em mundo dá
 * posição VARIÁVEL na tela. O objeto subia demais, o topo entrava atrás do
 * header e sobravam cerca de 290px de vazio até o texto.
 *
 * A correção é ancorar na TELA, não no mundo. Dado um alvo de fração vertical
 * `f`, o deslocamento de mundo que o coloca ali é:
 *
 *     y = -(0.5 - f) * 2 * raio * tan(fov / 2)
 *
 * Com fov 38 e f = 0.235, isso dá y = -0.1823 * raio. Como escala com o raio,
 * o objeto fica no mesmo lugar da tela em todas as sete batidas.
 */
const OFFSET_X = -2.7;

/** Fração vertical em que o centro do objeto pousa no mobile. */
const MOBILE_CENTER_F = 0.235;
const HALF_FOV_TAN = Math.tan((38 * Math.PI) / 180 / 2);

function mobileTargetY(radius: number): number {
  return -(0.5 - MOBILE_CENTER_F) * 2 * radius * HALF_FOV_TAN;
}

export function targetFor(
  wide: boolean,
  exploded = 0,
  radius = 10,
): THREE.Vector3 {
  return wide
    ? // Na vista explodida as portas se afastam 1.1 unidade CADA, então o
      // objeto fica 2.2 mais largo. Com deslocamento fixo a porta esquerda
      // pousava em cima do texto: a coluna limpa caía para 442px onde o lead
      // pede 672px. O alvo agora acompanha a abertura.
      new THREE.Vector3(OFFSET_X - exploded * 1.1, 0, 0)
    : new THREE.Vector3(0, mobileTargetY(radius), 0);
}

export interface CameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

const _pos = new THREE.Vector3();

/**
 * Órbita esférica. Ângulo horizontal, altura e distância variam por trecho, e
 * é a variação entre eles que dá dinâmicas diferentes sem trocar de mecanismo.
 */
function orbit(
  angle: number,
  height: number,
  radius: number,
  wide: boolean,
  exploded: number,
): CameraState {
  // O alvo é montado AQUI porque só aqui o raio é conhecido, e no mobile o
  // deslocamento vertical depende dele.
  const target = targetFor(wide, exploded, radius);
  _pos.set(
    target.x + Math.sin(angle) * radius,
    // A altura da câmera é ABSOLUTA, não relativa ao alvo. Somar target.y aqui
    // faz câmera e alvo descerem juntos, o que cancela o deslocamento: o
    // objeto não sai do lugar na tela. É o alvo abaixo de uma câmera parada
    // que inclina o olhar e sobe o objeto no quadro.
    height,
    target.z + Math.cos(angle) * radius,
  );
  return { position: _pos, target };
}

/**
 * A vista explodida, de 0 a 1.
 *
 * Os painéis se afastam do centro revelando a estrutura. Volta a zero no fim,
 * porque desmontar e não montar de volta deixa a sensação de coisa quebrada.
 */
export function explosion(p: number): number {
  const out = smooth(clamp01((p - 0.745) / 0.1));
  const back = smooth(clamp01((p - 0.9) / 0.08));
  return out * (1 - back);
}

export function cameraAt(p: number, wide = true): CameraState {
  const e = explosion(p);
  // O contêiner tem 6 metros de comprimento e o quadro estreito não o comporta
  // na mesma distância do desktop. Um fator sobre o raio resolve sem duplicar
  // os sete trechos.
  // No mobile o objeto precisa caber na faixa de cima, entre o header e o
  // texto. 1.62 ainda o deixava descendo até y=838 num quadro de 844, ou
  // seja, atravessando o texto inteiro. 2.35 encolhe o suficiente para a base
  // parar antes da coluna de leitura. 2.35 foi longe demais: em 4 das 7
  // batidas o objeto ficou pequeno a ponto de sumir. 1.75 é o meio-termo.
  const k = wide ? 1 : 1.75;
  // 1. Frontal, fechado. Só a distância diminui: o objeto se apresenta.
  if (p < 0.145) {
    const t = smooth(span(p, 0, 0.145));
    return orbit(0, 0.6 + t * 0.4, THREE.MathUtils.lerp(17, 11, t) * k, wide, e);
  }

  // 2. Giro para três quartos. É o ângulo em que uma caixa deixa de ler como
  //    retângulo e passa a ler como volume.
  if (p < 0.29) {
    const t = smooth(span(p, 0.145, 0.29));
    return orbit(t * 0.72, 1 + t * 0.9, THREE.MathUtils.lerp(11, 14.5, t) * k, wide, e);
  }

  // 3. A órbita continua e sobe. Ver de cima informa o comprimento, que a
  //    vista frontal esconde.
  if (p < 0.44) {
    const t = smooth(span(p, 0.29, 0.44));
    // Raio maior aqui, e por um motivo medido: neste trecho o objeto vira de
    // perfil e a largura projetada salta de 2.44m para 6.51m, 2.7 vezes. Com o
    // raio antigo a coluna limpa caía para 239px, e a headline em 64px precisa
    // de cerca de 590px.
    return orbit(0.72 + t * 0.55, 1.9 + t * 2.2, THREE.MathUtils.lerp(14.5, 16, t) * k, wide, e);
  }

  // 4. Batida silenciosa. A câmera volta devagar para a frente, e o objeto
  //    fica sozinho no quadro sem nada escrito ao lado.
  if (p < 0.575) {
    const t = smooth(span(p, 0.44, 0.575));
    return orbit(
      THREE.MathUtils.lerp(1.27, 0.34, t),
      THREE.MathUtils.lerp(4.1, 1.1, t),
      THREE.MathUtils.lerp(16, 9.2, t) * k,
      wide,
      e,
    );
  }

  // 5. Abertura. A câmera quase para: quem se move são as portas.
  if (p < 0.735) {
    const t = smooth(span(p, 0.575, 0.735));
    return orbit(0.34 - t * 0.16, 1.1 - t * 0.25, (9.2 - t * 0.6) * k, wide, e);
  }

  // 6. Vista explodida. Recua um pouco para caber o objeto desmontado.
  if (p < 0.885) {
    const t = smooth(span(p, 0.735, 0.885));
    return orbit(0.18 + t * 0.42, 0.85 + t * 1.4, THREE.MathUtils.lerp(8.6, 13, t) * k, wide, e);
  }

  // 7. Recompõe e afasta.
  const t = smooth(span(p, 0.885, 1));
  return orbit(0.6 - t * 0.28, 2.25 - t * 0.9, THREE.MathUtils.lerp(13, 17, t) * k, wide, e);
}

/** As portas, de 0 a 1. Ease cúbico: os últimos graus são lentos, aço é pesado. */
export function doorOpening(p: number): number {
  const t = clamp01((p - 0.585) / 0.13);
  return 1 - Math.pow(1 - t, 3);
}

