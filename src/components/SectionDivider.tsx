export function SectionDivider({ tone = "ivory" }: { tone?: "ivory" | "ink" }) {
  const imageTone = tone === "ivory" ? "opacity-85" : "brightness-0 invert opacity-65";

  return (
    <div className="flex justify-center py-7" aria-hidden="true">
      <img
        src="/line.png"
        alt=""
        className={`h-auto w-56 max-w-full ${imageTone}`}
        loading="lazy"
      />
    </div>
  );
}
