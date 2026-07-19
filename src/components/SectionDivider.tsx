import { Leaf } from "lucide-react";

export function SectionDivider({ tone = "ivory" }: { tone?: "ivory" | "ink" }) {
  const color = tone === "ivory" ? "text-ink/40" : "text-ivory/40";
  const line = tone === "ivory" ? "bg-ink/20" : "bg-ivory/20";
  return (
    <div className={`flex items-center justify-center gap-3 py-8 ${color}`}>
      <span className={`h-px w-16 ${line}`} />
      <Leaf className="h-4 w-4" strokeWidth={1.2} />
      <span className={`h-px w-16 ${line}`} />
    </div>
  );
}
