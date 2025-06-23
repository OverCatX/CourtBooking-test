"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Booking() {
  const [name, setName] = useState("");

  useEffect(() => {
    liff.init({ liffId: "2007624537-O6KnVQar" }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login(); // login แล้วจะ reload กลับมาหน้านี้
      } else {
        liff.getProfile().then((profile) => {
          setName(profile.displayName);
        });
      }
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 border border-gray-400 w-[500px] h-[500px]">
        <h1 className="text-black font-bold text-center text-3xl">Booking</h1>
        <p className="font-bold text-center text-1xl">Hello: {name}</p>
      </div>
    </div>
  );
}
