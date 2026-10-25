import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const titre = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--police-titre",
  display: "swap",
});

const texte = Instrument_Sans({
  subsets: ["latin"],
  variable: "--police-texte",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Note — Tes factures et tes acomptes partent à temps",
  description:
    "Facture en trois champs depuis ton téléphone, acompte demandé automatiquement, relances des impayés. Pour les artisans et le BTP.",
  openGraph: {
    title: "Note — Tes factures et tes acomptes partent à temps",
    description:
      "Facture en trois champs depuis ton téléphone, acompte automatique, relances des impayés.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14213d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${titre.variable} ${texte.variable}`}>
      <body>{children}</body>
    </html>
  );
}