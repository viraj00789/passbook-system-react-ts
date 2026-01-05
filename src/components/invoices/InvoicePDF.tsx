import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import Maglo from "../../assets/maglo.png";
import rupee from "../../assets/ruppee.png";
import ImageSvg from "./ImageSvg";

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

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Roboto",
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottom: "2px solid #111",
    marginBottom: 24,
  },

  brandLogo: {
    width: 60,
    height: 45,
    objectFit: "contain",
  },

  headerText: {
    marginTop: 10,
    fontSize: 10,
    color: "#444",
  },

  uploadLogo: {
    width: 90,
    height: 90,
    objectFit: "contain",
  },

  section: {
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  infoText: {
    fontSize: 10,
    color: "#444",
    marginBottom: 2,
  },

  /* TABLE */
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#111",
    color: "#fff",
    paddingVertical: 7,
    paddingHorizontal: 6,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderBottom: "1px solid #e0e0e0",
  },

  rowAlt: {
    backgroundColor: "#f9f9f9",
  },

  desc: {
    width: "20%",
    fontSize: 11,
  },

  descWide: {
    width: "40%",
    fontSize: 11,
  },

  cell: {
    width: "20%",
    textAlign: "right",
    fontSize: 11,
  },

  /* TOTALS */
  totalsBox: {
    marginTop: 18,
    alignSelf: "flex-end",
    width: "45%",
    padding: 12,
    border: "1px solid #111",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  totalLabel: {
    fontSize: 11,
    color: "#444",
  },

  totalValue: {
    fontSize: 11,
    fontWeight: "bold",
  },

  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },

  grandTotal: {
    marginTop: 8,
    paddingTop: 8,
    borderTop: "2px dashed #111",
    alignItems: "flex-end",
  },

  imagestyle_14: {
    width: 14,
    height: 14,
    objectFit: "contain",
  },
  imagestyle_11: {
    width: 11,
    height: 11,
    objectFit: "contain",
  },
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
      <ImageSvg />
        

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Image src={Maglo} style={styles.brandLogo} />
            <View style={styles.headerText}>
              <Text>Invoice #: {data.invoiceNumber}</Text>
              <Text>Issue Date: {data.issueDate}</Text>
              <Text>Due Date: {data.dueDate}</Text>
            </View>
          </View>

          {data.logo && (
            <Image
              src={URL.createObjectURL(data.logo)}
              style={styles.uploadLogo}
            />
          )}
        </View>

        {/* FROM / TO */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>From</Text>
            <Text style={styles.infoText}>Viraj</Text>
            <Text style={styles.infoText}>+91 9428657183</Text>
            <Text style={styles.infoText}>Rajkot, Gujarat 360490</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.infoText}>Name: {data.client?.label}</Text>
            <Text style={styles.infoText}>Email: johndoe@gmail.com</Text>
            <Text style={style.infoText}> Phone: +1 (101)445-532 </Text>
            <Text style={styles.infoText}>Address: New york, USA, 100001</Text>
            <Text style={styles.infoText}>
              Bank: {data.receivingAccount?.label}
            </Text>
          </View>
        </View>

        {/* TABLE */}
        <View style={{ marginTop: 22 }}>
          <View style={styles.tableHeader}>
            <Text style={styles.desc}>#</Text>
            <Text style={styles.descWide}>Description</Text>
            <Text style={styles.cell}>Qty</Text>
            <Text style={styles.cell}>Rate</Text>
            <Text style={styles.cell}>Amount</Text>
          </View>

          {data.items.map((item, i) => (
            <View
              key={i}
              style={[styles.row, ...(i % 2 !== 0 ? [styles.rowAlt] : [])]}
            >
              <Text style={styles.desc}>{i + 1}</Text>
              <Text style={styles.descWide}>{item.description}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>

              <View style={styles.cell}>
                <View style={styles.currencyRow}>
                  <Image src={rupee} style={styles.imagestyle_11} />
                  <Text>{item.rate}</Text>
                </View>
              </View>

              <View style={styles.cell}>
                <View style={styles.currencyRow}>
                  <Image src={rupee} style={styles.imagestyle_11} />
                  <Text>
                    {(Number(item.quantity) * Number(item.rate)).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* TOTALS */}
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <View style={styles.currencyRow}>
              <Image src={rupee} style={styles.imagestyle_11} />
              <Text style={styles.totalValue}>{subtotal.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Discount ({data.discount || 0}%)
            </Text>
            <View style={styles.currencyRow}>
              <Text>-</Text>
              <Image src={rupee} style={styles.imagestyle_11} />
              <Text style={styles.totalValue}>{discount.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax ({data.tax || 0}%)</Text>
            <View style={styles.currencyRow}>
              <Image src={rupee} style={styles.imagestyle_11} />
              <Text style={styles.totalValue}>{tax.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.grandTotal}>
            <View style={styles.currencyRow}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>Total:</Text>
              <Image src={rupee} style={styles.imagestyle_14} />
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
