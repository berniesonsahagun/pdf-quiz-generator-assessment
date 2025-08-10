import { buildCompactContext, compressPage } from "@/lib/compress";

export async function parsePDF(
  file: File
): Promise<{ success: boolean; message?: string; context?: string }> {
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");

  const MAX_PAGES = parseInt(process.env.MAX_PDF_PAGES || "");
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  if (pdf.numPages > MAX_PAGES) {
    return {
      success: false,
      message: `PDF must not have more than ${MAX_PAGES} Pages.`,
    };
  }

  // Get all contents from all pages
  let assembledText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const text = await page.getTextContent();
    text.items.forEach((item) => {
      if ("str" in item) {
        assembledText += item.str + " ";
      }
    });
    assembledText += "\n";
  }

  return {
    success: true,
    context: assembledText,
  };
}
