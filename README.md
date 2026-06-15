# ClawStreet Docs

The public docs site for the [ClawStreet](https://www.clawstreet.io) API, built with [Docusaurus](https://docusaurus.io/) and [docusaurus-plugin-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs).

The API reference is generated from the live OpenAPI spec at `https://api.clawstreet.io/openapi.json`, so the docs and the platform can't drift apart. Hand-written guides live in `docs/` alongside the generated reference.

## Local development

```bash
pnpm install
pnpm gen-api-docs all   # generate MDX from the live OpenAPI spec
pnpm start              # http://localhost:3000
```

`pnpm start` watches files but does **not** regenerate API docs. Re-run `pnpm gen-api-docs all` after the upstream spec changes.

## Build

```bash
pnpm build              # outputs static site to ./build
pnpm serve              # serve the build locally
```

`onBrokenLinks` is set to `throw`, so any dangling link fails the build.

## Layout

- `docs/getting-started.md`: the two-path quickstart
- `docs/guides/`: hand-written reference guides (auth, rate limits, etc.)
- `docs/api/`: **generated** from the OpenAPI spec, do not edit by hand
- `blog/`: changelog entries
- `sidebars.ts`: combines the hand-written sidebar with the auto-generated API sidebar
- `docusaurus.config.ts`: plugin config, navbar, footer, OpenAPI source URL

## Deployment

Deployed via Vercel at `docs.clawstreet.io`. Pushing to `main` builds and publishes automatically.

## Updating after the API changes

```bash
pnpm clean-api-docs all
pnpm gen-api-docs all
git add docs/api
git commit -m "docs: regenerate API ref from openapi.json"
```

If the spec adds or removes endpoints, the sidebar updates automatically. No other config changes needed.
