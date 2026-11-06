# CLAUDE.md - Truth, Peace and Love

Guidance for Claude Code working in this repository. This repository is public: keep anything private out of this file, the code, CHANGELOG.txt and commit messages.

## The site

"Truth, Peace and Love", strapline "Found in Jesus Christ": a gospel-focused Jekyll site by Carl Hamblin, published with GitHub Pages (legacy automatic build from the main branch; no Actions workflow file). Its aim is to bring readers to the living God through the gospel of the Lord Jesus Christ, whoever they are and whatever they believe today. Content comes first; the design serves it.

## How Carl works

- Carl plans changes in a separate chat and pastes the agreed instructions here. Do exactly what an instruction asks. If something else looks wrong or could be improved, mention it rather than changing it.
- Before every commit, show the diff and wait for Carl's OK. When an instruction has several tasks (TASK 1, TASK 2 ...), make a separate commit for each, in order, each waiting for his OK.
- Use the commit Summary and Description given in the instruction.
- For code or design changes, bump site_version in _config.yml by 0.1 (it drives the footer "Version" line and the CSS cache-buster), and add a CHANGELOG.txt entry in the same commit, in the existing style. Small wording fixes need no version bump.
- Never delete, move or rename anything in _posts/ unless explicitly asked. Before committing, check git status for unexpected deletions.
- Never read, print, copy or change credentials, tokens or Git credential settings.
- When a convention in this file changes, Carl's instruction will say so; update this file in the same commit.

## Writing conventions (all site text)

- British English.
- Curly (typographic) quotation marks and apostrophes in site text. Straight ones only in code, front matter syntax, HTML attributes and Liquid.
- Scripture is quoted from the Authorised (King James) Version, keeping the translators' italic words in italics. Never quote Scripture from memory: use the exact text Carl supplies, and ask if it is missing.
- Verse ranges use a normal hyphen (Isaiah 46:9-10), never an en dash, so that VerseClick recognises them.
- Type LORD and KJV normally in capitals: the layout sets them in small capitals automatically. Avoid LORD or KJV in capitals inside web addresses.
- Dates: B.C. for pre-Christian dates; A.D. only before about A.D. 1500 or where a date could be mistaken for B.C.; later dates plain (1599, 2026); never BCE or CE.
- Say "LORD's Day" or "Holy Sabbath", not "Sunday". No references to Christmas, Easter or similar church-calendar observances.
- The author's name is "Carl Hamblin". "Carl R. S. Hamblin" is used only in copyright notices.
- Quotations from occult, pagan or witchcraft sources are credited by author, title and site, but are not made into clickable links unless Carl has agreed.
- External links open in a new tab automatically (site JavaScript); no need to add target attributes.
- The Gospels use the Geneva Bible, 1599 edition, with modernised spelling (from a public domain eBible.org text). Do not alter the Gospel text unless asked.

## Design

- Typography only: no illustrations. Bold italic hashtag headings (#home, #gospels ...) in Inter: Inter Black Italic (900) for the wordmark and home-page title, Inter ExtraBold Italic (800) for the menu, buttons, back links, chapter lists and footer links; reading text in Source Serif 4; Gospel chapters one verse per line.
- Dark colours by default, with a muted light option and text-size - / + controls. Red is reserved for Scripture and the current-page menu marker, apart from the crimson heartbeat line (--ecg); the colour of every # is set by --hash in assets/css/style.css.
- The home-page title text is static. Do not add animation or colour cycling to it. The one exception is the heartbeat line (_includes/ecg.html), which crosses the title when the page opens and every 3 minutes; leave it as it is unless asked.
- Footer: the footer links (from _data/sections.yml), the VerseClick credit (unless a page sets verseclick: false), the Geneva Bible credit on pages with bible: geneva, then one version line, "Version x.y | ©", the © linking to /copyright/. No name, year or licence text in the footer.

## Where things live

- _config.yml: site_version, front matter defaults (including ai_note), exclude list.
- _data/sections.yml: menu, home-page doors, lines under the doors and footer links. An entry appears only once its page exists.
- _data/ai_notes.yml, _data/ai_gauges.yml and _includes/ai-gauges.html: the "how this was written" notes and gauge dots.
- _layouts/ (default, page, section, article, home, post) and _includes/.
- _includes/whatsnew.html: the home-page #whatsnew list shows posts, and pages with "date:" in their front matter, from the past month. Give new pages a "date:" line so they appear there.
- Text size: the reading-text size steps are listed in two places, the script at the foot of _layouts/default.html and the script in its <head>. Change both together. The <head> list deliberately leaves out 1, the normal size.
- Posts: front matter gives the title (in double quotes if it contains a colon) and the text does not repeat it as a heading. "sections:" lists the section pages that should show the post; "gauges:" gives the AI figures.
- Pages awaiting Carl's approval carry "published: false".
- CHANGELOG.txt is kept in the repository but excluded from the built site, as is this file.
