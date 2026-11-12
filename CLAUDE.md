# CLAUDE.md - Truth, Peace and Love

Guidance for Claude Code working in this repository. This repository is public: keep anything private out of this file, the code, CHANGELOG.txt and commit messages.

## The site

"Truth, Peace and Love", strapline "Found in Jesus Christ": a gospel-focused Jekyll site by Carl H, published with GitHub Pages (legacy automatic build from the main branch; no Actions workflow file). Its aim is to bring readers to the living God through the gospel of the Lord Jesus Christ, whoever they are and whatever they believe today. Content comes first; the design serves it.

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
- Author's name: "Carl Hamblin" only for first-hand testimony and personal witness (My Story, and any future first-hand account of the Lord's dealings with Carl), byline and sign-offs alike. "Carl H" everywhere else: articles, posts, Confessions, catechisms, notes on how a piece was written, the Important note and sign-offs. "Carl R. S. Hamblin" only on the Copyright page. Past change-log entries that mention "Carl Hamblin" record history and are not changed.
- Quotations from occult, pagan or witchcraft sources are credited by author, title and site, but are not made into clickable links unless Carl has agreed.
- External links open in a new tab automatically (site JavaScript); no need to add target attributes.
- The Gospels use the Geneva Bible, 1599 edition, with modernised spelling (from a public domain eBible.org text). Do not alter the Gospel text unless asked.
- Every post and article ends with a worded note, in the text itself, saying what Carl did and what Claude did. Do not use dots, ratings or percentages for the role of AI.
- Never claim for any writing on this site a standing it does not have. It is a private Christian's witness, not a church's determination: acknowledge borrowings from the Westminster Standards or other writers plainly, but never describe site writing as standing in continuity with, or sharing the authority of, the Confessional standards or any church. Scripture alone establishes the truth; the site seeks only to bear witness to it.
- Every Confession or catechism must have "document: Confession" or "document: catechism" in its front matter. This prints the "Important note" at the top of the text (_includes/standing-note.html). Never remove it.
- Every article and post has a public change log in its front matter, newest first:
    changes:
      - version: "1.1"
        date: YYYY-MM-DD
        note: "What changed, as the reader would see it."
      - version: "1.0"
        date: YYYY-MM-DD
        note: "First published."
  First publication is 1.0; each published revision adds an entry at the top, version +0.1, in the SAME commit as the content change. Log any change to what the reader reads (wording, Scripture references, sections added or removed, corrections), not site-wide design changes. Notes use curly quotes and may use *italics*; never use straight double quotes inside a note.

## Design

- Typography only: no illustrations. Bold italic hashtag headings (#home, #gospels ...) in Inter: Inter Black Italic (900) for the wordmark and home-page title, Inter ExtraBold Italic (800) for the menu, buttons, back links, chapter lists and footer links; reading text in Source Serif 4; Gospel chapters one verse per line.
- Light colours by default (since v4.6), with a dark option and text-size - / + controls. Red is reserved for Scripture and the current-page menu marker, apart from the crimson heartbeat line (--ecg); the colour of every # is set by --hash in assets/css/style.css.
- The home-page title text is static. Do not add animation or colour cycling to it. The one exception is the heartbeat line (_includes/ecg.html), which crosses the title when the page opens and every 3 minutes; leave it as it is unless asked.
- Footer: the footer links (from _data/sections.yml), the VerseClick credit (unless a page sets verseclick: false), the eBible.org credit ("Gospel text from eBible.org, public domain.") on pages with bible: geneva, then one version line, "Version x.y | ©", the © linking to /copyright/. No name, year or licence text in the footer.

## Where things live

- _config.yml: site_version, front matter defaults (including ai_note), exclude list.
- _data/sections.yml: menu, home-page doors, lines under the doors and footer links. An entry appears only once its page exists.
- _data/ai_notes.yml: the one-line AI notes at the foot of pages, chosen by "ai_note:" (defaults in _config.yml). Only keys with wording in that file show a line: at present "post" (blog posts), "gospels" (the Gospels) and "story" (My Story). The default key "standard" has no wording, so most pages show no line; "ai_note: none" also turns it off.
- _layouts/ (default, page, section, article, home, post) and _includes/.
- _includes/whatsnew.html: the home-page #whatsnew list shows posts, and pages with "date:" in their front matter, from the past month. Give new pages a "date:" line so they appear there.
- Text size: the reading-text size steps are listed in two places, the script at the foot of _layouts/default.html and the script in its <head>. Change both together. The <head> list deliberately leaves out 1, the normal size.
- TPL Accordion Style (since v4.5; named in v6.0): the house style for long, structured documents such as Confessions and catechisms, and for any long article or post Carl asks for "in the TPL Accordion Style". Write main sections as raw HTML in the .md file: <details class="part" id="short-id"><summary><h2>Heading</h2></summary> ... </details>, and subsections or questions as <details class="head" id="..."> with an <h3> in the summary. Subsection headings are regular weight. A leading paragraph number is written <span class="para-no">1.</span> followed by a space and the heading text; a catechism question is written <span class="para-no q-no">Q. 1.</span> followed by a space and the question, with ids q-1, q-2 and so on. Keep each <details> block free of blank lines, and write the content inside as HTML, because Markdown is not processed there (*italic* becomes <em>, lists become <ul> or <ol>); type LORD plainly. When converting an existing page, keep the ids kramdown gave its old ## headings, so existing links still work, and check by script that the wording is unchanged. The #open all / #close all buttons are added automatically; do not write them in the page. On article pages, headings inside accordions do not get the automatic #. The CSS rules and the script are marked "TPL Accordion Style" in assets/css/style.css and _layouts/default.html.
- Posts: front matter gives the title (in double quotes if it contains a colon) and the text does not repeat it as a heading. "sections:" lists the section pages that should show the post.
- Pages awaiting Carl's approval carry "published: false".
- CHANGELOG.txt is kept in the repository but excluded from the built site, as is this file.

## Text for Carl to review

Long lines in the terminal can be garbled when Carl copies them: characters are lost where lines wrap. Long prompts pasted into the terminal can also be cut off. So:

1. Whenever Carl needs to read, check or paste on more than a line or two of text (passages of content, full questions, diffs), don't rely on the terminal output alone. Also put the text on the Windows clipboard using PowerShell, keeping UTF-8 so that curly quotes and apostrophes survive. For example:
   [Console]::OutputEncoding = [Text.Encoding]::UTF8; Get-Content -Raw -Encoding UTF8 <file> | Set-Clipboard
   For a diff or extracted passage, write it to a temporary UTF-8 file outside the repository first, then copy that file to the clipboard in the same way. Tell Carl when the text is on the clipboard.
2. After any edit made from text Carl has supplied, compare the result automatically, character for character, against the intended text (allowing for straight quotes becoming curly), and report whether it matched exactly. Don't ask Carl to check by eye alone.
3. If a prompt from Carl seems to stop mid-sentence or mid-step, it has probably been cut off when pasted. Say so, do only the steps that arrived complete, and ask for the rest rather than guessing. Carl may send long prompts as a text file instead (for example in his Downloads folder); read and follow it as if he had typed it.
4. Carl often pastes your replies into another chat for checking, and copying them from the terminal garbles them. So at the end of every reply that reports work done or asks Carl for a decision, also put the whole reply on the Windows clipboard, in UTF-8 as in point 1, and end the reply with the line "(This reply is on your clipboard.)". Keep the clipboard text exactly the same as the reply shown in the terminal.
