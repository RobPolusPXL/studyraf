import { auth, provider } from "./firebase.js";
import { onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { VAKKEN } from "./vakken.js";

const $ = (id) => document.getElementById(id);
const loginView = $("login");
const hubView = $("hub");
const loginError = $("login-error");

function voornaam(user) {
  const naam = user.displayName || user.email || "";
  return naam.split(" ")[0].split("@")[0];
}

function renderVakken() {
  const lijst = $("vakken");
  lijst.replaceChildren();
  for (const vak of VAKKEN) {
    const kaart = document.createElement("article");
    kaart.className = "vak" + (vak.beschikbaar ? "" : " vak--binnenkort");

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

    const status = document.createElement("span");
    status.className = "vak__status";
    status.textContent = vak.beschikbaar ? "Start" : "Binnenkort";

    kaart.append(titel, sub, delen, status);
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
    $("welkom").textContent = `Hoi ${voornaam(user)}. Kies een vak.`;
    renderVakken();
    loginView.hidden = true;
    hubView.hidden = false;
  } else {
    hubView.hidden = true;
    loginView.hidden = false;
  }
});
