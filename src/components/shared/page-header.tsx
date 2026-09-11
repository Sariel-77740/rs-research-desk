import { ChevronLeft } from "lucide-react";
import Link from "next/link";
export function PageHeader({ title, description, back }: { title: string; description?: string; back?: { href: string; label: string } }) { return <div className="page-header">{back && <Link className="back-link" href={back.href}><ChevronLeft size={15} />{back.label}</Link>}<h1>{title}</h1>{description && <p>{description}</p>}</div>; }
