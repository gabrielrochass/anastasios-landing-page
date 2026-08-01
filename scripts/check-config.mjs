/**
 * Guard de go-live: falha se sobrarem placeholders em site-config.ts.
 * Rode no pipeline de deploy (ex.: antes de `next build` em CI) para que
 * WhatsApp/e-mail/telefone/domínio/endereço fictícios nunca vão ao ar.
 *
 *   node scripts/check-config.mjs      (exit 1 se achar placeholder)
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "src", "lib", "site-config.ts");
const content = readFileSync(file, "utf8");

const patterns = [
  { re: /\[VALIDAR/, label: "marcador [VALIDAR] não resolvido" },
  { re: /5581900000000/, label: "WhatsApp placeholder (5581900000000)" },
  { re: /\+55 81 0000-0000/, label: "telefone placeholder (0000-0000)" },
  { re: /50000-000/, label: "CEP placeholder (50000-000)" },
  { re: /Endereço a confirmar/, label: "endereço placeholder" },
];

const hits = patterns.filter((p) => p.re.test(content));

if (hits.length > 0) {
  console.error("\n✖ site-config.ts ainda tem placeholders (bloqueia go-live):");
  for (const h of hits) console.error(`  - ${h.label}`);
  console.error(
    "\nPreencha os dados reais em src/lib/site-config.ts antes de publicar.\n",
  );
  process.exit(1);
}

console.log("✓ site-config.ts sem placeholders. Liberado para go-live.");
