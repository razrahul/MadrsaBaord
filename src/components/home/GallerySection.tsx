import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, FolderOpen, Images } from 'lucide-react'
import { SectionWave } from '@/components/common/SectionWave'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { GalleryAlbum } from '@/types/home'
import { useTranslations } from '@/utils/i18n'
import { SectionHeading } from './SectionHeading'

interface GallerySectionProps {
  albums: GalleryAlbum[]
}

interface ModalState {
  albumIndex: number | null
  imageIndex: number
}

export function GallerySection({ albums }: GallerySectionProps) {
  const t = useTranslations()
  const [modal, setModal] = useState<ModalState>({ albumIndex: null, imageIndex: 0 })

  const activeAlbum = modal.albumIndex !== null ? albums[modal.albumIndex] : null
  const activeImages = activeAlbum ? activeAlbum.images : []
  const currentImage = activeImages[modal.imageIndex]

  const getAlbumText = (album: GalleryAlbum) =>
    t.gallery.albums[album.id as keyof typeof t.gallery.albums]

  const openAlbum = (albumIndex: number) => setModal({ albumIndex, imageIndex: 0 })
  const closeModal = () => setModal({ albumIndex: null, imageIndex: 0 })

  const goTo = useCallback(
    (dir: 1 | -1) =>
      setModal((m) => {
        if (m.albumIndex === null) return m
        const len = albums[m.albumIndex]?.images.length ?? 0
        if (len === 0) return m
        return { ...m, imageIndex: (m.imageIndex + dir + len) % len }
      }),
    [albums]
  )

  useEffect(() => {
    if (modal.albumIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [modal.albumIndex, goTo])

  const activeAlbumText = activeAlbum ? getAlbumText(activeAlbum) : undefined
  const activeAlbumTitle = activeAlbumText?.title ?? activeAlbum?.title
  const currentCaption =
    activeAlbumText?.captions[modal.imageIndex] ?? currentImage?.caption

  return (
    <>
      <section
        id="gallery"
        className="relative overflow-hidden bg-surface py-7"
        aria-labelledby="gallery-title"
      >
        <SectionWave variant="alt" />
        <div className="site-shell relative z-10">
          <SectionHeading
            id="gallery-title"
            title={t.gallery.title}
            description={t.gallery.description}
          />

          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
            {albums.map((album, idx) => {
              const cover = album.images[0]
              if (!cover) return null
              const localized = getAlbumText(album)
              const albumTitle = localized?.title ?? album.title
              const albumDate = localized?.date ?? album.date

              return (
                <button
                  key={album.id}
                  type="button"
                  className="group block w-full rounded-sm border-0 bg-transparent p-0 text-start"
                  onClick={() => openAlbum(idx)}
                  aria-label={`${t.gallery.openAlbum}: ${albumTitle} (${album.images.length} ${t.gallery.photosWord})`}
                >
                  <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-sm border border-line/55 bg-surface py-0 shadow-[0_1px_3px_rgb(16_35_63_/_5%)] ring-0 transition-colors duration-200 group-hover:border-brand/45 group-focus-visible:border-brand/45">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
                      <img
                        src={cover.src}
                        alt={cover.alt}
                        loading="lazy"
                        width={cover.width}
                        height={cover.height}
                        className="block size-full object-cover transition-transform duration-300 group-hover:scale-103"
                      />
                      <Badge
                        variant="overlay"
                        className="absolute top-2.5 right-2.5 rounded-xs border border-white/15 bg-brand-strong/85 text-white"
                      >
                        <Images size={12} aria-hidden="true" />
                        {album.images.length} {t.gallery.photosWord}
                      </Badge>
                      <span
                        className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-brand-strong/65 text-xs font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <FolderOpen size={22} />
                        <span>{t.gallery.openAlbum}</span>
                      </span>
                    </div>

                    <CardContent className="flex flex-col gap-1 px-4 py-3.5">
                      <h3 className="m-0 font-sans text-[14.5px] leading-snug font-bold text-ink transition-colors group-hover:text-brand-strong">
                        {albumTitle}
                      </h3>
                      {albumDate && (
                        <span className="text-xs font-medium text-ink-soft">{albumDate}</span>
                      )}
                    </CardContent>
                  </Card>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Accessible Base-UI Dialog Lightbox */}
      <Dialog
        open={Boolean(activeAlbum && currentImage)}
        onOpenChange={(open) => {
          if (!open) closeModal()
        }}
      >
        {activeAlbum && currentImage && (
          <DialogContent>
            <div className="absolute top-0 right-0 left-0 flex items-center justify-between px-5 py-3.5 text-white">
              <div className="inline-flex items-center gap-2">
                <FolderOpen size={18} aria-hidden="true" />
                <DialogTitle>{activeAlbumTitle}</DialogTitle>
              </div>
              <DialogClose aria-label={t.gallery.closeViewer} />
            </div>

            {activeImages.length > 1 && (
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label={t.gallery.prevImage}
                className="absolute top-1/2 left-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/15 text-white transition hover:bg-white/25"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
            )}

            <img
              src={currentImage.src}
              alt={currentCaption ?? currentImage.alt}
              className="max-h-[72vh] max-w-[88vw] rounded-sm object-contain"
            />

            <div className="mt-3.5 text-center">
              {currentCaption && (
                <p className="m-0 mb-1 text-sm text-white/90">{currentCaption}</p>
              )}
              <p aria-live="polite" className="m-0 text-xs text-white/55">
                {modal.imageIndex + 1} / {activeImages.length}
              </p>
            </div>

            {activeImages.length > 1 && (
              <button
                type="button"
                onClick={() => goTo(1)}
                aria-label={t.gallery.nextImage}
                className="absolute top-1/2 right-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/15 text-white transition hover:bg-white/25"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
