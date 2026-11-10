import { db } from "./firebase.js";
import {
  doc, getDoc, setDoc, increment, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Voorlopige naam van de punten. Later aanpassen = alleen deze regel.
export const PUNTEN_NAAM = "GP";

function vandaag() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Brussels" }); // JJJJ-MM-DD
}

function gebruikerDoc(uid) {
  return doc(db, "users", uid);
}

// Leest de GP-stand. Bestaat het document nog niet, dan start de gebruiker op 0.
export async function laadGP(uid) {
  const snap = await getDoc(gebruikerDoc(uid));
  const data = snap.exists() ? snap.data() : {};
  const dag = vandaag();
  return {
    totaal: data.gp ?? 0,
    vandaag: data.gpDag === dag ? (data.gpVandaag ?? 0) : 0
  };
}

// Kent GP toe en geeft de nieuwe stand terug.
export async function geefGP(uid, aantal) {
  if (!Number.isInteger(aantal) || aantal <= 0) throw new Error("GP moet een positief geheel getal zijn.");
  const dag = vandaag();
  const huidig = await laadGP(uid);
  const nieuweDag = huidig.vandaag === 0;

  await setDoc(gebruikerDoc(uid), {
    gp: increment(aantal),
    gpDag: dag,
    gpVandaag: nieuweDag ? aantal : increment(aantal),
    bijgewerkt: serverTimestamp()
  }, { merge: true });

  return { totaal: huidig.totaal + aantal, vandaag: huidig.vandaag + aantal };
}
