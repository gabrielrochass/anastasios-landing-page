import { ImageResponse } from "next/og";
import { getAuthor, getPostBySlug, publishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

/**
 * Card de compartilhamento dos posts.
 *
 * O motivo gráfico é a rota: uma linha que atravessa o card com o waypoint de
 * origem e o de destino acesos. É o mesmo desenho que estrutura a página
 * inteira, então o link compartilhado no WhatsApp já carrega a marca.
 *
 * ImageResponse só aceita estilo inline e um subconjunto de flexbox. Nada de
 * classe do Tailwind aqui, e por isso os hexadecimais estão escritos na mão,
 * espelhando os tokens do modo ocean em globals.css.
 */
export default async function OpengraphImage({
  params,
}: {
  // Next 16: params é Promise nas funções de geração de imagem.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const author = post ? getAuthor(post.author) : undefined;

  const OCEAN = "#07141b";
  const FOAM = "#f2efe9";
  const COPPER = "#e2703a";
  const MIST = "#8fa3ac";
  const RULE = "#1c3440";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: OCEAN,
          padding: 72,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* A rota, atravessando o card */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 316,
            height: 2,
            backgroundColor: RULE,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 470,
            top: 316,
            height: 2,
            backgroundColor: COPPER,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 62,
            top: 306,
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: COPPER,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 460,
            top: 300,
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: COPPER,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: COPPER,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Painel de Inteligência
          </div>
          <div style={{ display: "flex", fontSize: 24, color: MIST }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 60,
            lineHeight: 1.1,
            color: FOAM,
            maxWidth: 940,
          }}
        >
          {post?.title ?? "Inteligência de comércio exterior"}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: MIST }}>
            {author?.name ?? siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: RULE }}>
            {post?.date ?? ""}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
