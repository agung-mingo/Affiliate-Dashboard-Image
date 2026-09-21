import { MAX_EXPORT_BYTES } from "../config/templates";

// Konva's toBlob doesn't support quality-based re-compression for PNG,
// so we step down the export pixel ratio until the file fits the budget.
export async function exportStageAsPng(stage, { onSizeReport } = {}) {
  const ratios = [1, 0.85, 0.7, 0.55, 0.4];

  for (const pixelRatio of ratios) {
    const blob = await new Promise((resolve) => {
      stage.toCanvas({ pixelRatio }).toBlob(resolve, "image/png");
    });

    if (!blob) continue;
    onSizeReport?.(blob.size, pixelRatio);

    if (blob.size <= MAX_EXPORT_BYTES || pixelRatio === ratios[ratios.length - 1]) {
      return blob;
    }
  }

  throw new Error("Failed to export image");
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
