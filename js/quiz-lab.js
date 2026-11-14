// Oefenlab in focusmodus voor vragen uit "Test jezelf" (meerkeuze, meerdere juist, volgorde).
// Eén hoofdstuk tegelijk: intro, dan één vraag per stap. Raf reageert, GP en reeks via Studyraf.
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { geefGP, laadGP, PUNTEN_NAAM } from "./gp.js";

const PUNTEN = { mc: 10, multi: 10, order: 15 };
const SOORT = { mc: "Meerkeuze", multi: "Meerdere juist", order: "Volgorde" };
const JUIST_ZINNEN = ["Zag ik al aankomen.", "Netjes.", "Dat zit erin.", "Hoger en hoger.", "Zo mag ik het zien."];
const FOUT_ZINNEN = ["Hmm. Nog eens.", "Bijna. Niet echt.", "Daar trap ik niet in.", "Kijk nog eens goed."];
const raf = (pose) => new URL(`../assets/raf/raf-${pose}.png`, import.meta.url).href;
const willekeurig = (l) => l[Math.floor(Math.random() * l.length)];
const el = (tag, klasse, tekst) => { const e = document.createElement(tag); if (klasse) e.className = klasse; if (tekst !== undefined) e.textContent = tekst; return e; };

// Vaste (gezaaide) schudding, zodat de volgorde bij elk bezoek dezelfde is.
function schud(lijst, zaad) {
  let a = (zaad * 2654435761) >>> 0;
  const rnd = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const r = lijst.slice();
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

export function startQuizLab(DATA) {
  const main = document.getElementById("main");
  const lees = () => { try { return JSON.parse(localStorage.getItem(DATA.opslag)) || {}; } catch { return {}; } };
  const st = Object.assign({ opgelost: {} }, lees());
  const bewaar = () => { try { localStorage.setItem(DATA.opslag, JSON.stringify(st)); } catch { /* geen opslag */ } };

  let gebruiker = null, gpTotaal = 0;
  let h = 0, stap = 0;                 // hoofdstuk, stap (0 = intro)
  let keuze = null;                    // huidige selectie van de gebruiker
  const terug = new URLSearchParams(location.search).has("terug");   // geopend vanuit de cursus
  const terugUrl = () => `${DATA.cursus}#test-${hst().id}`;

  // ---------- Vaste elementen ----------
  const top = el("div", "fl-top");
  const labLabel = el("span", "fl-lab");
  const voortgang = el("div", "fl-voortgang");
  const gp = el("div", "fl-gp"); gp.innerHTML = `<b>0</b><span>${PUNTEN_NAAM}</span>`;
  top.append(labLabel, voortgang, gp);
  main.before(top);

  const balk = el("div", "fl-balk"); balk.dataset.staat = "neutraal";
  balk.innerHTML = `<img class="fl-raf" alt=""><p class="fl-ballon" aria-hidden="true"></p>
    <div class="fl-tekst" role="status" aria-live="polite"><div class="fl-titel"></div><div class="fl-uitleg"></div></div>
    <div class="fl-knoppen"><button type="button" class="fl-knop fl-vorige"></button><button type="button" class="fl-knop fl-hoofd"></button></div>`;
  const wachtRaf = el("img", "fl-wacht"); wachtRaf.src = raf("thinking"); wachtRaf.alt = "";
  document.body.append(wachtRaf, balk);
  const [rafImg, ballon, titel, uitleg, knopNeven, knopHoofd] =
    [".fl-raf", ".fl-ballon", ".fl-titel", ".fl-uitleg", ".fl-vorige", ".fl-hoofd"].map((s) => balk.querySelector(s));
  new ResizeObserver(() => document.body.style.setProperty("--fl-balk-h", `${Math.ceil(balk.getBoundingClientRect().height)}px`)).observe(balk);

  onAuthStateChanged(auth, (u) => {
    gebruiker = u;
    if (u) laadGP(u.uid).then((s) => { gpTotaal = s.totaal; gp.querySelector("b").textContent = gpTotaal.toLocaleString("nl-BE"); }).catch(console.error);
  });

  const hst = () => DATA.hoofdstukken[h];
  const vraagId = (i) => `${hst().id}-${i}`;
  const isOpgelost = (i) => !!st.opgelost[vraagId(i)];
  const aantalStappen = () => hst().vragen.length + 1;

  // Opties per vraag één keer geschud (meerkeuze en meerdere juist); volgorde start geschud.
  function voorbereid(q, i) {
    const zaad = i * 7 + hst().id.length * 3 + h + 1;
    if (q.t === "order") {
      let v = schud(q.o.map((_, k) => k), zaad);
      if (v.every((k, p) => k === p)) v = v.slice(1).concat(v[0]);   // nooit al juist tonen
      return { volgorde: v };
    }
    let v = schud(q.o.map((_, k) => k), zaad);
    if (q.t === "mc") {
      // Juiste antwoord gelijk verdeeld over de posities (de brondata zet het vaak eerst).
      const nr = DATA.hoofdstukken.slice(0, h).reduce((a, x) => a + x.vragen.length, 0) + i;
      const rest = v.filter((k) => k !== q.a);
      rest.splice((nr * 3 + 1) % q.o.length, 0, q.a);
      v = rest;
    }
    return { volgorde: v };
  }

  // ---------- Tekenen ----------
  function tekenVoortgang() {
    voortgang.replaceChildren(...Array.from({ length: aantalStappen() }, (_, k) => {
      const s = el("span");
      if (k > 0 && isOpgelost(k - 1)) s.className = "klaar";
      if (k === stap) s.classList.add("nu");
      return s;
    }));
    labLabel.textContent = `Hoofdstuk ${h + 1} van ${DATA.hoofdstukken.length}`;
  }

  function tekenIntro() {
    const H = hst();
    const totaal = H.vragen.reduce((a, q) => a + PUNTEN[q.t], 0);
    const klaar = H.vragen.filter((_, i) => isOpgelost(i)).length;
    main.innerHTML = "";
    const eyebrow = el("p", "ql-eyebrow", `${DATA.vak} · hoofdstuk ${h + 1}`);
    const h2 = el("h2", "ql-titel", H.titel);
    const meta = el("p", "ql-sub", `${H.vragen.length} vragen · ${totaal} ${PUNTEN_NAAM}` + (klaar ? ` · ${klaar} al opgelost` : ""));
    const link = el("a", "ql-link", "Lees dit hoofdstuk eerst in de cursus");
    link.href = `${DATA.cursus}#${H.id}`;
    const lijst = el("ol", "ql-hoofdstukken");
    DATA.hoofdstukken.forEach((x, k) => {
      const li = el("li"); const a = el("a", k === h ? "nu" : "", x.titel); a.href = `#${x.id}`;
      if (x.vragen.every((_, i) => st.opgelost[`${x.id}-${i}`])) a.classList.add("klaar");
      li.append(a); lijst.append(li);
    });
    const det = el("details", "ql-alle"); det.append(el("summary", "", "Alle hoofdstukken"), lijst);
    main.append(eyebrow, h2, meta, link, det);
  }

  function tekenVraag() {
    const i = stap - 1, q = hst().vragen[i], prep = voorbereid(q, i), opgelost = isOpgelost(i);
    main.innerHTML = "";
    const kop = el("div", "ql-kop");
    kop.append(el("h2", "ql-titel", `${i + 1}. ${q.q}`), el("span", "ql-badge", `${SOORT[q.t]} · ${PUNTEN[q.t]} ${PUNTEN_NAAM}`));
    main.append(kop);
    if (q.t === "multi") main.append(el("p", "ql-sub", "Kies alle juiste antwoorden."));

    if (q.t === "order") {
      keuze = prep.volgorde.slice();
      const lijst = el("ol", "ql-volgorde");
      const teken = () => {
        lijst.replaceChildren(...keuze.map((k, p) => {
          const li = el("li", "ql-item"); li.dataset.k = k;
          li.append(el("span", "k", String(p + 1)), el("span", "ql-item-tekst", q.o[k]));
          const op = el("button", "ql-pijl", "↑"); op.type = "button"; op.setAttribute("aria-label", "Omhoog"); op.disabled = p === 0;
          const neer = el("button", "ql-pijl", "↓"); neer.type = "button"; neer.setAttribute("aria-label", "Omlaag"); neer.disabled = p === keuze.length - 1;
          op.onclick = () => { [keuze[p - 1], keuze[p]] = [keuze[p], keuze[p - 1]]; zetNeutraal(); teken(); };
          neer.onclick = () => { [keuze[p + 1], keuze[p]] = [keuze[p], keuze[p + 1]]; zetNeutraal(); teken(); };
          li.append(op, neer);
          return li;
        }));
      };
      teken(); main.append(lijst);
    } else {
      keuze = q.t === "multi" ? new Set() : null;
      const opts = el("div", "opts");
      prep.volgorde.forEach((k, p) => {
        const b = el("button", "opt"); b.type = "button"; b.dataset.k = k;
        b.setAttribute("aria-pressed", "false");
        b.append(el("span", "k", "ABCDEFGH"[p]), el("span", "", q.o[k]));
        if (opgelost && (q.t === "mc" ? k === q.a : q.a.includes(k))) b.classList.add("good");
        b.onclick = () => {
          if (balk.dataset.staat === "juist") return;
          if (q.t === "mc") { keuze = k; opts.querySelectorAll(".opt").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); }
          else { keuze.has(k) ? keuze.delete(k) : keuze.add(k); b.setAttribute("aria-pressed", String(keuze.has(k))); }
          if (balk.dataset.staat === "fout") zetNeutraal(); else zetHoofdknop();
        };
        opts.append(b);
      });
      main.append(opts);
    }
  }

  // ---------- Balk ----------
  function heeftKeuze() {
    const q = hst().vragen[stap - 1];
    if (q.t === "mc") return keuze !== null;
    if (q.t === "multi") return keuze.size > 0;
    return true;
  }

  function zetHoofdknop() {
    const opVraag = stap > 0 && !isOpgelost(stap - 1);
    knopHoofd.disabled = opVraag && !heeftKeuze();
  }

  function zetNeutraal() {
    balk.dataset.staat = "neutraal";
    wachtRaf.hidden = false;
    const opVraag = stap > 0 && !isOpgelost(stap - 1);
    const laatste = stap === aantalStappen() - 1;
    titel.textContent = stap === 0 ? "Klaar om te oefenen?" : `Vraag ${stap} van ${aantalStappen() - 1}`;
    uitleg.textContent = stap === 0 ? "Eén vraag tegelijk. Raf kijkt mee." : "";
    knopNeven.hidden = stap === 0 || (terug && stap === 1 && !opVraag);
    knopNeven.textContent = opVraag ? "Overslaan" : "Vorige";
    knopNeven.dataset.actie = opVraag ? "volgende" : "vorige";
    if (opVraag) { knopHoofd.textContent = "Controleer"; knopHoofd.dataset.actie = "controleer"; }
    else {
      knopHoofd.dataset.actie = "volgende";
      if (stap === 0) knopHoofd.textContent = "Start";
      else if (!laatste) knopHoofd.textContent = "Volgende";
      else if (terug) knopHoofd.textContent = "Terug naar de cursus";
      else knopHoofd.textContent = h < DATA.hoofdstukken.length - 1 ? "Volgend hoofdstuk →" : "Klaar";
    }
    zetHoofdknop();
  }

  function speel(e, k) { e.classList.remove("fl-anim-juist", "fl-anim-fout"); void e.offsetWidth; e.classList.add(k); }

  function feedback(ok, tekst, punten) {
    balk.dataset.staat = ok ? "juist" : "fout";
    titel.textContent = ok ? (punten ? `Juist. +${punten} ${PUNTEN_NAAM}` : "Juist.") : "Nog niet.";
    uitleg.innerHTML = tekst;
    rafImg.src = raf(ok ? "celebrating" : "unimpressed");
    rafImg.alt = ok ? "Raf viert je antwoord" : "Raf is niet overtuigd";
    ballon.textContent = willekeurig(ok ? JUIST_ZINNEN : FOUT_ZINNEN);
    speel(rafImg, ok ? "fl-anim-juist" : "fl-anim-fout"); speel(ballon, ok ? "fl-anim-juist" : "fl-anim-fout");
    wachtRaf.hidden = true;
    knopNeven.hidden = true;
    knopHoofd.disabled = false;
    const laatsteTerug = terug && stap === aantalStappen() - 1;
    knopHoofd.textContent = ok ? (laatsteTerug ? "Terug naar de cursus" : "Verder") : "Opnieuw";
    knopHoofd.dataset.actie = ok ? "volgende" : "opnieuw";
    knopHoofd.focus({ preventScroll: true });
  }

  function controleer() {
    const i = stap - 1, q = hst().vragen[i];
    let ok, hint = "Kijk nog eens goed.";
    if (q.t === "mc") ok = keuze === q.a;
    else if (q.t === "multi") {
      const juist = new Set(q.a);
      ok = keuze.size === juist.size && [...keuze].every((k) => juist.has(k));
      const goed = [...keuze].filter((k) => juist.has(k)).length;
      hint = `${goed} van je ${keuze.size} keuzes kloppen, en er zijn ${juist.size} juiste antwoorden.`;
    } else {
      ok = keuze.every((k, p) => k === p);
      const opPlaats = keuze.filter((k, p) => k === p).length;
      hint = `${opPlaats} van de ${keuze.length} staan op de juiste plaats.`;
      main.querySelectorAll(".ql-item").forEach((li, p) => li.classList.toggle("good", keuze[p] === p));
    }
    if (!ok) { feedback(false, hint); return; }

    const nieuw = !isOpgelost(i);
    st.opgelost[vraagId(i)] = true; bewaar();
    if (q.t !== "order") main.querySelectorAll(".opt").forEach((b) => {
      const k = Number(b.dataset.k);
      if (q.t === "mc" ? k === q.a : q.a.includes(k)) b.classList.add("good");
    });
    tekenVoortgang();
    const punten = nieuw ? PUNTEN[q.t] : 0;
    feedback(true, q.w, punten);
    if (nieuw && gebruiker) {
      gpTotaal += punten; gp.querySelector("b").textContent = gpTotaal.toLocaleString("nl-BE");
      geefGP(gebruiker.uid, punten).catch((e) => console.error("GP mislukt", e));
    }
  }

  function toon() {
    tekenVoortgang();
    if (stap === 0) tekenIntro(); else tekenVraag();
    zetNeutraal();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function naarHoofdstuk(k, s = 0) {
    h = Math.max(0, Math.min(k, DATA.hoofdstukken.length - 1)); stap = s;
    history.replaceState(null, "", `#${hst().id}`);
    const cursusLink = document.querySelector('.studyraf-balk a[href^="./cursus.html"], .studyraf-balk a[href^="cursus.html"]');
    if (cursusLink) cursusLink.href = terug ? terugUrl() : DATA.cursus;
    toon();
  }

  function volgende() {
    if (stap < aantalStappen() - 1) { stap++; toon(); }
    else if (terug) location.href = terugUrl();
    else if (h < DATA.hoofdstukken.length - 1) naarHoofdstuk(h + 1);
    else zetNeutraal();
  }

  knopHoofd.addEventListener("click", () => {
    const a = knopHoofd.dataset.actie;
    if (a === "controleer") controleer();
    else if (a === "opnieuw") zetNeutraal();
    else volgende();
  });
  knopNeven.addEventListener("click", () => {
    if (knopNeven.dataset.actie === "volgende") volgende();
    else if (stap > 0) { stap--; toon(); }
  });
  window.addEventListener("hashchange", () => {
    const k = DATA.hoofdstukken.findIndex((x) => `#${x.id}` === location.hash);
    if (k >= 0 && k !== h) naarHoofdstuk(k);
  });

  const start = DATA.hoofdstukken.findIndex((x) => `#${x.id}` === location.hash);
  if (terug && start >= 0) {
    // Vanuit de cursus: meteen naar de eerste vraag die nog niet opgelost is.
    h = start;
    const open = hst().vragen.findIndex((_, i) => !isOpgelost(i));
    naarHoofdstuk(start, open >= 0 ? open + 1 : 1);
  } else naarHoofdstuk(start >= 0 ? start : 0);
}
