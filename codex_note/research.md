# Repository Research Report

## 1. What this repository is

This repository is a customized copy of the `al-folio` academic Jekyll theme. It is not a greenfield site implementation; it is a theme-based academic portfolio/blog/CV site whose source content, configuration, layouts, plugins, assets, and GitHub Actions are all already scaffolded by `al-folio`, then partially personalized for Tengyou Xu.

At a high level, the repo does four things:

1. Builds a static website with Jekyll and Liquid.
2. Uses structured data files for CV, publications, socials, repositories, venues, coauthors, and citations.
3. Ships many optional academic-site features out of the box: publications, blog, projects, teaching, dark mode, search, MathJax, bibliography search, image handling, repository cards, comments, analytics hooks, etc.
4. Automates deployment and some content generation through GitHub Actions, especially site deploy, citation refresh, and RenderCV PDF generation.

The repository is currently in a transitional state:

- Core identity has been changed to Tengyou Xu in several places.
- Many theme demo/sample datasets are still active.
- Several pages would currently render a mix of real personal content and upstream placeholder/example content.

## 2. Current repo state

The working tree is not clean. Local changes already exist in:

- `_config.yml`
- `_data/cv.yml`
- `_includes/header.liquid`
- `_pages/about.md`
- `_pages/blog.md`
- `_pages/cv.md`
- `_pages/dropdown.md`
- `_pages/profiles.md`
- `_pages/projects.md`
- `_pages/repositories.md`
- `_pages/teaching.md`
- `_sass/_cv.scss`

There are also untracked local assets:

- `assets/img/gf.jpg`
- `assets/pdf/cv.pdf`

And one tracked asset appears deleted locally:

- `assets/img/prof_pic_color.png`

This matters because the current generated site behavior should be understood as "theme + local customization in progress", not as a clean upstream checkout.

## 3. Source vs generated directories

The repository contains both source and generated/cache directories.

### Primary source directories

- `_pages/`: top-level site pages
- `_posts/`: blog posts
- `_projects/`: project entries
- `_news/`: announcements
- `_teachings/`: course pages
- `_books/`: bookshelf items
- `_layouts/`: page layouts
- `_includes/`: reusable Liquid partials
- `_sass/`: SCSS partials
- `_scripts/`: source JS/Liquid-generated JS
- `_plugins/`: custom Ruby plugins/filters/tags
- `_data/`: structured YAML data
- `_bibliography/`: BibTeX publications
- `assets/`: static assets

### Generated or derivative directories

- `_site/`: built site output; should be treated as generated
- `.jekyll-cache/`: Jekyll cache
- `.tweet-cache/`: Twitter plugin cache
- `assets/rendercv/rendercv_output/`: generated RenderCV artifacts

These generated directories are useful for inspection/debugging, but the real source of truth is the source tree above.

## 4. Build and runtime architecture

### Core stack

- Static site generator: Jekyll
- Templating: Liquid
- Content: Markdown + YAML + BibTeX + JSON
- Styling: SCSS compiled into `assets/css/main.css`
- Frontend behavior: plain JavaScript plus jQuery/Bootstrap/MDB and optional third-party libraries

### Dependency model

`Gemfile` defines the Jekyll runtime plus a large plugin set. Important ones:

- `jekyll-scholar`: publications
- `jekyll-paginate-v2`: blog pagination
- `jekyll-archives-v2`: archive pages
- `jekyll-jupyter-notebook`: notebook embedding
- `jekyll-minifier` + `jekyll-terser`: production optimization
- `jekyll-tabs`, `jekyll-toc`, `jekyll-twitter-plugin`, `jemoji`
- `jekyll-get-json`, `jekyll-socials`, `jekyll-link-attributes`, `jekyll-imagemagick`

`package.json` is intentionally small. Node is used mainly for formatting (`prettier`) and CSS cleanup (`purgecss` in workflows), not for a full frontend app build.

### Docker-first development

The repo strongly prefers Docker:

- `docker-compose.yml` mounts the repo into `/srv/jekyll`
- serves on port `8080`
- uses image `amirpourmand/al-folio:v0.16.3`
- sets `JEKYLL_ENV=development`

`Dockerfile` builds a Ruby slim image with:

- ImageMagick
- Node.js
- Python + `nbconvert`
- locale setup
- Bundler/Jekyll install

`bin/entry_point.sh` is notable:

- starts `bundle exec jekyll serve`
- watches `_config.yml`
- forcibly restarts Jekyll if `_config.yml` changes
- conditionally removes/restores `Gemfile.lock` depending on whether it is git-tracked

That restart-on-config-change behavior is a repo-specific convenience layer.

## 5. How a page is rendered

The rendering spine is:

1. Jekyll loads config from `_config.yml`
2. Jekyll loads collections, pages, posts, data files, bibliography, plugins
3. Layouts in `_layouts/` wrap page content
4. Includes in `_includes/` assemble shared UI pieces
5. SCSS in `assets/css/main.scss` imports the partials from `_sass/`
6. JS/CSS asset loading is controlled mostly by `_includes/head.liquid` and `_includes/scripts.liquid`

### Base layout chain

- `_layouts/default.liquid` is the main shell
  - injects `<head>` via `_includes/head.liquid`
  - injects nav via `_includes/header.liquid`
  - injects footer via `_includes/footer.liquid`
  - injects JS via `_includes/scripts.liquid`
  - optionally reserves a sidebar TOC area

Specialized layouts extend it:

- `about.liquid`
- `page.liquid`
- `post.liquid`
- `cv.liquid`
- `profiles.liquid`
- `course.liquid`
- `bib.liquid`
- `distill.liquid`

This means most site-wide behavior is centralized and inherited rather than duplicated.

## 6. Theme and styling system

The stylesheet entry point is `assets/css/main.scss`.

It imports:

- `variables`
- `themes`
- `layout`
- `typography`
- `navbar`
- `footer`
- `blog`
- `publications`
- `components`
- `utilities`
- `distill`
- `cv`
- `tabs`
- `teachings`
- `typograms`
- Font Awesome partials

Important details:

- `_sass/_variables.scss` defines design tokens, colors, widths, back-to-top sizing, etc.
- `_sass/_themes.scss` defines CSS custom properties for light and dark themes.
- The light theme accent is purple.
- The dark theme accent switches to cyan.
- `site.max_width` from `_config.yml` is injected into SCSS via `@use "variables" with (...)`.

Dark mode is not just CSS-only. `assets/js/theme.js` actively coordinates:

- theme persistence in `localStorage`
- syntax highlight theme swap
- Giscus theme sync
- search modal theme sync
- cookie consent theme sync
- calendar iframe background sync
- re-rendering/re-theming of Mermaid, diff2html, ECharts, Plotly, Vega-Lite, notebook tables, and medium-zoom overlay

This is a fairly feature-rich theme system, not a simple class toggle.

## 7. Header, nav, footer, and global UX behavior

### Header

`_includes/header.liquid` is important because it is not purely data-driven.

It always renders:

- About link
- A hardcoded `CV` navbar link pointing at `site.cv_pdf_link`

Then it renders any page with `nav: true`.

Current implication:

- Even if the CV page itself is not in nav, the navbar still shows a `CV` PDF link.
- The visible navigation is partly config-driven and partly hardcoded.

### Search

Search is enabled globally in `_config.yml`.

Implementation:

- `_scripts/search.liquid.js` generates `assets/js/search-data.js`
- `ninja-keys` provides the UI
- search indexes navigation pages, posts, all collection items, and socials

This means sample content left in `_posts`, `_projects`, `_news`, `_books`, `_teachings`, or `_data/socials.yml` directly pollutes search results.

### Footer

`_includes/footer.liquid` shows:

- copyright line from site identity
- custom footer text
- optional impressum
- optional `Last updated: <today>`

Because `last_updated: true`, the footer always shows the current build date, not the last git commit date.

### Other global UX features currently enabled

From `_config.yml`, these are on:

- back to top
- fixed navbar
- fixed footer
- search
- bibliography search
- masonry
- math
- dark mode
- project categories
- medium zoom
- progress bar
- lazy-loaded images
- responsive WebP conversion via ImageMagick

These are off:

- analytics providers
- cookie consent
- navbar socials
- tooltips
- video embedding in publication cards
- Open Graph meta
- Schema.org meta

## 8. Content model

### Pages

The main site pages are in `_pages/`.

Important current pages:

- `about.md`: homepage
- `publications.md`: active in navbar
- `blog.md`: exists but `nav: false`
- `projects.md`: exists but `nav: false`
- `repositories.md`: exists but `nav: false`
- `cv.md`: exists but `nav: false`
- `teaching.md`: exists but `nav: false`
- `profiles.md`: exists but `nav: false`
- `books.md`: exists but `nav: false`
- `news.md`
- `dropdown.md`

Only `publications.md` currently has `nav: true`.

Combined with the hardcoded About + CV link in the header, the effective top nav is currently very minimal.

### Posts

`_posts/` is full of sample/demo content from upstream `al-folio`.

Examples include demo posts for:

- math
- code
- diagrams
- Jupyter
- bibliography
- giscus
- Disqus
- charts
- maps
- image galleries
- distill
- tabs
- Plotly

These are useful as living examples of supported features, but right now they also mean the site is effectively still shipping the theme demo blog.

### Projects

`_projects/` contains the stock `project 1` through `project 9` demo entries.

These are organized by `category: work` and `category: fun` and are rendered by `_pages/projects.md` using `_includes/projects.liquid` or `_includes/projects_horizontal.liquid`.

Currently this means the projects section is still a theme showcase, not a real portfolio.

### News

`_news/` contains stock announcements from the theme:

- inline short announcement
- longer announcement page
- another inline announcement

These are used on the homepage because `about.md` has announcements enabled.

### Teaching

`_teachings/` contains sample courses with real schedule structures, example instructor names, and placeholder PDFs/links.

These are rendered by:

- `_includes/courses.liquid` on the teaching index page
- `_layouts/course.liquid` on each course page

### Books

`_books/` contains the sample `The Godfather` entry.

### People

`_pages/profiles.md` still points to sample multi-profile content using `about_einstein.md` and `prof_pic.jpg`, and that page itself is excluded from the final site build via `_config.yml`.

This is an important specificity:

- `_pages/about_einstein.md` is excluded from build
- but `profiles.md` still references it

So the people page is currently a leftover example area rather than a valid site section.

## 9. Homepage customization status

`_pages/about.md` is one of the main personalized files.

What is already customized:

- name and bio are Tengyou-specific
- UCLA affiliation is present
- research interests are real
- selected publications section is enabled
- social section is enabled
- announcements section is enabled
- latest posts section is enabled
- profile image is set to `gf.jpg`

What is still theme-shaped or potentially inconsistent:

- address block still uses UCLA Engineering IV office formatting
- selected publications depend on the sample bibliography unless replaced
- announcements currently show sample news
- latest posts currently show sample theme posts

So the homepage will feel personalized at the top, but below that it currently mixes in demo sections.

## 10. CV system

This repo supports two CV systems simultaneously:

1. RenderCV-style YAML in `_data/cv.yml`
2. JSON Resume in `assets/json/resume.json`

### Actual active display path

The displayed CV page is controlled by `_pages/cv.md`:

- `layout: cv`
- `cv_format: rendercv`
- `cv_pdf: /assets/pdf/cv.pdf`

So the live CV page currently prefers RenderCV data from `_data/cv.yml`.

### How the layout works

`_layouts/cv.liquid` is more sophisticated than a simple template. It:

- decides whether to render RenderCV or JSON Resume
- normalizes both formats into the same visual card-based UI
- merges Experience + Volunteer into one section
- dispatches named sections to specialized partials under `_includes/cv/`

This is a unified renderer, not two separate layouts.

### Current state of the two data sources

#### `_data/cv.yml`

This is partially personalized:

- Tengyou Xu identity
- UCLA/Boston College education
- real-looking research roles
- one Tengyou-specific publication entry

But it still includes placeholders/sample leftovers:

- dummy Projects section
- dummy References section
- some formatting/spacing inconsistencies
- typo-like strings in publication metadata

#### `assets/json/resume.json`

This is still fully sample Einstein content.

Because `cv_format: rendercv`, it is not the currently selected display source, but it still exists in the repo and can confuse future maintenance.

### PDF pipeline specificity

There are two different PDF concepts in this repo:

1. The site’s public CV link points to `assets/pdf/cv.pdf`
2. The RenderCV GitHub Action generates files into `assets/rendercv/rendercv_output/`

This is a very important repo-specific nuance:

- the rendered CV output path is not the same path used by the navbar/page PDF link
- therefore RenderCV automation does not automatically become the user-facing PDF unless another step copies or syncs it

Current evidence suggests the site is using a manually provided `assets/pdf/cv.pdf`, while the RenderCV output directory still contains generated output named `Albert_Einstein_CV.pdf`.

That indicates the automation and the served PDF are presently decoupled.

## 11. Publications system

Publications are driven by:

- `_bibliography/papers.bib`
- `_layouts/bib.liquid`
- `_data/venues.yml`
- `_data/coauthors.yml`
- `_data/citations.yml`
- scholar config in `_config.yml`

### Rendering behavior

`_pages/publications.md` simply does:

- bibliography search include
- `{% bibliography %}`

The heavy logic lives in `_layouts/bib.liquid`, which handles:

- venue badges
- optional preview thumbnails
- self-author emphasis
- coauthor profile links
- author collapsing / "more authors"
- abstract / BibTeX / award / video reveal blocks
- PDF/code/slides/poster/website buttons
- altmetric / Dimensions / Google Scholar / InspireHEP badges

This is one of the most feature-dense parts of the repo.

### Current data state

The publication stack is still mostly the upstream Einstein demo:

- `_bibliography/papers.bib` is Einstein/sample data
- `site.scholar.last_name` and `first_name` in `_config.yml` are still set to Einstein
- `_data/venues.yml` and `_data/coauthors.yml` are sample/supporting demo data

This creates a major identity mismatch:

- the homepage and CV say Tengyou Xu
- the publications system still identifies Einstein as the "self" author
- selected papers on the homepage therefore come from sample Einstein BibTeX entries

### Citations file

`_data/citations.yml` is huge and clearly generated from the sample Google Scholar ID `qc6CJjYAAAAJ`, which belongs to the sample scholar profile used by the theme, not Tengyou.

This file is auto-maintained by workflow, but right now it is still sample data and would feed incorrect citation badges if the IDs match publications.

## 12. Socials and repositories

### Socials

`_data/socials.yml` is still largely placeholder/sample content.

Problems:

- `email: you@example.com`
- sample scholar ID
- sample InspireHEP ID
- sample custom social entry pointing to Albert Einstein site
- CV PDF path still points to `example_pdf.pdf`

Meanwhile real contact info lives in `_config.yml` via `contact_note`, not in `_data/socials.yml`.

Practical consequence:

- homepage contact block can look real because it uses `site.contact_note`
- social icon generation and search/social metadata still pull placeholder identities

### Repositories

`_data/repositories.yml` still contains:

- `torvalds`
- `alshedivat`
- sample popular repos

So the repositories page is currently an upstream demo page, not a Tengyou-specific showcase.

## 13. Blog architecture and current state

The blog index page in `_pages/blog.md` is well featured:

- supports pagination via `jekyll-paginate-v2`
- surfaces featured posts
- computes reading time
- renders tag/category chips
- supports redirects/external posts

External post ingestion is implemented by `_plugins/external-posts.rb`, which can:

- pull an RSS feed
- or ingest a hardcoded list of external URLs
- synthesize pseudo-post documents into the `posts` collection

And `_config.yml` currently has external sources configured for:

- Medium
- a Google Blog example post

So this repo can mix local posts and external posts into one blog stream.

Right now, because the local posts are still the theme demos, the blog behaves more like a feature gallery than a personal writing archive.

## 14. Teaching and calendar system

The teaching page enables `calendar: true` and includes:

- `_includes/calendar.liquid`
- `_includes/courses.liquid`

The Google Calendar embed is lazy/toggle-based:

- button initially hides the iframe
- iframe source is updated via theme-aware JS

Current placeholder issue:

- teaching page uses `calendar_id='test@gmail.com'`

So the calendar feature wiring is real, but the current data is placeholder/demo.

## 15. JavaScript architecture

This repo does not use React/Vue/etc. It uses:

- plain JS
- jQuery
- library-specific setup scripts
- Liquid-generated JS for search indexing

Patterns in `assets/js/`:

- one file per feature setup
- included conditionally from `_includes/scripts.liquid`
- many page features activated by frontmatter flags

Examples:

- `theme.js`: theme state and third-party re-theming
- `common.js`: publication toggles, notebook CSS injection, popovers, sidebar TOC
- `search-setup.js`: open search modal
- `calendar-setup.js`, `mathjax-setup.js`, `giscus-setup.js`, etc.

This is a classic progressively-enhanced static site architecture.

## 16. Custom Ruby plugins

The `_plugins/` directory contains lightweight but meaningful extensions:

- `file-exists.rb`
  - adds a Liquid tag to test whether a file exists
- `external-posts.rb`
  - synthesizes blog posts from RSS feeds or URLs
- `details.rb`
  - adds a `{% details %}` Liquid block for HTML `<details>`
- `hide-custom-bibtex.rb`
  - strips internal custom BibTeX fields from displayed BibTeX blocks
- `google-scholar-citations.rb`
  - fetches citation counts live from Google Scholar pages
- `inspirehep-citations.rb`
  - fetches citation counts from InspireHEP API
- `remove-accents.rb`
  - transliteration helper for coauthor matching

These plugins are narrowly scoped and closely tied to the theme’s academic use case.

## 17. Automation and CI/CD

### Deploy workflow

`.github/workflows/deploy.yml`:

- triggers on source changes to main/master
- patches `_config.yml` to set `giscus.repo` to the current repo
- installs ImageMagick and `nbconvert`
- runs `bundle exec jekyll build`
- runs `purgecss`
- deploys `_site` to GitHub Pages

This means production builds are optimized after Jekyll build, not during asset compilation.

### RenderCV workflow

`.github/workflows/render-cv.yml`:

- triggers when `_data/cv.yml` or RenderCV settings/design files change
- installs Python dependencies from `requirements.txt`
- runs `rendercv render`
- deletes generated `.typ`
- commits generated outputs back to the repo

Important nuance:

- it writes to `assets/rendercv/rendercv_output/`
- it does not directly update `assets/pdf/cv.pdf`

### Citation update workflow

`.github/workflows/update-citations.yml`:

- scheduled Monday/Wednesday/Friday
- runs `bin/update_scholar_citations.py`
- updates `_data/citations.yml`
- commits changes if the file changed

This workflow depends on `_data/socials.yml` for the Scholar user ID, so placeholder social config causes placeholder citation data.

### Quality workflows

There are workflows for:

- `prettier.yml`
- `broken-links.yml`
- `axe.yml`
- `codeql.yml`
- several image/deploy/support workflows

This repo has a mature CI envelope for a static site theme.

## 18. Development tooling and documentation layer

The repo is unusually well documented for a personal-site theme.

Top-level docs include:

- `README.md`
- `QUICKSTART.md`
- `INSTALL.md`
- `CUSTOMIZE.md`
- `FAQ.md`
- `TROUBLESHOOTING.md`
- `ANALYTICS.md`
- `SEO.md`

There are also AI-agent instruction layers:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/agents/customize.agent.md`
- `.github/agents/docs.agent.md`
- `.github/instructions/*.md`

This makes the repo not just a site source tree, but also a strongly guided maintenance environment.

## 19. Important repo-specific inconsistencies

These are the most consequential findings.

### Identity is split across systems

Real Tengyou-specific content exists in:

- `_config.yml`
- `_pages/about.md`
- `_data/cv.yml`

But placeholder identity still exists in:

- `_data/socials.yml`
- `_bibliography/papers.bib`
- `_config.yml` scholar self-author settings
- `_data/citations.yml`
- `assets/json/resume.json`
- `assets/rendercv/rendercv_output/Albert_Einstein_CV.pdf`

### The homepage is personalized, but its supporting sections are not

Homepage uses real bio text, but currently also shows:

- sample announcements
- sample selected publications
- sample latest blog posts

### The public CV PDF path is decoupled from the automated CV output path

- public site link: `assets/pdf/cv.pdf`
- automated RenderCV output: `assets/rendercv/rendercv_output/...`

### Search indexes sample content

Because search includes posts, collections, and socials, it currently exposes many sample/example entries.

### Teaching/calendar is wired correctly but placeholder-fed

- sample courses
- sample calendar email

### Repositories and socials are still demo data

These would misrepresent the owner if made visible.

## 20. What is actually personalized right now

The strongest personalized parts are:

- site title and name in `_config.yml`
- real contact note in `_config.yml`
- homepage biography in `_pages/about.md`
- RenderCV YAML in `_data/cv.yml`
- site URL `https://tengyoux297.github.io`
- local profile image `assets/img/gf.jpg`
- local CV PDF `assets/pdf/cv.pdf` (currently untracked)

Everything else is either partially personalized or still demo-heavy.

## 21. Practical mental model of how this repo works

The best way to think about the repo is:

- `al-folio` provides a powerful academic website framework.
- `_config.yml` turns features on/off and defines global behavior.
- `_pages/`, collections, and `_data/` provide content.
- `_layouts/` and `_includes/` decide how content becomes HTML.
- `assets/` provides static media and frontend behavior.
- GitHub Actions keep deploy/CV/citations moving automatically.

In this specific repository, the framework is intact and working, but content migration from demo data to Tengyou-specific data is incomplete. The repo is therefore best described as:

> a real personal academic site skeleton that already has Tengyou’s core identity and CV wired in, but still retains a large amount of upstream example content and sample automation data.

## 22. Highest-priority follow-up implications

If the goal is to make the live site coherent, the most impactful future cleanup targets would be:

1. Replace `_data/socials.yml` with real values.
2. Replace `_bibliography/papers.bib` and scholar self-author config.
3. Remove or replace sample posts/projects/news/teaching/books.
4. Decide whether `assets/pdf/cv.pdf` or RenderCV output is the canonical public CV PDF.
5. Replace repository sample data.
6. Clean up search-visible sample content.

Until then, the repo will continue to work technically, but the rendered site will present a hybrid of personal material and theme demo material.

