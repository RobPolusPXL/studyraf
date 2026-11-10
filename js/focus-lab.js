// Focusmodus voor een Oefenlab: één stap tegelijk (uitleg, dan elke oefening),
// voortgangsbalk bovenaan, feedbackbalk onderaan met Raf die reageert, en GP.
// Werkt bovenop de bestaande lab-pagina (globale LABS, S, XPT, render, fb, solve, go).
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { geefGP, laadGP, PUNTEN_NAAM } from "./gp.js";

const raf = (pose) => new URL(`../assets/raf/raf-${pose}.png`, import.meta.url).href;
const JUIST_ZINNEN = ["Zag ik al aankomen.", "Netjes.", "Dat zit erin.", "Hoger en hoger.", "Zo mag ik het zien."];
const FOUT_ZINNEN = ["Hmm. Nog eens.", "Bijna. Niet echt.", "Daar trap ik niet in.", "Kijk nog eens goed."];
const willekeurig = (lijst) => lijst[Math.floor(Math.random() * lijst.length)];

let gebruiker = null;
let gpTotaal = 0;
onAuthStateChanged(auth, (u) => {
  gebruiker = u;
  if (u) laadGP(u.uid).then((st) => { gpTotaal = st.totaal; toonGP(); }).catch((e) => console.error("GP laden mislukt", e));
});

// ---------- Elementen ----------
const balk = document.createElement("div");
balk.className = "fl-balk";
balk.dataset.staat = "neutraal";
balk.innerHTML = `
  <img class="fl-raf" alt="">
  <p class="fl-ballon" aria-hidden="true"></p>
  <div class="fl-tekst" role="status" aria-live="polite">
    <div class="fl-titel"></div>
    <div class="fl-uitleg"></div>
  </div>
  <div class="fl-knoppen">
    <button type="button" class="fl-knop fl-vorige"></button>
    <button type="button" class="fl-knop fl-hoofd"></button>
  </div>`;
const top = document.createElement("div");
top.className = "fl-top";
top.innerHTML = `<span class="fl-lab"></span><div class="fl-voortgang"></div>
  <div class="fl-gp" title="Je ${PUNTEN_NAAM}-totaal"><b>0</b><span>${PUNTEN_NAAM}</span></div>`;
document.getElementById("main").before(top);
const labLabel = top.querySelector(".fl-lab");
const gpWaarde = top.querySelector(".fl-gp b");
function toonGP() { gpWaarde.textContent = gpTotaal.toLocaleString("nl-BE"); }

const wachtRaf = document.createElement("img");
wachtRaf.className = "fl-wacht";
wachtRaf.src = raf("thinking");
wachtRaf.alt = "";
document.body.append(wachtRaf, balk);

// Ruimte onderaan = echte hoogte van de balk, zodat er nooit een overbodige scrollbalk komt.
new ResizeObserver(() => {
  document.body.style.setProperty("--fl-balk-h", `${Math.ceil(balk.getBoundingClientRect().height)}px`);
}).observe(balk);

const rafImg = balk.querySelector(".fl-raf");
const ballon = balk.querySelector(".fl-ballon");
const titel = balk.querySelector(".fl-titel");
const uitleg = balk.querySelector(".fl-uitleg");
const knopVorige = balk.querySelector(".fl-vorige");
const knopHoofd = balk.querySelector(".fl-hoofd");

// ---------- Stappen ----------
const stapPerLab = {};
let stappen = [];
const voortgang = () => top.querySelector(".fl-voortgang");
let bezigMetRender = false;

const lab = () => LABS[S.cur];
const opgelost = (i) => !!S.solved[lab().id + "-" + i];

function bouwStappen() {
  const main = document.getElementById("main");
  const kinderen = [...main.children];
  const uitlegStap = document.createElement("div");
  uitlegStap.className = "fl-stap";
  stappen = [uitlegStap];

  for (const kind of kinderen) {
    if (kind.classList.contains("navbtm") || kind.classList.contains("score") || kind.classList.contains("sect")) {
      kind.remove();
    } else if (kind.matches("article.ex")) {
      kind.classList.add("fl-stap");
      stappen.push(kind);
    } else {
      uitlegStap.append(kind);
    }
  }
  main.prepend(uitlegStap);
  labLabel.textContent = `Lab ${S.cur + 1}`;

  // De eigen Controleer-knop van een oefening verhuist naar de balk onderaan.
  for (const art of stappen.slice(1)) {
    const chk = [...art.querySelectorAll("button")].find((b) => b.textContent.trim() === "Controleer");
    if (!chk) continue;
    chk.classList.add("fl-proxy");
    art._check = chk;
    new MutationObserver(() => { if (stappen[stapPerLab[S.cur]] === art) zetNeutraalKnop(); })
      .observe(chk, { attributes: true, attributeFilter: ["disabled", "hidden"] });
  }
}

function tekenVoortgang(huidig) {
  const vg = voortgang();
  vg.replaceChildren();
  stappen.forEach((_, k) => {
    const s = document.createElement("span");
    if (k > 0 && opgelost(k - 1)) s.className = "klaar";
    if (k === huidig) s.classList.add("nu");
    s.title = k === 0 ? "Uitleg" : `Oefening ${k}`;
    vg.append(s);
  });
}

function toonStap(k) {
  k = Math.max(0, Math.min(k, stappen.length - 1));
  stapPerLab[S.cur] = k;
  stappen.forEach((s, i) => { s.hidden = i !== k; });
  tekenVoortgang(k);
  zetNeutraal();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function huidigeCheck() {
  const k = stapPerLab[S.cur] ?? 0;
  const chk = k > 0 ? stappen[k]._check : null;
  return chk && !chk.hidden && !opgelost(k - 1) ? chk : null;
}

function zetNeutraalKnop() {
  if (balk.dataset.staat !== "neutraal") return;
  const chk = huidigeCheck();
  knopHoofd.disabled = chk ? chk.disabled : false;
}

function zetNeutraal() {
  const k = stapPerLab[S.cur] ?? 0;
  const laatste = k === stappen.length - 1;
  const chk = huidigeCheck();
  balk.dataset.staat = "neutraal";
  titel.textContent = k === 0 ? "Lees de uitleg" : `Oefening ${k} van ${stappen.length - 1}`;
  uitleg.textContent = k === 0 ? "Daarna volgen de oefeningen, één voor één." : "";

  knopVorige.hidden = k === 0;
  knopVorige.textContent = chk ? "Overslaan" : "Vorige";
  knopVorige.dataset.actie = chk ? "volgende" : "vorige";

  if (chk) {
    knopHoofd.textContent = "Controleer";
    knopHoofd.dataset.actie = "controleer";
  } else {
    if (k === 0) knopHoofd.textContent = "Start oefeningen";
    else if (!laatste) knopHoofd.textContent = "Volgende";
    else knopHoofd.textContent = S.cur < LABS.length - 1 ? `Lab ${S.cur + 2} →` : "Klaar";
    knopHoofd.dataset.actie = "volgende";
  }
  zetNeutraalKnop();
  wachtRaf.hidden = false;
}

function speelAnimatie(el, klasse) {
  el.classList.remove("fl-anim-juist", "fl-anim-fout");
  void el.offsetWidth;
  el.classList.add(klasse);
}

function toonFeedback(ok, html) {
  balk.dataset.staat = ok ? "juist" : "fout";
  titel.textContent = ok ? "Juist." : "Nog niet.";
  uitleg.innerHTML = html.replace(/^\s*<strong>[^<]*<\/strong>\s*/, "");
  rafImg.src = raf(ok ? "celebrating" : "unimpressed");
  rafImg.alt = ok ? "Raf viert je antwoord" : "Raf is niet overtuigd";
  ballon.textContent = willekeurig(ok ? JUIST_ZINNEN : FOUT_ZINNEN);
  speelAnimatie(rafImg, ok ? "fl-anim-juist" : "fl-anim-fout");
  speelAnimatie(ballon, ok ? "fl-anim-juist" : "fl-anim-fout");
  wachtRaf.hidden = true;
  knopHoofd.disabled = false;
  knopHoofd.textContent = ok ? "Verder" : "Opnieuw";
  knopHoofd.dataset.actie = ok ? "volgende" : "opnieuw";
  knopHoofd.focus({ preventScroll: true });
}

function volgendeStap() {
  const k = stapPerLab[S.cur] ?? 0;
  if (k < stappen.length - 1) toonStap(k + 1);
  else if (S.cur < LABS.length - 1) go(S.cur + 1);
  else zetNeutraal();
}

knopHoofd.addEventListener("click", () => {
  const actie = knopHoofd.dataset.actie;
  if (actie === "opnieuw") zetNeutraal();
  else if (actie === "controleer") huidigeCheck()?.click();
  else volgendeStap();
});
knopVorige.addEventListener("click", () => {
  if (knopVorige.dataset.actie === "volgende") volgendeStap();
  else toonStap((stapPerLab[S.cur] ?? 0) - 1);
});

// ---------- Koppeling met de lab-pagina ----------
const origRender = window.render;
window.render = function () {
  bezigMetRender = true;
  try { origRender(); } finally { bezigMetRender = false; }
  bouwStappen();
  toonStap(stapPerLab[S.cur] ?? 0);
};

const origFb = window.fb;
window.fb = function (box, ok, html) {
  origFb(box, ok, html);
  if (!bezigMetRender) toonFeedback(ok, html);
};

function puntenVoor(id) {
  const knip = id.lastIndexOf("-");
  const l = LABS.find((x) => x.id === id.slice(0, knip));
  const oef = l && l.ex[Number(id.slice(knip + 1))];
  return oef ? (XPT[oef.type] || 0) : 0;
}

const origSolve = window.solve;
window.solve = function (id) {
  const nieuw = !S.solved[id];
  origSolve(id);
  tekenVoortgang(stapPerLab[S.cur] ?? 0);
  const punten = puntenVoor(id);
  if (nieuw && punten > 0) {
    titel.textContent = `Juist. +${punten} ${PUNTEN_NAAM}`;
    if (gebruiker) {
      gpTotaal += punten; toonGP();
      geefGP(gebruiker.uid, punten).catch((e) => console.error("GP mislukt", e));
    }
  }
};

// Eerste keer opbouwen (de pagina heeft al gerenderd voor deze module laadde).
bouwStappen();
toonStap(stapPerLab[S.cur] ?? 0);
