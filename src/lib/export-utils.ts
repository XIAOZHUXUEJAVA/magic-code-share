import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ExportOptions } from "@/types";

// 导出为 PNG
export async function exportToPNG(
  element: HTMLElement,
  options: ExportOptions = {
    format: "png",
    quality: 1,
    scale: 2,
  }
): Promise<string> {
  try {
    const canvas = await html2canvas(element, {
      scale: options.scale,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      width: options.width,
      height: options.height,
    });

    return canvas.toDataURL("image/png", options.quality);
  } catch (error) {
    console.error("Error exporting to PNG:", error);
    throw new Error("Failed to export as PNG");
  }
}

// 导出为 JPG
export async function exportToJPG(
  element: HTMLElement,
  options: ExportOptions = {
    format: "jpg",
    quality: 0.9,
    scale: 2,
  }
): Promise<string> {
  try {
    const canvas = await html2canvas(element, {
      scale: options.scale,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      width: options.width,
      height: options.height,
    });

    return canvas.toDataURL("image/jpeg", options.quality);
  } catch (error) {
    console.error("Error exporting to JPG:", error);
    throw new Error("Failed to export as JPG");
  }
}

// 导出为 PDF
export async function exportToPDF(
  element: HTMLElement,
  options: ExportOptions = {
    format: "png",
    quality: 1,
    scale: 2,
  }
): Promise<string> {
  try {
    const canvas = await html2canvas(element, {
      scale: options.scale,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      width: options.width,
      height: options.height,
    });

    const imgData = canvas.toDataURL("image/png", options.quality);
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    return pdf.output("datauristring");
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw new Error("Failed to export as PDF");
  }
}

// 下载文件
export function downloadFile(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 复制图片到剪贴板
export async function copyImageToClipboard(dataUrl: string): Promise<void> {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
    } else {
      throw new Error("Clipboard API not supported");
    }
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    throw new Error("Failed to copy image to clipboard");
  }
}

// 生成文件名
export function generateFilename(
  title: string = "code-snippet",
  format: string = "png"
): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase();
  return `${sanitizedTitle}-${timestamp}.${format}`;
}

// 获取优化的导出选项
export function getOptimizedExportOptions(
  format: "png" | "jpg" | "pdf",
  quality: "low" | "medium" | "high" = "high"
): ExportOptions {
  const qualityMap = {
    low: { quality: 0.6, scale: 1 },
    medium: { quality: 0.8, scale: 1.5 },
    high: { quality: 1, scale: 2 },
  };

  const settings = qualityMap[quality];

  return {
    format,
    quality: format === "jpg" ? settings.quality * 0.9 : settings.quality,
    scale: settings.scale,
  };
}
