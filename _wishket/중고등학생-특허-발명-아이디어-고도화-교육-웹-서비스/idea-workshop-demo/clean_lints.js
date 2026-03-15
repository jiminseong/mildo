const fs = require("fs");
const path = require("path");

function replaceLints(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // text-[var(--foreground)] -> text-foreground
  content = content.replace(/text-\[var\(--foreground\)\]/g, "text-foreground");
  // font-[family:var(--font-display)] -> font-display
  content = content.replace(/font-\[family:var\(--font-display\)\]/g, "font-display");
  // text-[var(--muted)] -> text-muted
  content = content.replace(/text-\[var\(--muted\)\]/g, "text-muted");
  // border-[var(--foreground)] -> border-foreground
  content = content.replace(/border-\[var\(--foreground\)\]/g, "border-foreground");
  // bg-[var(--foreground)] -> bg-foreground
  content = content.replace(/bg-\[var\(--foreground\)\]/g, "bg-foreground");
  // border-[var(--line)] -> border-slate-200
  content = content.replace(/border-\[var\(--line\)\]/g, "border-slate-200");
  // bg-[var(--surface)] -> bg-surface
  content = content.replace(/bg-\[var\(--surface\)\]/g, "bg-surface");
  // !px-3 -> px-3!
  content = content.replace(/!px-3/g, "px-3!");
  // !py-3 -> py-3!
  content = content.replace(/!py-3/g, "py-3!");

  // also fix some random border-border
  content = content.replace(/border-border/g, "border-slate-200");

  fs.writeFileSync(filePath, content, "utf8");
}

replaceLints("src/app/components/ui.tsx");
replaceLints("src/app/components/StepSidebar.tsx");
replaceLints("src/app/student/page.tsx");
replaceLints("src/app/guide/page.tsx");
replaceLints("src/app/admin/page.tsx");

console.log("Done");
