import { auth, provider } from "./firebase.js";
import { onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { VAKKEN } from "./vakken.js";
import { PUNTEN_NAAM, laadGP, geefGP } from "./gp.js";

let huidigeGebruiker = null;

function toonGP(stand, animeer = false) {
  $("gp-totaal").textContent = stand.totaal.toLocaleString("nl-BE");
  $("gp-vandaag").textContent = stand.vandaag.toLocaleString("nl-BE");
  if (animeer) {
    const teller = document.querySelector(".gp");
    teller.classList.remove("gp--pop");
    void teller.offsetWidth;
    teller.classList.add("gp--pop");
  }
}

for (const el of [document.getElementById("gp-naam"), ...document.querySelectorAll(".js-gp-naam")]) {
  el.textContent = PUNTEN_NAAM;
}

const testKnop = document.getElementById("gp-test");
if (new URLSearchParams(location.search).has("test")) {
  testKnop.hidden = false;
  testKnop.textContent = `Test: +10 ${PUNTEN_NAAM}`;
  testKnop.addEventListener("click", async () => {
    if (!huidigeGebruiker) return;
    testKnop.disabled = true;
    try {
      toonGP(await geefGP(huidigeGebruiker.uid, 10), true);
    } catch (err) {
      console.error("GP toekennen mislukt", err);
    } finally {
      testKnop.disabled = false;
    }
  });
}

const $ = (id) => document.getElementById(id);
const loginView = $("login");
const hubView = $("hub");
const loginError = $("login-error");

// Lapjes van Raf als patroon in de hoek van elke kaart (statisch, geen gebruikersdata).
const PATROON = `<svg class="vak__patroon" viewBox="0 0 170 130" aria-hidden="true">
  <path d="M44 12 L90 0 L104 36 L62 50 Z"/>
  <path d="M112 56 L156 46 L166 90 L122 102 Z"/>
  <path d="M18 72 L52 64 L60 96 L28 104 Z"/>
</svg>`;

function voornaam(user) {
  const naam = user.displayName || user.email || "";
  return naam.split(" ")[0].split("@")[0];
}

function renderVakken() {
  const lijst = $("vakken");
  lijst.replaceChildren();
  $("aantal").textContent = `${VAKKEN.length} vakken`;

  for (const vak of VAKKEN) {
    const kaart = document.createElement("article");
    kaart.className = "vak" + (vak.beschikbaar ? "" : " vak--binnenkort");
    kaart.style.setProperty("--kleur", vak.kleur);
    kaart.insertAdjacentHTML("afterbegin", PATROON);

    const titel = document.createElement("h3");
    titel.textContent = vak.naam;
    const sub = document.createElement("p");
    sub.className = "vak__sub";
    sub.textContent = vak.sub;

    const delen = document.createElement("ul");
    delen.className = "vak__delen";
    for (const deel of vak.delen) {
      const li = document.createElement("li");
      const pad = vak.beschikbaar && vak.links?.[deel];
      if (pad) {
        const a = document.createElement("a");
        a.href = `vakken/${vak.id}/${pad}`;
        a.textContent = deel;
        li.append(a);
      } else {
        li.textContent = deel;
      }
      delen.append(li);
    }

    const voet = document.createElement("div");
    voet.className = "vak__voet";
    for (let i = 0; i < 6; i++) voet.append(document.createElement("span"));
    let status;
    if (vak.beschikbaar && vak.links?.[vak.start]) {
      status = document.createElement("a");
      status.className = "vak__start";
      status.href = `vakken/${vak.id}/${vak.links[vak.start]}`;
      status.textContent = "Start";
    } else {
      status = document.createElement("strong");
      status.textContent = "Binnenkort";
    }
    voet.append(status);

    kaart.append(titel, sub, delen, voet);
    lijst.append(kaart);
  }
}

$("login-btn").addEventListener("click", async () => {
  loginError.hidden = true;
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    loginError.textContent = err.code === "auth/popup-closed-by-user"
      ? "Inloggen afgebroken."
      : `Inloggen mislukt (${err.code || "onbekende fout"}).`;
    loginError.hidden = false;
  }
});

$("logout-btn").addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, (user) => {
  huidigeGebruiker = user;
  if (user) {
    laadGP(user.uid).then((stand) => toonGP(stand)).catch((err) => console.error("GP laden mislukt", err));
    $("welkom").textContent = `Hoi ${voornaam(user)}.`;
    $("avatar").textContent = (voornaam(user)[0] || "?").toUpperCase();
    renderVakken();
    loginView.hidden = true;
    hubView.hidden = false;
  } else {
    hubView.hidden = true;
    loginView.hidden = false;
  }
});
