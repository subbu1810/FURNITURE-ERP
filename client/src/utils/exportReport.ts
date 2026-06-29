import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportPdf() {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Furniture ERP - Reports", 14, 20);

  // Subtitle
  doc.setFontSize(11);
  doc.text(
    "Generated from Reports Dashboard",
    14,
    28
  );

  // Table
  autoTable(doc, {
    startY: 40,
    head: [["Metric", "Value"]],
    body: [
      ["Total Revenue", "₹1,24,58,600"],
      ["Total Orders", "352"],
      ["Gross Profit", "₹28,76,450"],
      ["Net Profit", "₹14,68,820"],
      ["Customers", "1,285"],
    ],
  });

  doc.save("Furniture-ERP-Report.pdf");
}

export function exportExcel() {
  const reportData = [
    {
      Metric: "Total Revenue",
      Value: "₹1,24,58,600",
    },
    {
      Metric: "Total Orders",
      Value: "352",
    },
    {
      Metric: "Gross Profit",
      Value: "₹28,76,450",
    },
    {
      Metric: "Net Profit",
      Value: "₹14,68,820",
    },
    {
      Metric: "Customers",
      Value: "1,285",
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(reportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Reports"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Furniture-ERP-Report.xlsx");
}

export function exportCsv() {
  const reportData = [
    {
      Metric: "Total Revenue",
      Value: "₹1,24,58,600",
    },
    {
      Metric: "Total Orders",
      Value: "352",
    },
    {
      Metric: "Gross Profit",
      Value: "₹28,76,450",
    },
    {
      Metric: "Net Profit",
      Value: "₹14,68,820",
    },
    {
      Metric: "Customers",
      Value: "1,285",
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(reportData);

  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "Furniture-ERP-Report.csv");
}