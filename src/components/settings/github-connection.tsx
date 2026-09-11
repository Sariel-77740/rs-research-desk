"use client";

import { GitFork, Link2, LoaderCircle, LogOut, RefreshCw, Star } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

type Repository = { id: number; full_name: string; html_url: string; private: boolean; updated_at: string };
export function GitHubConnection() {
  const { data: session, status } = useSession(); const [repos, setRepos] = useState<Repository[]>([]); const [stars, setStars] = useState<Repository[]>([]); const [loading, setLoading] = useState<"repos" | "stars" | null>(null); const [error, setError] = useState("");
  const connect = async () => { setError(""); const response = await fetch("/api/github/config"); const { configured } = await response.json() as { configured: boolean }; if (!configured) { setError("GitHub 登录尚未配置。请按项目根目录的 .env.example 创建 .env.local，并填写 OAuth App 的 ID 和 Secret 后重启服务。"); return; } await signIn("github"); };
  const load = async (kind: "repos" | "stars") => { setLoading(kind); setError(""); try { const response = await fetch(`/api/github/${kind === "repos" ? "repos" : "starred"}`); if (!response.ok) throw new Error(); const data = await response.json() as Repository[]; if (kind === "repos") setRepos(data); else setStars(data); } catch { setError("读取失败，请重新连接 GitHub 后再试。"); } finally { setLoading(null); } };
  const list = (items: Repository[], empty: string) => <div className="repository-list">{items.slice(0, 8).map(repo => <a href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}><Link2 size={14} /><span>{repo.full_name}</span><small>{repo.private ? "Private" : "Public"}</small></a>)}{!loading && !error && !items.length && <p className="subtle">{empty}</p>}</div>;
  if (status === "loading") return <p className="subtle">正在检查 GitHub 连接…</p>;
  if (!session) return <div className="github-connect"><p className="subtle">授权后可读取公开仓库和公开收藏，用于关联研究项目和实验。</p><button className="github-button" onClick={() => void connect()}><GitFork size={16} />连接 GitHub</button>{error && <p className="integration-error">{error}</p>}</div>;
  return <div className="github-connect"><div className="github-user"><GitFork size={19} /><div><strong>{session.user?.name ?? session.user?.email}</strong><small>GitHub 已连接 · 仅访问公开资料</small></div><button className="icon-button" title="断开连接" onClick={() => signOut()}><LogOut size={16} /></button></div><div className="repository-toolbar"><strong>可关联仓库</strong><button onClick={() => void load("repos")} disabled={loading !== null}>{loading === "repos" ? <LoaderCircle className="spin" size={14} /> : <RefreshCw size={14} />}读取仓库</button></div>{list(repos, "点击“读取仓库”即可加载。")}<div className="repository-toolbar"><strong>我的收藏</strong><button onClick={() => void load("stars")} disabled={loading !== null}>{loading === "stars" ? <LoaderCircle className="spin" size={14} /> : <Star size={14} />}读取收藏</button></div>{error && <p className="integration-error">{error}</p>}{list(stars, "点击“读取收藏”即可加载 GitHub Star 的仓库。")}</div>;
}
