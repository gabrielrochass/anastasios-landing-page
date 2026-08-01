import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Portão de build das regras de escrita.
 *
 * Travessão, midpoint e meia-risca em faixa numérica são as três marcas
 * tipográficas que fazem um texto parecer gerado por IA. A regra já estava
 * escrita em docs/DESIGN-DECISIONS.md e mesmo assim escapava, porque regra
 * documentada e não testada volta a aparecer em três semanas.
 *
 * A separação de dados vira estrutura visual (spans em flex com borda de 1px,
 * células de tabela, linhas separadas), nunca caractere. Faixa numérica se
 * escreve "de 90 a 120 dias".
 */

const ROOT = join(__dirname, "..", "..");

const SCANNED_DIRS = [
  join(ROOT, "content"),
  join(ROOT, "data"),
  join(ROOT, "components", "sections"),
  join(ROOT, "components", "interactive"),
  join(ROOT, "components", "layout"),
  join(ROOT, "components", "mdx"),
];

const SCANNED_FILES = [join(ROOT, "lib", "site-config.ts")];

const EXTENSIONS = [".mdx", ".md", ".ts", ".tsx", ".yml"];

const BANNED = [
  {
    char: "—",
    name: "travessão (—)",
    fix: "vírgula, dois-pontos, parênteses, ponto final, ou quebrar a frase em duas",
  },
  {
    char: "·",
    name: "midpoint (·)",
    fix: "estrutura visual: spans em flex com gap e borda de 1px, ou células de tabela",
  },
  {
    char: "–",
    name: "meia-risca (–)",
    fix: 'escrever a faixa por extenso, como "de 90 a 120 dias"',
  },
] as const;

/**
 * Exceções conscientes. Só entra aqui com motivo escrito.
 * Formato: caminho relativo a src/, com barra normal.
 */
const ALLOWLIST = new Set<string>([
  // Este próprio arquivo precisa citar os caracteres para poder proibi-los.
  "lib/design/copy.test.ts",
]);

function walk(dir: string): string[] {
  let found: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return found; // diretório ainda não existe nesta fase do projeto
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found = found.concat(walk(full));
    } else if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      found.push(full);
    }
  }
  return found;
}

function scannedFiles(): string[] {
  const fromDirs = SCANNED_DIRS.flatMap(walk);
  const fromFiles = SCANNED_FILES.filter((file) => {
    try {
      return statSync(file).isFile();
    } catch {
      return false;
    }
  });
  return [...fromDirs, ...fromFiles];
}

interface Offence {
  file: string;
  line: number;
  column: number;
  name: string;
  fix: string;
  excerpt: string;
}

function findOffences(): Offence[] {
  const offences: Offence[] = [];

  for (const file of scannedFiles()) {
    const rel = relative(ROOT, file).split(sep).join("/");
    if (ALLOWLIST.has(rel)) continue;

    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((text, index) => {
      for (const { char, name, fix } of BANNED) {
        const column = text.indexOf(char);
        if (column === -1) continue;
        offences.push({
          file: rel,
          line: index + 1,
          column: column + 1,
          name,
          fix,
          excerpt: text.trim().slice(0, 100),
        });
      }
    });
  }

  return offences;
}

describe("regras de escrita: nada de pontuação com cara de IA", () => {
  it("nenhum travessão, midpoint ou meia-risca no conteúdo e na copy", () => {
    const offences = findOffences();

    const report = offences
      .map(
        (o) =>
          `  src/${o.file}:${o.line}:${o.column}\n` +
          `    ${o.name} encontrado. Use ${o.fix}.\n` +
          `    > ${o.excerpt}`,
      )
      .join("\n\n");

    expect(offences, offences.length ? `\n\n${report}\n` : undefined).toEqual([]);
  });

  it("varre pelo menos um arquivo, senão o portão está passando por vazio", () => {
    // Sem isto, apagar src/content faria o teste passar sem verificar nada.
    expect(scannedFiles().length).toBeGreaterThan(0);
  });
});
