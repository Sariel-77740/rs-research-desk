"use client";

import { ExternalLink, Highlighter, ImagePlus, Save, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { PaperStatusControl } from "@/components/papers/paper-status-control";
import { PageHeader } from "@/components/shared/page-header";
import { getPaperAsset, removePaperAsset, savePaperAsset } from "@/lib/paper-assets";
import { useWorkspaceStore } from "@/lib/workspace-store";
import type { Paper } from "@/types";

function StudyMaterials({ paper }: { paper: Paper }) {
  const updatePaper = useWorkspaceStore(state => state.updatePaper);
  const editor = useRef<HTMLDivElement>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const images = useMemo(() => paper.studyImages ?? [], [paper.studyImages]);

  useEffect(() => {
    let active = true; const created: string[] = [];
    Promise.all(images.map(async image => {
      const blob = await getPaperAsset(image.id);
      if (!blob || !active) return;
      const url = URL.createObjectURL(blob); created.push(url);
      setUrls(current => ({ ...current, [image.id]: url }));
    })).catch(() => undefined);
    return () => { active = false; created.forEach(URL.revokeObjectURL); };
  }, [images]);

  const saveNotes = () => {
    const studyNotes = editor.current?.innerHTML ?? "";
    if (studyNotes !== (paper.studyNotes ?? "")) updatePaper(paper.id, { studyNotes });
  };
  const addImage = async (file: File) => {
    saveNotes();
    const id = crypto.randomUUID();
    await savePaperAsset(id, file);
    updatePaper(paper.id, { studyImages: [...images, { id, name: file.name || "粘贴图片" }] });
    setMessage("图片已加入研读资料。");
  };
  const paste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const file = Array.from(event.clipboardData.files).find(item => item.type.startsWith("image/"));
    if (!file) return;
    event.preventDefault();
    void addImage(file);
  };
  const highlight = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount || !editor.current?.contains(selection.anchorNode) || selection.isCollapsed) return window.alert("请先在研读笔记中选中需要高光的文字。");
    document.execCommand("hiliteColor", false, "#fff09c");
    saveNotes();
  };
  const removeImage = async (id: string) => {
    const image = images.find(item => item.id === id);
    if (!image || !window.confirm(`删除「${image.name}」？`)) return;
    await removePaperAsset(id);
    updatePaper(paper.id, { studyImages: images.filter(item => item.id !== id) });
  };

  return <section className="panel" style={{ marginTop: 24 }}><div className="panel-title"><div><p className="eyebrow">STUDY MATERIALS</p><h2>研读资料</h2></div><button className="github-button" onClick={saveNotes}><Save size={14} />保存笔记</button></div><p className="subtle">直接输入或粘贴文字；选中文字后点“高光”。在笔记框内粘贴图片，会自动加入下方资料区。</p><div style={{ display: "flex", gap: 8, margin: "12px 0" }}><button className="secondary-button" onMouseDown={event => event.preventDefault()} onClick={highlight}><Highlighter size={14} />高光所选文字</button><span className="subtle" style={{ alignSelf: "center" }}>{message}</span></div><div ref={editor} contentEditable suppressContentEditableWarning onPaste={paste} onBlur={saveNotes} aria-label="论文研读笔记" style={{ minHeight: 210, border: "1px solid var(--line)", borderRadius: 7, background: "var(--soft)", padding: 14, outline: "none", whiteSpace: "pre-wrap", lineHeight: 1.75, fontSize: 13 }} dangerouslySetInnerHTML={{ __html: paper.studyNotes ?? "" }} />{!images.length ? <p className="subtle" style={{ marginTop: 14 }}><ImagePlus size={14} /> 图片可直接粘贴到上方笔记框。</p> : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 16 }}>{images.map(image => <figure key={image.id} style={{ margin: 0, position: "relative" }}>{urls[image.id] && <Image src={urls[image.id]} alt={image.name} width={360} height={230} unoptimized style={{ width: "100%", maxHeight: 230, objectFit: "cover", borderRadius: 7, border: "1px solid var(--line)" }} />}<figcaption className="subtle" style={{ marginTop: 5 }}>{image.name}</figcaption><button className="table-action danger" aria-label={`删除${image.name}`} onClick={() => void removeImage(image.id)} style={{ position: "absolute", top: 4, right: 4, background: "var(--panel)" }}><Trash2 size={14} /></button></figure>)}</div>}</section>;
}

export default function PaperDetail() {
  const params = useParams<{ id: string }>();
  const paper = useWorkspaceStore(state => state.papers.find(item => item.id === params.id));
  if (!paper) return <><PageHeader title="未找到论文" description="这篇论文可能已被删除。" back={{ href: "/papers", label: "Papers" }} /><Link className="button secondary" href="/papers">返回论文库</Link></>;

  return <><PageHeader title={paper.title} description={`${paper.authors} · ${paper.year || "年份待补充"} · ${paper.venue}`} back={{ href: "/papers", label: "Papers" }} /><section className="detail-hero"><div><PaperStatusControl id={paper.id} initialStatus={paper.status} editable /><div className="tags">{paper.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="detail-links">{paper.sourceUrl && <a className="button secondary" href={paper.sourceUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} />直达原文</a>}<span className="rating"><Star size={14} fill="currentColor" />{paper.rating}/5</span></div></section><div className="detail-layout"><article className="detail-notes"><p className="eyebrow">PAPER OVERVIEW</p><section><h2>文献摘要</h2><p>{paper.abstract || "尚未填写摘要。"}</p></section><section><h2>阅读记录</h2><p>可在论文库中编辑这篇论文的状态、进度、评分和标签。</p></section></article><aside className="detail-aside"><div className="panel"><p className="eyebrow">READING PROGRESS</p><strong className="big-number">{paper.progress}%</strong><div className="progress"><i style={{ width: `${paper.progress}%` }} /></div><p className="subtle">状态可在页面顶部修改</p></div></aside></div><StudyMaterials paper={paper} /></>;
}
