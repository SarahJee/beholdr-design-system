export type Device = 'desktop' | 'tablet' | 'mobile';

export interface IconProps { name: 'map' | 'arrow-right' | 'plus' | 'cross' | 'filter'; size?: number; className?: string }

export interface ButtonProps {
  /** Matches the Figma Device property. Button has Desktop and Mobile. */
  device?: 'desktop' | 'mobile';
  /** Figma Style: Primary, Secondary, Accent, Has Icon, Link, Reset. */
  variant?: 'primary' | 'secondary' | 'accent' | 'has-icon' | 'link' | 'reset';
  /** Forces the hover look for previews; real hover works on its own. */
  status?: 'default' | 'hover';
  /** Icon for the has-icon style. Defaults to map. */
  icon?: IconProps['name'];
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children?: string;
}

export interface FilterTagProps {
  device?: 'desktop' | 'mobile';
  type?: 'all' | 'add' | 'filter' | 'active';
  status?: 'default' | 'hover' | 'active';
  /** Number of applied filters, shown on an active Filter tag. */
  count?: number;
  onClick?: () => void;
  className?: string;
  children?: string;
}

export interface ClosingFlashProps {
  device?: Device;
  kind?: 'closed' | 'last-day' | 'final-week';
  className?: string;
  children?: string;
}

export type Category = 'art-spaces' | 'exhibitions' | 'guides' | 'other-places' | 'eat-drink' | 'shop' | 'relax' | 'stay' | 'neighborhoods';

export interface LogoProps { variant?: 'nyc' | 'mark'; width?: number }
export interface FilterDropdownProps { device?: 'desktop' | 'mobile'; onClick?: () => void; children?: string }
export interface MapFilterBarProps { count?: number; onLocate?: () => void; onFilter?: () => void }
export interface ViewToggleProps { active?: 'list' | 'map'; onChange?: (v: 'list' | 'map') => void }
export interface FormFieldProps { device?: 'desktop' | 'mobile'; label?: string; placeholder?: string; selected?: boolean; type?: string; value?: string }
export interface IDProps { device?: Device; type?: string; area?: string; category?: Category }
export interface ShowDateProps { device?: Device; start?: { month: string; day: string }; /** null shows END / TBA */ end?: { month: string; day: string } | null }
export interface VenueProps { device?: Device; href?: string; children?: string }
export interface ExternalLinkProps { device?: 'desktop' | 'mobile'; type?: 'website' | 'insta' | 'directions'; href?: string; children?: string }
export interface VenueHoursProps { device?: Device; status?: 'open' | 'closed' | 'between-shows'; href?: string; children?: string }
export interface BestOfDropProps { device?: Device }
export interface WalkStopsProps { device?: Device; border?: boolean; children?: string }
export interface WalkDurationProps { device?: 'desktop' | 'mobile'; children?: string }
export interface QuoteProps { device?: 'desktop' | 'mobile'; author?: string; role?: string; org?: string; children?: string }
export interface ListProps { device?: 'desktop' | 'mobile'; items?: string[] }
export interface CrumbsProps { device?: 'desktop' | 'mobile'; items?: string[] }
export interface NavigationProps { device?: 'desktop' | 'mobile'; links?: string[]; crumbs?: string[] }
export interface FooterProps { device?: 'desktop' | 'mobile'; blurb?: string; year?: string }
export interface SliderNavProps { device?: 'desktop' | 'mobile'; type?: 'overlay' | 'above'; onPrev?: () => void; onNext?: () => void }
export interface SliderNavCounterProps { device?: 'desktop' | 'mobile'; current?: number; total?: number; category?: Category; onPrev?: () => void; onNext?: () => void }
export interface SliderIndicatorProps { device?: 'desktop' | 'mobile'; total?: number; current?: number }
export interface PaginationProps { pages?: string[]; current?: string }
export interface MapZoomProps { central?: boolean; category?: Category; onZoomIn?: () => void; onZoomOut?: () => void; onCentre?: () => void }
export interface CardBestOfShowsProps { device?: Device; image?: string; flash?: 'closed' | 'last-day' | 'final-week'; title?: string; area?: string; venue?: string; text?: string }
export interface CardWalkProps { device?: Device; image?: string; title?: string; area?: string; text?: string; stops?: string }
export interface CardCollectionProps { device?: Device; image?: string; venue?: string; title?: string; text?: string; count?: string }
export interface CardMapProps { device?: 'desktop' | 'mobile'; image?: string; title?: string; text?: string; address?: string }
export interface PageHeroProps { device?: 'desktop' | 'tablet'; type?: 'art-venue' | 'best-of' | 'art-walk'; kind?: string; area?: string; title?: string; text?: string; footer?: unknown }
export interface ArchiveHeroProps { type?: 'best-of' | 'collection' | 'art-walk'; title?: string; text?: string; updated?: string }
