"use client";

import { useEffect } from "react";
import Authentication from "./firebase/authentication";

export default function Home() {
  useEffect(() => {
    if(sessionStorage.getItem("user") === null) {
      new Authentication().onAuthStateChanged();
    }
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
