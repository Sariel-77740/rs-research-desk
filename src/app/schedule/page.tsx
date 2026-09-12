"use client";

import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { RecordEditor, RemoveButton, type EditorField } from "@/components/shared/record-editor";
import { useWorkspaceStore } from "@/lib/workspace-store";
import type { CalendarEvent } from "@/types";

const fields: EditorField[] = [{ key: "date", label: "日期", type: "date" }, { key: "time", label: "时间", type: "time" }, { key: "title", label: "事项" }, { key: "type", label: "类型", type: "select", options: [["meeting", "会议"], ["exam", "考试"], ["experiment", "实验"], ["personal", "个人提醒"], ["other", "其他"]] }, { key: "note", label: "备注", type: "textarea" }];
const labels: Record<CalendarEvent["type"], string> = { meeting: "会议", exam: "考试", experiment: "实验", personal: "个人提醒", other: "其他" };

export default function SchedulePage() {
  const events = useWorkspaceStore(s => s.calendarEvents); const add = useWorkspaceStore(s => s.addCalendarEvent); const update = useWorkspaceStore(s => s.updateCalendarEvent); const remove = useWorkspaceStore(s => s.remove);
  const blank = { date: new Date().toISOString().slice(0, 10), time: "", title: "", type: "other", note: "" };
  const sorted = [...events].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  return <><PageHeader title="Schedule" description="会议、考试、实验、个人提醒等都会按日期和时间在首页显示。" /><div className="toolbar"><span>{events.length} 项日程</span><RecordEditor title="添加日程" fields={fields} initialValues={blank} mode="create" triggerLabel="添加事件" onSave={v => add({ id: `event-${Date.now()}`, date: v.date, time: v.time, title: v.title, type: v.type as CalendarEvent["type"], note: v.note })} /></div><div className="table-wrap"><table><thead><tr><th>日期</th><th>时间</th><th>事项</th><th>类型</th><th>备注</th><th /></tr></thead><tbody>{sorted.map(item => <tr key={item.id}><td>{item.date}</td><td>{item.time || "全天"}</td><td><CalendarDays size={14} style={{ verticalAlign: "-2px", marginRight: 6, color: "var(--accent)" }} />{item.title}</td><td><span className="status status-reading">{labels[item.type]}</span></td><td>{item.note || "—"}</td><td><span className="row-actions"><RecordEditor title="编辑日程" fields={fields} initialValues={item} onSave={v => update(item.id, { date: v.date, time: v.time, title: v.title, type: v.type as CalendarEvent["type"], note: v.note })} /><RemoveButton label={item.title} onRemove={() => remove("calendarEvents", item.id)} /></span></td></tr>)}{!sorted.length && <tr><td colSpan={6}><p className="subtle">还没有日程。添加后会出现在首页对应日期。</p></td></tr>}</tbody></table></div></>;
}
