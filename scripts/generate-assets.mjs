/**
 * Generates the launch image assets that can't be written by hand:
 *
 *   public/og.jpg          1200x630 share card (WhatsApp, iMessage, Slack)
 *   src/app/favicon.ico    16 / 32 / 48 px, packed from src/app/icon.svg
 *   src/app/apple-icon.png 180x180 home-screen icon
 *
 * Run it with `npm run assets` after changing the hero copy, the hero photo or
 * the icon. The output is committed, so a normal `npm run build` never touches
 * this file — it needs the network (Google Fonts) and would be a silly thing to
 * put on the critical path of a deploy.
 *
 * Why a static JPEG rather than Next's `opengraph-image` convention: WhatsApp
 * is the channel this link actually travels on, and WhatsApp quietly drops the
 * large preview for images much over ~300 KB. ImageResponse only emits PNG, and
 * a 1200x630 PNG of a photograph lands near a megabyte. Rendering once and
 * compressing to JPEG keeps the card comfortably inside the budget.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import sharp from "sharp";
import { ImageResponse } from "next/og.js";
import { site } from "../src/content/site.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontCache = path.join(root, "node_modules/.cache/iron-fitness-fonts");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Straight out of globals.css — the card has to look like the page it opens.
const INK = "#12131A";
const BONE = "#E9E4DA";
const SMOKE = "#8A8B96";
const AMBER = "#F2A33C";
const WRAP = "#D8342A";

const h = React.createElement;

/**
 * Google serves a static TTF cut of any variable-font instance if you ask with
 * an old enough User-Agent. That matters here: satori's font parser rejects the
 * variable Archivo outright, and the width axis is the whole point of the face —
 * `wdth 118` is what globals.css sets on `.display`, so the share card and the
 * H1 it mirrors are set in the same cut rather than merely the same family.
 */
async function loadFont(name, query, file) {
  await mkdir(fontCache, { recursive: true });
  const cached = path.join(fontCache, file);
  if (existsSync(cached)) return readFile(cached);

  const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}`, {
    headers: { "User-Agent": "Mozilla/4.0" },
  }).then((r) => r.text());

  const url = css.match(/src: url\((https:[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`No TTF cut returned for ${name}`);

  const ttf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  await writeFile(cached, ttf);
  return ttf;
}

/** The hero photo, cropped to the card and dimmed before any type goes near it. */
async function heroBackground() {
  const jpeg = await sharp(path.join(root, "public", site.heroImage.src))
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.98 })
    .jpeg({ quality: 72 })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
}

function card(background, headline) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px",
        backgroundColor: INK,
        backgroundImage: `linear-gradient(to top, ${INK} 4%, rgba(18,19,26,0.62) 52%, rgba(18,19,26,0.18) 100%), linear-gradient(to right, rgba(18,19,26,0.76), rgba(18,19,26,0.14) 72%, rgba(18,19,26,0)), url(${background})`,
        backgroundSize: "100% 100%",
      },
    },
    // Wordmark, sitting on the red rule the way the page's buttons carry the
    // action colour: small, top-left, out of the headline's way.
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h("div", { style: { width: 56, height: 5, backgroundColor: WRAP } }),
      h(
        "div",
        {
          style: {
            marginTop: 18,
            fontFamily: "Archivo",
            fontSize: 30,
            color: BONE,
            letterSpacing: "-0.015em",
            lineHeight: 1,
          },
        },
        site.name.toUpperCase(),
      ),
    ),

    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h(
        "div",
        {
          style: {
            display: "flex",
            fontFamily: "Archivo",
            fontSize: 78,
            lineHeight: 0.94,
            color: BONE,
            letterSpacing: "-0.015em",
            maxWidth: 700,
          },
        },
        headline,
      ),
      h(
        "div",
        {
          style: {
            marginTop: 26,
            fontFamily: "Barlow",
            fontSize: 30,
            color: "rgba(233,228,218,0.86)",
            maxWidth: 720,
          },
        },
        `${site.tagline}, ${site.location.city}.`,
      ),

      // The hero's three figures, in the information colour, same rule as the
      // page: amber carries numbers, never actions.
      h(
        "div",
        {
          style: {
            display: "flex",
            gap: "56px",
            marginTop: 34,
            paddingTop: 26,
            borderTop: "1px solid rgba(233,228,218,0.18)",
          },
        },
        ...site.hero.stats.map((stat) =>
          h(
            "div",
            { key: stat.label, style: { display: "flex", flexDirection: "column" } },
            h(
              "div",
              { style: { fontFamily: "Archivo", fontSize: 40, color: AMBER, lineHeight: 1 } },
              stat.value,
            ),
            h(
              "div",
              { style: { marginTop: 8, fontFamily: "Barlow", fontSize: 22, color: SMOKE } },
              stat.label,
            ),
          ),
        ),
      ),
    ),
  );
}

async function buildOgImage() {
  const [archivo, barlow, background] = await Promise.all([
    // wdth 118 / wght 800 — the exact instance `.display` asks for.
    loadFont("Archivo", "Archivo:wdth,wght@118,800", "archivo-800-exp.ttf"),
    loadFont("Barlow", "Barlow:wght@500", "barlow-500.ttf"),
    heroBackground(),
  ]);

  const headline = site.hero.headline.toUpperCase();
  const png = await new ImageResponse(card(background, headline), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: "Archivo", data: archivo, weight: 800, style: "normal" },
      { name: "Barlow", data: barlow, weight: 500, style: "normal" },
    ],
  }).arrayBuffer();

  const out = path.join(root, "public", "og.jpg");
  const { size } = await sharp(Buffer.from(png))
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(out);

  console.log(`public/og.jpg          ${OG_WIDTH}x${OG_HEIGHT}  ${(size / 1024).toFixed(0)} KB`);
  if (size > 300 * 1024) {
    console.warn("  ! over 300 KB — WhatsApp may fall back to a small preview");
  }
}

/**
 * ICO is a directory of images with a 6-byte header and a 16-byte entry each;
 * every modern reader accepts PNG payloads. Writing those 54 bytes by hand is
 * smaller than any dependency that would do it for us.
 */
function packIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // 0 encodes 256
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette colours
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function buildIcons() {
  const svg = path.join(root, "src", "app", "icon.svg");
  // Rasterise from a high density so the 6px corner radius stays clean at 16px.
  const render = (size) =>
    sharp(svg, { density: 900 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map(async (size) => ({ size, data: await render(size) })),
  );

  const ico = path.join(root, "src", "app", "favicon.ico");
  await writeFile(ico, packIco(images));
  console.log(`src/app/favicon.ico    ${sizes.join("/")} px`);

  // iOS rounds the home-screen icon itself and composites onto white, so this
  // one is flattened onto the brand red with no corner radius of its own.
  const apple = path.join(root, "src", "app", "apple-icon.png");
  await sharp(svg, { density: 900 })
    .resize(180, 180)
    .flatten({ background: WRAP })
    .png({ compressionLevel: 9 })
    .toFile(apple);
  console.log("src/app/apple-icon.png 180x180");
}

await buildOgImage();
await buildIcons();
