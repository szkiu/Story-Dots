import React from "react";
import Header from "../components/generic/Header";
import CreatePost from "@/components/generic/CreatePost";
import MainContent from "@/components/home/MainContent";

export default function Home() {
  return (
    <>
      <Header />

      <main className="my-8">
        <MainContent />

        <CreatePost />
      </main>
    </>
  );
}
