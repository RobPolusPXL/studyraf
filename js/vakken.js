// Eén vak = één kaart in de hub. `beschikbaar: true` zodra de cursus in de repo staat.
export const VAKKEN = [
  { id: "java-advanced", naam: "Java Advanced", sub: "Spring Boot", kleur: "#a94a17", delen: ["Cursus", "Oefenlab"], links: { Cursus: "cursus.html", Oefenlab: "oefenlab.html" }, start: "Oefenlab", beschikbaar: true },
  { id: "dotnet-advanced", naam: ".NET Advanced", sub: "C# en .NET", kleur: "#4b3bb0", delen: ["Cursus", "Oefenlab"], beschikbaar: false },
  { id: "devops", naam: "DevOps", sub: "CI/CD en GitHub Actions", kleur: "#1f5fbf", delen: ["Cursus", "Oefenlab", "Pipeline Lab"], beschikbaar: false },
  { id: "docker", naam: "Docker", sub: "Containers", kleur: "#11698c", delen: ["Cursus"], beschikbaar: false },
  { id: "cloud-essentials", naam: "Cloud Essentials", sub: "AWS en cloudbasis", kleur: "#17695f", delen: ["Cursus"], beschikbaar: false },
  { id: "software-analysis", naam: "Software Analysis", sub: "Analyse en modellering", kleur: "#6b5024", delen: ["Cursus"], beschikbaar: false },
  { id: "comm-skills-2", naam: "Communication Skills 2", sub: "Engels voor IT", kleur: "#a32b5c", delen: ["Lab"], beschikbaar: false }
];
