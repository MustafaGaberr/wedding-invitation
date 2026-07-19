import { wedding } from "@/data/wedding";

export function NoteSection() {
  return (
    <section className="bg-ivory px-6 pb-14 pt-20 text-ink">
      <div className="mx-auto max-w-md rounded-[22px] border border-burgundy/14 bg-[#e8aaa5]/10 px-7 py-8 text-center shadow-[0_20px_48px_rgba(34,35,28,0.12),inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-2xl">
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
