---
description: 
alwaysApply: true
---

# AGENTS.md — vrplayer Agent Constitution (HARD RULES)

This repo is developed with an AI-assisted workflow (Codex / Cursor).
These rules are non-negotiable. Breaking any rule is considered a failed change.

---

## 0) Collaboration Model (HARD)

- User responsibility: **ONLY execute Cursor (and PowerShell publish commands).**
- Agent responsibility: **write a single, deterministic prompt that will not fail.**

Agent MUST NOT:
- Ask user to open console/devtools for debugging
- Ask user to manually edit any config file
- Say “try / maybe / if not then …”
- Provide multiple options for user to choose
- Ask user to validate online changes before publish is confirmed

Agent MUST:
- Specify exact files to change + exact expected result
- Ensure changes are publishable and actually published before any “go verify online”

---

## 1) Source of Truth & Forbidden Files (HARD)

- **ONLY config source of truth:** `public/config.json`
- `dist/` and `docs/` are **build artifacts**
- NEVER manually edit anything under `dist/` or `docs/`

Allowed modifications:
- `src/**`
- `public/**` (including `public/config.json`)

Forbidden modifications:
- `docs/**`
- `dist/**`

---

## 2) Publishing & Verification (HARD)

Cloudflare Pages serves **Root directory = `docs`**.
The only valid publish pipeline is:

(EDIT) public/ or src/
→ npm run build (produces dist/)
→ robocopy dist → docs (/MIR)
→ git add -A
→ git commit
→ git push
→ Cloudflare Pages deploys the new commit
→ ONLY THEN user verifies in browser

yaml
复制代码

If user reports “online unchanged”, the first assumption is:
- publish chain not live (missed robocopy / no commit / no push / Pages not deployed / cache), NOT logic bug.

Before telling user to verify online, agent must ensure:
1) a new commit exists and was pushed
2) Pages deployed that commit

---

## 3) Known Deployment Pitfalls (HARD)

- White screen + `module script MIME type is video/mp2t`:
  - First check Pages Root directory vs output alignment.
  - This repo uses: build to `dist`, serve `docs` → must sync `dist → docs`.

- Git push instability:
  - Use **system PowerShell**
  - Use GitHub SSH over **443** (`ssh.github.com:443`) configured in `~/.ssh/config`

- Cache misleads:
  - Use hard refresh / incognito
  - Validate asset hash changes (index-*.js)

- Do not use Cloudflare R2 for critical WebGL textures by default:
  - URL accessible ≠ WebGL loadable (CORS + cache)
  - Prefer same-origin assets under Pages (e.g. `/assets`, `/panos`)

---

## 4) Coordinate System Constitution (HARD)

Definitions:
- All yaw/pitch/northYaw in config and URL params are **REAL-WORLD angles** (world angles).
- Viewer/three.js uses **internal angles**.

Rule:
- World → internal conversion is allowed **ONCE, at exactly one entry point**.
- The only allowed form is:

internalYaw = -worldYaw

yaml
复制代码

Forbidden:
- Re-inverting in multiple places
- “fallback then invert again” inside components
- Per-component private sign fixes

---

## 5) Compass System = Three Independent Implementations (HARD)

There are three separate direction systems. Any direction-related change must update all 3:

1) `src/ui/CompassDisk.ts` (DOM UI compass)
2) `src/ui/GroundHeadingMarker.ts` (DOM ground marker)
3) `src/viewer/NadirPatch.ts` (three.js mesh compass)

Forbidden:
- “Fix one first and see”

---

## 6) Final Compass Product Decision (HARD)

- `initialView.yaw` → controls **initial camera heading**
- `northYaw` → controls **where the disk’s N points (real-world north)**
- Needle/pointer → represents **current camera heading**
- Disk MUST NOT rotate with camera
- Pointer MUST rotate with camera

Verification invariant:
When `cameraYaw == northYaw`, all must be true:
- pointer angle == 0
- pointer points to disk N
- initial heading equals real-world north when configured so

---

## 7) Pick (Yaw/Pitch from click) Policy (HARD)

Pick must compute yaw/pitch from **Raycaster ray.direction**, not from intersection point.
Reason: intersections may be missing/blocked; ray.direction is stable.

---

## 8) ?????HARD?

- chrome-devtools MCP ? Network ????????
- ???????????? Network ?????

---

## 9) Persistent Knowledge via README (REQUIRED)

When important pitfalls, conventions, or SOP updates are discovered:
- Update `README.md` under “Agent Notes (Persistent)” section
- Keep it short, actionable, and searchable
- Purpose: a fresh Codex window can recover context fast

---

## 10) Output Language

- All outputs, summaries, explanations, and commit messages MUST be written in Simplified Chinese.
- Do NOT switch to English unless explicitly requested.

## 11) MCP
- Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, ChatGPT Apps SDK, Codex,… without me having to explicitly ask.
- Always use the chrome-devtools, github, filesystem MCP server if you need.
- Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
