import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const როლი = String(body.როლი || "").trim();
    const კლინიკის_ტიპი_ან_კონტექსტი = String(body.კლინიკის_ტიპი_ან_კონტექსტი || "").trim();
    const კვირაში_გაცდენები_და_სირთულე = String(body.კვირაში_გაცდენები_და_სირთულე || "").trim();
    const ახლანდელი_მართვა_და_პრობლემები = String(body.ახლანდელი_მართვა_და_პრობლემები || "").trim();
    const Waitlist_სიმულაციის_სარგებლიანობა = String(body.Waitlist_სიმულაციის_სარგებლიანობა || "").trim();
    const ელფოსტა_არასავალდებულო = String(body.ელფოსტა_არასავალდებულო || "").trim();
    const თანხმობა = Boolean(body.თანხმობა);

    if (
      !როლი ||
      !კვირაში_გაცდენები_და_სირთულე ||
      !ახლანდელი_მართვა_და_პრობლემები ||
      !Waitlist_სიმულაციის_სარგებლიანობა
    ) {
      return NextResponse.json(
        { ok: false, error: "გთხოვთ, შეავსოთ ყველა სავალდებულო ველი." },
        { status: 400 }
      );
    }

    if (!თანხმობა) {
      return NextResponse.json(
        { ok: false, error: "გთხოვთ, მონიშნოთ თანხმობის ველი." },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_EXEC_URL;
    const surveySecret = process.env.SURVEY_SECRET;

    if (!scriptUrl || !surveySecret) {
      return NextResponse.json(
        { ok: false, error: "სერვერის გარემოს ცვლადები არ არის კონფიგურირებული." },
        { status: 500 }
      );
    }

    const gsResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        საიდუმლო: surveySecret,
        როლი,
        კლინიკის_ტიპი_ან_კონტექსტი,
        კვირაში_გაცდენები_და_სირთულე,
        ახლანდელი_მართვა_და_პრობლემები,
        Waitlist_სიმულაციის_სარგებლიანობა,
        ელფოსტა_არასავალდებულო,
        თანხმობა
      })
    });

    const gsResult = await gsResponse.json().catch(() => ({}));

    if (!gsResponse.ok || !gsResult.ok) {
      return NextResponse.json(
        { ok: false, error: gsResult.error || "ცხრილში შენახვისას მოხდა შეცდომა." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { ok: true, message: "თქვენი პასუხი წარმატებით ჩაიწერა ცხრილში." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "მოთხოვნის გაგზავნისას მოხდა შეცდომა." },
      { status: 500 }
    );
  }
}
