import { auth, provider } from "./firebase.js";
import { onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { VAKKEN } from "./vakken.js";

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
      li.textContent = deel;
      delen.append(li);
    }

    const voet = document.createElement("div");
    voet.className = "vak__voet";
    for (let i = 0; i < 6; i++) voet.append(document.createElement("span"));
    const status = document.createElement("strong");
    status.textContent = vak.beschikbaar ? "Start" : "Binnenkort";
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
  if (user) {
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
