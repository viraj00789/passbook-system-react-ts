import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

export default function PdfDownload({
  invoiceForm,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoiceForm: any;
}) {
  return (
    <>
      <PDFDownloadLink
        document={<InvoicePDF data={invoiceForm} />}
        fileName={`${invoiceForm.invoiceNumber}.pdf`}
      >
        {({ loading }) => (
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded">
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </>
  );
}
