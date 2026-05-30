import { NextRequest } from "next/server";
import PDFDocument from "pdfkit";
import * as XLSX from "xlsx";
import { getResearchReport } from "@/services/report.service";
import { listPublications } from "@/repositories/publication.repository";

function createPdfBuffer(lines: string[]) {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(18).text("ResearchHub Campus Report", { align: "center" });
    doc.moveDown();
    lines.forEach((line) => doc.fontSize(11).text(line));
    doc.end();
  });
}

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get("format") ?? "pdf";
  const year = request.nextUrl.searchParams.get("year") ?? undefined;

  const researches = await getResearchReport({ year });
  const publications = await listPublications();

  if (format === "xlsx") {
    const workbook = XLSX.utils.book_new();
    const researchSheet = XLSX.utils.json_to_sheet(researches.map((item) => ({ title: item.title, year: item.year, status: item.status, leader: item.leader.name })));
    const publicationSheet = XLSX.utils.json_to_sheet(publications.map((item) => ({ title: item.title, year: item.year, category: item.category, citations: item.citationCount })));
    XLSX.utils.book_append_sheet(workbook, researchSheet, "Research");
    XLSX.utils.book_append_sheet(workbook, publicationSheet, "Publications");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="researchhub-campus-report.xlsx"'
      }
    });
  }

  const pdfBuffer = await createPdfBuffer([
    `Total penelitian: ${researches.length}`,
    `Total publikasi: ${publications.length}`,
    `Generated at: ${new Date().toISOString()}`
  ]);

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="researchhub-campus-report.pdf"'
    }
  });
}
