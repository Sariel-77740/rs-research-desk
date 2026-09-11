"use client";

import { FilePenLine } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { RecordEditor, RemoveButton, type EditorField } from "@/components/shared/record-editor";
import { StatusBadge } from "@/components/shared/status-badge";
import { useWorkspaceStore } from "@/lib/workspace-store";
import type { WritingProject } from "@/types";

const fields: EditorField[] = [{ key: "id", label: "Writing ID" }, { key: "title", label: "Title" }, { key: "status", label: "Status", type: "select", options: [["draft", "Draft"], ["writing", "Writing"], ["review", "Review"], ["completed", "Completed"]] }, { key: "abstract", label: "Abstract", type: "textarea" }];
const empty = (id: string): WritingProject => ({ id, title: "", status: "draft", abstract: "", introduction: "", relatedWork: "", method: "", experiments: "", conclusion: "", figures: [], tables: [], snippets: [] });
export default function WritingPage() {
  const projects = useWorkspaceStore(s => s.writingProjects); const add = useWorkspaceStore(s => s.addWriting); const update = useWorkspaceStore(s => s.updateWriting); const remove = useWorkspaceStore(s => s.remove); const blank = empty(`WR-${String(projects.length + 1).padStart(3, "0")}`);
  return <><PageHeader title="Writing" description="长期积累论文段落、图表、表格和可复用文本" /><div className="toolbar"><span>{projects.length} 个写作项目</span><RecordEditor title="新写作项目" fields={fields} initialValues={blank} mode="create" onSave={v => add({ ...empty(v.id), title: v.title, status: v.status as WritingProject["status"], abstract: v.abstract })} /></div><div className="idea-grid">{projects.map(project => <article className="idea-card" key={project.id}><div><span className="idea-id">{project.id}</span><StatusBadge status={project.status} /></div><FilePenLine size={19} /><Link href={`/writing/${project.id}`}><h2>{project.title || "未命名写作项目"}</h2></Link><p>{project.abstract || "尚未撰写摘要。"}</p><footer><span>{project.figures.length} Figures · {project.tables.length} Tables</span><span className="row-actions"><RecordEditor title="编辑写作项目" fields={fields} initialValues={project} onSave={v => { update(project.id, { title: v.title, status: v.status as WritingProject["status"], abstract: v.abstract }); if (v.id !== project.id) update(project.id, { id: v.id }); }} /><RemoveButton label={project.title} onRemove={() => remove("writingProjects", project.id)} /></span></footer></article>)}</div></>;
}
