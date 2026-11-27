import { ArrowRight, FileText, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { usePreferences } from '@/app/PreferencesContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateCategories } from '@/data/home-data'
import type { BoardUpdate, UpdateCategory } from '@/types/home'
import { useTranslations } from '@/utils/i18n'

function splitDate(iso: string, locale: 'en' | 'hi'): { day: string; monthYear: string } {
  const date = new Date(iso)
  const loc = locale === 'hi' ? 'hi-IN' : 'en-IN'
  const day = date.toLocaleDateString(loc, { day: '2-digit' })
  const monthYear = date.toLocaleDateString(loc, { month: 'short', year: 'numeric' })
  return { day, monthYear }
}

const langLabel: Record<BoardUpdate['language'], string> = {
  hi: 'हिंदी',
  en: 'English',
  ur: 'اردو',
}

interface UpdatesSectionProps {
  updates: BoardUpdate[]
  activeCategory: UpdateCategory
  onCategoryChange: (category: UpdateCategory) => void
}

export function UpdatesSection({
  updates,
  activeCategory,
  onCategoryChange,
}: UpdatesSectionProps) {
  const { language } = usePreferences()
  const t = useTranslations()
  const [isPaused, setIsPaused] = useState(false)
  const filtered = updates.filter((u) => u.category === activeCategory)
  const activeCategoryLabel = t.updates.categories[activeCategory]

  const countByCategory = (cat: UpdateCategory) =>
    updates.filter((u) => u.category === cat).length

  const renderUpdateRow = (item: BoardUpdate, keySuffix = '') => {
    const title = language === 'hi' ? (item.titleHi ?? item.title) : (item.titleEn ?? item.title)
    const { day, monthYear } = splitDate(item.publishedAt, language)

    return (
      <li key={`${item.id}${keySuffix}`} className="notice-item">
        <a
          className="notice-row-link"
          href={item.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} (${day} ${monthYear})`}
        >
          <div className="notice-date-col" aria-hidden="true">
            <span className="notice-date-day">{day}</span>
            <span className="notice-date-my">{monthYear}</span>
          </div>

          <div className="notice-row-main">
            <span className="notice-item-title">{title}</span>
            {item.isNew && (
              <span className="notice-new-indicator">
                <span className="notice-new-dot" aria-hidden="true" />
                {t.updates.newBadge}
              </span>
            )}
          </div>

          <div className="notice-row-actions">
            <span className="notice-lang-chip">{langLabel[item.language]}</span>
            <span className="notice-file-cta">
              <FileText size={14} aria-hidden="true" />
              <span>{item.fileType ?? 'PDF'}</span>
            </span>
          </div>
        </a>
      </li>
    )
  }

  return (
    <div id="updates" className="updates-column" aria-labelledby="updates-title">
      <Tabs
        value={activeCategory}
        onValueChange={(value) => onCategoryChange(value as UpdateCategory)}
        className="gap-0"
      >
        <Card className="notice-board-card">
          <CardHeader className="notice-board-header">
            <div className="notice-board-title-row">
              <div className="notice-board-title-wrap">
                <CardTitle id="updates-title" className="notice-board-title">
                  {t.updates.title}
                </CardTitle>
                <span className="notice-title-rule" aria-hidden="true" />
              </div>

              <button
                type="button"
                className="notice-pause-btn"
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? t.updates.play : t.updates.pause}
                title={isPaused ? t.updates.play : t.updates.pause}
              >
                {isPaused ? (
                  <Play size={12} aria-hidden="true" />
                ) : (
                  <Pause size={12} aria-hidden="true" />
                )}
                <span>{isPaused ? t.updates.play : t.updates.pause}</span>
              </button>
            </div>

            <TabsList variant="line" className="update-tabs" aria-label={t.updates.title}>
              {updateCategories.map((category) => (
                <TabsTrigger key={category} value={category} className="update-tab-trigger">
                  <span>{t.updates.categories[category]}</span>
                  <span className="update-tab-count">({countByCategory(category)})</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent className="notice-board-body">
            {filtered.length === 0 ? (
              <div className="empty-state" role="tabpanel" aria-live="polite">
                <span className="empty-state-mark">{activeCategoryLabel.slice(0, 1)}</span>
                <h3>{t.updates.emptyTitle(activeCategoryLabel)}</h3>
                <p>{t.updates.emptyDescription}</p>
              </div>
            ) : (
              <div
                className={`notice-scroll-viewport ${isPaused ? 'is-paused' : ''}`}
                role="tabpanel"
                aria-label={`${activeCategoryLabel} list`}
              >
                <div className="notice-scroll-track">
                  <ul className="notice-list">{filtered.map((item) => renderUpdateRow(item))}</ul>
                  <ul className="notice-list" aria-hidden="true">
                    {filtered.map((item) => renderUpdateRow(item, '-dup'))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="notice-board-footer">
            <span>{t.updates.officialCount(filtered.length, activeCategoryLabel)}</span>
            <a href="#updates" className="notice-archive-link">
              <span>{t.updates.viewArchive}</span>
              <ArrowRight size={13} aria-hidden="true" />
            </a>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  )
}
