"use client";

import { Check, Moon, Save, Sun } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GitHubConnection } from "@/components/settings/github-connection";
import { useUIStore } from "@/lib/store";
import { useWorkspaceStore } from "@/lib/workspace-store";

export default function SettingsPage() {
  const { dark, toggleDark } = useUIStore(); const profile = useWorkspaceStore(s => s.profile); const update = useWorkspaceStore(s => s.updateProfile);
  return <><PageHeader title="Settings" description="所有设置会自动保存到当前浏览器" /><div className="settings-layout">
    <section className="panel settings-section"><p className="eyebrow">PROFILE</p><h2>个人信息</h2><div className="form-grid"><label>Name<input value={profile.name} onChange={e => update({ name: e.target.value })} /></label><label>Major<input value={profile.major} onChange={e => update({ major: e.target.value })} /></label><label>Research Direction<input value={profile.direction} onChange={e => update({ direction: e.target.value })} /></label><label>Grade<input value={profile.grade} onChange={e => update({ grade: e.target.value })} /></label></div></section>
    <section className="panel settings-section"><p className="eyebrow">RESEARCH PREFERENCES</p><h2>研究偏好与本周目标</h2><div className="form-grid"><label>Current Topic<input value={profile.topic} onChange={e => update({ topic: e.target.value })} /></label><label>Current Stage<select value={profile.stage} onChange={e => update({ stage: e.target.value })}><option>Reading</option><option>Reproducing</option><option>Experimenting</option><option>Writing</option></select></label><label>Weekly Paper Goal<input type="number" value={profile.weeklyGoal} onChange={e => update({ weeklyGoal: Number(e.target.value) })} /></label><label>Weekly Experiment Goal<input type="number" value={profile.weeklyExperimentGoal ?? 1} onChange={e => update({ weeklyExperimentGoal: Number(e.target.value) })} /></label><label>Weekly Task Goal<input type="number" value={profile.weeklyTaskGoal ?? 3} onChange={e => update({ weeklyTaskGoal: Number(e.target.value) })} /></label></div><p className="autosave"><Save size={13} />已自动保存</p></section>
    <section className="panel settings-section"><p className="eyebrow">APPEARANCE</p><h2>外观</h2><div className="theme-options"><button className={!dark ? "selected" : ""} onClick={() => dark && toggleDark()}><Sun size={18} />Light {!dark && <Check size={16} />}</button><button className={dark ? "selected" : ""} onClick={() => !dark && toggleDark()}><Moon size={18} />Dark {dark && <Check size={16} />}</button></div></section>
    <section className="panel settings-section"><p className="eyebrow">INTEGRATIONS</p><h2>GitHub</h2><GitHubConnection /></section>
  </div></>;
}
