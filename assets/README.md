# Portfolio media

Use only real, approved assets. Keep original high-resolution source material outside this repository; commit optimized web versions here.

- `portraits/`: headshots, e.g. `deeksha.webp`.
- `education/`: approved Northeastern photographs.
- `experience/`: approved workplace/internship photographs. Exclude internal screens, diagrams, or confidential material.
- `projects/`: project screenshots, GIFs, diagrams, video posters, and short demos.
- `certifications/`: official badges for earned credentials with appropriate usage rights.
- `communities/`: approved affiliation assets.
- `brand/`: personal favicon and future social preview artwork.

Replace a project's `<figure class="architecture ...">` block with:

```html
<figure class="project-media">
  <img
    src="assets/projects/hirely-screen.webp"
    alt="Describe the real interface and what the screenshot demonstrates"
    width="1200"
    height="750"
    loading="lazy"
    decoding="async"
  />
  <figcaption>Actual project screenshot · concise context</figcaption>
</figure>
```

For video use `<video controls playsinline preload="metadata" poster="...">` with a `<source>` and captions where applicable. Do not autoplay. Include a text explanation of architecture diagrams; do not convey essential meaning by color alone. Prefer WebP/AVIF and short MP4 clips over large GIFs. Keep filenames lowercase and descriptive.
