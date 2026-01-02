import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

interface InvoiceItem {
  description: string;
  quantity: number | "";
  rate: number | "";
}

interface InvoicePDFProps {
  data: {
    client: { label: string } | null;
    receivingAccount: { label: string } | null;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    items: InvoiceItem[];
    discount: number | "";
    tax: number | "";
    logo: File | null;
  };
}

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 6,
  },
  desc: { width: "40%" },
  cell: { width: "20%", textAlign: "right" },
  total: { textAlign: "right", marginTop: 8 },
});

export default function InvoicePDF({ data }: InvoicePDFProps) {
  const subtotal = data.items.reduce(
    (sum, i) => sum + Number(i.quantity || 0) * Number(i.rate || 0),
    0
  );

  const discount = data.discount ? (subtotal * data.discount) / 100 : 0;
  const tax = data.tax ? (subtotal * data.tax) / 100 : 0;
  const total = subtotal - discount + tax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>Invoice #: {data.invoiceNumber}</Text>
            <Text>Issue Date: {data.issueDate}</Text>
            <Text>Due Date: {data.dueDate}</Text>
          </View>

          {data.logo && (
            <Image
              src={URL.createObjectURL(data.logo)}
              style={{ width: 80, height: 80 }}
            />
          )}
        </View>

        <Text>Client: {data.client?.label}</Text>
        <Text>Account: {data.receivingAccount?.label}</Text>

        {/* TABLE */}
        <View style={{ marginTop: 12 }}>
          <View style={styles.row}>
            <Text style={styles.desc}>Description</Text>
            <Text style={styles.cell}>Qty</Text>
            <Text style={styles.cell}>Rate</Text>
            <Text style={styles.cell}>Amount</Text>
          </View>

          {data.items.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>{item.rate}</Text>
              <Text style={styles.cell}>
                {Number(item.quantity) * Number(item.rate)}
              </Text>
            </View>
          ))}
        </View>

        {/* TOTALS */}
        <Text style={styles.total}>Subtotal: {subtotal}</Text>
        <Text style={styles.total}>Discount: {discount}</Text>
        <Text style={styles.total}>Tax: {tax}</Text>
        <Text style={styles.total}>Total: {total}</Text>
      </Page>
    </Document>
  );
}
