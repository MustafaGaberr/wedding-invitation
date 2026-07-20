import type { FormEvent } from "react";
import { useState } from "react";
import { Check, X } from "lucide-react";

interface RSVPData {
  name: string;
  message: string;
  attending: "yes" | "no";
}

async function submitRSVP(data: RSVPData): Promise<void> {
  const response = await fetch("/api/send-rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to send RSVP");
  }
}

export function RSVPForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!message.trim()) errs.message = "Please write a message.";
    if (!attending) errs.attending = "Let us know if you'll be there.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("loading");
    try {
      await submitRSVP({
        name: name.trim(),
        message: message.trim(),
        attending: attending as "yes" | "no",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="bg-ivory px-6 py-20 text-ink">
        <div className="mx-auto max-w-md rounded-[22px] border border-white/70 bg-white/55 p-10 text-center shadow-[0_24px_60px_rgba(105,34,25,0.12)] backdrop-blur-xl">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-burgundy text-ivory shadow-[0_0_24px_rgba(105,34,25,0.26)]">
            <Check className="h-5 w-5" />
          </div>
          <p className="mt-6 font-script text-3xl text-burgundy">وصلت للعريس بنجاح! عقبالكوا 🎉</p>
        </div>
      </section>
    );
  }

  const inputCls =
    "mt-2 min-h-11 w-full border-0 border-b border-[#6a312a]/45 bg-transparent px-1 py-3 text-center font-serif-display text-base text-ink placeholder:text-center placeholder:text-ink/35 focus:border-burgundy focus:outline-none";

  return (
    <section className="bg-ivory px-6 pb-20 pt-10 text-ink">
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-script text-6xl text-burgundy">Leave A Message</h2>
        <p className="mx-auto mt-6 max-w-xs font-serif-display text-base font-semibold uppercase leading-8 tracking-[0.08em] text-[#6a312a]">
          Share your love, wishes, or a note for the happy couple!
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mx-auto mt-12 max-w-sm space-y-3">
        <div className="rounded-[18px] border border-white/55 bg-white/28 px-4 py-4 text-center shadow-[0_18px_42px_rgba(34,35,28,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-2xl">
          <label
            htmlFor="rsvp-name"
            className="block font-serif-display text-sm font-bold uppercase tracking-[0.03em] text-ink"
          >
            Your name *
          </label>
          <input
            id="rsvp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={inputCls}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-center text-xs text-burgundy">{errors.name}</p>}
        </div>

        <div className="rounded-[18px] border border-white/55 bg-white/28 px-4 py-4 text-center shadow-[0_18px_42px_rgba(34,35,28,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-2xl">
          <label
            htmlFor="rsvp-message"
            className="block font-serif-display text-sm font-bold uppercase tracking-[0.03em] text-ink"
          >
            Write your congratulation *
          </label>
          <textarea
            id="rsvp-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            rows={4}
            className={inputCls}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className="mt-1 text-center text-xs text-burgundy">{errors.message}</p>
          )}
        </div>

        <div
          role="radiogroup"
          aria-labelledby="attending-label"
          className="rounded-[18px] border border-white/55 bg-white/28 px-4 py-5 text-center shadow-[0_18px_42px_rgba(34,35,28,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-2xl"
        >
          <p
            id="attending-label"
            className="font-serif-display text-sm font-bold uppercase tracking-[0.03em] text-ink"
          >
            Will you be attending? *
          </p>
          <div className="mt-5 flex items-center justify-center gap-7">
            <AttendanceOption
              value="yes"
              selected={attending === "yes"}
              onChange={setAttending}
              label="Yes"
            />
            <AttendanceOption
              value="no"
              selected={attending === "no"}
              onChange={setAttending}
              label="No"
            />
          </div>
          {errors.attending && (
            <p className="mt-1 text-center text-xs text-burgundy">{errors.attending}</p>
          )}
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-md border border-burgundy/40 bg-burgundy/10 px-3 py-2 text-sm text-burgundy">
            <X className="h-4 w-4" /> الرسالة موصلتش. جرب تاني بعد لحظة.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mx-auto flex min-h-11 w-28 items-center justify-center rounded-sm border border-ink/15 bg-white/45 px-5 py-3 font-serif-display text-sm font-semibold text-ink shadow-[0_14px_30px_rgba(34,35,28,0.08)] backdrop-blur-xl transition hover:border-burgundy/35 hover:bg-white/75 hover:text-burgundy disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

function AttendanceOption({
  value,
  selected,
  onChange,
  label,
}: {
  value: "yes" | "no";
  selected: boolean;
  onChange: (value: "yes" | "no") => void;
  label: string;
}) {
  const selectedClass =
    value === "yes"
      ? "border-[#2f6f4e]/40 bg-[#2f6f4e] text-[#fffdf8] shadow-[0_0_26px_rgba(47,111,78,0.42),inset_0_1px_0_rgba(255,255,255,0.2)]"
      : "border-[#9f2d2d]/40 bg-[#9f2d2d] text-[#fffdf8] shadow-[0_0_26px_rgba(159,45,45,0.42),inset_0_1px_0_rgba(255,255,255,0.2)]";

  return (
    <label
      className={`group relative grid h-20 min-w-32 cursor-pointer place-items-center rounded-md border px-4 transition duration-300 ${
        selected
          ? selectedClass
          : "border-white/45 bg-white/18 text-[#7d2820]/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] hover:border-burgundy/20 hover:bg-white/32 hover:text-burgundy"
      }`}
      aria-label={label}
    >
      <input
        type="radio"
        name="attending"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span
        className={`transition duration-300 ${
          selected
            ? "scale-105 drop-shadow-[0_0_18px_rgba(255,253,248,0.58)]"
            : "drop-shadow-none group-hover:scale-[1.03]"
        }`}
      >
        {value === "yes" ? <YesSvg /> : <NoSvg />}
      </span>
    </label>
  );
}

function YesSvg() {
  return (
    <svg
      width="95"
      height="50"
      viewBox="0 0 95 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M79.0206 19.0671C74.4052 18.961 74.1022 12.123 79.0206 11.8678H82.1982C90.0623 11.5759 90.0564 0.290122 82.1982 0.000965746H79.0206C70.3151 0.000965746 63.5541 7.09775 63.5541 15.4674C63.5541 23.9958 70.4923 30.9339 79.0206 30.9339C83.6368 31.0415 83.9386 37.8729 79.0206 38.1331H75.8431C67.9789 38.4251 67.9848 49.7108 75.8431 50H79.0206C99.6606 49.1642 99.3505 19.7589 79.0206 19.0671Z"
        fill="currentColor"
      />
      <path
        d="M27.6545 0.627551C24.725 -0.837216 21.1598 0.349869 19.6943 3.28098L15.4677 11.7334L11.2415 3.28138C9.77633 0.350267 6.21272 -0.838004 3.28121 0.627949C0.350091 2.09351 -0.837781 5.65752 0.627776 8.58863L9.53425 26.4016V44.0674C9.82617 51.9316 21.112 51.9256 21.4011 44.0674V26.402L30.308 8.58903C31.7735 5.65713 30.5861 2.09311 27.6545 0.627551Z"
        fill="currentColor"
      />
      <path
        d="M54.021 11.8678C61.8851 11.5759 61.8792 0.290122 54.021 0.000965746H41.31C38.0331 0.000965746 35.3765 2.65756 35.3765 5.9344V44.0666C35.3765 47.3434 38.0331 50 41.31 50H54.021C61.8851 49.7081 61.8792 38.4223 54.021 38.1331H47.2434V30.9339H49.7948C57.6589 30.642 57.653 19.3562 49.7948 19.0671H47.2434V11.8678H54.021Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NoSvg() {
  return (
    <svg
      width="76"
      height="50"
      viewBox="0 0 76 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M56.757 0.000772322C46.6962 0.000772322 38.1194 8.10743 38.1194 18.6384V31.3447C39.0878 56.1641 74.5315 55.9 75.3951 31.3511V18.6317C75.3947 8.35892 67.0338 0.000772322 56.757 0.000772322ZM63.5319 31.3514C63.1958 40.3114 50.3175 40.3265 49.9818 31.3451V18.6388C50.3199 9.62231 63.2148 9.70615 63.5319 18.6325V31.3514Z"
        fill="currentColor"
      />
      <path
        d="M24.991 0.000787431C21.7153 0.000787431 19.0596 2.65648 19.0596 5.9322V18.9255L11.2365 3.27967C10.0067 0.818924 7.24501 -0.472934 4.56876 0.159354C1.89132 0.791247 0 3.18121 0 5.9322V44.0514C0.291825 51.9129 11.5738 51.907 11.8628 44.0514V31.058L19.686 46.7043C20.2324 47.7977 22.4496 50.7456 26.3537 49.8242C29.0311 49.1923 30.9224 46.8024 30.9224 44.0514V5.9322C30.9224 2.65648 28.2667 0.000787431 24.991 0.000787431Z"
        fill="currentColor"
      />
    </svg>
  );
}
