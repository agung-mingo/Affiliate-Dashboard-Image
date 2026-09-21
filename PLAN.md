# Affiliate Dashboard — Plan

## Overview
A web app that lets Blibli-Tiket affiliates generate their own branded promo image
(banner + mobile/story card) by filling a simple form — no design tools needed.

## Inputs (form)
- Name (renders into "Hai! Saya **{Name}**")
- Social media handle (renders as "@{handle}")
- Photo upload (JPG/PNG)

## Photo editing
- User can **position** (drag), **zoom in/out** the uploaded photo inside a fixed
  frame/slot defined by the template.
- Frame shape/position/size comes from the graphics guideline (TBD).

## Templates
Two output variants, based on the reference designs:
1. **Desktop banner** — **1440x360px**, sky/clouds background, sun graphics,
   logo badge top-left, name + tagline + handle bottom-left, photo right side
2. **Mobile / story card** — **720x960px**, same visual language,
   status-bar mock at top, logo centered, name/tagline/handle lower-left, photo
   bottom-right area

Exact colors, fonts, positions, and safe zones to be finalized once the graphics
guideline is provided. Until then, the two sample images serve as visual reference.

## Output
- Export as **PNG**, flattened (background + photo + text composited).
- Must stay **under 250KB** per image — need compression strategy:
  - Control canvas export resolution (don't over-render beyond intended display size)
  - Use `canvas.toBlob(..., 'image/png')` and check size; if needed, consider
    downscaling or switching to a fast PNG quantizer, since PNG doesn't have a
    simple quality knob like JPEG.
  - Fallback option to discuss: allow near-lossless JPEG if PNG can't hit 250KB
    at acceptable quality (pending your confirmation — spec says PNG).

## Tech stack (proposed)
- **Frontend**: React + Vite
- **Canvas rendering**: Fabric.js or Konva (react-konva) for draggable/zoomable
  photo layer + text overlay compositing
- **Export**: native canvas `toBlob` / `toDataURL`, client-side only (no backend
  needed unless we want to save/share generated images later)
- **Hosting**: static (Vercel/Netlify) or per your preference

## Open questions / waiting on
1. Graphics guideline: fonts, hex colors, exact template dimensions, photo frame
   shape & bounds, text positions/sizes per breakpoint
2. Whether desktop/mobile are two separate exports or a single toggle in one UI
3. Whether any backend/storage is needed later (save profiles, history) — current
   scope assumes stateless, one-shot form → image
4. PNG under 250KB — confirm PNG is required vs. JPEG fallback if size target is
   hard to hit at full quality

## Repo setup status
- Local folder: `/Users/agung.hutomo/Documents/AI Project/Dashboard Affiliate`
- Remote: https://github.com/agung-mingo/Affiliate-Dashboard-Image.git
- Blocked on: Xcode Command Line Tools installation (git unavailable on this
  machine) — clone pending once install finishes
