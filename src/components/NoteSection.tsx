import { wedding } from "@/data/wedding";

export function NoteSection() {
  return (
    <section className="bg-ivory px-6 pb-14 pt-20 text-ink">
      <div className="mx-auto max-w-md rounded-[22px] border border-[#b9b58d]/70 bg-[#edf0d9]/80 px-7 py-8 text-center shadow-[0_18px_45px_rgba(105,34,25,0.08)]">
        <h2 className="font-script text-5xl text-burgundy">Note</h2>
        <p
          lang="ar"
          dir="rtl"
          className="mt-6 whitespace-pre-line font-arabic text-base leading-loose text-[#6a312a]"
        >
          {wedding.noteAr}
        </p>
      </div>
    </section>
  );
}
