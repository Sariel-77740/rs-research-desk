"use client";

import { ArrowUpRight, CircleDotDashed } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { RecordEditor, RemoveButton, type EditorField } from "@/components/shared/record-editor";
import { StatusBadge } from "@/components/shared/status-badge";
import { useWorkspaceStore } from "@/lib/workspace-store";
import type { Task } from "@/types";

const taskFields: EditorField[] = [{ key: "title", label: "Task" }, { key: "type", label: "Type" }, { key: "priority", label: "Priority", type: "select", options: [["high", "High"], ["medium", "Medium"], ["low", "Low"]] }, { key: "status", label: "Status", type: "select", options: [["todo", "待办"], ["doing", "进行中"], ["done", "完成"]] }, { key: "due", label: "Due" }];
const goalFields: EditorField[] = [{ key: "weeklyGoal", label: "本周阅读目标", type: "number" }, { key: "weeklyExperimentGoal", label: "本周实验目标", type: "number" }, { key: "weeklyTaskGoal", label: "本周任务目标", type: "number" }];
const isToday = (due: string) => due.toLowerCase().startsWith("today");
const isOverdue = (task: Task) => { if (task.status === "done" || isToday(task.due) || task.due.toLowerCase().startsWith("tomorrow")) return false; const parsed = new Date(/^\w{3}\s+\d{1,2}$/.test(task.due) ? `${task.due}, ${new Date().getFullYear()}` : task.due); const today = new Date(); today.setHours(0, 0, 0, 0); return !Number.isNaN(parsed.valueOf()) && parsed < today; };

function TaskRow({ task, overdue }: { task: Task; overdue: boolean }) {
  const update = useWorkspaceStore(s => s.updateTask); const remove = useWorkspaceStore(s => s.remove);
  return <div className="task-row" style={overdue ? { background: "color-mix(in srgb, #ffe7e7 55%, var(--panel))", borderLeft: "3px solid #d85c5c", paddingLeft: 10, borderRadius: 6 } : undefined}><button className={`task-check ${task.status === "done" ? "checked" : ""}`} aria-label={task.status === "done" ? "标记为待办" : "标记为完成"} aria-pressed={task.status === "done"} onClick={() => update(task.id, { status: task.status === "done" ? "todo" : "done" })}>{task.status === "done" ? "✓" : ""}</button><div><strong>{task.title}</strong><small>{task.type} · {task.due}</small></div>{overdue && <span className="status status-failed">已逾期</span>}<StatusBadge status={task.status} /><span className="row-actions"><RecordEditor title="编辑任务" fields={taskFields} initialValues={task} onSave={v => update(task.id, { title: v.title, type: v.type as Task["type"], priority: v.priority as Task["priority"], status: v.status as Task["status"], due: v.due })} /><RemoveButton label={task.title} onRemove={() => remove("tasks", task.id)} /></span></div>;
}

function GoalRow({ label, current, target, unit }: { label: string; current: number; target: number; unit: string }) {
  const isSet = target > 0;
  const complete = isSet && current >= target;
  const text = isSet ? `${label}：${current} / ${target} ${unit}` : `${label}：未设置目标（已完成 ${current} ${unit}）`;
  return <li><span className={`completion-mark ${complete ? "is-complete" : ""}`}>{complete ? "✓" : <CircleDotDashed size={16} color="var(--muted)" />}</span>{text}</li>;
}

export default function DashboardPage() {
  const papers = useWorkspaceStore(s => s.papers); const experiments = useWorkspaceStore(s => s.experiments); const tasks = useWorkspaceStore(s => s.tasks); const profile = useWorkspaceStore(s => s.profile); const updateProfile = useWorkspaceStore(s => s.updateProfile); const addTask = useWorkspaceStore(s => s.addTask);
  const finished = papers.filter(x => x.status === "finished").length; const deep = papers.filter(x => x.status === "reproducing").length; const unread = papers.filter(x => x.status === "unread").length; const done = tasks.filter(x => x.status === "done").length; const completedExperiments = experiments.filter(x => x.status === "completed").length;
  const todayTasks = tasks.filter(task => isToday(task.due)); const overdueTasks = tasks.filter(isOverdue); const experimentGoal = profile.weeklyExperimentGoal ?? 1; const taskGoal = profile.weeklyTaskGoal ?? 3;
  const tags = ["Transformer", "Remote Sensing", "Foundation Models", "VLM", "Multimodal"].map(tag => { const list = papers.filter(x => x.tags.includes(tag)); return { label: tag, value: list.length ? Math.round(list.filter(x => x.status === "finished").length / list.length * 100) : 0 }; });
  const blank = { title: "", type: "other", priority: "medium", status: "todo", due: "Today" };
  return <><PageHeader title="Dashboard" description="聚焦今天要做的事、本周目标和阅读进度。" /><section className="dashboard-grid top-grid"><div className="panel task-panel"><div className="panel-title"><div><p className="eyebrow">TASKS</p><h2>今日任务</h2></div><span className="count">{todayTasks.length}</span></div>{todayTasks.length ? todayTasks.map(task => <TaskRow task={task} overdue={false} key={task.id} />) : <p className="subtle">今天还没有任务。</p>}{overdueTasks.length > 0 && <div style={{ marginTop: 22 }}><div className="panel-title" style={{ marginBottom: 4 }}><div><p className="eyebrow" style={{ color: "#c35454" }}>OVERDUE</p><h2>之前未完成</h2></div><span className="count">{overdueTasks.length}</span></div>{overdueTasks.map(task => <TaskRow task={task} overdue key={task.id} />)}</div>}<div className="task-actions"><RecordEditor title="新任务" fields={taskFields} initialValues={blank} mode="create" triggerLabel="添加任务" onSave={v => addTask({ id: `task-${tasks.length + 1}`, title: v.title, type: v.type, priority: v.priority, status: v.status, due: v.due })} /></div></div><div className="panel goals-panel"><p className="eyebrow">WEEKLY GOALS</p><h2>本周目标</h2><ul><GoalRow label="论文" current={finished} target={profile.weeklyGoal} unit="篇" /><GoalRow label="实验" current={completedExperiments} target={experimentGoal} unit="个" /><GoalRow label="任务" current={done} target={taskGoal} unit="项" /></ul><RecordEditor title="设置本周目标" editLabel="设置目标" fields={goalFields} initialValues={{ weeklyGoal: profile.weeklyGoal, weeklyExperimentGoal: experimentGoal, weeklyTaskGoal: taskGoal }} onSave={v => updateProfile({ weeklyGoal: Number(v.weeklyGoal), weeklyExperimentGoal: Number(v.weeklyExperimentGoal), weeklyTaskGoal: Number(v.weeklyTaskGoal) })} /></div></section><section className="dashboard-grid"><div className="panel reading-panel" style={{ gridColumn: "1 / -1" }}><div className="panel-title"><div><p className="eyebrow">PAPER READING</p><h2>本周阅读进度</h2></div><Link href="/papers" className="text-link">管理论文 <ArrowUpRight size={14} /></Link></div><div className="reading-stats">{[[profile.weeklyGoal, "计划阅读"], [finished, "已阅读"], [deep, "精读"], [unread, "待读"]].map(([n, label]) => <div key={String(label)}><strong>{n}</strong><span>{label}</span></div>)}</div><div className="topic-progress">{tags.map(({ label, value }) => <div key={label}><span>{label}</span><div className="progress"><i style={{ width: `${value}%` }} /></div><b>{value}%</b></div>)}</div></div></section></>;
}
