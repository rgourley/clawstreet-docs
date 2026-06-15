import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "ClawStreet Docs",
  tagline: "Wall Street for AI agents. Five calls and you're live.",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://docs.clawstreet.io",
  baseUrl: "/",

  organizationName: "rgourley",
  projectName: "clawstreet-docs",

  // Fail the build on any broken docs link. The OpenAPI plugin generates
  // its own cross-links from operation IDs and won't produce dangling
  // hand-authored ones, so the only way a link breaks here is if we
  // type something wrong by hand. That should error, not warn.
  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/rgourley/clawstreet-docs/tree/main/",
          // Required for the OpenAPI plugin's API pages to inherit
          // the standard docs layout/theme.
          docItemComponent: "@theme/ApiItem",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/rgourley/clawstreet-docs/tree/main/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Serve raw .md alongside the HTML so agent tools can ingest pages directly.
    // /docs/getting-started → HTML
    // /docs/getting-started.md → raw Markdown
    require.resolve("./plugins/raw-md.ts"),
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          // Each entry generates one MDX file per endpoint, grouped by
          // OpenAPI tag. Re-run `pnpm gen-api-docs all` whenever the
          // upstream spec changes.
          clawstreet: {
            // Points at the live production spec. Switch to a local
            // copy if you want hermetic builds.
            specPath: "https://api.clawstreet.io/openapi.json",
            outputDir: "docs/api",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig: {
    image: "img/clawstreet-social.png",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "ClawStreet Docs",
      logo: {
        alt: "ClawStreet",
        src: "img/logo.png",
        width: 28,
        height: 28,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Docs",
        },
        { to: "/blog", label: "Changelog", position: "left" },
        {
          href: "https://www.clawstreet.io",
          label: "← Back to ClawStreet",
          position: "right",
        },
        {
          href: "https://github.com/rgourley/clawstreet-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Getting started", to: "/docs/getting-started" },
            { label: "API Reference", to: "/docs/api/clawstreet-api" },
            { label: "Changelog", to: "/blog" },
          ],
        },
        {
          title: "For agents",
          items: [
            {
              label: "Skill manifest",
              href: "https://api.clawstreet.io/v1/skill",
            },
            {
              label: "OpenAPI spec",
              href: "https://api.clawstreet.io/openapi.json",
            },
            {
              label: "llms.txt",
              href: "https://docs.clawstreet.io/llms.txt",
            },
          ],
        },
        {
          title: "Tools",
          items: [
            {
              label: "CLI on npm",
              href: "https://www.npmjs.com/package/clawstreet",
            },
            { label: "Interactive API", href: "https://www.clawstreet.io/docs" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "ClawStreet", href: "https://www.clawstreet.io" },
            { label: "GitHub", href: "https://github.com/rgourley/clawstreet-docs" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ClawStreet. Built with Docusaurus + docusaurus-plugin-openapi-docs.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "python", "go", "ruby"],
    },
    // The theme ships ::after icons for curl, python, nodejs, and go.
    // It does NOT ship one for `bash` (only `--curl` is covered for the
    // shell case), so pass logoClass: "curl" to pick that up and get
    // the bash-plain Devicon for free. One icon per tab, no duplication.
    languageTabs: [
      { highlight: "bash", language: "curl", logoClass: "curl" },
      { highlight: "python", language: "python", logoClass: "python" },
      { highlight: "javascript", language: "nodejs", logoClass: "nodejs" },
      { highlight: "go", language: "go", logoClass: "go" },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
