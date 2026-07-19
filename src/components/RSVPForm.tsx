import { useState } from "react";
import { Check, Send, X } from "lucide-react";

interface RSVPData {
  name: string;
  message: string;
  attending: "yes" | "no";
}

async function submitRSVP(_data: RSVPData): Promise<void> {
  await new Promise((r) => setTimeout(r, 900));
}

export function RSVPForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
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
      <section className="bg-ivory px-6 py-24 text-ink">
        <div className="mx-auto max-w-md rounded-2xl border border-ink/10 bg-paper p-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-burgundy text-ivory">
            <Check className="h-5 w-5" />
          </div>
          <p className="mt-6 font-script text-3xl text-burgundy">
            Thank you! Your message has been received 🤍
          </p>
        </div>
      </section>
    );
  }

  const inputCls =
    "mt-2 min-h-11 w-full rounded-md border border-ink/20 bg-paper px-4 py-3 font-serif-display text-base text-ink placeholder:text-ink/40 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/30";

  return (
    <section className="bg-ivory px-6 py-24 text-ink">
      <div className="mx-auto max-w-md text-center">
        {/* <p className="text-[10px] uppercase tracking-[0.5em] text-ink/50">
          Share your love, wishes, or a note for the happy couple!
        </p> */}
        <h2 className="mt-3 font-script text-6xl text-burgundy">Leave A Message</h2>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mx-auto mt-10 max-w-md space-y-6">
        <div>
          <label
            htmlFor="rsvp-name"
            className="text-[11px] uppercase tracking-[0.35em] text-ink/60"
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
          {errors.name && <p className="mt-1 text-xs text-burgundy">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="rsvp-message"
            className="text-[11px] uppercase tracking-[0.35em] text-ink/60"
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
          {errors.message && <p className="mt-1 text-xs text-burgundy">{errors.message}</p>}
        </div>

        <fieldset>
          <legend className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
            Will you be attending? *
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(["yes", "no"] as const).map((v) => (
              <label
                key={v}
                className={`flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-4 py-3 font-serif-display uppercase tracking-widest transition ${
                  attending === v
                    ? "border-burgundy bg-burgundy text-ivory"
                    : "border-ink/20 text-ink hover:border-burgundy/50"
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value={v}
                  checked={attending === v}
                  onChange={() => setAttending(v)}
                  className="sr-only"
                />
                {v}
              </label>
            ))}
          </div>
          {errors.attending && <p className="mt-1 text-xs text-burgundy">{errors.attending}</p>}
        </fieldset>

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-md border border-burgundy/40 bg-burgundy/10 px-3 py-2 text-sm text-burgundy">
            <X className="h-4 w-4" /> Something went wrong. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-6 py-3 font-serif-display uppercase tracking-[0.35em] text-ivory transition hover:bg-burgundy disabled:opacity-60"
        >
          {status === "loading" ? (
            "Sending..."
          ) : (
            <>
              <Send className="h-4 w-4" /> Send
            </>
          )}
        </button>
      </form>
    </section>
  );
}
