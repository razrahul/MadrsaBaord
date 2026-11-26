import { Bell, ExternalLink, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateCategories } from '@/data/home-data'
import type { BoardUpdate, UpdateCategory } from '@/types/home'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
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
  const [isPaused, setIsPaused] = useState(false)
  const filtered = updates.filter((u) => u.category === activeCategory)

  const renderUpdateRow = (item: BoardUpdate, keySuffix = '') => (
    <li key={`${item.id}${keySuffix}`} className="notice-item">
      <a
        className="notice-row-link"
        href={item.documentUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title} (${formatDate(item.publishedAt)}, opens in new tab)`}
      >
        <div className="notice-row-main">
          <div className="notice-item-title">
            {item.isNew && (
              <Badge variant={item.category === 'Notices' ? 'hot' : 'new'}>NEW</Badge>
            )}
            <span>{item.title}</span>
          </div>
          <div className="notice-row-meta">
            <span>{formatDate(item.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{langLabel[item.language]}</span>
            {item.fileType && (
              <>
                <span aria-hidden="true">·</span>
                <span className="notice-filetype">{item.fileType}</span>
              </>
            )}
          </div>
        </div>
        <span className="notice-view-icon" aria-hidden="true">
          <ExternalLink size={14} />
        </span>
      </a>
    </li>
  )

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
              <div className="notice-board-heading">
                <span className="notice-board-icon" aria-hidden="true">
                  <Bell size={16} />
                </span>
                <CardTitle id="updates-title" className="notice-board-title">
                  Notice Board
                </CardTitle>
              </div>

              <button
                type="button"
                className="notice-pause-btn"
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? 'Resume notice auto-scroll' : 'Pause notice auto-scroll'}
                title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              >
                {isPaused ? (
                  <Play size={12} aria-hidden="true" />
                ) : (
                  <Pause size={12} aria-hidden="true" />
                )}
                <span>{isPaused ? 'Play' : 'Pause'}</span>
              </button>
            </div>

            <TabsList variant="line" className="update-tabs" aria-label="Public update categories">
              {updateCategories.map((category) => (
                <TabsTrigger key={category} value={category} className="update-tab-trigger">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent className="notice-board-body">
            {filtered.length === 0 ? (
              <div className="empty-state" role="tabpanel" aria-live="polite">
                <span className="empty-state-mark">{activeCategory.slice(0, 1)}</span>
                <h3>No {activeCategory.toLowerCase()} published yet.</h3>
                <p>
                  Once verified content is available, it will be listed here with date, document
                  type, and a secure view/download link.
                </p>
              </div>
            ) : (
              <div
                className={`notice-scroll-viewport ${isPaused ? 'is-paused' : ''}`}
                role="tabpanel"
                aria-label={`${activeCategory} list`}
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
            <span>
              {filtered.length} {activeCategory.toLowerCase()}
            </span>
            <span>Hover to pause</span>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  )
}
