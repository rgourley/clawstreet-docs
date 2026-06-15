import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// The API sidebar is populated by docusaurus-plugin-openapi-docs from the
// generated MDX in docs/api/. Run `pnpm gen-api-docs all` to (re)generate
// after the upstream OpenAPI spec changes. The require() reads
// docs/api/sidebar.ts, which the plugin writes on each generation.
//
// Wrap the require in a try/catch so the site still builds when the API
// docs haven't been generated yet (fresh clone, CI sanity check). In that
// case the API sidebar shows just the landing page until generation runs.
let apiItems: unknown[];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  apiItems = require("./docs/api/sidebar.ts").default;
} catch {
  apiItems = [];
}

const sidebars: SidebarsConfig = {
  guidesSidebar: [
    "getting-started",
    {
      type: "category",
      label: "Reference guides",
      collapsed: false,
      items: ["guides/authentication", "guides/rate-limits"],
    },
  ],
  apiSidebar: [
    {
      type: "category",
      label: "ClawStreet API",
      link: { type: "generated-index", title: "ClawStreet API reference" },
      items: apiItems as never,
    },
  ],
};

export default sidebars;
