// Vragen uit "Test jezelf" van de cursus Project Management (letterlijk overgenomen).
const QUIZ = {
 planning:[
  {t:'mc',q:'Je buurman vraagt wanneer de blokhut klaar is. Welke drie dingen moet je weten om dat te beantwoorden?',o:['Welke taken er zijn, in welke volgorde ze moeten, en hoe lang elke taak duurt','Hoeveel het pakket kost, hoeveel helpers je hebt en welk weer het wordt','Welke kleur vernis, welk dakmateriaal en welke deur','Hoe groot de tuin is, waar de blokhut komt en wie hem gebruikt'],a:0,w:'Een planning brengt samen wat er moet gebeuren, in welke volgorde, en hoe lang elk stuk duurt.'},
  {t:'multi',q:'Waar denkt een projectleider volgens de cursus allemaal aan bij het plannen? Kies alle juiste.',o:['De fases van het project','De tijd','Het geld','De informatie: wie laat wanneer weten hoe ver het staat','De kleur van de blokhut'],a:[0,1,2,3],w:'Fasering, tijd, geld en informatie. "Alle aspecten" is ruimer dan alleen tijd.'},
  {t:'mc',q:'Wat is het verschil tussen PERT en een Gantt-grafiek in MS Project?',o:['PERT toont op papier wie op wie wacht en berekent de doorlooptijd; de Gantt zet dezelfde taken op een echte kalender met mensen en kosten','PERT is voor kleine projecten, Gantt voor grote','PERT berekent kosten, Gantt berekent tijd','Er is geen verschil'],a:0,w:'Beide gebruiken dezelfde logica. Project weet daarnaast welke dagen er gewerkt wordt en wie wat doet.'}
 ],
 voorbeeld:[
  {t:'mc',q:'Op welke taken moeten de wanden van de blokhut wachten?',o:['Op het uitharden van het beton én op het uitpakken van het pakket','Alleen op het uitharden van het beton','Alleen op het uitpakken','Op het dak'],a:0,w:'Je hebt een harde vloer nodig én de planken.'},
  {t:'mc',q:'Waarom kan de deur al klaargemaakt worden terwijl het beton nog nat is?',o:['Daar heb je alleen het pakket voor nodig, geen fundering','Omdat de deur niet belangrijk is','Omdat het beton sneller hardt','Dat kan niet'],a:0,w:'Slot en scharnieren monteer je op een werkbank. De fundering doet daar niet toe.'},
  {t:'mc',q:'Welke taak is een wachttijd waar niemand aan werkt?',o:['Beton laten uitharden','Bouwpakket uitpakken','Vernissen','Dak leggen'],a:0,w:'Het beton moet drie dagen uitharden. De klok loopt, maar er is geen werk.'}
 ],
 tekenen:[
  {t:'mc',q:'Wat stelt een pijl voor in een PERT-netwerk?',o:['Een taak: er wordt gewerkt en het kost tijd','Een moment','Een deadline','Een persoon'],a:0,w:'Pijlen zijn taken, cirkels zijn momenten.'},
  {t:'mc',q:'Wat stelt de cirkel "pakket uitgepakt" voor?',o:['Het moment waarop het uitpakken klaar is en wat erop wacht kan beginnen','Een taak van één dag','Een vergadering','Het einde van het project'],a:0,w:'Een cirkel kost geen tijd of geld. Het is gewoon het punt waarop iets klaar is.'},
  {t:'mc',q:'Uit welke cirkel vertrekt een taak?',o:['Uit het moment waarop al haar voorgangers klaar zijn, en alleen die','Uit de startcirkel','Uit de cirkel van de vorige regel in de tabel','Uit de cirkel met het laagste nummer'],a:0,w:'Dat is de gouden regel van het tekenen.'},
  {t:'mc',q:'Je wil graag dat het vernissen pas begint als de deur geplaatst is, maar het moet niet. Hoe teken je dat?',o:['Met een afstemmingslijn (stippellijn met A)','Met een relatielijn (stippellijn met 0)','Met een gewone pijl','Je tekent het niet'],a:0,w:'Een afstemmingslijn is een gewenst verband, een relatielijn een noodzakelijk.'}
 ],
 nullijn:[
  {t:'mc',q:'In de foute tekening vertrekken de wanden én het klaarmaken van de deur uit de cirkel "beton hard én pakket uitgepakt". Wat is het probleem?',o:['De deur moet dan ook op het beton wachten, wat niet nodig is','De wanden wachten dan niet meer op het beton','De tekening heeft dan twee eindcirkels','Er is geen probleem'],a:0,w:'Alles wat uit een cirkel vertrekt, wacht op alles wat erin aankomt.'},
  {t:'mc',q:'Wat betekent de stippellijn met 0 van "pakket uitgepakt" naar "beton hard én pakket uitgepakt"?',o:['De wanden wachten ook op het pakket, zonder dat dat extra tijd of werk kost','Er is een taak van nul dagen','Het pakket wordt twee keer uitgepakt','De deur wacht op het beton'],a:0,w:'Een 0-lijn is een noodzakelijk verband zonder tijd, werk of materiaal.'},
  {t:'mc',q:'Wanneer heb je een 0-lijn nodig?',o:['Als twee taken op een deel van dezelfde dingen wachten, maar niet op alles','Telkens een taak langer dan een week duurt','Als een taak geen voorganger heeft','Bij elke schijnactiviteit'],a:0,w:'Wanden: beton en pakket. Deur: alleen pakket. Ze delen het pakket, niet het beton.'},
  {t:'mc',q:'Het plaatsen van deur en ramen wacht op het dak én de klaargemaakte deur. Het vernissen wacht alleen op het dak. Wat heb je nodig?',o:['Een 0-lijn van "dak gelegd" naar de cirkel waar het plaatsen van deur en ramen start','Niets extra','Een afstemmingslijn','Een tweede startcirkel'],a:0,w:'Dezelfde situatie als bij wanden en deur. Daarom staan er twee 0-lijnen in het blokhutnetwerk.'}
 ],
 tijd:[
  {t:'mc',q:'Voor het dak zegt de optimist 1 dag, de ervaren dakdekker 2 dagen en de pessimist 3 dagen. Wat is de verwachte tijd?',o:['2 dagen','3 dagen','1 dag','6 dagen'],a:0,w:'(1 + 4·2 + 3) / 6 = 12 / 6 = 2.'},
  {t:'mc',q:'Voor de wanden: optimist 1, ervaren 2, pessimist 9. Waarom komt er 3 uit en niet 2?',o:['De pessimist trekt het gemiddelde omhoog, omdat er een reële kans is dat het fout loopt','Omdat je altijd een dag extra rekent','Door een afrondingsfout','Omdat de optimist niet meetelt'],a:0,w:'(1 + 8 + 9) / 6 = 3. Een grote uitschieter verschuift de verwachting.'},
  {t:'mc',q:'In de PE schat Raffie optimistisch, Geoffrey realistisch en Melman pessimistisch. Wie telt vier keer mee?',o:['Geoffrey','Raffie','Melman','Allemaal even zwaar'],a:0,w:'De meest waarschijnlijke schatting (t<sub>l</sub>) telt vier keer.'}
 ],
 vroegst:[
  {t:'mc',q:'In de cirkel "beton hard én pakket uitgepakt" komen het uitharden (2 + 3 = 5) en de 0-lijn uit "pakket uitgepakt" (1 + 0 = 1) aan. Wat is de TE?',o:['5','1','6','3'],a:0,w:'Je neemt het grootste: het moment is pas bereikt als alles wat erin aankomt klaar is.'},
  {t:'mc',q:'Wat is de doorlooptijd van de blokhut?',o:['12 dagen','15 dagen','11 dagen','9 dagen'],a:0,w:'De TE van de eindcirkel "blokhut opgeleverd" is 12.'},
  {t:'mc',q:'Je kwam voor de blokhut uit op 9 dagen in plaats van 12. Wat ging er waarschijnlijk mis?',o:['Ergens waar pijlen samenkomen nam je het kleinste in plaats van het grootste getal','Je telde de 0-lijnen als een dag','Je begon bij dag 1 in plaats van 0','Je rekende van rechts naar links'],a:0,w:'In de voorwaartse gang neem je bij samenkomende pijlen altijd het maximum.'}
 ],
 laatst:[
  {t:'mc',q:'Uit "dak gelegd" vertrekken het vernissen (11 − 2 = 9) en de 0-lijn naar "klaar om deur en ramen te plaatsen" (10 − 0 = 10). Wat is de TL van "dak gelegd"?',o:['9','10','11','19'],a:0,w:'In de achterwaartse gang neem je het kleinste: het strengste vervolg beslist.'},
  {t:'mc',q:'Hoeveel speling heeft het uitpakken van het bouwpakket?',o:['4 dagen','0 dagen','1 dag','5 dagen'],a:0,w:'TL van "pakket uitgepakt" (5) − TE van de start (0) − duur (1) = 4.'},
  {t:'mc',q:'De blokhut moet er na 10 dagen staan in plaats van 12. Wat gebeurt er met de speling op het lange pad?',o:['Die wordt −2: je moet versnellen','Die blijft 0','Die wordt +2','Dat heeft er niets mee te maken'],a:0,w:'Negatieve speling betekent dat je de deadline niet haalt zonder extra mensen of middelen.'}
 ],
 kritiek:[
  {t:'multi',q:'Welke taken liggen op het kritieke pad van de blokhut? Kies alle juiste.',o:['Fundering graven en gieten','Beton laten uitharden','Bouwpakket uitpakken','Wanden plaatsen','Deur en ramen klaarmaken','Vernissen'],a:[0,1,3,5],w:'Fundering, uitharden, wanden, dak, vernissen en opleveren hebben speling 0.'},
  {t:'mc',q:'Je wil de blokhut sneller klaar hebben. Wat helpt?',o:['Een sneller hardend beton','Sneller uitpakken','De deur sneller klaarmaken','Niets helpt'],a:0,w:'Alleen inkorten op het kritieke pad verkort het project. Uitpakken en deur klaarmaken hebben speling.'},
  {t:'mc',q:'Een helper is één dag ziek op de dag dat hij de deur zou klaarmaken. Wordt de blokhut later klaar?',o:['Nee, die taak heeft 8 dagen speling','Ja, één dag','Ja, twee dagen','Ja, acht dagen'],a:0,w:'Een vertraging binnen de speling verschuift de einddatum niet.'}
 ],
 gantt:[
  {t:'mc',q:'Wat stelt een ruit voor in een Gantt-grafiek?',o:['Een mijlpaal: een moment zonder duur waarop iets klaar moet zijn','Een samenvattingstaak','Een kritieke taak','Een resource'],a:0,w:'Bijvoorbeeld "fundering klaar".'},
  {t:'mc',q:'Wat betekent het gestippelde kader achter de balk "Bouwpakket uitpakken"?',o:['Zo ver mag de balk opschuiven zonder dat de oplevering verschuift','De taak is vertraagd','De taak is geannuleerd','Een tweede uitvoering van de taak'],a:0,w:'Dat is de speling: 4 dagen.'},
  {t:'mc',q:'Koen moet op dag 6 op twee plaatsen tegelijk zijn, en verschuiven binnen de speling lost het niet op. Je mag geen extra kosten maken. Wat is het gevolg?',o:['De einddatum schuift op','Het project wordt goedkoper','Je huurt een extra helper','Er gebeurt niets'],a:0,w:'Zonder extra kosten moet een taak voorbij haar speling schuiven, en dan schuift het einde mee.'}
 ],
 'msp-start':[
  {t:'mc',q:'Waarom kies je voor automatisch gepland?',o:['Project berekent begin en einde zelf uit de duur, de koppelingen en de kalenders','Dan kan je taken vrij verslepen zonder dat er iets verschuift','Dan worden de werklieden automatisch toegewezen','Dan verdwijnt het kritieke pad'],a:0,w:'Bij handmatig gepland rekent Project niets uit.'},
  {t:'mc',q:'Waar zet je de startdatum van de blokhut (27 oktober 2026)?',o:['Project › Projectgegevens','Bestand › Opties › Planning','Beeld › Tijdschaal','Resource › Resourceblad'],a:0,w:'Daar kies je ook "Plannen vanaf: Begindatum project".'},
  {t:'mc',q:'De taken van de blokhut duren maar een paar uur. Wat pas je best aan?',o:['De tijdschaal, naar dagen met daaronder uren','De taakmodus','De projectkalender','De basislijn'],a:0,w:'Standaard toont de tijdschaal weken en dagen; dan zijn de balken te klein om te lezen.'}
 ],
 'msp-taken':[
  {t:'mc',q:'Je typt 0d als duur bij "Einde voorbereiding". Wat krijg je?',o:['Een mijlpaal','Een samenvattingstaak','Een fout','Een handmatige taak'],a:0,w:'Een taak met duur 0 verschijnt als ruit.'},
  {t:'mc',q:'Een taak van 2 dagen start op vrijdagochtend. Wanneer eindigt ze?',o:['Maandag','Zaterdag','Zondag','Vrijdag'],a:0,w:'Een duur is werktijd: het weekend telt niet mee.'},
  {t:'mc',q:'Hoe verwerk je "beton uitharden, 1 dag" volgens de cursus?',o:['Taak verwijderen en "Verwijderen bekisting" een vertraging van 1 dag geven','Een taak van 1 dag met de drie werklieden','Een mijlpaal van 1 dag','Een notitie'],a:0,w:'Het is wachttijd, geen werk. Een vertraging op de koppeling modelleert dat.'},
  {t:'mc',q:'Waarom geef je "Fundering" zelf geen duur?',o:['Het is een samenvattingstaak; Project berekent de duur uit de taken eronder','Omdat funderingen geen tijd kosten','Omdat het een mijlpaal is','Dat moet wel'],a:0,w:'Je laat de funderingstaken inspringen onder "Fundering".'}
 ],
 'msp-koppel':[
  {t:'mc',q:'"Plaatsen bekisting" begint als "Uitgraven fundering" klaar is. Welk koppeltype is dat?',o:['Einde-Begin','Begin-Begin','Einde-Einde','Begin-Einde'],a:0,w:'De standaard, en dezelfde logica als PERT.'},
  {t:'mc',q:'Twee werklieden beginnen tegelijk aan twee wanden. Welk koppeltype past?',o:['Begin-Begin','Einde-Begin','Einde-Einde','Begin-Einde'],a:0,w:'De tweede taak start samen met de eerste.'},
  {t:'mc',q:'Wat betekent +1d achter een koppeling?',o:['De opvolger start één werkdag later dan anders','De opvolger duurt een dag langer','De opvolger start een dag vroeger','Een mijlpaal na één dag'],a:0,w:'+ is vertraging, − is voorsprong.'}
 ],
 'msp-kal':[
  {t:'mc',q:'Peter neemt verlof op vrijdag 30 oktober. Waar zet je dat?',o:['Als uitzondering in zijn eigen resourcekalender','In de basiskalender','In de projectgegevens','In een notitie'],a:0,w:'Het geldt alleen voor hem.'},
  {t:'mc',q:'Donderdag 29 oktober is een collectieve sluitingsdag. Waar zet je die?',o:['Als uitzondering in de basiskalender','In elke resourcekalender apart','Als mijlpaal','Nergens'],a:0,w:'Het geldt voor iedereen; alle resourcekalenders erven het.'},
  {t:'mc',q:'De werklieden werken van 8:30 tot 17:00 met een half uur pauze. Hoe zet je die pauze in de kalender?',o:['Twee tijdsblokken per dag: 8:30–12:00 en 12:30–17:00','Een uitzondering per dag','Een mijlpaal om 12:00','Dat kan niet'],a:0,w:'Het gat tussen de twee blokken is de pauze.'},
  {t:'mc',q:'Je mensen werken 7,5 uur per dag, maar in de opties staat nog 8 uur per dag. Wat is het gevolg?',o:['Een duur van 1d is langer dan een echte werkdag','Niets','Project past het zelf aan','Alle taken worden handmatig'],a:0,w:'1d is voor Project gewoon een aantal uren.'}
 ],
 'msp-res':[
  {t:'mc',q:'Cement, aangekocht per zak van 50 kg. Welk resourcetype?',o:['Materiaal','Werk','Kosten','Resourcepool'],a:0,w:'Materiaal heeft een prijs per eenheid; het materiaallabel zegt dat een eenheid 50 kg is.'},
  {t:'mc',q:'Het bouwpakket wordt betaald bij aankoop. Wat zet je bij Toerekenen?',o:['Begin','Einde','Evenredig','Niets'],a:0,w:'Toerekenen bepaalt wanneer de kost geboekt wordt.'},
  {t:'mc',q:'Zand kost € 0,25 per 10 kg en je hebt 500 kg nodig. Hoeveel eenheden wijs je toe en wat kost het?',o:['50 eenheden, € 12,50','500 eenheden, € 125','5 eenheden, € 1,25','1 eenheid, € 0,25'],a:0,w:'500 kg / 10 kg = 50 eenheden × € 0,25 = € 12,50.'},
  {t:'mc',q:'Koen, Jan en Peter werken ook aan andere projecten. Wat gebruik je?',o:['Een resourcepool','Een tweede basiskalender','Een basislijn','Een filter'],a:0,w:'Een gedeeld bestand waaruit alle projecten resources halen.'}
 ],
 'msp-type':[
  {t:'mc',q:'"Plan bespreken met werklieden" duurt 1 uur, vaste duur, met de drie werklieden. Hoeveel werk is dat?',o:['3 uur','1 uur','20 minuten','0 uur'],a:0,w:'Werk = Duur × Eenheden = 1 uur × 3.'},
  {t:'mc',q:'Een oprit aanleggen is 1 dag werk (vast werk). Twee mensen doen het. Hoe lang duurt het?',o:['Een halve dag','Eén dag','Twee dagen','Een kwartier'],a:0,w:'Het werk blijft gelijk en wordt verdeeld.'},
  {t:'mc',q:'Een les van 2 uur, en er komen meer studenten bij. Welk taaktype is dat?',o:['Vaste duur','Vast werk','Vaste eenheden','Inspanningsgestuurd'],a:0,w:'De les duurt 2 uur, hoeveel studenten er ook zijn.'},
  {t:'mc',q:'Je zet Koen en Jan tegelijk op een nieuwe taak van 6 uur (vaste eenheden, inspanningsgestuurd). Hoe lang duurt ze?',o:['6 uur, het werk verdubbelt','3 uur','12 uur','Dat kan niet'],a:0,w:'Inspanningsgestuurd werkt pas vanaf de tweede toewijzing.'}
 ],
 'msp-over':[
  {t:'mc',q:'Hoe zie je in Project dat Koen overbelast is?',o:['Hij staat in het rood met een waarschuwingsicoon','Zijn balk is grijs','Hij verdwijnt uit de lijst','Je ziet het niet'],a:0,w:'In het resourceblad en in Resourcegebruik.'},
  {t:'mc',q:'Peter is met verlof en zijn taken worden opgeschort. Wat doet de cursus?',o:['Peter bij die taken weghalen en, waar nodig, Koen toewijzen','Het verlof schrappen','De taken handmatig plannen','Een extra kalender maken'],a:0,w:'Een vrije persoon toewijzen verkort de doorlooptijd.'},
  {t:'mc',q:'Wat doet herverdelen?',o:['Taken opschuiven tot niemand nog overbelast is','Extra mensen aanmaken','Het uurloon aanpassen','Taken verwijderen'],a:0,w:'Eerst binnen de speling, als het moet daarbuiten.'}
 ],
 'msp-kp':[
  {t:'mc',q:'Wat is het verschil tussen totale en vrije speling?',o:['Totale: zonder dat het project later eindigt. Vrije: zonder dat de volgende taak later start.','Er is geen verschil','Vrije speling geldt alleen voor mijlpalen','Totale speling geldt alleen voor kritieke taken'],a:0,w:'De totale speling is wat je in PERT berekende.'},
  {t:'mc',q:'Het kritieke pad in Project loopt anders dan in je PERT-tekening. Hoe kan dat?',o:['Project houdt rekening met kalenders, resources en koppelingen aan mijlpalen','Project gebruikt een andere formule','Project kent geen speling','Dat kan niet, dan zit er een fout in'],a:0,w:'Een sluitingsdag of een werkman die twee taken na elkaar doet, kan een pad langer maken.'},
  {t:'mc',q:'Hoe maak je de kritieke taken rood?',o:['Opmaak › vinkje Kritieke taken','Project › Projectgegevens','Resource › Herverdelen','Beeld › Tijdschaal'],a:0,w:'Eén vinkje op het tabblad Opmaak.'}
 ],
 'msp-base':[
  {t:'mc',q:'Wat is een basislijn?',o:['Een foto van de planning om later mee te vergelijken','De eerste taak','De projectkalender','De lijn van het kritieke pad'],a:0,w:'Zonder basislijn zijn er geen afwijkingen om te tonen.'},
  {t:'mc',q:'Na het instellen van de basislijn voeg je € 10 voor nagels en schroeven toe. Wat zie je?',o:['Een kostenafwijking van € 10','Niets, de basislijn past zich aan','Een fout','Een nieuwe mijlpaal'],a:0,w:'Daarom geef je alle voorziene kosten in voor je de basislijn instelt.'},
  {t:'mc',q:'In welke weergave staat onder elke balk een grijze balk met het oorspronkelijke plan?',o:['Vergelijkende Gantt (Tracking Gantt)','Resourceblad','Teamplanner','Netwerkdiagram'],a:0,w:'Zo zie je per taak of ze voor of achter loopt.'}
 ],
 'msp-voortgang':[
  {t:'mc',q:'Wanneer gebruik je "Werk bijwerken als voltooid tot en met"?',o:['Als alles tot die datum volgens plan liep','Altijd, ook als taken uitliepen','Alleen bij mijlpalen','Om de basislijn te wissen'],a:0,w:'Liep iets anders, dan vul je de werkelijke uren zelf in.'},
  {t:'mc',q:'Je loopt achter en zet een extra helper in om de geplande duur toch te halen. Hoe heet dat?',o:['Terugkoppelen','Vooruitkoppelen','Herverdelen','Basislijn instellen'],a:0,w:'Vooruitkoppelen is de planning herzien op basis van wat er echt gebeurt.'},
  {t:'mc',q:'Waarom is voortgang meten bij software moeilijker dan bij een blokhut?',o:['Uren of regels code zeggen weinig over de kwaliteit','Software heeft geen deadlines','MS Project kan geen software plannen','Programmeurs werken niet met uren'],a:0,w:'Een slecht programma moet misschien opnieuw. Daarom schat je samen het percentage klaar.'}
 ],
 'msp-kost':[
  {t:'mc',q:'Hoe wordt de afwijking in de tabel Kosten berekend?',o:['Totale kosten − basislijn','Basislijn − werkelijke kosten','Werkelijk + resterend','Vaste kosten − totale kosten'],a:0,w:'Positief betekent duurder dan gepland.'},
  {t:'mc',q:'In de budgetkolom met verkeerslicht is de waarde groter dan 0. Wat zie je?',o:['Een rode bol','Een groene bol','Niets','Een gele bol'],a:0,w:'Groter dan 0 betekent meer uitgegeven dan gepland.'},
  {t:'mc',q:'De € 10 voor nagels en schroeven hangt aan de taak zelf, niet aan een werkman. Wat voor kost is dat?',o:['Een vaste kost','Een resourcekost','Een overuurkost','Een basislijnkost'],a:0,w:'Vaste kosten staan in een eigen kolom in de tabel Kosten.'}
 ],
 'msp-view':[
  {t:'mc',q:'Je wil alleen zien wat nog moet gebeuren. Wat doe je?',o:['Filter "Niet-voltooide taken"','Groeperen op duur','Inzoomen','Een basislijn instellen'],a:0,w:'Een filter werkt zoals in Excel.'},
  {t:'mc',q:'Je wil de duurste taken bovenaan. Wat doe je?',o:['Groeperen op Kosten basislijn, aflopend','Filteren op Kritiek','Inzoomen op het volledige project','Herverdelen'],a:0,w:'Met Groeperen op kies je het veld en de volgorde.'},
  {t:'mc',q:'Wat doe je vóór je een screenshot neemt van de hele planning?',o:['Beeld › Zoomen › Volledig project','Bestand › Opslaan als','Project › Basislijn instellen','Resource › Herverdelen'],a:0,w:'Zo past alles op het scherm.'}
 ]
};

const TITELS = {"planning": "Waarom plannen?", "voorbeeld": "Het voorbeeld: een blokhut in de tuin", "tekenen": "Van takenlijst naar tekening", "nullijn": "De stippellijn met een 0", "tijd": "Hoe lang duurt een taak?", "vroegst": "Wanneer kan je op z'n vroegst beginnen?", "laatst": "Hoe lang mag je wachten?", "kritiek": "Het kritieke pad", "gantt": "Van tekening naar Gantt-grafiek", "msp-start": "De blokhut in MS Project", "msp-taken": "Taken, fases en mijlpalen", "msp-koppel": "Wie wacht op wie: koppelingen", "msp-kal": "Wanneer wordt er gewerkt: kalenders", "msp-res": "Mensen en materiaal: resources", "msp-type": "Wie doet wat: toewijzen en taaktypes", "msp-over": "Te veel werk voor één persoon", "msp-kp": "Het kritieke pad in MS Project", "msp-base": "Een foto van je planning: de basislijn", "msp-voortgang": "Bijhouden hoe ver je staat", "msp-kost": "Kosten in het oog houden", "msp-view": "Overzichten maken"};

export default {
  vak: "Project Management",
  opslag: "studyraf-pm-oefenlab-v2",
  cursus: "cursus.html",
  hoofdstukken: Object.keys(QUIZ).map((id) => ({ id, titel: TITELS[id] || id, vragen: QUIZ[id] }))
};
