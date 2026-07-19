import { Sparkles } from "lucide-react";
import { wedding } from "@/data/wedding";

export function NoteSection() {
  return (
    <section className="bg-ink px-6 py-24 text-ivory">
      <div className="mx-auto max-w-md rounded-2xl border border-ivory/15 bg-ivory/5 p-8 text-center">
        <Sparkles className="mx-auto h-5 w-5 text-blush" strokeWidth={1.4} />
        <h2 className="mt-3 font-script text-5xl text-blush">Note</h2>
        <p
          lang="ar"
          dir="rtl"
          className="mt-6 whitespace-pre-line font-arabic text-base leading-loose text-ivory/90"
        >
          {wedding.noteAr}
        </p>
      </div>
    </section>
  );
}
