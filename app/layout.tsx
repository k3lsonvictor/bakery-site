import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";

export const metadata: Metadata = {
  title: "Padaria Pão Nosso",
  description: "Pães, doces e bolos preparados artesanalmente todos os dias.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
