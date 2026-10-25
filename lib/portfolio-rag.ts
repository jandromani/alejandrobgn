import corpus from "@/.generated/portfolio-rag-index.json"

export type RagPassage = {
  id: number
  url: string
  page: string
  title: string
  section: string
  text: string
  sourceType: "page" | "lab" | "figure"
}

type SearchHit = { passage: RagPassage; score: number }
const passages = corpus.chunks as RagPassage[]
export const ragCoverage = { pages: corpus.pages, passages: passages.length }

const stop = new Set(`a about after all an and are as at be before by can did do does for from had has have how i in into is it me my not of on or our out over the their them there these this to was were what when where which who why with you your
al algo ante como con cual cuando de del desde donde el ella en entre es esta este estos fue ha hay la las le lo los me mi no o para por que se ser si sin sobre son su sus te tu un una unos y ya
et en la les le des du de pour par au aux dans est sont que qui quoi où comment pourquoi avec sans un une`.split(/\s+/))
const synonyms: Record<string, string[]> = {
  banca: ["banking", "bank"], bancario: ["banking"], banco: ["banking"],
  factoria: ["factory", "modernization"], fabrica: ["factory"],
  modernizacion: ["modernization", "legacy"], migracion: ["migration", "modernization"],
  ciberseguridad: ["cybersecurity"], sector: ["sector"], publico: ["public"],
  agentes: ["agents", "agent"], agente: ["agent"], copilotos: ["copilots"],
  evidencias: ["evidence"], evidencia: ["evidence"], pruebas: ["tests", "evidence"],
  requisitos: ["requirements"], gobierno: ["governance"], seguridad: ["safety", "security"],
  laboratorio: ["lab"], laboratorios: ["labs"], articulos: ["writing"],
  propiedad: ["ownership"], resultados: ["outcomes", "results"],
  experiencia: ["experience"], trayectoria: ["experience"],
  formacion: ["training"], adopcion: ["adoption"],
  trazabilidad: ["traceability", "lineage"],
  tres: ["three"], puertas: ["gates"],
  fallo: ["failed", "loss", "lost", "defect"], fallaron: ["failed", "lost", "loss", "evaluation"],
  perdio: ["lost", "loss", "evaluation"], derrotas: ["lost", "loss"],
  company: ["empresa"], ownership: ["propiedad"], cybersecurity: ["ciberseguridad"],
  banking: ["banca"], factory: ["factoria"], modernization: ["modernizacion"],
  evidence: ["evidencia"], agents: ["agentes"], training: ["formacion"],
}

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/(\d)[.,](?=\d{3}\b)/g, "$1")
}

function words(text: string) {
  return normalize(text).match(/[a-z0-9]{2,}/g)?.filter((word) => !stop.has(word)) ?? []
}

const rows = passages.map((passage) => {
  const counts = new Map<string, number>()
  const tokens = words(passage.text)
  for (const token of tokens) counts.set(token, (counts.get(token) ?? 0) + 1)
  return { passage, counts, length: tokens.length, title: new Set(words(passage.title)), section: new Set(words(passage.section)), normalized: normalize(passage.text) }
})
const documentFrequency = new Map<string, number>()
for (const row of rows) for (const token of row.counts.keys()) {
  documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1)
}
const meanLength = rows.reduce((total, row) => total + row.length, 0) / rows.length

export function retrievePortfolioPassages(question: string, limit = 7): SearchHit[] {
  const terms = [...new Set(words(question).flatMap((word) => [word, ...(synonyms[word] ?? [])]))]
  if (!terms.length) return []
  const scored = rows.map((row) => {
    let score = 0
    let textMatches = 0
    for (const term of terms) {
      const df = documentFrequency.get(term) ?? 0
      if (!df) continue
      const idf = Math.log(1 + (rows.length - df + 0.5) / (df + 0.5))
      const tf = row.counts.get(term) ?? 0
      if (tf) {
        textMatches++
        score += idf * (tf * 2.2) / (tf + 1.2 * (0.25 + 0.75 * row.length / meanLength))
      }
      if (row.title.has(term)) score += idf * 0.8
      if (row.section.has(term)) score += idf * 1.2
    }
    const phrase = normalize(question).trim()
    if (phrase.length >= 8 && row.normalized.includes(phrase)) score += 12
    // A relevant title alone cannot make an unrelated paragraph into evidence.
    if (!textMatches) score *= 0.18
    return { passage: row.passage, score }
  }).filter((hit) => hit.score > 2).sort((a, b) => b.score - a.score || a.passage.id - b.passage.id)
  const selected: SearchHit[] = []
  const byPage = new Map<string, number>()
  const seenUrl = new Set<string>()
  for (const hit of scored) {
    if ((byPage.get(hit.passage.page) ?? 0) >= 2) continue
    if (seenUrl.has(hit.passage.url)) continue
    selected.push(hit)
    seenUrl.add(hit.passage.url)
    byPage.set(hit.passage.page, (byPage.get(hit.passage.page) ?? 0) + 1)
    if (selected.length === limit) break
  }
  return selected
}

export function groundedFallback(hits: SearchHit[], question: string) {
  if (!hits.length) return /[¿¡]|\b(?:que|como|cual|quien|sobre)\b/i.test(question)
    ? "No encuentro una fuente pública suficiente para responder con seguridad. Consulta las páginas de la web o contacta directamente con Alejandro."
    : "I could not find enough public evidence to answer reliably. Explore the site or contact Alejandro directly."
  const intro = /[¿¡]|\b(?:que|como|cual|quien|sobre)\b/i.test(question)
    ? "Pasajes públicos relacionados (texto original de la web):"
    : "Relevant public passages from the site:"
  return intro + "\n\n" + hits.slice(0, 3).map(({ passage }, i) =>
    `[${i + 1}] ${passage.title} — ${passage.section}: ${passage.text.slice(0, 420)}${passage.text.length > 420 ? "…" : ""}`,
  ).join("\n\n")
}
