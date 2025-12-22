import MasterCard from "../src/assets/mastercard.svg";
import Visa from "../src/assets/visa.svg";
export type CreditCard = {
  id: string; brand: "visa" | "mastercard" | "amex";
  number: string;
  holder: string;
  expiry: string;
  bgColor: string;
  ifscode?: string;
  accountName?: string;
  accountNumber?: string;
  sortCode?: string;
  brandImage?: string;
};

export const CARDS: CreditCard[] = [
  {
    id: "101",
    brand: "visa",
    number: "**** **** 1111 1111",
    holder: "ROBERT MARTIN",
    expiry: "09/27",
    bgColor: "linear-gradient(15deg, #0f2027, #203a43, #2c5364)", // Deep Blue
    ifscode: "SBIN0001234",
    accountName: "ROBERT MARTIN",
    accountNumber: "12345678901",
    brandImage: MasterCard,
  },
  {
    id: "102",
    brand: "mastercard",
    number: "**** **** 0000 0004",
    holder: "SOPHIA WILLIAMS",
    expiry: "02/28",
    bgColor: "linear-gradient(15deg, #93291e, #f0717fff)", // Rich Red
    sortCode: "40-12-34",
    ifscode: "BOBN0001234",
    accountName: "SOPHIA WILLIAMS",
    accountNumber: "23456789012",
    brandImage: MasterCard,
  },
  {
    id: "103",
    brand: "amex",
    number: "**** **** 5343 3331",
    holder: "DANIEL ANDERSON",
    expiry: "07/29",
    bgColor: "linear-gradient(15deg, #1d976c, #93f9b9)", // Emerald Green
    ifscode: "SBIN0001234",
    accountName: "DANIEL ANDERSON",
    accountNumber: "34567890123",
    brandImage: Visa,
  },
  {
    id: "104",
    brand: "visa",
    number: "**** **** 5566 5556",
    holder: "OLIVIA THOMAS",
    expiry: "11/26",
    bgColor: "linear-gradient(15deg, #141e30, #243b55)", // Midnight Blue
    ifscode: "HDFC0005678",
    accountName: "OLIVIA THOMAS",
    accountNumber: "45678901234",
    brandImage: MasterCard,
  },
  {
    id: "105",
    brand: "mastercard",
    number: "**** **** 8282 8210",
    holder: "ETHAN WALKER",
    expiry: "05/30",
    bgColor: "linear-gradient(15deg, #f46b45, #eea849)", // Warm Gold
    sortCode: "20-45-67",
    ifscode: "SBIN0001234",
    accountName: "ETHAN WALKER",
    accountNumber: "56789012345",
    brandImage: Visa,
  },
];


