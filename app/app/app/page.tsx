"use client";

import React, { useState } from "react";

export default function SurveyPage() {
  const [როლი, setროლი] = useState("კლინიკის ადმინისტრატორი / რეგისტრატორი");
  const [კლინიკის_ტიპი_ან_კონტექსტი, setკლინიკის_ტიპი_ან_კონტექსტი] = useState("");
  const [კვირაში_გაცდენები_და_სირთულე, setკვირაში_გაცდენები_და_სირთულე] = useState("");
  const [ახლანდელი_მართვა_და_პრობლემები, setახლანდელი_მართვა_და_პრობლემები] = useState("");
  const [Waitlist_სიმულაციის_სარგებლიანობა, setWaitlist_სიმულაციის_სარგებლიანობა] =
    useState("ძალიან დამეხმარებოდა");
  const [ელფოსტა_არასავალდებულო, setელფოსტა_არასავალდებულო] = useState("");
  const [თანხმობა, setთანხმობა] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          როლი,
          კლინიკის_ტიპი_ან_კონტექსტი,
          კვირაში_გაცდენები_და_სირთულე,
          ახლანდელი_მართვა_და_პრობლემები,
          Waitlist_სიმულაციის_სარგებლიანობა,
          ელფოსტა_არასავალდებულო,
          თანხმობა
        })
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setFeedback({ type: "error", text: result.error || "პასუხის გაგზავნა ვერ მოხერხდა." });
      } else {
        setFeedback({ type: "success", text: result.message || "პასუხი შენახულია!" });
        setკლინიკის_ტიპი_ან_კონტექსტი("");
        setკვირაში_გაცდენები_და_სირთულე("");
        setახლანდელი_მართვა_და_პრობლემები("");
        setელფოსტა_არასავალდებულო("");
        setთანხმობა(false);
      }
    } catch {
      setFeedback({ type: "error", text: "კავშირის შეცდომა. სცადეთ თავიდან." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="mb-6 pb-5 border-b border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
            კვლევა • Clinic No-Show &amp; Waitlist
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            კლინიკაში გაცდენილი ვიზიტების კვლევა
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            პასუხები ინახება კვლევის ცხრილში ანონიმური ანალიზისთვის. ელფოსტა მხოლოდ სურვილის შემთხვევაშია.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              როლი *
            </label>
            <select
              value={როლი}
              onChange={(e) => setროლი(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="კლინიკის ადმინისტრატორი / რეგისტრატორი">
                კლინიკის ადმინისტრატორი / რეგისტრატორი
              </option>
              <option value="ექიმი / სპეციალისტი">ექიმი / სპეციალისტი</option>
              <option value="კლინიკის მენეჯერი">კლინიკის მენეჯერი</option>
              <option value="პაციენტი">პაციენტი</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              კლინიკის ტიპი ან კონტექსტი
            </label>
            <input
              type="text"
              value={კლინიკის_ტიპი_ან_კონტექსტი}
              onChange={(e) => setკლინიკის_ტიპი_ან_კონტექსტი(e.target.value)}
              placeholder="მაგ: სტომატოლოგიური კლინიკა, ამბულატორია ან პაციენტის გამოცდილება"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              კვირაში გაცდენები და სირთულე *
            </label>
            <input
              type="text"
              required
              value={კვირაში_გაცდენები_და_სირთულე}
              onChange={(e) => setკვირაში_გაცდენები_და_სირთულე(e.target.value)}
              placeholder="როდის შეგექმნათ ბოლოს, რამდენად ხშირია და რა არის ყველაზე რთული?"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              ახლანდელი მართვა და პრობლემები *
            </label>
            <textarea
              required
              rows={3}
              value={ახლანდელი_მართვა_და_პრობლემები}
              onChange={(e) => setახლანდელი_მართვა_და_პრობლემები(e.target.value)}
              placeholder="ახლა როგორ აგვარებთ და რა არ მოგეწონათ არსებულ გადაწყვეტაში?"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              Waitlist სიმულაციის სარგებლიანობა *
            </label>
            <select
              value={Waitlist_სიმულაციის_სარგებლიანობა}
              onChange={(e) => setWaitlist_სიმულაციის_სარგებლიანობა(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ძალიან დამეხმარებოდა">ძალიან დამეხმარებოდა</option>
              <option value="ნაწილობრივ დამეხმარებოდა">ნაწილობრივ დამეხმარებოდა</option>
              <option value="ნაკლებად დამეხმარებოდა">ნაკლებად დამეხმარებოდა</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              ელფოსტა (არასავალდებულო)
            </label>
            <input
              type="email"
              value={ელფოსტა_არასავალდებულო}
              onChange={(e) => setელფოსტა_არასავალდებულო(e.target.value)}
              placeholder="example@domain.com"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <label className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={თანხმობა}
              onChange={(e) => setთანხმობა(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
            <span>
              ვეთანხმები პასუხის გამოყენებას სასწავლო კვლევის მიზნით (ნებართვის გარეშე პირადი კონტაქტები არ გასაჯაროვდება). *
            </span>
          </label>

          {feedback && (
            <div
              className={`rounded-xl px-4 py-3 text-sm ${
                feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {feedback.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-medium py-3 px-4 text-sm transition cursor-pointer"
          >
            {isSubmitting ? "იგზავნება..." : "პასუხის გაგზავნა"}
          </button>
        </form>
      </div>
    </main>
  );
}
