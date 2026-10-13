import { useEffect, useState } from "react";
import { publicSiteHref } from "@/lib/public-site";
import { useCopy } from "@/i18n/lang";

const FRAME = "/qr-frame.jpg";
const MARK = "/kwh-mark.png";
const POSTER = 1408;

function loadImg(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function makePoster(site: string) {
  await document.fonts.ready;
  const mod = await import("qrcode");
  const QRCode = (mod.default ?? mod) as {
    toDataURL: (text: string, opts: object) => Promise<string>;
  };
  const qrUrl = await QRCode.toDataURL(site, {
    width: 920,
    margin: 1,
    errorCorrectionLevel: "H",
    color: { dark: "#1e1b16", light: "#faf6ee" },
  });
  const [frame, qr, mark] = await Promise.all([loadImg(FRAME), loadImg(qrUrl), loadImg(MARK)]);
  const canvas = document.createElement("canvas");
  canvas.width = POSTER;
  canvas.height = POSTER;
  const ctx = canvas.getContext("2d");
  if (!ctx) return qrUrl;

  ctx.drawImage(frame, 0, 0, POSTER, POSTER);

  const qrSize = 560;
  const qrX = (POSTER - qrSize) / 2;
  const qrY = 428;
  ctx.fillStyle = "#faf6ee";
  roundRect(ctx, qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 24);
  ctx.fill();
  ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#1e1b16";
  ctx.font = "600 58px 'Noto Serif TC', 'Songti TC', serif";
  ctx.fillText("身心課堂", POSTER / 2, 292);

  ctx.fillStyle = "#3f6b5c";
  ctx.font = "400 22px 'Noto Sans TC', sans-serif";
  ctx.fillText("安神  ·  解鬱  ·  安寐", POSTER / 2, 348);

  const cx = POSTER / 2;
  const cy = qrY + qrSize / 2;
  const seal = 72;
  ctx.fillStyle = "#faf6ee";
  roundRect(ctx, cx - seal, cy - seal, seal * 2, seal * 2, 18);
  ctx.fill();
  const inset = 16;
  const box = seal * 2 - inset * 2;
  ctx.drawImage(mark, cx - box / 2, cy - box / 2, box, box);

  ctx.fillStyle = "#6e6458";
  ctx.font = "400 22px 'Noto Sans TC', sans-serif";
  ctx.fillText("掃一掃即可進入", POSTER / 2, qrY + qrSize + 48);

  return canvas.toDataURL("image/png");
}

function dataUrlToBlob(dataUrl: string) {
  const [head, body] = dataUrl.split(",");
  const mime = /data:(.*?);/.exec(head)?.[1] || "image/png";
  const bin = atob(body);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function savePoster(src: string, filename: string) {
  const href = URL.createObjectURL(dataUrlToBlob(src));
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(href), 2000);
}

export function SiteQr({
  size = 280,
  download = false,
}: {
  size?: number;
  download?: boolean;
}) {
  const [src, setSrc] = useState("");
  const [url, setUrl] = useState("");
  const ui = useCopy().ui;

  useEffect(() => {
    const href = publicSiteHref();
    setUrl(href);
    void makePoster(href)
      .then(setSrc)
      .catch(() => {
        /* QR is optional */
      });
  }, []);

  function save() {
    if (!src) return;
    savePoster(src, ui.qrFile);
  }

  return (
    <figure className="m-0 mx-auto w-full max-w-full">
      {src ? (
        <img
          src={src}
          alt={ui.qrAlt}
          width={size}
          height={size}
          className="mx-auto h-auto w-full max-w-full rounded-xl bg-paper shadow-sm"
          style={{ maxWidth: size }}
        />
      ) : (
        <div className="aspect-square w-64 rounded-xl bg-paper" />
      )}
      <figcaption className="mt-3 text-sm text-muted">
        {ui.qrCap}
        {url ? <span className="mt-1 block break-all text-xs">{url}</span> : null}
      </figcaption>
      {download && (
        <button
          type="button"
          onClick={save}
          disabled={!src}
          className="mt-4 min-h-11 w-full rounded-full bg-bg-deep px-5 py-2.5 text-sm tracking-widest text-paper disabled:opacity-50"
        >
          {ui.qrDl}
        </button>
      )}
    </figure>
  );
}
