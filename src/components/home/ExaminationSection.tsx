import { BookOpen, CheckCircle2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ExamProgram } from '@/types/home'
import { useTranslations } from '@/utils/i18n'
import { SectionHeading } from './SectionHeading'

interface ExaminationSectionProps {
  programs: ExamProgram[]
}

export function ExaminationSection({ programs }: ExaminationSectionProps) {
  const t = useTranslations()

  return (
    <section
      id="examination"
      className="bg-surface-muted py-7"
      aria-labelledby="examination-title"
    >
      <div className="site-shell">
        <SectionHeading
          id="examination-title"
          title={t.examination.title}
          description={t.examination.description}
        />

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {programs.map((program) => {
            const localized =
              t.examination.programs[program.id as keyof typeof t.examination.programs]
            const level = localized?.level ?? program.level
            const duration = localized?.duration ?? program.duration
            const name = localized?.name ?? program.name
            const secondaryName = localized?.secondaryName ?? program.nameHindi
            const description = localized?.description ?? program.description
            const subjects = localized?.subjects ?? program.subjects
            const equivalentTo = localized?.equivalentTo ?? program.equivalentTo

            return (
              <Card
                key={program.id}
                className="flex h-full flex-col gap-0 overflow-hidden rounded-lg border border-line/55 bg-surface py-0 shadow-[0_1px_3px_rgb(16_35_63_/_5%)] ring-0 transition-colors hover:border-brand/45"
              >
                <CardHeader className="gap-1.5 border-b border-line/50 bg-surface px-5 pt-4.5 pb-3.5!">
                  <span className="text-xs font-medium text-ink-soft">
                    {level} · {duration}
                  </span>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <CardTitle className="font-serif text-xl leading-tight font-bold text-ink">
                      {name}
                    </CardTitle>
                    <span className="text-[15px] font-semibold text-brand">{secondaryName}</span>
                  </div>
                  <CardDescription className="m-0 text-[13.5px] leading-snug text-ink-soft">
                    {description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col px-5 py-4">
                  <div className="flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                      <BookOpen size={13} aria-hidden="true" />
                      {t.examination.keySubjects}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {subjects.map((subject) => (
                        <span
                          key={subject}
                          className="rounded-sm bg-surface-muted/80 px-2 py-0.5 text-xs font-medium text-ink"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="mt-auto flex items-start gap-2 border-t border-line/50 bg-surface-muted/40 px-5 py-3!">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-brand-strong"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block text-[11px] font-medium text-ink-soft">
                      {t.examination.equivalentTo}
                    </span>
                    <strong className="block text-[13.5px] leading-snug font-semibold text-brand-strong">
                      {equivalentTo}
                    </strong>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
