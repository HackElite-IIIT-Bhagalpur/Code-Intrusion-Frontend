import Badge from "./Badge";

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD";

export default function DifficultyChip({ level }: { level: DifficultyLevel }) {
  const label = level.charAt(0) + level.slice(1).toLowerCase();

  const variant =
    level === "EASY" ? "success" : level === "MEDIUM" ? "warning" : "danger";

  return (
    <Badge variant={variant} className="uppercase text-center flex justify-center tracking-wide text-[11px] px-3 min-w-16 h-8">
      {label}
    </Badge>
  );
}
