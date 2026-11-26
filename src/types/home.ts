import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  isExternal: boolean
  isLive: boolean
}

export type UpdateCategory = 'Notices' | 'Tenders' | 'Proformas'

export interface BoardUpdate {
  id: string
  category: UpdateCategory
  title: string
  publishedAt: string // ISO 8601
  documentUrl: string
  language: 'hi' | 'en' | 'ur'
  isExternal?: boolean
  fileType?: 'PDF' | 'DOC' | 'DOCX' | 'XLS'
  isNew?: boolean
}

export interface Leader {
  id: string
  name: string
  designation: string
  imageUrl: string
  profileUrl?: string
  displayOrder: number
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export interface GalleryAlbum {
  id: string
  title: string
  date?: string
  images: GalleryImage[]
}

export interface HeroSlide {
  id: string
  imageUrl: string
  imageAlt: string
  eyebrow: string
  title: string
  description: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
}

export interface ExamProgram {
  id: string
  name: string
  nameHindi: string
  level: string
  duration: string
  description: string
  subjects: string[]
  equivalentTo: string
}

export interface StatItem {
  id: string
  label: string
  value: string
  note?: string
}
