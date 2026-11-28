import { ArrowRight, FileText, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { usePreferences } from '@/app/PreferencesContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Chip } from '@/components/ui/chip'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateCategories } from '@/data/home-data'
import { cn } from '@/lib/utils'
import type { BoardUpdate, UpdateCategory } from '@/types/home'
import { useTranslations } from '@/utils/i18n'

function splitDate(iso: string, locale: 'en' | 'hi' | 'ur'): { day: string; monthYear: string } {
  const date = new Date(iso)
  const loc = locale === 'hi' ? 'hi-IN' : locale === 'ur' ? 'ur-IN' : 'en-IN'
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
    const title =
      language === 'hi'
        ? (item.titleHi ?? item.title)
        : language === 'ur'
          ? (item.titleUr ?? item.title)
          : (item.titleEn ?? item.title)
    const { day, monthYear } = splitDate(item.publishedAt, language)

    return (
      <li key={`${item.id}${keySuffix}`} className="border-b border-line/40">
        <a
          className="group grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-3 px-4 py-3 text-inherit no-underline transition-colors hover:bg-surface-muted/40 sm:grid-cols-[4.25rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-5 sm:py-3.5"
          href={item.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} (${day} ${monthYear})`}
        >
          <div className="flex flex-col leading-none" aria-hidden="true">
            <span className="font-serif text-[18px] font-bold text-ink">{day}</span>
            <span className="mt-1 text-[11px] font-normal text-ink-soft">{monthYear}</span>
          </div>

          <div className="flex min-w-0 flex-col justify-center gap-1">
            <span className="text-[14px] leading-snug font-medium text-ink transition-colors group-hover:text-brand-strong">
              {title}
            </span>
            {item.isNew && (
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-wider text-brand-strong uppercase">
                <span className="size-1.5 rounded-full bg-brand-strong" aria-hidden="true" />
                {t.updates.newBadge}
              </span>
            )}
          </div>

          <div className="col-start-2 flex shrink-0 items-center justify-start gap-3 sm:col-start-auto">
            <Chip className="rounded-xs border-line/55 bg-surface-muted/35 text-ink-soft">
              {langLabel[item.language]}
            </Chip>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-strong underline-offset-2 group-hover:underline">
              <FileText size={13} aria-hidden="true" />
              <span>{item.fileType ?? 'PDF'}</span>
            </span>
          </div>
        </a>
      </li>
    )
  }

  return (
    <div id="updates" className="flex h-full flex-col" aria-labelledby="updates-title">
      <Tabs
        value={activeCategory}
        onValueChange={(value) => onCategoryChange(value as UpdateCategory)}
        className="h-full gap-0"
      >
        <Card className="h-full gap-0 overflow-hidden rounded-sm border border-line/45 bg-surface py-0 shadow-[0_1px_3px_rgb(16_35_63_/_5%)] ring-0">
          <CardHeader className="shrink-0 gap-0 bg-surface p-0!">
            <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-2.5">
              <div className="flex flex-col gap-1.5">
                <CardTitle
                  id="updates-title"
                  className="font-serif text-[19px] leading-tight font-bold tracking-tight text-ink"
                >
                  {t.updates.title}
                </CardTitle>
                <span className="h-0.5 w-10 bg-brand-strong" aria-hidden="true" />
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7.5 rounded-sm! border-line/60 bg-surface px-3 text-xs font-medium text-ink-soft shadow-none hover:border-brand/40 hover:bg-surface-muted/50 hover:text-ink focus-visible:ring-1"
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
              </Button>
            </div>

            <TabsList
              variant="line"
              className="w-full justify-start gap-4 overflow-visible border-b border-line/55 bg-surface px-4 sm:gap-7 sm:px-5"
              aria-label={t.updates.title}
            >
              {updateCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="-mb-px inline-flex items-baseline gap-1.5 rounded-none border-b-2 border-transparent px-1 py-2.5 text-[13.5px] font-semibold text-ink-soft transition-colors outline-none! hover:text-ink focus-visible:bg-surface-muted/50 focus-visible:ring-0! focus-visible:outline-none! data-[state=active]:border-brand-strong data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-brand-strong"
                >
                  <span>{t.updates.categories[category]}</span>
                  <span className="text-[11px] font-normal text-ink-soft/80">
                    ({countByCategory(category)})
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent className="p-0!">
            {filtered.length === 0 ? (
              <div className="grid place-items-center p-6 text-center" role="tabpanel" aria-live="polite">
                <span className="mb-3 grid size-12 place-items-center rounded-full bg-accent-soft font-serif text-xl font-bold text-brand">
                  {activeCategoryLabel.slice(0, 1)}
                </span>
                <h3 className="mb-1.5 text-lg font-bold text-ink">
                  {t.updates.emptyTitle(activeCategoryLabel)}
                </h3>
                <p className="m-0 max-w-md text-sm text-ink-soft">{t.updates.emptyDescription}</p>
              </div>
            ) : (
              <div
                className={cn(
                  'notice-scroll-viewport relative h-84 overflow-hidden',
                  isPaused && 'is-paused'
                )}
                role="tabpanel"
                aria-label={`${activeCategoryLabel} list`}
              >
                <div className="notice-scroll-track">
                  <ul className="m-0 list-none p-0">
                    {filtered.map((item) => renderUpdateRow(item))}
                  </ul>
                  <ul className="m-0 list-none p-0" aria-hidden="true">
                    {filtered.map((item) => renderUpdateRow(item, '-dup'))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-auto flex items-center justify-between border-t border-line/45 bg-surface-muted/35 px-5 py-2.5! text-xs text-ink-soft">
            <span>{t.updates.officialCount(filtered.length, activeCategoryLabel)}</span>
            <a
              href="#updates"
              className="inline-flex items-center gap-1 font-semibold text-brand-strong no-underline transition-colors hover:underline"
            >
              <span>{t.updates.viewArchive}</span>
              <ArrowRight size={13} aria-hidden="true" className="rtl:rotate-180" />
            </a>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  )
}
