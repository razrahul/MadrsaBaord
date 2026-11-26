import { useState } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { UpdatesSection } from '@/components/home/UpdatesSection'
import { LeadershipSection } from '@/components/home/LeadershipSection'
// import { StatsSection } from '@/components/home/StatsSection'
import { GallerySection } from '@/components/home/GallerySection'
import { ExaminationSection } from '@/components/home/ExaminationSection'
import { AffiliationSection } from '@/components/home/AffiliationSection'
import { ThemeSwitcher } from '@/components/home/ThemeSwitcher'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import type { UpdateCategory } from '@/types/home'
import {
  boardUpdates,
  examPrograms,
  galleryAlbums,
  heroSlides,
  leaders,
  serviceItems,
  // statItems,
} from '@/data/home-data'

export function HomeContainer() {
  const [activeCategory, setActiveCategory] = useState<UpdateCategory>('Notices')

  return (
    <div className="app-page">
      <SiteHeader />
      <main id="main-content">
        <HeroSection slides={heroSlides} />
        <ServicesSection services={serviceItems} />
        <section className="content-section leadership-updates-section" aria-label="Board leadership and public updates">
          <div className="site-shell leadership-updates-grid">
            <LeadershipSection leaders={leaders} />
            <UpdatesSection
              updates={boardUpdates}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>
        {/* <StatsSection stats={statItems} /> */}
        <GallerySection albums={galleryAlbums} />
        <ExaminationSection programs={examPrograms} />
        <AffiliationSection />
      </main>
      <SiteFooter />
      <ThemeSwitcher />
    </div>
  )
}
