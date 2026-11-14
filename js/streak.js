// Pure streak-logica (geen Firebase), zodat ze los te testen is.
// Een dag telt mee zodra je die dag minstens één GP verdient.

const DAG_MS = 86400000;

function naarDatum(iso) {
  const [j, m, d] = iso.split("-").map(Number);
  return Date.UTC(j, m - 1, d);
}

export function dagenTussen(a, b) {
  return Math.round((naarDatum(b) - naarDatum(a)) / DAG_MS);
}

export function plusDagen(iso, n) {
  return new Date(naarDatum(iso) + n * DAG_MS).toISOString().slice(0, 10);
}

// Nieuwe reeks na een verdiende GP op `vandaag`.
export function volgendeReeks(data, vandaag) {
  const laatste = data.reeksDag;
  let reeks;
  if (laatste === vandaag) reeks = data.reeks ?? 1;
  else if (laatste && dagenTussen(laatste, vandaag) === 1) reeks = (data.reeks ?? 0) + 1;
  else reeks = 1;
  const leerdagen = [...new Set([...(data.leerdagen ?? []), vandaag])]
    .filter((d) => dagenTussen(d, vandaag) < 14)
    .sort();
  return { reeks, reeksDag: vandaag, leerdagen };
}

// De reeks zoals ze nu getoond wordt: vervalt als je gisteren én vandaag niets deed.
export function huidigeReeks(data, vandaag) {
  if (!data.reeksDag) return 0;
  const verschil = dagenTussen(data.reeksDag, vandaag);
  return verschil <= 1 ? (data.reeks ?? 0) : 0;
}

// Maandag tot zondag van de week van `vandaag`.
export function dezeWeek(vandaag) {
  const wd = (new Date(naarDatum(vandaag)).getUTCDay() + 6) % 7; // 0 = maandag
  const maandag = plusDagen(vandaag, -wd);
  return ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((label, i) => ({ label, datum: plusDagen(maandag, i) }));
}
