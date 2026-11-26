import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, FolderOpen, Images, X } from 'lucide-react'
import { SectionWave } from '@/components/common/SectionWave'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { GalleryAlbum } from '@/types/home'
import { SectionHeading } from './SectionHeading'

interface GallerySectionProps {
  albums: GalleryAlbum[]
}

interface ModalState {
  albumIndex: number | null
  imageIndex: number
}

export function GallerySection({ albums }: GallerySectionProps) {
  const [modal, setModal] = useState<ModalState>({ albumIndex: null, imageIndex: 0 })
  const closeRef = useRef<HTMLButtonElement>(null)

  const activeAlbum = modal.albumIndex !== null ? albums[modal.albumIndex] : null
  const activeImages = activeAlbum ? activeAlbum.images : []
  const currentImage = activeImages[modal.imageIndex]

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
    if (modal.albumIndex !== null) closeRef.current?.focus()
  }, [modal.albumIndex])

  useEffect(() => {
    if (modal.albumIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [modal.albumIndex, goTo])

  return (
    <>
      <section
        id="gallery"
        className="content-section gallery-section section-wave-host"
        aria-labelledby="gallery-title"
      >
        <SectionWave variant="alt" />
        <div className="site-shell section-wave-content">
          <SectionHeading
            id="gallery-title"
            eyebrow="Activities & Gallery"
            title="Programmes & Event Albums"
            description="Select any programme folder to view its photographs."
          />

          <div className="gallery-albums-grid">
            {albums.map((album, idx) => {
              const cover = album.images[0]
              if (!cover) return null
              return (
                <button
                  key={album.id}
                  type="button"
                  className="gallery-album-trigger"
                  onClick={() => openAlbum(idx)}
                  aria-label={`Open ${album.title} album (${album.images.length} photos)`}
                >
                  <Card className="gallery-album-card">
                    <div className="gallery-album-thumb">
                      <img
                        src={cover.src}
                        alt={cover.alt}
                        loading="lazy"
                        width={cover.width}
                        height={cover.height}
                      />
                      <Badge variant="overlay" className="gallery-album-count">
                        <Images size={12} aria-hidden="true" />
                        {album.images.length} Photos
                      </Badge>
                      <span className="gallery-album-hover" aria-hidden="true">
                        <FolderOpen size={24} />
                        <span>Open Album</span>
                      </span>
                    </div>

                    <CardContent className="gallery-album-meta">
                      <h3 className="gallery-album-title">{album.title}</h3>
                      {album.date && <span className="gallery-album-date">{album.date}</span>}
                    </CardContent>
                  </Card>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Album Lightbox Modal */}
      {activeAlbum && currentImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeAlbum.title} image viewer`}
          className="gallery-modal-backdrop"
        >
          <div className="gallery-modal-topbar">
            <div className="gallery-modal-heading">
              <FolderOpen size={18} aria-hidden="true" />
              <span>{activeAlbum.title}</span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={closeModal}
              aria-label="Close image viewer"
              className="gallery-modal-close"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>

          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous image"
              className="gallery-modal-nav gallery-modal-nav--prev"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
          )}

          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="gallery-modal-img"
          />

          <div className="gallery-modal-footer">
            {currentImage.caption && (
              <p className="gallery-modal-caption">{currentImage.caption}</p>
            )}
            <p aria-live="polite" className="gallery-modal-counter">
              {modal.imageIndex + 1} / {activeImages.length}
            </p>
          </div>

          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next image"
              className="gallery-modal-nav gallery-modal-nav--next"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </>
  )
}
