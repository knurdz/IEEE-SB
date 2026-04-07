import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  highlight?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

function renderTitle(title: string, highlight?: string) {
  if (!highlight || !title.includes(highlight)) {
    return title;
  }

  const [before, ...rest] = title.split(highlight);
  const after = rest.join(highlight);

  return (
    <>
      {before}
      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
        {highlight}
      </span>
      {after}
    </>
  );
}

export default function SectionHeading({
  badge,
  title,
  description,
  highlight,
  align = "center",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCentered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {badge ? (
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-primary">
          {badge}
        </span>
      ) : null}

      <h2
        className={cn(
          "text-4xl font-semibold tracking-tight md:text-6xl",
          titleClassName,
        )}
      >
        {renderTitle(title, highlight)}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-sm leading-7 md:text-base",
            isCentered ? "mx-auto" : "",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
