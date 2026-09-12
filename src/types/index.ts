export type TaskType = "paper" | "experiment" | "coding" | "meeting" | "writing" | "course" | "other";
export type TaskStatus = "todo" | "doing" | "done";
export type PaperStatus = "unread" | "skimming" | "reading" | "finished" | "reproducing" | "archived";
export type ExperimentStatus = "planned" | "running" | "completed" | "failed" | "stopped";
export type IdeaStatus = "inbox" | "researching" | "promising" | "experimenting" | "abandoned" | "converted_to_project";
export type PaperStudyImage = { id: string; name: string; };
export interface Paper { id: string; title: string; authors: string; year: number; venue: string; tags: string[]; status: PaperStatus; rating: number; progress: number; importance: "high" | "medium" | "low"; abstract: string; sourceUrl?: string; studyNotes?: string; studyImages?: PaperStudyImage[]; }
export interface Experiment { id: string; name: string; project: string; model: string; dataset: string; status: ExperimentStatus; result: string; createdAt: string; updatedAt: string; gpu: string; description: string; metrics: { name: string; value: string }[]; notes: string; }
export interface Idea { id: string; title: string; status: IdeaStatus; createdAt: string; problem: string; hypothesis: string; novelty: string; nextStep: string; }
export interface Project { id: string; name: string; description: string; status: "Idea" | "To Read" | "To Reproduce" | "Experimenting" | "Writing" | "Done"; priority: "High" | "Medium" | "Low"; startDate: string; targetDate: string; question: string; goal: string; }
export interface KnowledgeNote { id: string; title: string; category: string; tags: string[]; content: string; mastery: number; keyConcepts: string; questions: string; references: string; images?: string[]; }
export type CourseMeeting = { id: string; weekday: string; weeks: string; periods: string; classroom: string; };
export type CourseAttachment = { id: string; name: string; type: "image" | "document"; mimeType: string; size: number; };
export type CourseDeadline = { id: string; date: string; title: string; note: string; };
export interface Course { id: string; code: string; name: string; school: string; teacher: string; className: string; credits: string; meetings: CourseMeeting[]; deadlines: CourseDeadline[]; notes: string; attachments: CourseAttachment[]; }
export type CalendarEventType = "meeting" | "exam" | "experiment" | "personal" | "other";
export interface CalendarEvent { id: string; date: string; time: string; title: string; type: CalendarEventType; note: string; }
export type WritingStatus = "draft" | "writing" | "review" | "completed";
export interface WritingProject { id: string; title: string; status: WritingStatus; abstract: string; introduction: string; relatedWork: string; method: string; experiments: string; conclusion: string; figures: string[]; tables: string[]; snippets: string[]; }
export interface Task { id: string; title: string; type: TaskType; priority: "high" | "medium" | "low"; status: TaskStatus; due: string; }
export interface Activity { id: string; action: string; detail: string; time: string; type: "paper" | "experiment" | "idea" | "project" | "dataset" | "meeting"; }
