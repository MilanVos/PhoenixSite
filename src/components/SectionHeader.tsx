interface SectionHeaderProps {
  number: string;
  title: string;
}

export default function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-4 mb-16">
      <span className="text-sm font-mono text-muted">{number}</span>
      <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground">
        {title}
      </h2>
    </div>
  );
}
