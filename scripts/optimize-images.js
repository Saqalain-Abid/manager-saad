const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const BOOK_DIR = path.join(__dirname, "..", "public", "saad-book");
const PUBLIC_DIR = path.join(__dirname, "..", "public");

async function convert(srcPath, destPath, { maxHeight, quality }) {
  const image = sharp(srcPath);
  const meta = await image.metadata();
  const resized =
    meta.height && meta.height > maxHeight
      ? image.resize({ height: maxHeight })
      : image;
  await resized.webp({ quality }).toFile(destPath);

  const blurBuf = await sharp(srcPath)
    .resize(12)
    .webp({ quality: 40 })
    .toBuffer();

  const { size: outSize } = fs.statSync(destPath);
  return {
    file: path.basename(destPath),
    width: (await sharp(destPath).metadata()).width,
    height: (await sharp(destPath).metadata()).height,
    bytes: outSize,
    blurDataURL: `data:image/webp;base64,${blurBuf.toString("base64")}`,
  };
}

async function main() {
  const results = {};

  const bookFiles = fs
    .readdirSync(BOOK_DIR)
    .filter((f) => f.toLowerCase().endsWith(".png"));

  for (const file of bookFiles) {
    const src = path.join(BOOK_DIR, file);
    const dest = path.join(BOOK_DIR, file.replace(/\.png$/i, ".webp"));
    const before = fs.statSync(src).size;
    const info = await convert(src, dest, { maxHeight: 1600, quality: 78 });
    results[file.replace(/\.png$/i, "")] = info;
    console.log(
      `${file} -> ${info.file}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(info.bytes / 1024).toFixed(0)}KB`
    );
    fs.unlinkSync(src);
  }

  // Background image
  const bgSrc = path.join(PUBLIC_DIR, "bg.png");
  const bgDest = path.join(PUBLIC_DIR, "bg.webp");
  const bgBefore = fs.statSync(bgSrc).size;
  const bgInfo = await convert(bgSrc, bgDest, { maxHeight: 1600, quality: 75 });
  console.log(
    `bg.png -> bg.webp: ${(bgBefore / 1024 / 1024).toFixed(2)}MB -> ${(bgInfo.bytes / 1024).toFixed(0)}KB`
  );
  fs.unlinkSync(bgSrc);

  fs.writeFileSync(
    path.join(__dirname, "image-manifest.json"),
    JSON.stringify(results, null, 2)
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
