# Deeksha Sinha — engineering portfolio

A dependency-free static portfolio for GitHub Pages. No build step, package installation, API keys, or external fonts are required.

## Preview

From the repository directory:

```sh
python3 -m http.server 8765
```

Open http://localhost:8765. Hash routes expose Home, Experience, Projects, Education, Skills & certifications, and About. Browser back/forward and direct project links work. Original `#top`, `#work`, and `#stack` links remain supported. Without JavaScript, all content remains readable as a document.

## Edit

- `index.html`: content, project cards, career entries, metadata, and structured data.
- `styles.css`: theme tokens, layout, responsive breakpoints, print, and reduced-motion styles.
- `theme.js`: initial theme preference, applied before page paint.
- `script.js`: routing, navigation, project filters, and persistent theme toggle.
- `Deeksha_Sinha_Resume.pdf`: original résumé, preserved without modification.
- `assets/`: organized directories and instructions for approved future media.

Edit the HTML directly; there is no generated-source dependency. Match a project's `data-category` tokens to `data-filter` values (`ai`, `distributed`, `ml`). Use the native `details`/`summary` structure for experience entries. Keep outcome figures tied to the supplied résumé or another confirmed source.

## Content decisions

All existing projects, their repository links, engineering domains, contact links, and the résumé are retained. The résumé supplies role dates, non-AWS outcomes, undergraduate education, certifications, and community roles. The supplied brief supplies the new positioning and information architecture.

AWS website copy intentionally stays at a broad technical level. The existing downloadable résumé is unchanged and contains more detailed AWS descriptions; review those descriptions for public release before replacing or redistributing the PDF.

Employer and community names are typography, not unofficial logos. The Northeastern initial is a typographic treatment, not an official seal. Project diagrams are labeled conceptual architecture and are not screenshots or verified implementation schematics.

## Still useful to add

- Approved headshot, university and internship photos.
- Real project screenshots, demos, videos, or architecture diagrams.
- Public repository/demo URLs for Skier Tracking and Bundle Recommendation.
- Certification credential URLs, validity dates, and permitted official badges.
- Approved company/community brand assets, if desired.
- Updated graduation status after the expected Fall 2026 completion.

No empty image slots, fake links, invented credentials, or placeholder performance measurements are displayed.

## Deploy

Push the finished commit to `main` in `DeekshaSinha05/DeekshaSinha05.github.io`. GitHub Pages should publish from `main` / repository root. `.nojekyll` keeps the static files untouched. Confirm the live site at https://deekshasinha05.github.io/ after deployment.

## Manual verification

Test 320, 390, 768, 1024, and 1440 pixel widths; both themes; all six routes; filters; keyboard menu/escape; disclosure controls; direct project links; back/forward; résumé download; reduced motion; and readable no-JavaScript content. External links open a new tab with `noopener noreferrer`.
