"use client";

import { CalendarDays, GraduationCap } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { RecordEditor, RemoveButton, type EditorField } from "@/components/shared/record-editor";
import { useWorkspaceStore } from "@/lib/workspace-store";
import { courseProgress, currentAcademicWeek } from "@/lib/course-calendar";

const fields: EditorField[] = [{ key: "code", label: "课程编号" }, { key: "name", label: "课程名称" }, { key: "school", label: "院系" }, { key: "teacher", label: "主讲教师" }, { key: "className", label: "班级名称" }, { key: "credits", label: "学分" }];
const blank = { code: "", name: "", school: "", teacher: "", className: "", credits: "" };

export default function CoursesPage() {
  const courses = useWorkspaceStore(s => s.courses); const add = useWorkspaceStore(s => s.addCourse); const remove = useWorkspaceStore(s => s.remove); const week = currentAcademicWeek();
  const create = (values: Record<string, string>) => add({ id: `course-${Date.now()}`, code: values.code, name: values.name, school: values.school, teacher: values.teacher, className: values.className, credits: values.credits, meetings: [], deadlines: [], notes: "", attachments: [] });
  return <><PageHeader title="Courses" description={`第 ${week} 周 · 课程安排、课堂资料与可编辑的学习笔记`} /><div className="toolbar"><span>{courses.length} 门课程</span><RecordEditor title="新课程" fields={fields} initialValues={blank} mode="create" triggerLabel="添加课程" onSave={create} /></div><div className="course-grid">{courses.map(course => { const progress = courseProgress(course.meetings.map(item => item.weeks), week); return <article className="course-card" key={course.id}><div className="course-card-top"><span className="course-code">{course.code || "课程编号待补充"}</span><RemoveButton label={course.name} onRemove={() => remove("courses", course.id)} /></div><GraduationCap size={20} /><Link href={`/courses/${course.id}`}><h2>{course.name || "未命名课程"}</h2></Link><p>{course.school || "院系待补充"} · {course.teacher || "教师待补充"}</p><div className="course-progress"><div><span>课程进度</span><b>{progress.progress}%</b></div><div className="progress"><i style={{ width: `${progress.progress}%` }} /></div><small>{progress.label}</small></div><footer><CalendarDays size={14} /><span>{course.meetings.length ? course.meetings.map(item => `${item.weekday} ${item.periods}`).join(" · ") : "未设置上课时间"}</span></footer></article>; })}</div></>;
}
