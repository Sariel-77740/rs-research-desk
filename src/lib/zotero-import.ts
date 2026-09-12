import type { Paper } from "@/types";

type ImportedPaper = Omit<Paper, "id">;
type Fields = Record<string, string[]>;

const clean = (value = "") => value.replace(/[{}]/g, "").replace(/\\[A-Za-z]+\s?/g, "").replace(/\s+/g, " ").trim();
const list = (value = "") => clean(value).split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
const authors = (value = "") => value.split(/\s+and\s+/i).map((name) => { const parts = clean(name).split(",").map((item) => item.trim()); return parts.length === 2 ? `${parts[1]} ${parts[0]}` : parts[0]; }).filter(Boolean).join(", ");
const link = (url = "", doi = "") => clean(url) || (clean(doi) ? `https://doi.org/${clean(doi).replace(/^https?:\/\/doi\.org\//, "")}` : undefined);
const paper = (fields: Fields): ImportedPaper | null => {
  const title = clean(fields.title?.[0] ?? "");
  if (!title) return null;
  const rawAuthors = fields.author?.join(" and ") ?? "";
  const year = Number((fields.year?.[0] ?? "").match(/(?:19|20)\d{2}/)?.[0] ?? 0);
  return { title, authors: authors(rawAuthors) || "作者待补充", year, venue: clean(fields.venue?.[0] ?? "") || "来源待补充", tags: [...new Set(fields.tags?.flatMap(list) ?? [])], sourceUrl: link(fields.url?.[0], fields.doi?.[0]), abstract: clean(fields.abstract?.[0] ?? ""), status: "unread", rating: 0, progress: 0, importance: "medium" };
};

const bibFields = (body: string): Fields => {
  const fields: Fields = {};
  const matcher = /(\w+)\s*=\s*(?:\{((?:[^{}]|\{[^{}]*\})*)\}|"([^"]*)")\s*,?/g;
  for (const match of body.matchAll(matcher)) (fields[match[1].toLowerCase()] ??= []).push(match[2] ?? match[3] ?? "");
  return { title: fields.title, author: fields.author, year: fields.year, venue: fields.journal ?? fields.booktitle ?? fields.publisher, tags: fields.keywords ?? fields.keyword, url: fields.url, doi: fields.doi, abstract: fields.abstract };
};

const parseBib = (text: string) => text.split(/\n@/).map((chunk) => {
  const start = chunk.indexOf("{");
  const comma = chunk.indexOf(",", start);
  return comma === -1 ? null : paper(bibFields(chunk.slice(comma + 1).replace(/}\s*$/, "")));
}).filter((item): item is ImportedPaper => Boolean(item));

const parseRis = (text: string) => text.split(/\r?\nER  -.*(?:\r?\n|$)/).map((record) => {
  const fields: Fields = {};
  for (const line of record.split(/\r?\n/)) { const match = line.match(/^([A-Z0-9]{2})  - (.*)$/); if (match) (fields[match[1]] ??= []).push(match[2]); }
  return paper({ title: fields.TI ?? fields.T1, author: fields.AU ?? fields.A1, year: fields.PY ?? fields.Y1, venue: fields.JO ?? fields.JF ?? fields.T2, tags: fields.KW, url: fields.UR, doi: fields.DO, abstract: fields.AB });
}).filter((item): item is ImportedPaper => Boolean(item));

export const parseZoteroFile = (content: string, fileName: string) => fileName.toLowerCase().endsWith(".ris") ? parseRis(content) : parseBib(content);
export const samePaper = (left: Pick<Paper, "title" | "sourceUrl">, right: Pick<Paper, "title" | "sourceUrl">) => clean(left.title).toLowerCase() === clean(right.title).toLowerCase() || Boolean(left.sourceUrl && right.sourceUrl && left.sourceUrl.toLowerCase() === right.sourceUrl.toLowerCase());
