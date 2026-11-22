/* Scripture references as plain links (v6.3).
   Loaded by _layouts/default.html only on touch screens (no mouse), where VerseClick is not loaded.
   Turns references such as John 3:16 into ordinary links to Blue Letter Bible (KJV) that open in a
   new tab on a real tap. Nothing is requested from any server while the page loads.
   Skips headings (h1-h4), existing links, code and scripts. Without JavaScript the references
   stay as plain text. */
(function () {
  "use strict";

  var BLB = "https://www.blueletterbible.org/kjv/";

  /* [BLB code, name shown to screen readers, numbered book (1, 2 or 3 = which one it can be; 0 = not numbered), names and abbreviations] */
  var BOOKS = [
    ["gen", "Genesis", 0, "Genesis Gen Ge Gn"],
    ["exo", "Exodus", 0, "Exodus Exod Exo Ex"],
    ["lev", "Leviticus", 0, "Leviticus Lev Lv"],
    ["num", "Numbers", 0, "Numbers Num Nu Nm Nb"],
    ["deu", "Deuteronomy", 0, "Deuteronomy Deut Deu Dt"],
    ["jos", "Joshua", 0, "Joshua Josh Jos Jsh"],
    ["jdg", "Judges", 0, "Judges Judg Jdg Jdgs Jg"],
    ["rth", "Ruth", 0, "Ruth Rut Ru"],
    ["1sa", "1 Samuel", 1, "Samuel Sam Sa Sm"],
    ["2sa", "2 Samuel", 2, "Samuel Sam Sa Sm"],
    ["1ki", "1 Kings", 1, "Kings Kgs Ki Kin"],
    ["2ki", "2 Kings", 2, "Kings Kgs Ki Kin"],
    ["1ch", "1 Chronicles", 1, "Chronicles Chron Chr Ch"],
    ["2ch", "2 Chronicles", 2, "Chronicles Chron Chr Ch"],
    ["ezr", "Ezra", 0, "Ezra Ezr"],
    ["neh", "Nehemiah", 0, "Nehemiah Neh"],
    ["est", "Esther", 0, "Esther Esth Est"],
    ["job", "Job", 0, "Job Jb"],
    ["psa", "Psalm", 0, "Psalms Psalm Psa Ps Pss Psm"],
    ["pro", "Proverbs", 0, "Proverbs Prov Pro Prv Pr"],
    ["ecc", "Ecclesiastes", 0, "Ecclesiastes Eccles Eccl Ecc Ec"],
    ["sng", "Song of Solomon", 0, "Song of Solomon|Song of Songs|Song|Songs|Canticles|Cant|SOS"],
    ["isa", "Isaiah", 0, "Isaiah Isa"],
    ["jer", "Jeremiah", 0, "Jeremiah Jer"],
    ["lam", "Lamentations", 0, "Lamentations Lam"],
    ["eze", "Ezekiel", 0, "Ezekiel Ezek Eze Ezk"],
    ["dan", "Daniel", 0, "Daniel Dan Dn"],
    ["hos", "Hosea", 0, "Hosea Hos"],
    ["joe", "Joel", 0, "Joel Joe Jl"],
    ["amo", "Amos", 0, "Amos Amo"],
    ["oba", "Obadiah", 0, "Obadiah Obad Oba"],
    ["jon", "Jonah", 0, "Jonah Jon Jnh"],
    ["mic", "Micah", 0, "Micah Mic"],
    ["nah", "Nahum", 0, "Nahum Nah"],
    ["hab", "Habakkuk", 0, "Habakkuk Hab"],
    ["zep", "Zephaniah", 0, "Zephaniah Zeph Zep Zp"],
    ["hag", "Haggai", 0, "Haggai Hag Hg"],
    ["zec", "Zechariah", 0, "Zechariah Zech Zec Zc"],
    ["mal", "Malachi", 0, "Malachi Mal"],
    ["mat", "Matthew", 0, "Matthew Matt Mat Mt"],
    ["mar", "Mark", 0, "Mark Mrk Mar Mk Mr"],
    ["luk", "Luke", 0, "Luke Luk Lk"],
    ["jhn", "John", 0, "John Joh Jhn Jn"],
    ["act", "Acts", 0, "Acts Act Ac"],
    ["rom", "Romans", 0, "Romans Rom Rm"],
    ["1co", "1 Corinthians", 1, "Corinthians Cor Co"],
    ["2co", "2 Corinthians", 2, "Corinthians Cor Co"],
    ["gal", "Galatians", 0, "Galatians Gal"],
    ["eph", "Ephesians", 0, "Ephesians Eph"],
    ["phl", "Philippians", 0, "Philippians Phil Php"],
    ["col", "Colossians", 0, "Colossians Col"],
    ["1th", "1 Thessalonians", 1, "Thessalonians Thess Thes Th"],
    ["2th", "2 Thessalonians", 2, "Thessalonians Thess Thes Th"],
    ["1ti", "1 Timothy", 1, "Timothy Tim Ti"],
    ["2ti", "2 Timothy", 2, "Timothy Tim Ti"],
    ["tit", "Titus", 0, "Titus Tit"],
    ["phm", "Philemon", 0, "Philemon Philem Phm Pm"],
    ["heb", "Hebrews", 0, "Hebrews Heb"],
    ["jas", "James", 0, "James Jam Jas Jm"],
    ["1pe", "1 Peter", 1, "Peter Pet Pe Pt"],
    ["2pe", "2 Peter", 2, "Peter Pet Pe Pt"],
    ["1jo", "1 John", 1, "John Joh Jhn Jn"],
    ["2jo", "2 John", 2, "John Joh Jhn Jn"],
    ["3jo", "3 John", 3, "John Joh Jhn Jn"],
    ["jde", "Jude", 0, "Jude Jud Jde"],
    ["rev", "Revelation", 0, "Revelation Revelations Rev Rv"]
  ];

  var PLAIN = {}, NUMBERED = {}, plainList = [], numberedList = [];
  BOOKS.forEach(function (b) {
    var names = b[3].indexOf("|") > -1 ? b[3].split("|") : b[3].split(" ");
    names.forEach(function (n) {
      var key = n.toLowerCase().replace(/\s+/g, " ");
      if (b[2] === 0) {
        PLAIN[key] = b;
        plainList.push(key);
      } else {
        NUMBERED[key + "#" + b[2]] = b;
        if (numberedList.indexOf(key) < 0) numberedList.push(key);
      }
    });
  });

  function alt(list) {
    return list.sort(function (a, b) { return b.length - a.length; }).map(function (k) {
      return k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+");
    }).join("|");
  }

  /* number prefix: 1 / 1st / I / i. / First, then the name; or a plain name. Case does not matter. */
  var BOOK_RE = new RegExp(
    "\\b(?:(?:(?:([123])(?:st|nd|rd)?|(iii|ii|i)|(first|second|third))\\.?\\s*)(" + alt(numberedList.slice()) + ")|(" + alt(plainList.slice()) + "))\\.?(?![a-z])\\s*(?=\\d)",
    "gi"
  );

  var NUM_WORD = { i: 1, ii: 2, iii: 3, first: 1, second: 2, third: 3 };

  function isDigit(c) { return c >= "0" && c <= "9"; }

  /* Reads digits at s[i]; returns [number, nextIndex] or null. Up to 3 digits, not followed by another digit. */
  function readNum(s, i) {
    var j = i;
    while (j < s.length && isDigit(s.charAt(j))) j++;
    if (j === i || j - i > 3) return null;
    return [parseInt(s.slice(i, j), 10), j];
  }

  /* Finds references in a piece of text. Returns [{start, end, book, chapter, verse, endVerse}],
     where start/end give the text to turn into the link. */
  function findRefs(text) {
    var out = [], m, p;
    BOOK_RE.lastIndex = 0;
    while ((m = BOOK_RE.exec(text))) {
      var book = null;
      if (m[4]) {
        var n = m[1] ? parseInt(m[1], 10) : NUM_WORD[(m[2] || m[3]).toLowerCase()];
        book = NUMBERED[m[4].toLowerCase().replace(/\s+/g, " ") + "#" + n];
      } else {
        book = PLAIN[m[5].toLowerCase().replace(/\s+/g, " ")];
      }
      if (!book) continue;
      var start = m.index, i = BOOK_RE.lastIndex, chapter, verse, first = true, found = false;
      /* chapter */
      p = readNum(text, i);
      if (!p) continue;
      chapter = p[0]; i = p[1];
      for (;;) {
        /* chapter and verse: 3:16 or 3.16 */
        var c = text.charAt(i), vv = null;
        if ((c === ":" || c === ".") && isDigit(text.charAt(i + 1))) vv = readNum(text, i + 1);
        if (!vv) break;
        verse = vv[0]; i = vv[1];
        var endVerse = 0, rng = text.charAt(i);
        if ((rng === "-" || rng === "\u2013" || rng === "\u2014") && isDigit(text.charAt(i + 1))) {
          var ev = readNum(text, i + 1);
          if (ev) { endVerse = ev[0]; i = ev[1]; }
        }
        out.push({ start: first ? start : startOfPiece, end: i, book: book, chapter: chapter, verse: verse, endVerse: endVerse });
        found = true; first = false;
        /* more: ", 22" (same chapter, next verse), "; 8:1" or " 8:1" (new chapter) */
        var j = i, again = false;
        while (j < text.length) {
          var d = text.charAt(j);
          if (d === "," || d === ";") {
            var k = j + 1;
            while (text.charAt(k) === " ") k++;
            var nx = readNum(text, k);
            if (!nx) break;
            var after = text.charAt(nx[1]);
            if ((after === ":" || after === ".") && isDigit(text.charAt(nx[1] + 1))) {
              chapter = nx[0]; startOfPiece = k; i = nx[1]; again = true; break;
            }
            if (d === ",") {
              /* a bare number after a comma is a verse in the same chapter, unless a book name follows it ("John 3:16, 2 John 1:3") */
              var sp = nx[1];
              while (text.charAt(sp) === " ") sp++;
              if (/[a-z]/i.test(text.charAt(sp)) && sp > nx[1]) break;
              verse = nx[0]; var e2 = nx[1], end2 = 0, r2 = text.charAt(e2);
              if ((r2 === "-" || r2 === "\u2013" || r2 === "\u2014") && isDigit(text.charAt(e2 + 1))) {
                var ev2 = readNum(text, e2 + 1);
                if (ev2) { end2 = ev2[0]; e2 = ev2[1]; }
              }
              out.push({ start: k, end: e2, book: book, chapter: chapter, verse: verse, endVerse: end2 });
              i = e2; j = i; continue;
            }
          }
          break;
        }
        if (!again) break;
      }
      if (found) BOOK_RE.lastIndex = Math.max(BOOK_RE.lastIndex, i);
    }
    return out;
  }
  var startOfPiece = 0;

  function label(r) {
    return r.book[1] + " " + r.chapter + ":" + r.verse + (r.endVerse ? "-" + r.endVerse : "");
  }

  var SKIP = { A: 1, H1: 1, H2: 1, H3: 1, H4: 1, CODE: 1, PRE: 1, SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, BUTTON: 1 };

  function walk(node) {
    if (node.nodeType === 3) {
      var text = node.nodeValue, refs = findRefs(text);
      if (!refs.length) return;
      var frag = document.createDocumentFragment(), pos = 0;
      refs.forEach(function (r) {
        if (r.start < pos) return;
        if (r.start > pos) frag.appendChild(document.createTextNode(text.slice(pos, r.start)));
        var a = document.createElement("a");
        a.className = "ref-link";
        a.href = BLB + r.book[0] + "/" + r.chapter + "/" + r.verse + "/";
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("aria-label", label(r) + " at Blue Letter Bible (opens in a new tab)");
        a.appendChild(document.createTextNode(text.slice(r.start, r.end)));
        frag.appendChild(a);
        pos = r.end;
      });
      if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
      node.parentNode.replaceChild(frag, node);
      return;
    }
    if (node.nodeType !== 1 || SKIP[node.tagName]) return;
    var kids = Array.prototype.slice.call(node.childNodes);
    for (var k = 0; k < kids.length; k++) walk(kids[k]);
  }

  if (typeof document !== "undefined" && document.body) {
    walk(document.body);
  } else if (typeof module !== "undefined") {
    module.exports = { findRefs: findRefs, label: label };
  }
})();
