const fs = require('fs');
const path = require('path');

const files = [
  'src/app/components/ui.tsx',
  'src/app/components/StepSidebar.tsx',
  'src/app/components/Footer.tsx',
  'src/app/proposal-demo.tsx',
  'src/app/student/page.tsx',
  'src/app/guide/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/text-\[\#80553f\]/g, 'text-primary');
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('done replacing colors');
