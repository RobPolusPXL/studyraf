import { db } from "./firebase.js";
import {
  doc, getDoc, setDoc, increment, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import { volgendeReeks, huidigeReeks } from "./streak.js";

// Voorlopige naam van de punten. Later aanpassen = alleen deze regel.
export const PUNTEN_NAAM = "GP";

function vandaag() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Brussels" }); // JJJJ-MM-DD
}

function gebruikerDoc(uid) {
  return doc(db, "users", uid);
}

async function leesData(uid) {
  const snap = await getDoc(gebruikerDoc(uid));
  return snap.exists() ? snap.data() : {};
}

function stand(data, dag) {
  return {
    totaal: data.gp ?? 0,
    vandaag: data.gpDag === dag ? (data.gpVandaag ?? 0) : 0,
    reeks: huidigeReeks(data, dag),
    leerdagen: data.leerdagen ?? [],
    vandaagGeleerd: data.reeksDag === dag
  };
}

// Leest de GP-stand en de reeks. Bestaat het document nog niet, dan start alles op 0.
export async function laadGP(uid) {
  return stand(await leesData(uid), vandaag());
}

// Kent GP toe, werkt de reeks bij en geeft de nieuwe stand terug.
export async function geefGP(uid, aantal) {
  if (!Number.isInteger(aantal) || aantal <= 0) throw new Error("GP moet een positief geheel getal zijn.");
  const dag = vandaag();
  const data = await leesData(uid);
  const nieuweDag = data.gpDag !== dag;
  const reeks = volgendeReeks(data, dag);

  await setDoc(gebruikerDoc(uid), {
    gp: increment(aantal),
    gpDag: dag,
    gpVandaag: nieuweDag ? aantal : increment(aantal),
    ...reeks,
    bijgewerkt: serverTimestamp()
  }, { merge: true });

  return stand({
    ...data, ...reeks,
    gp: (data.gp ?? 0) + aantal,
    gpDag: dag,
    gpVandaag: (nieuweDag ? 0 : (data.gpVandaag ?? 0)) + aantal
  }, dag);
}

export { vandaag };
