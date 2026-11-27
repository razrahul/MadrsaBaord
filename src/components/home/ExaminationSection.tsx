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
      className="content-section exam-section"
      aria-labelledby="examination-title"
    >
      <div className="site-shell">
        <SectionHeading
          id="examination-title"
          eyebrow={t.examination.eyebrow}
          title={t.examination.title}
          description={t.examination.description}
        />

        <div className="exam-grid">
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
              <Card key={program.id} className="exam-card">
                <CardHeader className="exam-card-header">
                  <span className="exam-meta-line">
                    {level} · {duration}
                  </span>
                  <div className="exam-title-row">
                    <CardTitle className="exam-title">{name}</CardTitle>
                    <span className="exam-title-hi">{secondaryName}</span>
                  </div>
                  <CardDescription className="exam-description">
                    {description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="exam-card-body">
                  <div className="exam-subjects-block">
                    <span className="exam-subjects-label">
                      <BookOpen size={13} aria-hidden="true" />
                      {t.examination.keySubjects}
                    </span>
                    <div className="exam-subjects-list">
                      {subjects.map((subject) => (
                        <span key={subject} className="exam-subject-tag">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="exam-card-footer">
                  <CheckCircle2 size={15} className="exam-equiv-icon" aria-hidden="true" />
                  <div>
                    <span className="exam-equiv-label">{t.examination.equivalentTo}</span>
                    <strong className="exam-equiv-value">{equivalentTo}</strong>
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
