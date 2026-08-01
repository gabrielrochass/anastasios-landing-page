import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/mdx/mdx-components";

/**
 * Runtime do Velite: `code` é o corpo compilado do MDX (function-body).
 * Server Component — o artigo inteiro renderiza estático.
 */
function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({ code }: { code: string }) {
  const Component = getMDXComponent(code);
  // Server Component renderizado uma vez no build (SSG) — criar o
  // componente aqui é o padrão do runtime Velite, não há re-render.
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={mdxComponents} />;
}
