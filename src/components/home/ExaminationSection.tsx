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
import { SectionHeading } from './SectionHeading'

interface ExaminationSectionProps {
  programs: ExamProgram[]
}

export function ExaminationSection({ programs }: ExaminationSectionProps) {
  return (
    <section
      id="examination"
      className="content-section exam-section"
      aria-labelledby="examination-title"
    >
      <div className="site-shell">
        <SectionHeading
          id="examination-title"
          eyebrow="परीक्षा एवं समकक्षता"
          title="Examination Programmes"
          description="BSMEB conducts three core board examinations recognised across academic and government institutions."
        />

        <div className="exam-grid">
          {programs.map((program) => (
            <Card key={program.id} className="exam-card">
              <CardHeader className="exam-card-header">
                <span className="exam-meta-line">
                  {program.level} · {program.duration}
                </span>
                <div className="exam-title-row">
                  <CardTitle className="exam-title">{program.name}</CardTitle>
                  <span className="exam-title-hi">{program.nameHindi}</span>
                </div>
                <CardDescription className="exam-description">
                  {program.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="exam-card-body">
                <div className="exam-subjects-block">
                  <span className="exam-subjects-label">
                    <BookOpen size={13} aria-hidden="true" />
                    Key Subjects
                  </span>
                  <div className="exam-subjects-list">
                    {program.subjects.map((subject) => (
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
                  <span className="exam-equiv-label">Equivalent to</span>
                  <strong className="exam-equiv-value">{program.equivalentTo}</strong>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
