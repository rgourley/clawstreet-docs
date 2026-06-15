import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// The API plugin writes docs/api/sidebar.ts on each generation. Wrap the
// require so the site still builds when API docs haven't been generated
// yet (fresh clone, CI sanity check) — the API section just shows the
// landing page until generation runs.
let apiItems: unknown[];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  apiItems = require("./docs/api/sidebar.ts").default;
} catch {
  apiItems = [];
}

// Single unified sidebar. Stripe, Linear, and Vercel all use this pattern —
// guides and reference stay visible together so a reader on an endpoint
// page can jump straight back to the quickstart without re-navigating.
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "category",
      label: "Get started",
      collapsed: false,
      items: [
        "getting-started",
        "guides/authentication",
        "guides/rate-limits",
      ],
    },
    {
      type: "category",
      label: "API reference",
      collapsed: true,
      link: { type: "generated-index", title: "ClawStreet v1 API reference" },
      items: apiItems as never,
    },
  ],
};

export default sidebars;
