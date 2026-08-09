import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];
const jsonPath = path.join(root, "src", "data", "finalUnits.json");
const units = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const expectedThemes = {
  "1ac": [
    "Ambiances du quotidien",
    "Moments qui comptent",
    "Des habitudes qui nous font du bien",
    "Mon temps, un trésor !",
    "Les autres et moi",
    "Villes mythiques",
    "Figures du monde",
    "Défis climatiques",
    "Créations écolo",
    "Ados responsables",
  ],
  "2ac": [
    "Mon parcours, mon avenir",
    "Fêtes du monde",
    "Métiers de demain",
    "Écrans : trop ou pas assez ?",
    "La science à notre service",
    "Contes et légendes",
    "Habits et traditions",
    "Graines d’inventeurs",
    "Toujours plus loin",
    "Loisirs numériques",
  ],
  "3ac": [
    "Voyages et découvertes",
    "Spectacles à vivre",
    "Héros comme nous",
    "Petites histoires, leçons de vie",
    "Consommer autrement",
    "Les villes de demain",
    "Récits de vie",
    "L’école pour tous",
    "Récits et univers imaginaires",
    "Les langues : une fenêtre sur le monde",
  ],
};

const expected = [];
for (const level of Object.keys(expectedThemes)) {
  expectedThemes[level].forEach((title, i) => {
    const semester = i < 4 ? "s1" : "s2";
    expected.push({ key: `${level}-${semester}-${i + 1}`, level, semester, unit: i + 1, title });
  });
}

const byKey = new Map(units.map((u) => [u.key, u]));
const images = new Map();
const readingTexts = new Map();

function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }

if (units.length !== 30) fail(`Nombre d'unités final: ${units.length}, attendu 30.`);
for (const item of expected) {
  const u = byKey.get(item.key);
  if (!u) {
    fail(`Unité manquante: ${item.key}`);
    continue;
  }
  if (u.title !== item.title) fail(`${item.key}: titre "${u.title}" au lieu de "${item.title}".`);
  if (u.level !== item.level || u.semester !== item.semester || u.unit !== item.unit) {
    fail(`${item.key}: niveau/semestre/unité incohérents.`);
  }

  const sessions = Array.isArray(u.sessions) ? u.sessions : [];
  if (sessions.length !== 10) fail(`${item.key}: ${sessions.length} séances, attendu 10.`);
  for (let n = 1; n <= 10; n++) {
    if (!sessions.some((s) => s.number === n && s.focus && s.label)) {
      fail(`${item.key}: séance ${n} absente ou incomplète.`);
    }
  }

  const required = ["vocabulary","speechActs","listening","reading","language","oralProduction","writing","fluency"];
  for (const field of required) {
    if (!u[field] || typeof u[field] !== "object") fail(`${item.key}: contenu ${field} absent.`);
  }

  const reading = u.reading || {};
  if (!reading.text || reading.text.trim().length < 250) fail(`${item.key}: texte de lecture trop court.`);
  if (!reading.image) fail(`${item.key}: image de lecture absente.`);
  if (reading.image) {
    const p = path.join(root, "public", reading.image.replace(/^\/+/, ""));
    if (!fs.existsSync(p)) fail(`${item.key}: image inexistante ${reading.image}.`);
    const size = fs.existsSync(p) ? fs.statSync(p).size : 0;
    if (!size) fail(`${item.key}: image vide ${reading.image}.`);
    if (size > 0) {
      const buf = fs.readFileSync(p);
      if (path.extname(p).toLowerCase() === ".webp" &&
          !(buf.subarray(0,4).toString() === "RIFF" && buf.subarray(8,12).toString() === "WEBP")) {
        fail(`${item.key}: fichier WEBP non valide ${reading.image}.`);
      }
    }
    images.set(reading.image, (images.get(reading.image) || []).concat(item.key));
  }

  const vocabWords = (u.vocabulary?.sessions || []).flatMap((s) => s.words || []);
  const lowerReading = String(reading.text).toLowerCase();
  const themeTokens = [...new Set(vocabWords.map((w) => String(w).toLowerCase()).filter((w) => w.length >= 5))];
  const hits = themeTokens.filter((w) => lowerReading.includes(w));
  if (hits.length < 2) warn(`${item.key}: peu de vocabulaire thématique retrouvé dans le texte de lecture (${hits.length}).`);

  if (!Array.isArray(reading.direct) || reading.direct.length < 4) fail(`${item.key}: questions de lecture insuffisantes.`);
  if (!Array.isArray(u.listening?.questions) || u.listening.questions.length < 4) fail(`${item.key}: questions d'écoute insuffisantes.`);
  if (!Array.isArray(u.language?.questions) || u.language.questions.length < 4) fail(`${item.key}: questions de langue insuffisantes.`);

  for (const q of [...(reading.direct || []), ...(u.listening?.questions || []), ...(u.language?.questions || [])]) {
    if (!q.question || !q.answer || !Array.isArray(q.options) || q.options.length < 2) {
      fail(`${item.key}: question incomplète.`);
    }
  }

  const audio = u.listening?.audio;
  if (audio && /^https?:\/\//i.test(audio)) fail(`${item.key}: audio externe interdit: ${audio}`);
  if (u.reading?.image && /^https?:\/\//i.test(u.reading.image)) fail(`${item.key}: image externe interdite.`);
  readingTexts.set(item.key, reading.text);
}

const duplicateImages = [...images.entries()].filter(([, keys]) => keys.length > 1);
if (duplicateImages.length) warn(`Images réutilisées: ${duplicateImages.map(([img, keys]) => `${img} (${keys.join(", ")})`).join("; ")}`);

const textToKeys = new Map();
for (const [key, text] of readingTexts) {
  const normalized = text.replace(/\s+/g, " ").trim();
  textToKeys.set(normalized, [...(textToKeys.get(normalized) || []), key]);
}
for (const [text, keys] of textToKeys) {
  if (keys.length > 1) fail(`Textes de lecture identiques entre: ${keys.join(", ")}`);
}

const app = fs.readFileSync(path.join(root, "src", "App.tsx"), "utf8");
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
for (const route of [
  "/", "/niveau/:levelId",
  "/niveau/:levelId/semestre/:semesterId/unite/:unitId",
  "/niveau/:levelId/semestre/:semesterId/unite/:unitId/activite/:activityId"
]) {
  if (!routes.includes(route)) fail(`Route principale absente: ${route}`);
}

const mainImageCount = images.size;
const sessions = units.reduce((n, u) => n + (u.sessions?.length || 0), 0);
const complete = units.filter((u) => u.sessions?.length === 10 && u.reading?.text && u.reading?.image).length;

console.log(`Unités: ${units.length}/30`);
console.log(`Séances: ${sessions}/300`);
console.log(`Unités complètes (structure + lecture): ${complete}/30`);
console.log(`Illustrations principales utilisées: ${mainImageCount}`);
console.log(`Images réutilisées: ${duplicateImages.length}`);
console.log(`Textes de lecture uniques: ${readingTexts.size}`);
console.log(`Routes principales trouvées: ${routes.length}`);
console.log(`Erreurs: ${errors.length}`);
console.log(`Avertissements: ${warnings.length}`);

if (warnings.length) {
  console.log("\\nAvertissements:");
  for (const w of warnings) console.log(`- ${w}`);
}
if (errors.length) {
  console.error("\\nErreurs:");
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log("\\nAudit final des 30 unités: PASS");
