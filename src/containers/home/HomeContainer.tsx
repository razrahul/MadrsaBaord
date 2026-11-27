import { useState } from 'react'
import { AffiliationSection } from '@/components/home/AffiliationSection'
import { ExaminationSection } from '@/components/home/ExaminationSection'
import { GallerySection } from '@/components/home/GallerySection'
import { HeroSection } from '@/components/home/HeroSection'
import { LeadershipSection } from '@/components/home/LeadershipSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { ThemeSwitcher } from '@/components/home/ThemeSwitcher'
import { UpdatesSection } from '@/components/home/UpdatesSection'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import {
  boardUpdates,
  examPrograms,
  galleryAlbums,
  heroSlides,
  leaders,
  serviceItems,
} from '@/data/home-data'
import type { UpdateCategory } from '@/types/home'

export function HomeContainer() {
  const [activeCategory, setActiveCategory] = useState<UpdateCategory>('Notices')

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main id="main-content">
        <HeroSection slides={heroSlides} />
        <ServicesSection services={serviceItems} />
        <section
          className="bg-surface-muted py-6"
          aria-label="Board leadership and public updates"
        >
          <div className="site-shell grid grid-cols-1 items-center gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <LeadershipSection leaders={leaders} />
            <UpdatesSection
              updates={boardUpdates}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>
        <GallerySection albums={galleryAlbums} />
        <ExaminationSection programs={examPrograms} />
        <AffiliationSection />
      </main>
      <SiteFooter />
      <ThemeSwitcher />
    </div>
  )
}
