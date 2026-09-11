"use client";

import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

export type EditorField = { key: string; label: string; type?: "text" | "textarea" | "number" | "date" | "select"; options?: Array<[string, string]> };
type Value = string | number;
type Props = { title: string; fields: EditorField[]; initialValues: object; onSave: (values: Record<string, string>) => void; mode?: "edit" | "create"; triggerLabel?: string; editLabel?: string };

export function RecordEditor({ title, fields, initialValues, onSave, mode = "edit", triggerLabel = "新建", editLabel }: Props) {
  const [open, setOpen] = useState(false); const [values, setValues] = useState<Record<string, Value>>(initialValues as Record<string, Value>);
  const save = () => { onSave(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value)]))); setOpen(false); };
  const openEditor = () => { setValues(initialValues as Record<string, Value>); setOpen(true); };
  return <>{mode === "create" ? <button className="table-action create" onClick={openEditor}><Plus size={14} />{triggerLabel}</button> : <button className={editLabel ? "text-link" : "table-action"} onClick={openEditor} aria-label={`编辑${title}`}>{editLabel ?? <Pencil size={14} />}{editLabel && <Pencil size={14} />}</button>}{open && <div className="modal-backdrop" onMouseDown={() => setOpen(false)}><div className="modal editor-modal" onMouseDown={event => event.stopPropagation()}><div className="modal-title"><div><p className="eyebrow">{mode === "create" ? "CREATE" : "EDIT"}</p><h2>{title}</h2></div><button className="icon-button" onClick={() => setOpen(false)}><X size={18} /></button></div><div className="editor-fields">{fields.map(field => <label key={field.key}>{field.label}{field.type === "textarea" ? <textarea value={values[field.key] ?? ""} onChange={event => setValues({ ...values, [field.key]: event.target.value })} /> : field.type === "select" ? <select value={values[field.key] ?? ""} onChange={event => setValues({ ...values, [field.key]: event.target.value })}>{field.options?.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select> : <input type={field.type ?? "text"} value={values[field.key] ?? ""} onChange={event => setValues({ ...values, [field.key]: event.target.value })} />}</label>)}</div><div className="editor-footer"><button className="secondary-button" onClick={() => setOpen(false)}>取消</button><button className="github-button" onClick={save}>保存</button></div></div></div>}</>;
}

export function RemoveButton({ label, onRemove }: { label: string; onRemove: () => void }) { return <button className="table-action danger" aria-label={`删除${label}`} onClick={() => { if (window.confirm(`删除「${label}」？此操作只影响当前浏览器。`)) onRemove(); }}><Trash2 size={14} /></button>; }
