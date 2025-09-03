import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import { ExportOptions } from "@/types";

// 辅助函数：计算元素的完整尺寸
function getElementDimensions(element: HTMLElement, options: ExportOptions) {
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);

  // 计算完整尺寸，包括padding和border
  const fullWidth =
    options.width ||
    Math.ceil(
      rect.width +
        parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight)
    );
  const fullHeight =
    options.height ||
    Math.ceil(
      rect.height +
        parseFloat(computedStyle.paddingTop) +
        parseFloat(computedStyle.paddingBottom)
    );

  return { fullWidth, fullHeight };
}

// 辅助函数：获取通用的html-to-image配置
function getBaseConfig(
  element: HTMLElement,
  options: ExportOptions,
  backgroundColor?: string
) {
  const { fullWidth, fullHeight } = getElementDimensions(element, options);

  return {
    pixelRatio: options.scale,
    width: fullWidth,
    height: fullHeight,
    ...(backgroundColor && { backgroundColor }),
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
      width: `${fullWidth}px`,
      height: `${fullHeight}px`,
    },
    skipFonts: false,
    includeQueryParams: true,
    cacheBust: true,
  };
}

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
    const config = getBaseConfig(element, options);
    const dataUrl = await htmlToImage.toPng(element, config);
    return dataUrl;
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
    const config = {
      ...getBaseConfig(element, options, "#ffffff"),
      quality: options.quality,
    };
    const dataUrl = await htmlToImage.toJpeg(element, config);
    return dataUrl;
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
    // 首先获取PNG数据
    const config = getBaseConfig(element, options, "#ffffff");
    const pngDataUrl = await htmlToImage.toPng(element, config);
    const { fullWidth, fullHeight } = getElementDimensions(element, options);

    // 创建临时图片来获取尺寸
    const img = new Image();
    img.src = pngDataUrl;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          const pdf = new jsPDF({
            orientation: fullWidth > fullHeight ? "landscape" : "portrait",
            unit: "px",
            format: [fullWidth, fullHeight],
          });

          pdf.addImage(pngDataUrl, "PNG", 0, 0, fullWidth, fullHeight);
          resolve(pdf.output("datauristring"));
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error("Failed to load image for PDF creation"));
      };
    });
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
export async function copyImageToClipboard(
  element: HTMLElement,
  options: ExportOptions = { format: "png", quality: 1, scale: 2 }
): Promise<void> {
  try {
    // 直接使用html-to-image生成blob
    const config = getBaseConfig(element, options);
    const blob = await htmlToImage.toBlob(element, config);

    if (!blob) {
      throw new Error("Failed to generate image blob");
    }

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
