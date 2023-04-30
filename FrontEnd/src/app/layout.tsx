'use client';
import "./globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Footer from "@/components/generic/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      
      <body className="min-h-[100vh] px-[14rem] font-[Roboto] grid">
        <Provider store={store}>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
