/**
 * Shader do oceano. WebGL2 puro, sem three.js, sem nenhuma dependência de npm.
 *
 * Um quad em tela cheia com FBM. O R3F daria a mesma sensação por 200 a 250 kb
 * gz, um grafo de cena e um peer pin de React que trava o build num bump de
 * versão. Isto aqui são dois shaders e um buffer estático.
 *
 * As cores são as mesmas do token: deep é ocean-950 e shallow é sea-700, então
 * a borda do canvas encosta no fundo da seção sem emenda visível.
 */

export const VERTEX_SHADER = /* glsl */ `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision mediump float;

uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;

out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float amp = 0.5;
  float sum = 0.0;
  for (int i = 0; i < 4; i++) {
    sum += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;

  // Corrige a proporção só no eixo X, senão a onda estica junto com a janela.
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Frequência bem maior em Y que em X: onda de mar vista de longe é
  // horizontal e comprida, não um campo de ruído isotrópico.
  float waves = fbm(p * vec2(5.0, 16.0) + vec2(uTime * 0.035, uTime * 0.085));

  vec3 deep = vec3(0.027, 0.078, 0.106);
  vec3 shallow = vec3(0.071, 0.278, 0.361);

  float depth = smoothstep(0.05, 0.95, uv.y + waves * 0.07);
  vec3 col = mix(deep, shallow, depth * 0.55);

  // Cristas em cobre. Expoente alto deixa só os picos acesos, e o uScroll
  // aquece o mar conforme a travessia avança, como um fim de tarde chegando.
  float crest = pow(waves, 7.0);
  col += vec3(0.886, 0.439, 0.227) * crest * 0.16 * (0.25 + uScroll);

  // Vinheta para o texto por cima ter onde respirar sem precisar de overlay.
  float vignette = smoothstep(1.15, 0.25, distance(uv, vec2(0.5)));
  col *= mix(0.72, 1.0, vignette);

  fragColor = vec4(col, 1.0);
}
`;
