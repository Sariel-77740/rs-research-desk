"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { experiments as seedExperiments, ideas as seedIdeas, knowledgeNotes as seedKnowledgeNotes, papers as seedPapers, projects as seedProjects, tasks as seedTasks, writingProjects as seedWritingProjects } from "@/data/mock-data";
import { yaoXiwenPapers } from "@/data/yao-xiwen-papers";
import type { Experiment, Idea, KnowledgeNote, Paper, Project, Task, WritingProject } from "@/types";

type Profile = { name: string; major: string; direction: string; grade: string; topic: string; stage: string; weeklyGoal: number; weeklyExperimentGoal?: number; weeklyTaskGoal?: number };
type Activity = { id: string; action: string; detail: string; time: string; type: "paper" | "experiment" | "idea" | "project" | "knowledge" | "writing" };
type NewTask = Omit<Task, "type" | "priority" | "status"> & { type: string; priority: string; status: string };
type State = {
  papers: Paper[]; experiments: Experiment[]; ideas: Idea[]; projects: Project[]; knowledgeNotes: KnowledgeNote[]; writingProjects: WritingProject[]; tasks: Task[]; activities: Activity[]; profile: Profile;
  updatePaper: (id: string, patch: Partial<Paper>) => void; updateExperiment: (id: string, patch: Partial<Experiment>) => void; updateIdea: (id: string, patch: Partial<Idea>) => void; updateProject: (id: string, patch: Partial<Project>) => void; updateKnowledge: (id: string, patch: Partial<KnowledgeNote>) => void; updateWriting: (id: string, patch: Partial<WritingProject>) => void; updateTask: (id: string, patch: Partial<Task>) => void;
  addPaper: (x: Paper) => void; addExperiment: (x: Experiment) => void; addIdea: (x: Idea) => void; addProject: (x: Project) => void; addKnowledge: (x: KnowledgeNote) => void; addWriting: (x: WritingProject) => void; addTask: (x: NewTask) => void;
  remove: (kind: "papers" | "experiments" | "ideas" | "projects" | "knowledgeNotes" | "writingProjects" | "tasks", id: string) => void; updateProfile: (patch: Partial<Profile>) => void;
};
const change = <T extends { id: string }>(items: T[], id: string, patch: Partial<T>) => items.map(item => item.id === id ? { ...item, ...patch } : item);
const event = (type: Activity["type"], action: string, detail: string): Activity => ({ id: `${type}-${Date.now()}`, type, action, detail, time: "刚刚" });
const log = (activities: Activity[], entry: Activity) => [entry, ...activities].slice(0, 20);

export const useWorkspaceStore = create<State>()(persist((set) => ({
  papers: [...yaoXiwenPapers, ...seedPapers], experiments: seedExperiments, ideas: seedIdeas, projects: seedProjects, knowledgeNotes: seedKnowledgeNotes, writingProjects: seedWritingProjects, tasks: seedTasks, activities: [],
  profile: { name: "Yun Researcher", major: "Control Engineering", direction: "Remote Sensing Foundation Models", grade: "Graduate Student", topic: "Remote Sensing Vision-Language Model", stage: "Experimenting", weeklyGoal: 5, weeklyExperimentGoal: 1, weeklyTaskGoal: 3 },
  updatePaper: (id, patch) => set(s => { const item = s.papers.find(x => x.id === id); return { papers: change(s.papers, id, patch), activities: log(s.activities, event("paper", "更新论文", patch.title ?? item?.title ?? id)) }; }),
  updateExperiment: (id, patch) => set(s => { const item = s.experiments.find(x => x.id === id); return { experiments: change(s.experiments, id, patch), activities: log(s.activities, event("experiment", "更新实验", patch.name ?? item?.name ?? id)) }; }),
  updateIdea: (id, patch) => set(s => { const item = s.ideas.find(x => x.id === id); return { ideas: change(s.ideas, id, patch), activities: log(s.activities, event("idea", "更新 Idea", patch.title ?? item?.title ?? id)) }; }),
  updateProject: (id, patch) => set(s => { const item = s.projects.find(x => x.id === id); return { projects: change(s.projects, id, patch), activities: log(s.activities, event("project", "更新项目", patch.name ?? item?.name ?? id)) }; }),
  updateKnowledge: (id, patch) => set(s => { const item = s.knowledgeNotes.find(x => x.id === id); return { knowledgeNotes: change(s.knowledgeNotes, id, patch), activities: log(s.activities, event("knowledge", "更新知识笔记", patch.title ?? item?.title ?? id)) }; }),
  updateWriting: (id, patch) => set(s => { const item = s.writingProjects.find(x => x.id === id); return { writingProjects: change(s.writingProjects, id, patch), activities: log(s.activities, event("writing", "更新写作项目", patch.title ?? item?.title ?? id)) }; }),
  updateTask: (id, patch) => set(s => ({ tasks: change(s.tasks, id, patch) })),
  addPaper: x => set(s => ({ papers: [x, ...s.papers], activities: log(s.activities, event("paper", "新增论文", x.title)) })),
  addExperiment: x => set(s => ({ experiments: [x, ...s.experiments], activities: log(s.activities, event("experiment", "新增实验", x.name)) })),
  addIdea: x => set(s => ({ ideas: [x, ...s.ideas], activities: log(s.activities, event("idea", "新增 Idea", x.title)) })),
  addProject: x => set(s => ({ projects: [x, ...s.projects], activities: log(s.activities, event("project", "新增项目", x.name)) })),
  addKnowledge: x => set(s => ({ knowledgeNotes: [x, ...s.knowledgeNotes], activities: log(s.activities, event("knowledge", "新增知识笔记", x.title)) })),
  addWriting: x => set(s => ({ writingProjects: [x, ...s.writingProjects], activities: log(s.activities, event("writing", "新增写作项目", x.title)) })),
  addTask: x => set(s => ({ tasks: [x as Task, ...s.tasks] })),
  remove: (kind, id) => set(s => ({ [kind]: s[kind].filter(x => x.id !== id) })),
  updateProfile: patch => set(s => ({ profile: { ...s.profile, ...patch } })),
}), { name: "rs-research-desk-workspace", version: 2, migrate: (persistedState, version) => {
  const state = persistedState as { papers?: Paper[] };
  if (version >= 2) return state;
  const existing = state.papers ?? [];
  return { ...state, papers: [...yaoXiwenPapers.filter(paper => !existing.some(item => item.id === paper.id || item.title === paper.title)), ...existing] };
} }));
