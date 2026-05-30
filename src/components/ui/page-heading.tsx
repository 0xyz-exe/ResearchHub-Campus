import { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface PageHeadingProps {
  title: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
}

export function PageHeading({ title, description, breadcrumbs, actions }: PageHeadingProps) {
  return (
    <div className="mb-6 space-y-4">
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
