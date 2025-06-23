"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState<string | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");

  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  const courts = ["Court A", "Court B", "Court C"];

  useEffect(() => {
    liff
      .init({ liffId: "165XXXXXXXXX" })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          liff
            .getProfile()
            .then((profile) => {
              setName(profile.displayName);
              setPictureUrl(profile.pictureUrl);
            })
            .catch((err) => {
              console.error("getProfile error:", err);
            });
        }
      })
      .catch((err) => {
        console.error("LIFF init failed:", err);
      });
  }, []);

  const handleSubmit = () => {
    alert(`คุณ ${name} จอง ${selectedCourt} เวลา ${selectedTime}`);
    liff.closeWindow();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 py-6">
      {pictureUrl && (
        <img
          src={pictureUrl}
          alt="profile"
          className="w-24 h-24 rounded-full mb-4 shadow-lg"
        />
      )}
      <h1 className="text-xl font-bold mb-6">สวัสดี {name || "..."}</h1>

      <select
        value={selectedCourt}
        onChange={(e) => setSelectedCourt(e.target.value)}
        className="mb-4 p-2 rounded-md w-full max-w-xs"
      >
        <option value="">เลือกสนาม</option>
        {courts.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="mb-4 p-2 rounded-md w-full max-w-xs"
      >
        <option value="">เลือกเวลา</option>
        {times.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        disabled={!selectedCourt || !selectedTime}
      >
        ✅ ยืนยันการจอง
      </button>
    </div>
  );
}
