import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ideas } from "@/data/mock-data";
export default async function IdeaDetail({params}:{params:Promise<{id:string}>}){const {id}=await params;const idea=ideas.find(x=>x.id===id);if(!idea)return notFound();return <><PageHeader title={idea.title} description={`${idea.id} · 创建于 ${idea.createdAt}`} back={{href:"/ideas",label:"Ideas"}}/><section className="detail-hero"><StatusBadge status={idea.status}/><p className="subtle">从文献阅读和实验观察中形成的研究假设</p></section><article className="detail-notes single-detail">{[["Problem",idea.problem],["Hypothesis",idea.hypothesis],["Novelty",idea.novelty],["Next Step",idea.nextStep],["Related Papers","RemoteCLIP · GeoChat · CROMA"],["Related Experiments","EXP-019 · Prompt template ablation"]].map(([title,body])=><section key={title}><h2>{title}</h2><p>{body}</p></section>)}</article></>}
