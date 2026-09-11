export type TaskType = "paper" | "experiment" | "coding" | "meeting" | "writing" | "course" | "other";
export type TaskStatus = "todo" | "doing" | "done";
export type PaperStatus = "unread" | "skimming" | "reading" | "finished" | "reproducing" | "archived";
export type ExperimentStatus = "planned" | "running" | "completed" | "failed" | "stopped";
export type IdeaStatus = "inbox" | "researching" | "promising" | "experimenting" | "abandoned" | "converted_to_project";
export interface Paper { id: string; title: string; authors: string; year: number; venue: string; tags: string[]; status: PaperStatus; rating: number; progress: number; importance: "high" | "medium" | "low"; abstract: string; sourceUrl?: string; }
export interface Experiment { id: string; name: string; project: string; model: string; dataset: string; status: ExperimentStatus; result: string; createdAt: string; updatedAt: string; gpu: string; description: string; metrics: { name: string; value: string }[]; notes: string; }
export interface Idea { id: string; title: string; status: IdeaStatus; createdAt: string; problem: string; hypothesis: string; novelty: string; nextStep: string; }
export interface Project { id: string; name: string; description: string; status: "Idea" | "To Read" | "To Reproduce" | "Experimenting" | "Writing" | "Done"; priority: "High" | "Medium" | "Low"; startDate: string; targetDate: string; question: string; goal: string; }
export interface KnowledgeNote { id: string; title: string; category: string; tags: string[]; content: string; mastery: number; keyConcepts: string; questions: string; references: string; images?: string[]; }
export type WritingStatus = "draft" | "writing" | "review" | "completed";
export interface WritingProject { id: string; title: string; status: WritingStatus; abstract: string; introduction: string; relatedWork: string; method: string; experiments: string; conclusion: string; figures: string[]; tables: string[]; snippets: string[]; }
export interface Task { id: string; title: string; type: TaskType; priority: "high" | "medium" | "low"; status: TaskStatus; due: string; }
export interface Activity { id: string; action: string; detail: string; time: string; type: "paper" | "experiment" | "idea" | "project" | "dataset" | "meeting"; }
