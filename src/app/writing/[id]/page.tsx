"use client";

import { Save, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { useWorkspaceStore } from "@/lib/workspace-store";
import type { WritingProject } from "@/types";

const sections: Array<[keyof Pick<WritingProject, "abstract" | "introduction" | "relatedWork" | "method" | "experiments" | "conclusion">, string]> = [["abstract", "Abstract"], ["introduction", "Introduction"], ["relatedWork", "Related Work"], ["method", "Method"], ["experiments", "Experiments"], ["conclusion", "Conclusion"]];
export default function WritingDetailPage() {
  const { id } = useParams<{ id: string }>(); const projects = useWorkspaceStore(s => s.writingProjects); const update = useWorkspaceStore(s => s.updateWriting); const project = projects.find(x => x.id === id);
  if (!project) return <><PageHeader title="写作项目不存在" back={{ href: "/writing", label: "Writing" }} /><p className="subtle">这条写作项目可能已被删除或已更改编号。</p></>;
  return <WritingEditor key={project.id} project={project} update={update} />;
}

function WritingEditor({ project, update }: { project: WritingProject; update: (id: string, patch: Partial<WritingProject>) => void }) {
  const [draft, setDraft] = useState(project); const set = <K extends keyof WritingProject>(key: K, value: WritingProject[K]) => setDraft(current => ({ ...current, [key]: value }));
  const save = () => update(project.id, { ...draft, figures: project.figures, tables: project.tables, snippets: project.snippets });
  const assets = (key: "figures" | "tables" | "snippets", value: string) => update(project.id, { [key]: [...project[key], value] });
  const removeAsset = (key: "figures" | "tables" | "snippets", value: string) => update(project.id, { [key]: project[key].filter(item => item !== value) });
  return <><PageHeader title={draft.title || "未命名写作项目"} description={`${project.id} · 编辑内容后请点击保存`} back={{ href: "/writing", label: "Writing" }} /><div className="detail-hero"><div><span className="count">{draft.status}</span><span className="subtle">6 个论文段落</span></div><button className="github-button" onClick={save}><Save size={15} />保存写作内容</button></div><div className="detail-layout"><article className="panel"><div className="editor-fields"><label>Title<input value={draft.title} onChange={e => set("title", e.target.value)} /></label><label>Status<select value={draft.status} onChange={e => set("status", e.target.value as WritingProject["status"])}><option value="draft">Draft</option><option value="writing">Writing</option><option value="review">Review</option><option value="completed">Completed</option></select></label>{sections.map(([key, label]) => <label key={key}>{label}<textarea value={draft[key]} onChange={e => set(key, e.target.value)} /></label>)}</div></article><aside className="detail-aside"><AssetSection label="Figures" placeholder="粘贴图片或图表链接" items={project.figures} onAdd={value => assets("figures", value)} onRemove={value => removeAsset("figures", value)} /><AssetSection label="Tables" placeholder="输入表格名称或链接" items={project.tables} onAdd={value => assets("tables", value)} onRemove={value => removeAsset("tables", value)} /><AssetSection label="Text Snippets" placeholder="输入可复用文本" items={project.snippets} onAdd={value => assets("snippets", value)} onRemove={value => removeAsset("snippets", value)} /></aside></div></>;
}

function AssetSection({ label, placeholder, items, onAdd, onRemove }: { label: string; placeholder: string; items: string[]; onAdd: (value: string) => void; onRemove: (value: string) => void }) {
  const [value, setValue] = useState(""); const add = () => { if (!value.trim()) return; onAdd(value.trim()); setValue(""); };
  return <div className="panel"><p className="eyebrow">{label.toUpperCase()}</p><div style={{ display: "flex", gap: 6 }}><input value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} style={{ minWidth: 0, width: "100%" }} /><button className="secondary-button" onClick={add}>添加</button></div><ul className="compact-list">{items.map(item => <li key={item} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}><span style={{ flex: 1, overflowWrap: "anywhere" }}>{item}</span><button className="table-action danger" aria-label={`删除 ${label}`} onClick={() => onRemove(item)}><Trash2 size={14} /></button></li>)}{!items.length && <li className="subtle">暂无素材</li>}</ul></div>;
}
