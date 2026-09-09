import {
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  Handshake,
  Languages,
  type LucideIcon,
  Scale,
  Settings2,
  Users,
} from 'lucide-react';

/**
 * Structure lives here (which items exist, their icons + links); the localized
 * strings live in `src/messages/*.json` keyed by `id`. Long-form content moves to
 * MDX collections from Sprint 4.
 */

export type Pillar = { id: string; icon: LucideIcon; href: string };

export const pillars: readonly Pillar[] = [
  { id: 'research', icon: BookOpen, href: '/research' },
  { id: 'consultancy', icon: Scale, href: '/services' },
  { id: 'training', icon: GraduationCap, href: '/training' },
];

export type Department = { id: string; icon: LucideIcon };

/** The 6 administrative units (AR names verbatim — docs/research/02). */
export const departments: readonly Department[] = [
  { id: 'training', icon: GraduationCap },
  { id: 'research', icon: BookOpen },
  { id: 'consultancy', icon: Scale },
  { id: 'translation', icon: Languages },
  { id: 'arbitration', icon: Scale },
  { id: 'technical', icon: Settings2 },
];

export type AudiencePath = { id: string; href: string; icon: LucideIcon };

export const audiencePaths: readonly AudiencePath[] = [
  { id: 'trainee', href: '/training', icon: GraduationCap },
  { id: 'researcher', href: '/research', icon: BookOpen },
  { id: 'organization', href: '/services', icon: Users },
];

// Featured programs now come from the `programs` content collection
// (src/lib/content/programs.ts) — see getFeaturedPrograms().

export type Service = { id: string; icon: LucideIcon };

/** The 7 services (docs/research/02). Order is meaningful. */
export const services: readonly Service[] = [
  { id: 'research', icon: BookOpen },
  { id: 'consultancy', icon: Handshake },
  { id: 'arbitration', icon: Scale },
  { id: 'translation', icon: Languages },
  { id: 'training', icon: GraduationCap },
  { id: 'conferences', icon: CalendarDays },
  { id: 'publishing', icon: FileText },
];
