<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/endless-unsplash-grid.webp" alt="Endless Unsplash Grid with Velt: An infinite Unsplash photo grid with Velt comments, cursors and presence" width="100%" />

<br />
<br />

# Endless Unsplash Grid with Velt

### An infinite Unsplash photo grid with Velt comments, cursors and presence

A Lovable-generated Vite and React masonry gallery that loads photos from the Unsplash API and adds Velt comments on images, live cursors, presence and a comments sidebar.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)
[![Built with Velt](https://img.shields.io/badge/Built_with_Velt-141414?style=for-the-badge)](https://velt.dev)
[![Live demo](https://img.shields.io/badge/Live_demo-1c1917?style=for-the-badge&logo=vercel&logoColor=white)](https://endless-unsplash-grid.vercel.app)

[Velt docs](https://docs.velt.dev) &nbsp;·&nbsp; [Velt](https://velt.dev) &nbsp;·&nbsp; [More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

A masonry photo gallery that loads images from the [Unsplash API](https://unsplash.com/developers) and lets several people browse and comment on it together with [Velt](https://velt.dev). The project was generated with [Lovable](https://lovable.dev) and then wired to Velt for comments on individual images, live cursors, presence and a comments sidebar.

It shows how to attach comments to items in a dynamic grid rather than to a fixed page layout.

## Features

- **Masonry grid**: Photos from the Unsplash `/photos` endpoint, laid out with `react-masonry-css`.
- **Comments on images**: `VeltCommentTool` and `VeltCommentBubble` on each image card, with popover-mode comments.
- **Live cursors**: `VeltCursor` shows other users' pointers.
- **Presence**: `VeltPresence` in the toolbar shows who is online.
- **Comments sidebar**: `VeltCommentsSidebar` and `VeltSidebarButton` list all comments.
- **User switcher**: Two demo users (John Doe and Jane Smith), remembered in local storage.
- **Dark mode**: Theme state is passed to the Velt components.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| Collaboration | [Velt](https://velt.dev/) (`@veltdev/react`) |
| Photos | [Unsplash API](https://unsplash.com/developers) |
| UI | [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), `react-masonry-css` |
| Scaffolding | [Lovable](https://lovable.dev/) |

## Getting started

### Prerequisites

- Node.js and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- A Velt API key from the [Velt console](https://console.velt.dev)
- An Unsplash API access key from the [Unsplash developer portal](https://unsplash.com/developers)

### Installation

```bash
git clone https://github.com/Studio1HQ/endless-unsplash-grid.git
cd endless-unsplash-grid
npm i
```

### Environment variables

Create a `.env` file in the project root.

| Variable | Description |
| --- | --- |
| `VITE_VELT_API_KEY` | Your Velt API key, from the [Velt console](https://console.velt.dev). |
| `VITE_UNSPLASH_CLIENT_ID` | Unsplash access key. The code falls back to `demo` if it is unset, which the Unsplash API will not accept for real requests. |

### Run

```bash
npm run dev
```

Vite prints the local URL. Other scripts: `npm run build`, `npm run build:dev`, `npm run lint`, `npm run preview`.

## How it works

`src/lib/velt.tsx` holds the app's `VeltProvider`, the two demo users and a document provider that sets the Velt document to `endless-unsplash-gallery`. `src/services/unsplashService.ts` fetches photos ordered by popularity, 50 per page. `MasonryGrid.tsx` renders the grid and the comment layer, `ImageCard.tsx` adds the comment tool and bubble per image, and `Toolbar.tsx` holds presence, the sidebar button and the user switcher. `App.tsx` mounts `VeltCursor`.

```text
src/
├── App.tsx                   # Mounts VeltCursor
├── lib/velt.tsx              # Provider, users, document setup
├── services/unsplashService.ts
├── components/               # MasonryGrid, ImageCard, Toolbar, UserSwitcher
└── pages/Index.tsx
```

You can also edit the project in [Lovable](https://lovable.dev/projects/33f55f65-21de-4ed8-a09e-9ce73f3b3c0d), where changes are committed to this repo, or in GitHub Codespaces. In Lovable, Share then Publish deploys it.

## Resources

- [Lovable project](https://lovable.dev/projects/33f55f65-21de-4ed8-a09e-9ce73f3b3c0d): The original Lovable project for this repo.
- [Velt documentation](https://docs.velt.dev): SDK guides and API reference.
- [Velt](https://velt.dev): Product site.
- [Unsplash API](https://unsplash.com/developers): Photo API docs.
- [Lovable custom domains](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide): How to connect a domain to a Lovable project.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams. Made with [Velt](https://velt.dev).<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
