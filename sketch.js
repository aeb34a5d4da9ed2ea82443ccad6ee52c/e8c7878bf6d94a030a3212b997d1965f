// p5.js – in sketch.js im p5-Webeditor einfügen.
// TEXTE ÄNDERN: TYPEN und FRAGEN bearbeiten.
// Jede Antwort vergibt einen Punkt an ihren „typ“.
// Bei Gleichstand entscheidet die zuletzt gewählte Antwort der führenden Typen.

const TYPEN = {
  familie: { titel: 'Der familienverbundene Stiftertyp', text: 'Sie möchten Werte bewahren und die nächste Generation stärken. Für Sie steht im Mittelpunkt, Verantwortung gemeinsam mit Ihrer Familie zu gestalten und Perspektiven über Generationen hinweg zu schaffen. Ihr Engagement soll Zusammenhalt fördern und langfristig Orientierung geben.' },
  unternehmen: { titel: 'Der unternehmerische Stiftertyp', text: 'Sie möchten unternehmerische Verantwortung und langfristige Wirkung verbinden. Dabei setzen Sie auf klare Ziele, vorausschauende Planung und den bewussten Einsatz Ihrer Erfahrung. Ihr Engagement soll auf einer tragfähigen Grundlage wachsen und dauerhaft etwas bewirken.' },
  verbinden: { titel: 'Der verbindende Stiftertyp', text: 'Sie bringen unterschiedliche Anliegen zusammen und suchen nach gemeinsamen Lösungen. Ihnen ist wichtig, persönliche Werte, verschiedene Interessen und gesellschaftliche Ziele miteinander zu verbinden. Ihr Engagement lebt vom Austausch und davon, mehrere Perspektiven in einem gemeinsamen Vorhaben zu vereinen.' },
  gemeinsam: { titel: 'Der gemeinschaftliche Stiftertyp', text: 'Sie setzen auf Vertrauen, erfahrene Partner und gemeinsames Engagement. Sie möchten Ihr Anliegen mit anderen voranbringen und Verantwortung auf mehrere Schultern verteilen. Eine verlässliche Zusammenarbeit gibt Ihnen den Raum, sich auf das zu konzentrieren, was Ihnen besonders am Herzen liegt.' },
  direkt: { titel: 'Der tatkräftige Stiftertyp', text: 'Sie möchten zeitnah etwas bewegen und konkrete Ergebnisse sehen. Ein klar umrissenes Vorhaben, praktische Schritte und sichtbare Fortschritte motivieren Sie. Ihr Engagement soll dort ansetzen, wo Sie einen konkreten Bedarf erkennen und eine spürbare Verbesserung erreichen können.' }
};

const TYP_BILDER = {
  familie: 'assets/Illu1.png',
  unternehmen: 'assets/Illu2.png',
  verbinden: 'assets/Illu5.png',
  gemeinsam: 'assets/Illu3.png',
  direkt: 'assets/Illu4.png'
};

// Antwort: [Überschrift, ausklappbare Erläuterung, Typ-ID]
const FRAGEN = [
  { frage: 'Welcher Stiftungstyp sind Sie?', antworten: [
    ['Familienstiftung', 'Erträge kommen satzungsgemäß der Stifterfamilie zugute. Der Zweck muss dabei mindestens zur Hälfte der Versorgung und Förderung der Familie gewidmet sein, sonst wird die Stiftung nicht als Familienstiftung eingeordnet.', 'familie'],
    ['Stiftung als Halterin eines Unternehmens', 'Rechtlich meist ebenfalls eine Familienstiftung, aber mit einer Beteiligung statt eines Depots im Grundstock.', 'unternehmen'],
    ['Doppelstiftung', 'Eine gemeinnützige und eine Familienstiftung nebeneinander, mit aufgeteiltem Vermögen.', 'verbinden'],
    ['Treuhandstiftung', 'Kein eigenes Rechtssubjekt, sondern ein Vermögen, das ein Träger nach Stiftungssatzung verwaltet. Eine Anerkennung durch die Landesbehörde ist nicht erforderlich, weil § 80 BGB diese nur für die rechtsfähige Stiftung verlangt.', 'gemeinsam'],
    ['Verbrauchsstiftung', 'Auf Zeit angelegt, das Vermögen darf planmäßig aufgezehrt werden.', 'direkt']
  ]},
  { frage: 'Was liegt Ihnen besonders am Herzen?', antworten: [
    ['Die nächste Generation', 'Ich möchte jungen Menschen in meiner Familie Perspektiven eröffnen.', 'familie'],
    ['Verantwortung im Unternehmen', 'Ich möchte Werte und unternehmerisches Handeln langfristig verbinden.', 'unternehmen'],
    ['Mehrere Anliegen verbinden', 'Ich möchte unterschiedliche Lebensbereiche gemeinsam weiterentwickeln.', 'verbinden'],
    ['Gemeinsam Gutes bewirken', 'Ich möchte mich mit anderen für ein gemeinsames Ziel einsetzen.', 'gemeinsam'],
    ['Ein konkretes Projekt', 'Ich möchte eine greifbare Idee möglichst bald verwirklichen.', 'direkt']
  ]},
  { frage: 'Wie möchten Sie sich einbringen?', antworten: [
    ['Im Kreis meiner Familie', 'Ich möchte wichtige Entscheidungen gemeinsam mit meiner Familie treffen.', 'familie'],
    ['Mit unternehmerischer Erfahrung', 'Ich möchte meine Erfahrung nutzen und strategische Entscheidungen begleiten.', 'unternehmen'],
    ['Als verbindende Person', 'Ich möchte Menschen, Ideen und Ressourcen zusammenbringen.', 'verbinden'],
    ['Mit Unterstützung von Profis', 'Ich möchte mich auf mein Anliegen konzentrieren und Fachleute hinzuziehen.', 'gemeinsam'],
    ['Direkt und praktisch', 'Ich möchte aktiv mitgestalten und die Umsetzung unmittelbar erleben.', 'direkt']
  ]},
  { frage: 'Welcher Zeitraum passt zu Ihnen?', antworten: [
    ['Über Generationen hinweg', 'Mein Engagement soll meiner Familie auch in Zukunft Orientierung geben.', 'familie'],
    ['Langfristig und beständig', 'Ich möchte eine verlässliche Grundlage für die Zukunft schaffen.', 'unternehmen'],
    ['Kurzfristig und langfristig', 'Ich möchte heute etwas bewegen und zugleich langfristige Ziele verfolgen.', 'verbinden'],
    ['Flexibel mit Partnern', 'Ich möchte einen passenden Zeitraum gemeinsam mit erfahrenen Partnern entwickeln.', 'gemeinsam'],
    ['In den nächsten Jahren', 'Ich möchte die Wirkung meines Engagements möglichst bald sehen.', 'direkt']
  ]},
  { frage: 'Was ist Ihnen bei Entscheidungen wichtig?', antworten: [
    ['Gemeinsame Werte', 'Die Werte meiner Familie sollen die Richtung vorgeben.', 'familie'],
    ['Eine klare Strategie', 'Ich möchte Ziele festlegen und die Entwicklung regelmäßig prüfen.', 'unternehmen'],
    ['Ein guter Ausgleich', 'Unterschiedliche Interessen sollen angemessen berücksichtigt werden.', 'verbinden'],
    ['Vertrauensvolle Beratung', 'Ich möchte Entscheidungen mit kompetenter Unterstützung treffen.', 'gemeinsam'],
    ['Schnelle Umsetzung', 'Gute Ideen sollen ohne lange Umwege in die Praxis kommen.', 'direkt']
  ]},
  { frage: 'Woran erkennen Sie Ihren Erfolg?', antworten: [
    ['An gestärkten Generationen', 'Ich sehe Erfolg darin, dass Menschen langfristig Unterstützung erfahren.', 'familie'],
    ['An einer gesicherten Zukunft', 'Ich möchte, dass Werte und Verantwortung dauerhaft Bestand haben.', 'unternehmen'],
    ['An vielfältiger Wirkung', 'Mein Engagement soll in mehreren Bereichen etwas bewirken.', 'verbinden'],
    ['An starken Partnerschaften', 'Vertrauen und Zusammenarbeit sind für mich wichtige Zeichen des Erfolgs.', 'gemeinsam'],
    ['An sichtbaren Ergebnissen', 'Ich möchte konkret sehen, was mein Einsatz verändert hat.', 'direkt']
  ]}
];

let app;
let auswahl = [];
let offeneAntwort = -1;

function setup() {
  noCanvas();
  noLoop();
  document.title = 'Welcher Stiftertyp sind Sie?';
  createElement('style', `

  @font-face {
  font-family: 'SeasonMix';
  src: url('assets/SeasonMixRegular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'SeasonSans';
  src: url('assets/SeasonSansMedium.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

    :root { --hell: #DBEBB4; --dunkel: #42501F; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #fff; color: var(--dunkel); font-family: Arial, sans-serif; }
    button { font: inherit; cursor: pointer; }
    button:focus-visible { outline: 3px solid var(--dunkel); outline-offset: 4px; }
    .quiz { width: min(100%, 728px); margin: 0 auto; padding: 28px 30px 60px; }
    .kopf { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 38px; }
    .marke { border-left: 2px solid var(--dunkel); padding-left: 6px; font-size: 14px; line-height: 15px; }
    .fortschritt { font-size: 20px; white-space: nowrap; }
    .titel { display: flex; align-items: center; gap: 15px; background: var(--dunkel); color: var(--hell); border-radius: 11px; padding: 19px 16px; margin: 0 0 20px; }
    .nummer { display: grid; place-items: center; flex: 0 0 39px; height: 39px; border-radius: 50%; background: var(--hell); color: var(--dunkel); font: 30px Arial, sans-serif; }
    h1 { margin: 0; font: 40px/1.12 Georgia, serif; font-weight: normal; }
    .antwort { border: 1px solid var(--hell); border-radius: 11px; margin-bottom: 16px; overflow: hidden; }
    .aufklappen { display: flex; align-items: center; justify-content: space-between; gap: 18px; width: 100%; border: 0; padding: 14px 15px; background: #fff; color: var(--dunkel); text-align: left; font-size: 23px; line-height: 1.1; }
    .dreieck { flex: 0 0 auto; width: 0; height: 0; border-top: 9px solid transparent; border-bottom: 9px solid transparent; border-left: 15px solid var(--hell); }
    .offen .aufklappen { background: var(--hell); }
    .offen .dreieck { transform: rotate(90deg); border-left-color: var(--dunkel); }
    .details { padding: 18px 21px 21px; }
    .details p { margin: 0 0 15px; font-size: 20px; line-height: 1.15; }
    .waehlen { border: 1px solid var(--dunkel); border-radius: 30px; padding: 7px 11px; background: #fff; color: var(--dunkel); font-size: 16px; }
    .waehlen:hover { background: var(--dunkel); color: var(--hell); }
    .zurueck { margin-top: 8px; background: none; border: 0; padding: 8px 0; color: var(--dunkel); text-decoration: underline; }
    .ergebnis { border: 1px solid var(--hell); border-radius: 11px; padding: 24px; background: var(--hell); }
    .ergebnis h2 { margin: 0 0 16px; font: 32px/1.15 Georgia, serif; }
    .ergebnis p { font-size: 20px; line-height: 1.4; }
    .hinweis { font-size: 14px !important; }
    @media (max-width: 540px) {
      .quiz { padding: 24px 18px 40px; }
      .kopf { margin-bottom: 28px; }
      h1 { font-size: 29px; }
      .aufklappen { font-size: 20px; }
      .details p { font-size: 18px; }
    }

body {
  font-family: 'SeasonSans', sans-serif;
}

h1,
.ergebnis h2 {
  font-family: 'SeasonMix', serif;
}

.nummer {
  font-family: 'SeasonSans', sans-serif;
}


.typ-bild {
    display: block;
  width: 100%;
  max-width: 300px;
  height: auto;
  margin: 0 auto 20px;
  border-radius: 10px;
}

.ergebnis .waehlen {
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  padding: 12px 18px !important;
  margin: 0 0 12px !important;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.4;
  text-align: center;
}
    
  `);
  app = createElement('main').class('quiz');
  app.attribute('aria-label', 'Welcher Stiftertyp sind Sie?');
  rendern(false);
}

function textElement(tag, text, parent, klasse) {
  const element = createElement(tag).parent(parent);
  element.elt.textContent = text;
  if (klasse) element.class(klasse);
  return element;
}

function rendern(fokus = true) {
  app.html('');
  const fertig = auswahl.length === FRAGEN.length;
  const kopf = createDiv().class('kopf').parent(app);
  createDiv('Haspa<br>Hamburg<br>Stiftung').class('marke').parent(kopf);
  textElement('div', fertig ? 'Ihr Ergebnis' : `Frage ${String(auswahl.length + 1).padStart(2, '0')}/${String(FRAGEN.length).padStart(2, '0')}`, kopf, 'fortschritt');
  const titel = createDiv().class('titel').parent(app);
  textElement('span', fertig ? '✓' : auswahl.length + 1, titel, 'nummer');
  const heading = textElement('h1', fertig ? 'Welcher Stiftertyp sind Sie?' : FRAGEN[auswahl.length].frage, titel);
  heading.attribute('tabindex', '-1');

  if (fertig) {
    const punkte = Object.fromEntries(Object.keys(TYPEN).map(id => [id, 0]));
    auswahl.forEach(id => punkte[id]++);
    const maximum = Math.max(...Object.values(punkte));
    const sieger = [...auswahl].reverse().find(id => punkte[id] === maximum);
    const box = createDiv().class('ergebnis').parent(app);
    textElement('h2', TYPEN[sieger].titel, box);
    createImg(TYP_BILDER[sieger], 'Illustration: ' + TYPEN[sieger].titel)
      .parent(box)
      .class('typ-bild');
    textElement('p', TYPEN[sieger].text, box);

    createA(
  'mailto:info@haspa-hamburg-stiftung.de?subject=' +
    encodeURIComponent('Interesse an einer Stiftungsberatung'),
  'Sprechen Sie mit uns'
)
  .parent(box)
  .class('waehlen')
  .style('display', 'inline-block')
  .style('background', '#42501F')
  .style('color', '#DBEBB4')
  .style('text-decoration', 'none')
  .style('padding', '12px 18px')
  .style('margin', '8px 12px 16px 0');
    
    createButton('Quiz neu starten').class('waehlen').parent(box).mousePressed(() => {
      auswahl = [];
      offeneAntwort = -1;
      rendern();
    });
  } else {
    FRAGEN[auswahl.length].antworten.forEach(([label, erklaerung, typ], index) => {
      const offen = offeneAntwort === index;
      const karte = createDiv().class(`antwort${offen ? ' offen' : ''}`).parent(app);
      const toggle = createButton('').class('aufklappen').parent(karte);
      toggle.id(`antwort-${index}`);
      toggle.attribute('aria-expanded', String(offen));
      toggle.attribute('aria-controls', `details-${index}`);
      textElement('span', label, toggle);
      createSpan('').class('dreieck').attribute('aria-hidden', 'true').parent(toggle);
      const details = createDiv().class('details').id(`details-${index}`).parent(karte);
      details.elt.hidden = !offen;
      textElement('p', erklaerung, details);
      createButton('Das passt zu mir').class('waehlen').parent(details).mousePressed(() => {
        auswahl.push(typ);
        offeneAntwort = -1;
        rendern();
      });
      toggle.mousePressed(() => {
        offeneAntwort = offen ? -1 : index;
        rendern(false);
        document.getElementById(`antwort-${index}`).focus();
      });
    });
    if (auswahl.length > 0) {
      createButton('← Vorherige Frage').class('zurueck').parent(app).mousePressed(() => {
        auswahl.pop();
        offeneAntwort = -1;
        rendern();
      });
    }
  }
  if (fokus) heading.elt.focus();
}
