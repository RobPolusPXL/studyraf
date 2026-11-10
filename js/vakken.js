// Eén vak = één kaart in de hub. `beschikbaar: true` zodra de cursus in de repo staat.
export const VAKKEN = [
  { id: "java-advanced", naam: "Java Advanced", sub: "Spring Boot", delen: ["Cursus", "Oefenlab"], beschikbaar: false },
  { id: "dotnet-advanced", naam: ".NET Advanced", sub: "C# en .NET", delen: ["Cursus", "Oefenlab"], beschikbaar: false },
  { id: "devops", naam: "DevOps", sub: "CI/CD en GitHub Actions", delen: ["Cursus", "Oefenlab", "Pipeline Lab"], beschikbaar: false },
  { id: "docker", naam: "Docker", sub: "Containers", delen: ["Cursus"], beschikbaar: false },
  { id: "cloud-essentials", naam: "Cloud Essentials", sub: "AWS en cloudbasis", delen: ["Cursus"], beschikbaar: false },
  { id: "software-analysis", naam: "Software Analysis", sub: "Analyse en modellering", delen: ["Cursus"], beschikbaar: false },
  { id: "comm-skills-2", naam: "Communication Skills 2", sub: "Engels voor IT", delen: ["Lab"], beschikbaar: false }
];
