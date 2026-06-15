import type { Plugin } from "@docusaurus/types";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Serve raw Markdown alongside the HTML output. After Docusaurus builds,
 * copy every `.md` and `.mdx` source file from `docs/` into the build
 * output at the same URL slug with a `.md` extension. So
 * `docs/getting-started.md` becomes available at both
 * `/docs/getting-started` (HTML) and `/docs/getting-started.md` (raw).
 *
 * Why: agents fetching the docs want Markdown they can ingest directly,
 * not HTML they have to scrape. This is the Anthropic-docs/Mintlify
 * pattern — drop in `.md` for the agent-friendly version.
 *
 * Auto-generated API MDX is skipped: those files are JSX-heavy and don't
 * read meaningfully as plain Markdown. Agents should consume the OpenAPI
 * spec at `api.clawstreet.io/openapi.json` for the API surface instead.
 */
export default function rawMdPlugin(): Plugin {
  return {
    name: "clawstreet-raw-md",
    async postBuild({ outDir, siteConfig: _siteConfig }) {
      const docsDir = path.resolve(__dirname, "..", "docs");
      const docsOut = path.join(outDir, "docs");

      async function walk(dir: string): Promise<string[]> {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const files = await Promise.all(
          entries.map(async (e) => {
            const full = path.join(dir, e.name);
            if (e.isDirectory()) return walk(full);
            if (full.endsWith(".md") || full.endsWith(".mdx")) return [full];
            return [];
          }),
        );
        return files.flat();
      }

      const sources = await walk(docsDir);
      for (const src of sources) {
        // Skip the auto-generated API MDX — these are JSX-heavy and
        // don't read as plain Markdown.
        if (src.includes(`${path.sep}api${path.sep}`)) continue;

        const rel = path.relative(docsDir, src);
        const slug = rel.replace(/\.mdx?$/, ".md");
        const dest = path.join(docsOut, slug);
        await fs.mkdir(path.dirname(dest), { recursive: true });
        await fs.copyFile(src, dest);
      }
    },
  };
}
