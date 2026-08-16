# Neon Stream Console

Design a web app UI for a personal YouTube downloader tool, matching this

exact visual style: a dark cyberpunk terminal console interface with

monochrome cyan/teal neon accents (not multicolor — single accent color

family: cyan #00e5cc to teal-green).

Overall aesthetic:

- Background: pure black to near-black (#0a0e0e)

- Accent color: cyan/teal neon (#00e5c4) used for all borders, active

  text, icons, and highlights — consistent single-color glow throughout,

  no magenta/pink

- Monospace font (JetBrains Mono / Fira Code style) for all text

- All panels have thin 1px cyan borders with subtle glow, sharp corners

  (no rounded corners), dark panel backgrounds slightly lighter than

  page background

- Small uppercase labels with letter-spacing throughout (like

  "LOCATION:", "STATUS:") in dim gray/cyan

- Bracket notation for buttons and titles, e.g. "[ DOWNLOAD_CONSOLE ]"

Top bar:

- Left: app title in bracket notation "[ YT_DOWNLOAD_CONSOLE ]" bold cyan

- Below title: small status line like "STREAM_STABLE // LOCAL_ACCESS" in

  dim gray monospace

- Right: 2-3 small pill-style buttons with icons, outlined in cyan, e.g.

  "● SERVER_ACTIVE", "SETTINGS", "CLEAR"

Breadcrumb/location row below top bar:

- "LOCATION: > URL_INPUT" style breadcrumb text, small and dim

Main content area (left, ~70% width), styled as a console panel:

- Panel header row with tabs/toggles: a timestamp-like field showing

  session info, a "SAVED" style status pill, then toggle buttons styled

  like "DEFAULT", "AUDIO_ONLY", "FOCUS", "AI_ANALYZE" — active one

  glowing filled cyan, inactive ones outlined/dim

- Below header: large text input area styled like a code editor, with

  line numbers on the left margin (dim gray monospace numbers 01, 02,

  03...), where the pasted YouTube URL and fetched video metadata

  (title, channel, duration) appear as if printed into a log/terminal

  buffer

- A small orange/amber circular icon marker in the margin next to the

  active line (like a bookmark/flag indicator)

- Bottom of panel: thin horizontal scroll indicator bar

Right sidebar panel (~30% width), two stacked panels:

- Top small panel "DOWNLOAD_STATS" showing two stat boxes side by side:

  "FORMATS" with a number, and "QUALITY_OPTIONS" with a number, big cyan

  numbers with small dim labels above

- Bottom larger panel "AI_SUMMARY" or "VIDEO_INFO" with header row

  containing a settings/refresh icon and a small toggle icon on the

  right. Inside, several subsections each with a small icon + heading:

  "OVERVIEW" (video title/description), "FORMAT_DETAILS" (resolution,

  filesize estimate), "DOWNLOAD_PROGRESS" (a highlighted box with

  cyan-tinted background showing live progress text like ASCII progress

  bar), "NEXT_STEP" (highlighted box suggesting action, e.g. "click

  INITIATE to begin download")

- These highlighted sub-boxes have a slightly lighter/tinted dark

  background with rounded-ish small corners and thin cyan left border

  accent

Footer bar:

- Left: small user/session label like "USER: LOCAL_SESSION"

- Center: a number/counter label like "QUEUE: 0"

- Right: small lock icon with text "ENCRYPTED_LOCAL_CACHE" or

  "LOCAL_ONLY_MODE"

Interaction/detail notes:

- All interactive elements (buttons, tabs, inputs) have a subtle cyan

  glow (box-shadow) that intensifies slightly on hover

- Use thin horizontal divider lines between sections, cyan at low opacity

- Icons should be minimal line-style icons (not filled), matching the

  thin-line aesthetic

- Overall density should feel like a professional dev tool / hacker

  console, not a consumer app — tight spacing, small font sizes,

  information-dense

Target: desktop web app, dark cyberpunk terminal console aesthetic,

single consistent cyan accent color, matching a "control panel" feel.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/be91bb35-897c-477c-a7f3-93472053762b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
