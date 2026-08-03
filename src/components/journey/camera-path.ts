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
 * DESKTOP: à direita, com a coluna da esquerda livre para o texto. O eixo do
 * afastamento é o da TELA, não o do mundo, e o porquê está em `targetFor`.
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
 * Com fov 38 e f = 0.255, isso dá y = -0.1685 * raio. Como escala com o raio,
 * o objeto fica no mesmo lugar da tela em todas as sete batidas.
 */
/**
 * Quanto do RAIO o objeto se afasta do centro na horizontal, no desktop.
 *
 * Proporcional ao raio pelo mesmo motivo da vertical: fator fixo em unidades de
 * mundo produz posição variável na tela conforme a câmera aproxima e afasta.
 */
const DESKTOP_X_F = 0.31;

/** Fração vertical em que o centro do objeto pousa no mobile. */
const MOBILE_CENTER_F = 0.255;
const HALF_FOV_TAN = Math.tan((38 * Math.PI) / 180 / 2);

function mobileTargetY(radius: number): number {
  return -(0.5 - MOBILE_CENTER_F) * 2 * radius * HALF_FOV_TAN;
}

export function targetFor(
  wide: boolean,
  exploded = 0,
  radius = 10,
  angle = 0,
): THREE.Vector3 {
  if (!wide) return new THREE.Vector3(0, mobileTargetY(radius), 0);

  /*
   * O afastamento acompanha a abertura das portas: na vista explodida elas se
   * separam 1.1 unidade CADA, então o objeto fica 2.2 mais largo e sem isso a
   * porta esquerda pousa em cima do texto.
   */
  const d = DESKTOP_X_F * radius + exploded * 1.1;

  /*
   * O afastamento é ao longo do eixo DIREITA DA TELA, não do X de mundo.
   *
   * Este era o defeito, e é a mesma classe de erro que eu já tinha cometido na
   * vertical do mobile: âncora no mundo em vez de na tela. A câmera orbita em
   * volta do alvo, então conforme o ângulo cresce o X de mundo deixa de apontar
   * para a direita da tela, e o afastamento que sobra é só a projeção. No
   * trecho 3 o ângulo é 1.27rad e cos(1.27) vale 0.296: apenas 30% do
   * afastamento sobrevivia. Resultado: o objeto voltava para o meio do quadro
   * exatamente na batida em que ele é mais largo, de perfil, e atravessava a
   * headline e os três cartões.
   *
   * Para uma câmera em `target + (sin a, _, cos a) * raio` olhando o alvo, o
   * vetor direita-da-tela é `(cos a, 0, -sin a)`. Colocar o objeto (que vive na
   * origem) a `d` à direita do alvo quer dizer `alvo = -d * direita`.
   */
  return new THREE.Vector3(-d * Math.cos(angle), 0, d * Math.sin(angle));
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
  const target = targetFor(wide, exploded, radius, angle);
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
    return orbit(0, 0.6 + t * 0.35, THREE.MathUtils.lerp(15.5, 11.5, t) * k, wide, e);
  }

  // 2. Giro para três quartos. É o ângulo em que uma caixa deixa de ler como
  //    retângulo e passa a ler como volume.
  if (p < 0.29) {
    const t = smooth(span(p, 0.145, 0.29));
    return orbit(t * 0.72, 1 + t * 0.75, THREE.MathUtils.lerp(11.5, 15.5, t) * k, wide, e);
  }

  // 3. A órbita continua e sobe. Ver de cima informa o comprimento, que a
  //    vista frontal esconde.
  if (p < 0.44) {
    const t = smooth(span(p, 0.29, 0.44));
    // Raio maior aqui, e por um motivo medido: neste trecho o objeto vira de
    // perfil e a largura projetada salta de 2.44m para 6.51m, 2.7 vezes. Com o
    // raio antigo a coluna limpa caía para 239px, e a headline em 64px precisa
    // de cerca de 590px.
    //
    // Ao encurtar o track eu aparei o percurso da câmera e derrubei o valor
    // ABSOLUTO do raio junto, o que reabriu esse defeito: no desktop o objeto
    // voltou a atravessar a headline e os três cartões. São duas coisas
    // diferentes. Aparar percurso é o que tira velocidade; o valor absoluto é o
    // que garante a coluna de leitura. A cadeia de raios agora tem percurso
    // curto E piso alto onde existe texto ao lado.
    return orbit(0.72 + t * 0.55, 1.75 + t * 1.5, THREE.MathUtils.lerp(15.5, 16.2, t) * k, wide, e);
  }

  // 4. Batida silenciosa. A câmera volta devagar para a frente, e o objeto
  //    fica sozinho no quadro sem nada escrito ao lado.
  if (p < 0.575) {
    const t = smooth(span(p, 0.44, 0.575));
    // Este trecho era o mais agitado de todos, e com o track mais curto virava
    // o momento de chacoalhada: 0.93rad de giro, 3.0 de altura e 6.8 de dolly
    // na mesma batida. Fica sendo o maior movimento da jornada de propósito,
    // porque é a batida silenciosa e não tem texto para acompanhar, mas agora
    // com percurso aparado.
    return orbit(
      THREE.MathUtils.lerp(1.27, 0.4, t),
      THREE.MathUtils.lerp(3.25, 1.2, t),
      THREE.MathUtils.lerp(16.2, 10.2, t) * k,
      wide,
      e,
    );
  }

  // 5. Abertura. A câmera quase para: quem se move são as portas.
  if (p < 0.735) {
    const t = smooth(span(p, 0.575, 0.735));
    return orbit(0.4 - t * 0.18, 1.2 - t * 0.25, (10.2 - t * 0.6) * k, wide, e);
  }

  // 6. Vista explodida. Recua um pouco para caber o objeto desmontado.
  if (p < 0.885) {
    const t = smooth(span(p, 0.735, 0.885));
    return orbit(0.22 + t * 0.38, 0.95 + t * 1.1, THREE.MathUtils.lerp(9.6, 13, t) * k, wide, e);
  }

  // 7. Recompõe e afasta.
  const t = smooth(span(p, 0.885, 1));
  return orbit(0.6 - t * 0.26, 2.05 - t * 0.8, THREE.MathUtils.lerp(13, 15.5, t) * k, wide, e);
}

/** As portas, de 0 a 1. Ease cúbico: os últimos graus são lentos, aço é pesado. */
export function doorOpening(p: number): number {
  const t = clamp01((p - 0.585) / 0.13);
  return 1 - Math.pow(1 - t, 3);
}

