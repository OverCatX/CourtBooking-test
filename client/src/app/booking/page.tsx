"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState<string | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [loading, setLoading] = useState(true);

  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  const courts = ["Court A", "Court B", "Court C"];

  useEffect(() => {
    liff
      .init({ liffId: "165XXXXXXXXX" })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          return liff.getProfile();
        }
      })
      .then((profile) => {
        if (profile) {
          setName(profile.displayName);
          setPictureUrl(profile.pictureUrl || "");
        }
      })
      .catch((err) => {
        console.error("getProfile error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = () => {
    alert(`คุณ ${name} จอง ${selectedCourt} เวลา ${selectedTime}`);
    liff.closeWindow();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col justify-center items-center px-6 py-10">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 relative">
        {loading ? (
          <div className="animate-pulse flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2" />
            <div className="w-28 h-4 bg-gray-300 rounded" />
          </div>
        ) : (
          <div className="flex flex-col items-center mb-6">
            {pictureUrl && (
              <img
                src={pictureUrl}
                alt="profile"
                className="w-24 h-24 rounded-full mb-2 shadow-lg border-4 border-white -mt-14 z-10"
              />
            )}
            <h2 className="text-lg font-semibold text-gray-700">
              👋 สวัสดี {name || "..."}
            </h2>
          </div>
        )}

        <h1 className="text-2xl font-extrabold text-center text-green-600 mb-6 tracking-tight">
          🏸 จองสนามแบดมินตัน
        </h1>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              🏟 เลือกสนาม
            </label>
            <select
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full p-3 border rounded-xl bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">-- กรุณาเลือกสนาม --</option>
              {courts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              ⏰ เลือกเวลา
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 border rounded-xl bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">-- กรุณาเลือกเวลา --</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedCourt || !selectedTime}
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] active:scale-100 transition-transform disabled:opacity-50"
          >
            ✅ ยืนยันการจอง
          </button>
        </div>
      </div>
    </div>
  );
}
