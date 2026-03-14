const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/app/components/StudentSteps.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace basic inputs
content = content.replace(
  /w-full border border-border bg-white px-4 py-3 outline-none/g,
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
);

// Form / Primary / Secondary buttons from Step1
content = content.replace(
  /border border-foreground bg-foreground px-5 py-3 text-sm text-white transition-transform hover:-translate-y-0.5/g,
  'rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 hover:-translate-y-0.5 transition-all'
);
content = content.replace(
  /border border-border bg-white px-5 py-3 text-sm text-foreground transition-colors hover:bg-panel/g,
  'rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-all'
);

// Access code buttons
content = content.replace(
  /className="border border-border px-4 py-3 text-left text-sm text-foreground hover:bg-panel"/g,
  'className="rounded-xl flex items-center justify-between border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"'
);

// Access code parent container styling update
content = content.replace(
  /className="mt-5 border border-border bg-panel p-5"/g,
  'className="mt-5 rounded-xl border border-slate-200 bg-slate-50/50 p-5"'
);
content = content.replace(
  /border border-border bg-white p-5/g,
  'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
);

fs.writeFileSync(file, content, 'utf8');
