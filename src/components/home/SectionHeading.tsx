interface SectionHeadingProps {
  title: string
  description?: string
  id?: string
}

export function SectionHeading({ title, description, id }: SectionHeadingProps) {
  return (
    <div className="mb-5 max-w-2xl">
      <div className="mb-2 flex flex-col gap-1.5">
        <h2
          id={id}
          className="font-serif text-[clamp(1.4rem,2.3vw,1.9rem)] leading-tight font-bold tracking-tight text-ink"
        >
          {title}
        </h2>
        <span className="h-[2px] w-10 bg-brand-strong" aria-hidden="true" />
      </div>
      {description && <p className="m-0 text-sm leading-relaxed text-ink-soft">{description}</p>}
    </div>
  )
}
