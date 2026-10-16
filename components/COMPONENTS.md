# Components

One section per component. Each matches a component set in the Figma library; the `device` prop stands in for the Figma `Device` property.

## ArchiveHero

Top of a listing page (Best of Shows, Collections, Art Walks), with the last-updated date.

**Figma:** `Section: Archive Hero`.

**Props:** `type` (best-of, collection, art-walk), `title`, `text`, `updated`.

## BestOfDrop

The yellow Best of Shows badge used on featured shows.

**Figma:** `Best of Drop`.

**Props:** `device` (desktop; tablet and mobile share the smaller size).

The word "of" is set light in Figma; it needs Forno's light weight to match.

## Button

The standard action button: Primary, Secondary, Accent, Has Icon, Link, and Reset, across Desktop and Mobile.

**Figma:** `Button` set, properties `Device` (Desktop, Mobile), `Style` (Primary, Secondary, Accent, Has Icon, Link, Reset), `Status` (Default, Hover).

### When to use
- **Accent** (`surface-accent`) for the one main action in a view.
- **Secondary** (`surface-black`) for strong supporting actions.
- **Primary** (black outline) for everything else; **Has Icon** when an icon makes the action clearer, such as viewing on the map.
- **Link** for low-emphasis actions like "View all".
- **Reset** clears filters and turns yellow on hover.

### Behaviour
Desktop buttons are 58px tall with a 3px border inside the shape. On hover, Primary, Secondary, Accent, and Link gain a trailing arrow; Has Icon fills black. Mobile buttons are 40px tall with a 2px border outside the shape, and have no hover arrow. Text uses `button-text` (Bold 670, 16/20 desktop, 14/20 mobile).

### What the consumer supplies
The label, `onClick`, and `device`. `status="hover"` only forces the hover look for previews. The old names `ghost`, `black`, and `ghost-icon` still work and map to `primary`, `secondary`, and `has-icon`.

## CardBestOfShows

Card for a Best of Shows pick: image with category strip and optional closing flash, then ID, title, dates, venue, and blurb.

**Figma:** `Card / Best of Shows`.

**Props:** `device`, `image`, `flash` (closed, last-day, final-week, or none), `title`, `area`, `venue`, `text`.

## CardCollection

Card for a Collection: image carousel with venue tab and arrows, then ID, title, blurb, and count.

**Figma:** `Card / Collection`.

**Props:** `device`, `image`, `venue`, `title`, `text`, `count`.

## CardMap

Card shown beside the map (Best of layout). Includes status and the street address.

**Figma:** `Card / Map`.

**Props:** `device`, `image`, `title`, `text`, `address`.

Figma also has Big Map, Collection, Art Walk, and XL layouts of this card; only the Best of layout is built here so far.

## CardWalk

Card for an Art Walk: image, ID, title, blurb, and stops and duration.

**Figma:** `Card / Walk`.

**Props:** `device`, `image`, `title`, `area`, `text`, `stops`.

## ClosingFlash

A small uppercase label that warns a show is ending: Closed, Last day, or Final week.

**Figma:** `Closing Flash` set, properties `Device` (Desktop, Tablet, Mobile), `Text` (Closed, Last Day, Final Week).

### When to use
On Best of Shows cards and show pages, pinned to the image. Closed and Last day use `surface-accent` with `text-black`; Final week uses `category-exhibitions` with `text-white`.

### What the consumer supplies
The `kind`, derived from the show's end date, and `device`. The text can be overridden with children.

## Crumbs

Breadcrumb trail. The last item is the current page.

**Figma:** `Crumbs`.

**Props:** `device`, `items` (array).

## ExternalLink

Outbound link with an icon: website, Instagram, or directions.

**Figma:** `External Link`.

**Props:** `device`, `type` (website, insta, directions), `href`, children for the text.

## FilterDropdown

The neighbourhood picker above lists and the map. Shows the current choice with a chevron.

**Figma:** `Filter Dropdown`.

**Props:** `device` (desktop, mobile), `onClick`, children for the label.

## FilterTag

Pill-shaped toggles for filtering lists and the map by neighbourhood or place type.

**Figma:** `Filter Tag` set, properties `Device` (Desktop, Mobile), `Type` (All, Add, Filter, Active), `Status` (Default, Hover, Active).

### When to use
- **All** resets the filter group; it is black when active.
- **Add** adds a filter value (with a plus).
- **Active** is an applied filter value, black with a cross to remove it.
- **Filter** opens the filter panel; when filters are applied it shows a count.

### What the consumer supplies
The label, the `status` that reflects the current filter state, `count` for the Filter type, and `onClick`. The tag sets `aria-pressed` from its status.

### Notes
On mobile the Filter type has a white border in Figma, so it reads as borderless. Tags are 40px tall on desktop and 36px on mobile, using `button-text`.

## Footer

Site footer: brand statement, links, the Walk with us newsletter sign-up, and the legal row. On mobile the sign-up comes first.

**Figma:** `Footer`.

**Props:** `device` (desktop, mobile; tablet uses desktop), `blurb`, `year`.

## FormField

Single text input, used for the newsletter sign-up. The border thickens when the field is focused or selected (4px desktop, 3px mobile).

**Figma:** `Form Field`.

**Props:** `device`, `label` (optional, shown above), `placeholder`, `selected`, `type`.

## ID

The uppercase type and area line above titles, e.g. GALLERY • LOWER EAST SIDE. The dot takes the category colour.

**Figma:** `ID`.

**Props:** `device`, `type`, `area`, `category` (art-spaces, exhibitions, guides, other-places…).

## List

Bulleted list for body content.

**Figma:** `List / ul`.

**Props:** `device`, `items` (array of strings).

## Logo

Beholdr logos: the NYC lockup used in the header, and the mark used in the footer. Both are the exported Figma artwork.

**Figma:** `Logos`.

**Props:** `variant` (nyc, mark), `width`.

## MapFilterBar

Mobile-only bar that sits over the map: a locate-me button on the left and the Filter tag on the right.

**Figma:** `M_Map filter bar`.

**Props:** `count` (applied filters), `onLocate`, `onFilter`.

## MapZoom

Zoom controls on the map, with an optional recentre button.

**Figma:** `Map Zoom`.

**Props:** `central` (adds recentre), `category` (icon colour), `onZoomIn`, `onZoomOut`, `onCentre`.

## Navigation

Site header. Desktop has the full menu and search; mobile has the logo, search, saved, and the menu button.

**Figma:** `Navigation`.

**Props:** `device` (desktop, mobile), `links`, `crumbs` (array; adds the breadcrumb row).

## PageHero

Top of a detail page. A coloured rule marks the type: Art Venue (purple), Best of (blue), Art Walk (green).

**Figma:** `Section: Page Hero`.

**Props:** `device` (desktop, tablet), `type` (art-venue, best-of, art-walk), `kind`, `area`, `title`, `text`, `footer` (node; defaults to Venue Hours).

## Pagination

Page navigation for long lists. The current page is black.

**Figma:** `Pagination`.

**Props:** `pages` (array of labels, "..." for gaps), `current`.

## Quote

Pull quote with attribution. Name and organisation are links.

**Figma:** `Quote`.

**Props:** `device`, children for the quote, `author`, `role`, `org`.

## ShowDate

Start and end date of a show, month over day. With no end date it reads END / TBA.

**Figma:** `Show Date`.

**Props:** `device`, `start` `{month, day}`, `end` `{month, day}` or `null`.

## SliderIndicator

Dot indicator for carousels; the current slide is the hollow dot, as in Figma.

**Figma:** `Slider / Indicator`.

**Props:** `device`, `total`, `current` (0-based).

## SliderNav

Previous and next buttons for carousels. Overlay sits on the image; Above spreads across the top on mobile.

**Figma:** `Slider / Nav`.

**Props:** `device`, `type` (overlay, above), `onPrev`, `onNext`.

## SliderNavCounter

Carousel arrows with a position counter (1/12). Arrows take the category colour.

**Figma:** `Slider / NavCounter`.

**Props:** `device`, `current`, `total`, `category`, `onPrev`, `onNext`.

## Venue

Map marker plus venue name. Underlined when it links somewhere.

**Figma:** `Venue`.

**Props:** `device`, `href` (makes it a link), children for the name.

## VenueHours

Opening status with a link to location and hours. Open shows a green dot, Closed a black dot with the next opening, and Between Shows uses the Closed flash.

**Figma:** `Venue Hours`.

**Props:** `device`, `status` (open, closed, between-shows), `href`, children to override the status text.

The softened "Usually open" wording is deliberate: hours data is hand-maintained.

## ViewToggle

Mobile switch between list and map views. The active option is black.

**Figma:** `M_View Toggle`.

**Props:** `active` (list, map), `onChange`.

## WalkDuration

Walking time between two stops on an Art Walk.

**Figma:** `Walk Duration`.

**Props:** `device` (desktop, mobile), children for the text.

## WalkStops

Stops and duration for an Art Walk, with the walking icon.

**Figma:** `Walk Stops + Duration`.

**Props:** `device`, `border` (outlined icon box), children for the text.

