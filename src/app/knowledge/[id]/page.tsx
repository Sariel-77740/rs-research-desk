"use client";

import Image from "next/image";
import { ImagePlus, Save, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { useWorkspaceStore } from "@/lib/workspace-store";
import type { KnowledgeNote } from "@/types";

const categories = ["Mathematics", "Deep Learning", "Remote Sensing", "Remote Sensing Tasks", "Foundation Models", "Other"];
export default function KnowledgeDetailPage() {
  const { id } = useParams<{ id: string }>(); const notes = useWorkspaceStore(s => s.knowledgeNotes); const update = useWorkspaceStore(s => s.updateKnowledge); const note = notes.find(x => x.id === id);
  if (!note) return <><PageHeader title="知识笔记不存在" back={{ href: "/knowledge", label: "Knowledge" }} /><p className="subtle">这条笔记可能已被删除或已更改编号。</p></>;
  return <KnowledgeEditor key={note.id} note={note} update={update} />;
}

function KnowledgeEditor({ note, update }: { note: KnowledgeNote; update: (id: string, patch: Partial<KnowledgeNote>) => void }) {
  const [draft, setDraft] = useState(note); const [imageUrl, setImageUrl] = useState(""); const [error, setError] = useState("");
  const set = <K extends keyof KnowledgeNote>(key: K, value: KnowledgeNote[K]) => setDraft(current => ({ ...current, [key]: value }));
  const addImage = (src: string) => { if (!src.trim()) return; update(note.id, { images: [...(note.images ?? []), src.trim()] }); setImageUrl(""); };
  const selectImage = (file?: File) => { if (!file) return; if (file.size > 1024 * 1024) { setError("图片请控制在 1MB 以内，以免浏览器本地存储空间不足。"); return; } setError(""); const reader = new FileReader(); reader.onload = () => addImage(String(reader.result)); reader.readAsDataURL(file); };
  const removeImage = (src: string) => update(note.id, { images: (note.images ?? []).filter(item => item !== src) });
  return <><PageHeader title={draft.title || "未命名知识笔记"} description={`${note.id} · 内容编辑后请点击保存`} back={{ href: "/knowledge", label: "Knowledge" }} /><div className="detail-hero"><div><span className="count">{draft.category}</span><span className="subtle">掌握度 {draft.mastery}%</span></div><button className="github-button" onClick={() => update(note.id, { ...draft, images: note.images })}><Save size={15} />保存笔记</button></div><div className="detail-layout"><article className="panel"><div className="editor-fields"><label>标题<input value={draft.title} onChange={e => set("title", e.target.value)} /></label><label>分类<select value={draft.category} onChange={e => set("category", e.target.value)}>{categories.map(x => <option key={x}>{x}</option>)}</select></label><label>标签（逗号分隔）<input value={draft.tags.join(", ")} onChange={e => set("tags", e.target.value.split(",").map(x => x.trim()).filter(Boolean))} /></label><label>掌握度（0-100）<input type="number" min="0" max="100" value={draft.mastery} onChange={e => set("mastery", Math.max(0, Math.min(100, Number(e.target.value) || 0)))} /></label><label>笔记内容<textarea value={draft.content} onChange={e => set("content", e.target.value)} /></label><label>关键概念<textarea value={draft.keyConcepts} onChange={e => set("keyConcepts", e.target.value)} /></label><label>待解决问题<textarea value={draft.questions} onChange={e => set("questions", e.target.value)} /></label><label>参考资料<textarea value={draft.references} onChange={e => set("references", e.target.value)} /></label></div></article><aside className="detail-aside"><div className="panel"><p className="eyebrow">IMAGES</p><p className="subtle">可上传图片或粘贴图片链接；图片只保存在当前浏览器。</p><label className="table-action create" style={{ width: "100%", justifyContent: "center", marginTop: 10 }}><ImagePlus size={14} />选择图片<input hidden type="file" accept="image/*" onChange={e => selectImage(e.target.files?.[0])} /></label><div style={{ display: "flex", gap: 6, marginTop: 10 }}><input aria-label="图片链接" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="粘贴图片 URL" style={{ minWidth: 0, width: "100%" }} /><button className="secondary-button" onClick={() => addImage(imageUrl)}>添加</button></div>{error && <p className="integration-error">{error}</p>}</div></aside></div>{(note.images ?? []).length > 0 && <section className="panel" style={{ marginTop: 24 }}><p className="eyebrow">ATTACHED IMAGES</p><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>{(note.images ?? []).map(src => <figure key={src} style={{ margin: 0, position: "relative" }}><Image src={src} alt="知识笔记图片" width={500} height={240} unoptimized style={{ width: "100%", maxHeight: 240, objectFit: "cover", borderRadius: 7, border: "1px solid var(--line)" }} /><button className="table-action danger" aria-label="删除图片" onClick={() => removeImage(src)} style={{ position: "absolute", right: 6, top: 6, background: "var(--panel)" }}><X size={15} /></button></figure>)}</div></section>}</>;
}
