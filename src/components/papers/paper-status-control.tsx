"use client";
import type { PaperStatus } from "@/types";
import { StatusBadge } from "@/components/shared/status-badge";
import { usePaperStore } from "@/lib/paper-store";
const options: Array<[PaperStatus, string]> = [["unread","待读"],["skimming","略读"],["reading","阅读中"],["finished","已读"],["reproducing","复现中"],["archived","归档"]];
export function PaperStatusControl({ id, initialStatus, editable = false }: { id: string; initialStatus: PaperStatus; editable?: boolean }) { const paper = usePaperStore((state) => state.papers.find((item) => item.id === id)); const updatePaper = usePaperStore((state) => state.updatePaper); const status = paper?.status ?? initialStatus; if (!editable) return <StatusBadge status={status} />; return <label className="status-select"><StatusBadge status={status}/><select aria-label="修改论文状态" value={status} onChange={(event) => updatePaper(id, { status: event.target.value as PaperStatus })}>{options.map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select></label>; }
