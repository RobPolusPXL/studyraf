// Vragen uit "Test jezelf" van de cursus Project Management (letterlijk overgenomen).
const QUIZ = {
 planning:[
  {t:'mc',q:'Wat is volgens de cursus de definitie van projectplanning?',o:['Het organiseren van alle aspecten van een project','Het tekenen van een Gantt-grafiek','Het berekenen van het kritieke pad','Het verdelen van het budget over de fases'],a:0,w:'De cursus definieert projectplanning breed: het organiseren van <em>alle</em> aspecten. Gantt en kritiek pad zijn hulpmiddelen daarbinnen.'},
  {t:'multi',q:'Welke aspecten behandelt een projectplanning volgens de cursus? Kies alle juiste.',o:['Fasering','Tijd','Geld','Informatie (rapportering)','Marketingcampagne','Functioneringsgesprekken'],a:[0,1,2,3],w:'Fasering, tijd, geld en informatie, vertrekkend van het project scope statement.'},
  {t:'mc',q:'Waar vertrekt een planning van?',o:['Het project scope statement en de work breakdown structure','De Gantt-grafiek','De basislijn in MS Project','De resourcepool'],a:0,w:'Eerst bepaal je wat het project oplevert (PSS) en in welke werkpakketten dat uiteenvalt (WBS). Pas dan plan je.'}
 ],
 pert:[
  {t:'mc',q:'Wat is het belangrijkste verschil tussen PERT en CPM?',o:['PERT rekent met drie schattingen per activiteit, CPM met één vaste duur','CPM kent geen kritiek pad','PERT werkt alleen in MS Project','CPM gebruikt geen netwerk'],a:0,w:'PERT voegt een kansberekening toe via drie schattingen. Daarna verloopt de analyse bij beide hetzelfde.'},
  {t:'multi',q:'Welke voordelen van netwerkplanning noemt de cursus? Kies alle juiste.',o:['Goede voortgangscontrole','Betere communicatie via het netwerk','Bottlenecks opsporen','Het project wordt automatisch goedkoper','Je hebt geen schattingen meer nodig'],a:[0,1,2],w:'Voortgangscontrole, communicatie en het opsporen van bottlenecks.'},
  {t:'mc',q:'Een activiteit die niet op het langste pad ligt, loopt twee dagen uit. Wat gebeurt er met de einddatum?',o:['Niets, zolang de vertraging binnen haar speling blijft','Ze schuift altijd twee dagen op','Ze schuift één dag op','Het project moet herpland worden'],a:0,w:'Alleen activiteiten op het langste pad bepalen de doorlooptijd. Andere mogen uitlopen binnen hun speling.'}
 ],
 begrippen:[
  {t:'mc',q:'Wat stelt een cirkel voor in een PERT-netwerk van de cursus?',o:['Een gebeurtenis: het begin of einde van activiteiten','Een activiteit','Een mijlpaal met een duur','Een resource'],a:0,w:'Een knooppunt neemt geen tijd, arbeid of grondstoffen in. Activiteiten zijn de pijlen.'},
  {t:'mc',q:'Wat is het verschil tussen een relatielijn en een afstemmingslijn?',o:['Een relatielijn is een noodzakelijk verband (0), een afstemmingslijn een gewenst verband (A)','Een relatielijn heeft een duur, een afstemmingslijn niet','Een afstemmingslijn verbindt altijd twee startknooppunten','Er is geen verschil'],a:0,w:'Beide zijn stippellijnen zonder tijd of middelen. De relatielijn is noodzakelijk, de afstemmingslijn gewenst.'},
  {t:'mc',q:'Wat staat in de cursusnotatie rechts onder in een knooppunt?',o:['TL','TE','Het knooppuntnummer','De speling'],a:0,w:'Links het nummer, rechts boven TE, rechts onder TL.'},
  {t:'mc',q:'Beton moet een dag uitharden voor je verder kan. Hoe heet dat in PERT?',o:['Een schijnactiviteit','Een relatielijn','Een afstemmingslijn','Een knooppunt'],a:0,w:'Een schijnactiviteit is een noodzakelijke wachttijd: ze neemt tijd, maar geen mankracht of middelen.'}
 ],
 tekenen:[
  {t:'mc',q:'C wacht op A en B, D wacht alleen op B. Wat heb je nodig om dit correct te tekenen?',o:['Een relatielijn van het eindknooppunt van B naar het vertrekpunt van C','Een afstemmingslijn tussen A en D','Een tweede eindknooppunt','Niets, A en B kunnen in hetzelfde knooppunt eindigen'],a:0,w:'Laat je A en B in hetzelfde knooppunt eindigen, dan wacht D ook op A. De 0-lijn lost dat op.'},
  {t:'mc',q:'Waarom mogen twee activiteiten niet tussen hetzelfde paar knooppunten lopen?',o:['Je kan ze dan niet meer van elkaar onderscheiden','Ze krijgen dan samen duur 0','MS Project kan ze dan niet importeren','Ze worden dan altijd kritiek'],a:0,w:'Een activiteit wordt geïdentificeerd door haar begin- en eindknooppunt. Twee keer hetzelfde paar is dubbelzinnig.'},
  {t:'order',q:'Zet de werkwijze om een netwerk te tekenen in volgorde.',o:['Startknooppunt tekenen','Activiteiten zonder voorganger uit het startknooppunt laten vertrekken','Elke volgende activiteit laten vertrekken waar haar voorgangers eindigen (desnoods met een 0-lijn)','Activiteiten zonder opvolger in het eindknooppunt laten eindigen','Elke activiteit controleren tegen de tabel'],w:'Van start naar einde, en op het einde controleer je alles tegen de tabel.'}
 ],
 tijd:[
  {t:'mc',q:'to = 2, tl = 5, tp = 14. Wat is te?',o:['6','7','5','8'],a:0,w:'(2 + 4·5 + 14) / 6 = 36 / 6 = 6.'},
  {t:'mc',q:'Welke schatting weegt het zwaarst in de formule?',o:['De meest waarschijnlijke (tl)','De optimistische (to)','De pessimistische (tp)','Ze wegen alle drie even zwaar'],a:0,w:'tl telt vier keer mee, to en tp elk één keer.'},
  {t:'mc',q:'to = 4, tl = 4, tp = 16. Waarom is te groter dan tl?',o:['De grote pessimistische schatting trekt het gemiddelde omhoog','Omdat te altijd groter is dan tl','Omdat to en tl gelijk zijn','Door een afrondingsfout'],a:0,w:'te = (4 + 16 + 16) / 6 = 6. De uitschieter naar boven verschuift het resultaat.'}
 ],
 analyse:[
  {t:'mc',q:'In een knooppunt komen twee pijlen aan: TE(begin) + te geeft 12 en 15. Wat is de TE van het knooppunt?',o:['15','12','13,5','27'],a:0,w:'In de voorwaartse gang neem je het grootste: het knooppunt is pas bereikt als alle inkomende activiteiten klaar zijn.'},
  {t:'mc',q:'Uit een knooppunt vertrekken twee pijlen: TL(einde) − te geeft 20 en 17. Wat is de TL?',o:['17','20','18,5','37'],a:0,w:'In de achterwaartse gang neem je het kleinste: het strengste pad beslist.'},
  {t:'mc',q:'Een activiteit loopt van knooppunt i (TE = 10) naar j (TL = 25) en heeft te = 9. Hoeveel speling heeft ze?',o:['6','15','9','0'],a:0,w:'Speling = TL(j) − TE(i) − te = 25 − 10 − 9 = 6.'},
  {t:'mc',q:'Wanneer kan speling negatief worden?',o:['Als je de TL van het eindknooppunt gelijkstelt aan een opgelegde deadline die vroeger ligt dan de berekende TE','Als een activiteit een relatielijn heeft','Als er twee kritieke paden zijn','Nooit'],a:0,w:'Dan moeten activiteiten versneld worden om de deadline te halen.'}
 ],
 kritiek:[
  {t:'mc',q:'Hoe vind je het kritieke pad?',o:['Je zoekt de activiteiten met speling 0 die een doorlopend pad van start tot einde vormen','Je kiest het pad met de meeste activiteiten','Je kiest het pad met de duurste activiteiten','Je kiest het pad met de meeste relatielijnen'],a:0,w:'Het kritieke pad is het langste pad, en daarop is de speling overal 0.'},
  {t:'multi',q:'Welke uitspraken kloppen? Kies alle juiste.',o:['Een project kan meer dan één kritiek pad hebben','Een relatielijn kan op het kritieke pad liggen','Een activiteit tussen twee knooppunten met TE = TL is altijd kritiek','Een activiteit met speling inkorten maakt het project korter'],a:[0,1],w:'Twee paden kunnen even lang zijn, en een 0-lijn kan op het pad liggen. Activiteit D in de piramide toont dat de derde fout is, en inkorten buiten het kritieke pad levert niets op.'},
  {t:'mc',q:'Je wil het project korter maken. Welke activiteit kort je best in?',o:['Een kritieke activiteit','De activiteit met de meeste speling','De eerste activiteit, ongeacht het pad','De kortste activiteit'],a:0,w:'Alleen inkorten op het kritieke pad verkort de doorlooptijd, tot een ander pad kritiek wordt.'}
 ],
 voorbeeld:[
  {t:'mc',q:'Waarom start C in de piramide pas op tijdstip 3 en niet op 2?',o:['C wacht ook op B, en B duurt 3 jaar','A duurt 3 jaar','Door de relatielijn duurt C een jaar langer','C heeft een jaar speling'],a:0,w:'Knooppunt II krijgt A (0 + 2) en de 0-lijn uit III (3 + 0). Het maximum is 3.'},
  {t:'mc',q:'Hoeveel speling heeft D (leid beeldhouwers op)?',o:['6 jaar','0 jaar','3 jaar','1 jaar'],a:0,w:'TL(V) − TE(III) − te = 12 − 3 − 3 = 6.'},
  {t:'mc',q:'Waarom heeft de piramide twee kritieke paden?',o:['E en F duren allebei 10 jaar en lopen parallel tussen dezelfde momenten','Omdat er twee relatielijnen zijn','Omdat A en B tegelijk starten','Omdat H de langste activiteit is'],a:0,w:'Beide takken komen samen in knooppunt VI op tijdstip 22, dus geen van beide heeft speling.'}
 ],
 gantt:[
  {t:'mc',q:'Wat stelt een (zwarte) ruit voor in een Gantt-grafiek?',o:['Een mijlpaal','Een samenvattingstaak','Een kritieke taak','Een resource'],a:0,w:'Een mijlpaal is een ijkpunt zonder duur.'},
  {t:'mc',q:'In de tijdschaalvoorstelling op papier betekent een verticale stippellijn…',o:['dat er geen speling is','dat er speling is','dat de taak vertraagd is','dat er een mijlpaal is'],a:0,w:'Een schuine stippellijn wijst op speling, een verticale op geen speling. Zo volg je het kritieke pad terug.'},
  {t:'mc',q:'Een resource blijft overbezet, ook na verschuiven binnen de speling. Je mag geen extra kosten maken. Wat is het gevolg?',o:['De speling wordt overschreden en de einddatum schuift op','Het project wordt goedkoper','De overbezetting verdwijnt vanzelf','Je moet extra mensen inhuren'],a:0,w:'Dat is de tweede optie uit de cursus. De eerste (doorlooptijd behouden) kost geld.'},
  {t:'mc',q:'Waardoor ontstaan projectkosten volgens de cursus?',o:['Door het gebruik en verbruik van hulpmiddelen','Alleen door lonen','Alleen door materiaal','Door de basislijn'],a:0,w:'Gebruik (mensen, computers) en verbruik (papier, elektriciteit), berekend per activiteit.'}
 ],
 'msp-start':[
  {t:'mc',q:'Waarom kies je voor automatisch gepland?',o:['Project berekent begin en einde uit duur, koppelingen en kalenders','Dan kan je datums vrij verslepen zonder dat iets verschuift','Dan worden resources automatisch toegewezen','Dan wordt het kritieke pad uitgeschakeld'],a:0,w:'Bij handmatig gepland rekent Project niets: de datums staan waar jij ze zet.'},
  {t:'mc',q:'Waar stel je de begindatum van het project in?',o:['Project › Projectgegevens','Bestand › Opties › Planning','Beeld › Tijdschaal','Resource › Resourceblad'],a:0,w:'In Projectgegevens kies je de begindatum en "Plannen vanaf: Begindatum project".'},
  {t:'mc',q:'Wat toont de projectsamenvattingstaak?',o:['Rij 0 met naam, totale duur en totale kost van het project','De eerste fase van het project','Alle mijlpalen','De resourcekalender'],a:0,w:'Je zet ze aan via Opmaak › Projectsamenvattingstaak.'}
 ],
 'msp-taken':[
  {t:'mc',q:'Je typt 0d als duur van een taak. Wat krijg je?',o:['Een mijlpaal','Een samenvattingstaak','Een handmatig geplande taak','Een fout'],a:0,w:'Een taak met duur 0 wordt als mijlpaal (ruit) getoond.'},
  {t:'mc',q:'Een taak van 2d start op vrijdagochtend (standaardkalender). Wanneer eindigt ze?',o:['Maandag','Zaterdag','Zondag','Vrijdag'],a:0,w:'Een duur is werktijd. Het weekend telt niet mee.'},
  {t:'mc',q:'Hoe verwerk je "beton uitharden, 1 dag" volgens de blokhut-oefening?',o:['Taak verwijderen en de opvolger een vertraging van 1 dag geven','Een taak van 1d met alle werklieden','Een mijlpaal van 1 dag','Een notitie bij de vorige taak'],a:0,w:'Het is wachttijd, geen werk. Een vertraging (lag) op de koppeling modelleert dat.'},
  {t:'mc',q:'Waarom koppel je de taken van een nieuwe fase aan de mijlpaal van de vorige fase?',o:['Voeg je later een taak toe aan die fase, dan hoef je alleen die taak aan de mijlpaal te koppelen','Omdat MS Project geen koppeling naar een gewone taak toelaat','Omdat mijlpalen geen kalender hebben','Omdat het kritieke pad anders verdwijnt'],a:0,w:'De mijlpaal bundelt het einde van de fase op één plek.'}
 ],
 'msp-koppel':[
  {t:'mc',q:'Welk koppelingstype komt overeen met de PERT-logica?',o:['Einde-Begin','Begin-Begin','Einde-Einde','Begin-Einde'],a:0,w:'B start als A klaar is: dat is de standaard in Project.'},
  {t:'mc',q:'Twee taken moeten samen starten. Welk type kies je?',o:['Begin-Begin','Einde-Begin','Einde-Einde','Begin-Einde'],a:0,w:'Begin-Begin: B start samen met (of na de start van) A.'},
  {t:'mc',q:'Wat betekent +1d achter een koppeling?',o:['Een vertraging van één werkdag','Een voorsprong van één dag','De taak duurt één dag langer','Een mijlpaal na één dag'],a:0,w:'+ is vertraging (lag), − is voorsprong (lead).'}
 ],
 'msp-kal':[
  {t:'mc',q:'Peter neemt een dag verlof. Waar zet je die dag?',o:['Als uitzondering in zijn resourcekalender','Als uitzondering in de basiskalender','In de projectgegevens','In een notitie bij zijn taken'],a:0,w:'Verlof van één persoon hoort in zijn eigen resourcekalender.'},
  {t:'mc',q:'Het hele bedrijf is op een dag gesloten. Waar zet je die dag?',o:['Als uitzondering in de basiskalender','In elke resourcekalender apart','Als mijlpaal','In de projectsamenvattingstaak'],a:0,w:'Wat voor iedereen geldt, zet je in de basiskalender: alle resourcekalenders erven het.'},
  {t:'mc',q:'Je kalender telt 7,5 werkuren per dag, maar Opties staat op 8 uur per dag. Wat is het gevolg?',o:['Een duur van 1d is langer dan één werkdag','Er gebeurt niets','Project past de kalender automatisch aan','Alle taken worden handmatig gepland'],a:0,w:'1d is in Project gewoon een aantal uren. Die moeten overeenkomen met je kalender.'},
  {t:'mc',q:'Hoe maak je een middagpauze in een werkweek?',o:['Twee tijdsblokken per dag, bv. 8:30–12:00 en 12:30–17:00','Een uitzondering per dag','Een mijlpaal om 12:00','Een tweede kalender'],a:0,w:'Per dag geef je één of meer tijdsblokken op. De pauze is het gat ertussen.'}
 ],
 'msp-res':[
  {t:'mc',q:'Cement, aangekocht per 50 kg. Welk resourcetype is dat?',o:['Materiaal','Werk','Kosten','Resourcepool'],a:0,w:'Materiaal heeft een prijs per eenheid; het materiaallabel zegt wat een eenheid is.'},
  {t:'mc',q:'Wat bepaalt de kolom Toerekenen (Accrue At)?',o:['Wanneer de kost geboekt wordt: begin, einde of evenredig','Hoeveel uur iemand per dag werkt','Het overuurtarief','Welke kalender gebruikt wordt'],a:0,w:'Het bouwpakket van de blokhut wordt bijvoorbeeld aan het begin betaald.'},
  {t:'mc',q:'Zand kost € 0,25 per 10 kg (materiaallabel 10 kg). Je wijst 50 eenheden toe. Wat kost dat?',o:['€ 12,50','€ 125','€ 1,25','€ 0,25'],a:0,w:'50 × € 0,25 = € 12,50 voor 500 kg.'},
  {t:'mc',q:'Wat is een resourcepool?',o:['Een gedeeld bestand met resources waaruit meerdere projecten toewijzen','Een lijst met overbelaste resources','De kalender van alle resources samen','Een rapport met de kosten per resource'],a:0,w:'In grote organisaties delen projecten dezelfde mensen via een pool.'}
 ],
 'msp-type':[
  {t:'mc',q:'Een taak van 2d met één voltijdse persoon (8 u per dag). Hoeveel werk is dat?',o:['16 uur','8 uur','2 uur','32 uur'],a:0,w:'Werk = Duur × Eenheden = 2 × 8 u × 100%.'},
  {t:'mc',q:'Vaste duur, 1 uur, drie werklieden. Hoeveel werk telt Project?',o:['3 uur','1 uur','20 minuten','0 uur'],a:0,w:'Bij vaste duur telt elke resource de volle duur.'},
  {t:'mc',q:'Vast werk van 1 dag, uitgevoerd door twee personen. Hoe lang duurt de taak?',o:['Een halve dag','Eén dag','Twee dagen','Een kwartier'],a:0,w:'Het werk blijft 1 dag, verdeeld over twee mensen.'},
  {t:'mc',q:'Je wijst twee personen tegelijk toe aan een nieuwe taak van 6 dagen (vaste eenheden, inspanningsgestuurd). Hoe lang duurt ze?',o:['6 dagen, het werk verdubbelt','3 dagen','12 dagen','Dat kan Project niet'],a:0,w:'Inspanningsgestuurd werkt pas vanaf de tweede toewijzing. Eerst één persoon, dan de tweede toevoegen, halveert de duur.'}
 ],
 'msp-over':[
  {t:'mc',q:'Hoe toont Project een overbelaste resource?',o:['In het rood, met een waarschuwingsicoon','Met een grijze balk','Als mijlpaal','Helemaal niet'],a:0,w:'In het resourceblad en in Resourcegebruik zie je de overbelasting meteen.'},
  {t:'mc',q:'Wat doet herverdelen (leveling)?',o:['Taken opschuiven tot niemand meer overbelast is','Extra resources aanmaken','Het tarief van resources aanpassen','Taken verwijderen'],a:0,w:'Project schuift taken binnen (of buiten) hun speling.'},
  {t:'mc',q:'Blokhut: Peter is met verlof tijdens zijn taken, waardoor die lang opgeschort worden. Welke oplossing geeft de cursus?',o:['Peter bij die taken weghalen en eventueel Koen toewijzen','Het verlof van Peter schrappen','De taken handmatig plannen','Een extra basiskalender maken'],a:0,w:'Een andere, vrije persoon toewijzen verkort de doorlooptijd.'}
 ],
 'msp-kp':[
  {t:'mc',q:'Wat is het verschil tussen totale en vrije speling?',o:['Totale speling: zonder dat het project later eindigt; vrije speling: zonder dat de volgende taak later start','Er is geen verschil','Vrije speling geldt alleen voor mijlpalen','Totale speling geldt alleen voor kritieke taken'],a:0,w:'De totale speling is de speling uit PERT.'},
  {t:'mc',q:'Waarom kan het kritieke pad in Project afwijken van je PERT-schema?',o:['Door kalenders, resources en koppelingen aan mijlpalen','Omdat Project een andere formule voor te gebruikt','Omdat Project geen relatielijnen kent','Dat kan niet'],a:0,w:'Project rekent met meer informatie dan het PERT-netwerk.'},
  {t:'mc',q:'Waar zet je de rode kritieke taken aan?',o:['Opmaak › Kritieke taken','Project › Projectgegevens','Resource › Herverdelen','Beeld › Tijdschaal'],a:0,w:'Een vinkje op het tabblad Opmaak.'}
 ],
 'msp-base':[
  {t:'mc',q:'Wat is een basislijn?',o:['Een snapshot van de planning om de uitvoering mee te vergelijken','De eerste taak van het project','De projectkalender','De lijn van het kritieke pad'],a:0,w:'Zonder basislijn zijn er geen afwijkingen om te tonen.'},
  {t:'mc',q:'Je voegt ná het instellen van de basislijn € 10 vaste kost toe aan een taak. Wat zie je?',o:['Een kostenafwijking van € 10','Niets, de basislijn past zich aan','Een fout','Een nieuwe mijlpaal'],a:0,w:'Daarom geef je alle voorziene kosten in vóór je de basislijn opslaat.'},
  {t:'mc',q:'Welke weergave toont onder elke balk een grijze basislijnbalk?',o:['Vergelijkende Gantt (Tracking Gantt)','Resourceblad','Teamplanner','Netwerkdiagram'],a:0,w:'Zo zie je per taak of ze voor of achter loopt op de basislijn.'}
 ],
 'msp-voortgang':[
  {t:'mc',q:'Wanneer gebruik je "Werk bijwerken als voltooid tot en met"?',o:['Als de uitvoering vrijwel gelijk loopt met de planning','Altijd, ook als taken uitlopen','Alleen voor mijlpalen','Om de basislijn te wissen'],a:0,w:'Loopt een taak anders, dan vul je de werkelijke uren zelf in.'},
  {t:'mc',q:'Je ligt achter en zet extra mensen in om de geschatte duur toch te halen. Hoe heet dat?',o:['Terugkoppelen','Vooruitkoppelen','Herverdelen','Basislijn instellen'],a:0,w:'Vooruitkoppelen is de tijden herzien en een nieuwe planning maken.'},
  {t:'mc',q:'Waarom is voortgangscontrole bij software extra moeilijk volgens de cursus?',o:['Gewerkte uren of aantal regels code zeggen niets over de kwaliteit','Software heeft geen deadlines','MS Project kan geen software plannen','Programmeurs schatten altijd te laag'],a:0,w:'Een slecht geschreven programma moet misschien herschreven worden. Daarom schat je samen het percentage voltooid.'}
 ],
 'msp-kost':[
  {t:'mc',q:'Hoe wordt de Afwijking in de tabel Kosten berekend?',o:['Totale kosten − basislijn','Basislijn − werkelijke kosten','Werkelijk + resterend','Vaste kosten − totale kosten'],a:0,w:'Positief betekent duurder dan gepland.'},
  {t:'mc',q:'In de budgetkolom met verkeerslicht is Kosten1 groter dan 0. Wat zie je?',o:['Een rode bol','Een groene bol','Niets','Een gele bol'],a:0,w:'Kosten1 verwijst naar de kostenafwijking: groter dan 0 = extra kosten = rood.'},
  {t:'mc',q:'Wat is het verschil tussen vaste kosten en resourcekosten?',o:['Vaste kosten hangen aan de taak zelf, niet aan een resource','Vaste kosten worden nooit getoond','Resourcekosten zijn altijd eenmalig','Er is geen verschil'],a:0,w:'De nagels en schroeven van € 10 in de blokhut zijn een vaste kost op de taak.'}
 ],
 'msp-view':[
  {t:'mc',q:'Wat is de snelste manier om alleen niet-voltooide taken te tonen?',o:['Een filter "Niet-voltooide taken"','De taken één voor één verbergen','Een nieuw project maken','Groeperen op duur'],a:0,w:'Beeld › Filter werkt zoals filteren in Excel.'},
  {t:'mc',q:'Je wil de duurste taken bovenaan. Wat doe je?',o:['Groeperen op Kosten basislijn, aflopend','Filteren op Kritiek','Inzoomen op het volledige project','Een basislijn instellen'],a:0,w:'Met Groeperen op kies je het veld en de volgorde.'},
  {t:'mc',q:'Wat doe je vóór je een screenshot neemt van het volledige project?',o:['Beeld › Zoomen › Volledig project','Bestand › Opslaan als','Project › Basislijn instellen','Resource › Herverdelen'],a:0,w:'Zo past de hele planning in de Gantt.'}
 ]
};

const TITELS = {"planning": "Wat is projectplanning?", "pert": "PERT: de methode", "begrippen": "Hoofdbegrippen en symbolen", "tekenen": "Een netwerk tekenen", "tijd": "De verwachte tijd (Te)", "analyse": "TE, TL en speling", "kritiek": "Het kritieke pad", "voorbeeld": "Uitgewerkt voorbeeld: de piramide", "gantt": "De Gantt-grafiek", "msp-start": "MS Project: een project opzetten", "msp-taken": "Taken, fases en mijlpalen", "msp-koppel": "Afhankelijkheden", "msp-kal": "Kalenders", "msp-res": "Resources", "msp-type": "Toewijzen en taaktypes", "msp-over": "Overbelasting en herverdelen", "msp-kp": "Kritiek pad en speling in Project", "msp-base": "De basislijn", "msp-voortgang": "Voortgang bijwerken", "msp-kost": "Kosten bewaken", "msp-view": "Filters, groeperen en rapporten"};

export default {
  vak: "Project Management",
  opslag: "studyraf-pm-oefenlab",
  cursus: "cursus.html",
  hoofdstukken: Object.keys(QUIZ).map((id) => ({ id, titel: TITELS[id] || id, vragen: QUIZ[id] }))
};
