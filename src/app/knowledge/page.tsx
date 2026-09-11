"use client";

import { BookMarked, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { RecordEditor, RemoveButton, type EditorField } from "@/components/shared/record-editor";
import { useWorkspaceStore } from "@/lib/workspace-store";
import type { KnowledgeNote } from "@/types";

const categories = ["Mathematics", "Deep Learning", "Remote Sensing", "Remote Sensing Tasks", "Foundation Models", "Other"];
const fields: EditorField[] = [{ key: "id", label: "Note ID" }, { key: "title", label: "Title" }, { key: "category", label: "Category", type: "select", options: categories.map(x => [x, x]) }, { key: "tags", label: "Tags（逗号分隔）" }, { key: "mastery", label: "Mastery 0-100", type: "number" }, { key: "content", label: "Content", type: "textarea" }, { key: "keyConcepts", label: "Key Concepts", type: "textarea" }, { key: "questions", label: "Questions", type: "textarea" }, { key: "references", label: "References", type: "textarea" }];
const values = (x: KnowledgeNote) => ({ ...x, tags: x.tags.join(", ") });
const patch = (v: Record<string, string>): Omit<KnowledgeNote, "id"> => ({ title: v.title, category: v.category, tags: v.tags.split(",").map(x => x.trim()).filter(Boolean), mastery: Math.max(0, Math.min(100, Number(v.mastery) || 0)), content: v.content, keyConcepts: v.keyConcepts, questions: v.questions, references: v.references });

export default function KnowledgePage() {
  const notes = useWorkspaceStore(s => s.knowledgeNotes); const update = useWorkspaceStore(s => s.updateKnowledge); const add = useWorkspaceStore(s => s.addKnowledge); const remove = useWorkspaceStore(s => s.remove);
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("all");
  const rows = useMemo(() => notes.filter(note => (category === "all" || note.category === category) && [note.title, note.content, note.tags.join(" ")].join(" ").toLowerCase().includes(query.toLowerCase())), [notes, query, category]);
  const blank = { id: `KN-${String(notes.length + 1).padStart(3, "0")}`, title: "", category: "Deep Learning", tags: "", mastery: "0", content: "", keyConcepts: "", questions: "", references: "" };
  return <><PageHeader title="Knowledge" description="沉淀概念、问题、公式与论文阅读收获" /><div className="toolbar"><label className="filter-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索标题、内容或标签" /></label><select value={category} onChange={e => setCategory(e.target.value)}><option value="all">全部分类</option>{categories.map(x => <option key={x}>{x}</option>)}</select><span>{rows.length} 条笔记</span><RecordEditor title="新知识笔记" fields={fields} initialValues={blank} mode="create" onSave={v => add({ id: v.id, ...patch(v) })} /></div><div className="table-wrap"><table><thead><tr><th>知识笔记</th><th>分类 / 标签</th><th>掌握度</th><th>关键概念</th><th /></tr></thead><tbody>{rows.map(note => <tr key={note.id}><td><Link className="table-title" href={`/knowledge/${note.id}`}><BookMarked size={15} /> {note.title}</Link><small>{note.content}</small></td><td><strong>{note.category}</strong><div className="tags">{note.tags.map(tag => <span key={tag}>{tag}</span>)}</div></td><td><div className="table-progress"><div className="progress"><i style={{ width: `${note.mastery}%` }} /></div>{note.mastery}%</div></td><td>{note.keyConcepts}</td><td className="row-actions"><RecordEditor title="编辑知识笔记" fields={fields} initialValues={values(note)} onSave={v => { update(note.id, patch(v)); if (v.id !== note.id) update(note.id, { id: v.id }); }} /><RemoveButton label={note.title} onRemove={() => remove("knowledgeNotes", note.id)} /></td></tr>)}{!rows.length && <tr><td colSpan={5}><p className="subtle">没有匹配的知识笔记。</p></td></tr>}</tbody></table></div></>;
}
