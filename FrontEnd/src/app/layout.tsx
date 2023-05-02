"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Env from "@/constants/Env";
// import { checkScreenWidth } from "../utilities/checkScreenWidth";
import Footer from "@/components/generic/Footer";
import AlertDelAcc from "../components/generic/AlertDeleteAcc";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />

      <body className={`px-[14rem] font-[Roboto] grid`}>
        <Provider store={store}>
          {children}
          <Footer />

          <AlertDelAcc />
        </Provider>

        <a href="/" id="home-anchor-create_post" className="hidden" />
      </body>
    </html>
  );
}
