const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src/app/components/StudentSteps.tsx");
const content = fs.readFileSync(filePath, "utf8");

const topPartsMatch = content.match(/([\s\S]*?)(  if \(resolvedStep === 1\))/);
if (!topPartsMatch) {
  console.log("Could not find start of steps");
  process.exit(1);
}

const beforeSteps = topPartsMatch[1];
const remainingContent = content.substring(beforeSteps.length);

const stepsRegex =
  /  if \(resolvedStep === (\d+)\) {([\s\S]*?)  }(?=\n\n  if \(resolvedStep === |\n\n  return |\n}$)/g;

let match;
let stepsList = [];
let replacedContent = remainingContent;

while ((match = stepsRegex.exec(remainingContent)) !== null) {
  const stepNum = match[1];
  const stepBody = match[2];
  stepsList.push({ num: stepNum, body: stepBody });
}

// In the main function, we need to replace the if statements with:
// if (resolvedStep === 1) return <Step1 {...sharedProps} />;
let newRemainingContent = remainingContent;
stepsList.forEach((step) => {
  const blockRegex = new RegExp(`  if \\(resolvedStep === ${step.num}\\) \\{[\\s\\S]*?\\n  \\}`);
  newRemainingContent = newRemainingContent.replace(
    blockRegex,
    `  if (resolvedStep === ${step.num}) return <Step${step.num} {...props} />;`,
  );
});

// We need to define sharedProps inside StudentSteps
const propsDef = `  const props = {
    ctx,
    state,
    activeStep,
    setActiveStep,
    setIntroPlaying,
    introPlaying,
    highestUnlockedStep,
    resolvedStep,
    currentIdea,
    boardIdeas,
    filteredIdeas,
    effectiveBoardIdeaId,
    selectedBoardIdea,
    currentLevel
  };

`;

const insertIdx = beforeSteps.lastIndexOf("  if (resolvedStep ===");
// wait, the topPartsMatch ends right before `if (resolvedStep === 1)`
let finalBeforeSteps = beforeSteps + propsDef;

let stepFunctionsCode = stepsList
  .map((step) => {
    return `
function Step${step.num}({ ctx, state, activeStep, setActiveStep, setIntroPlaying, introPlaying, highestUnlockedStep, resolvedStep, currentIdea, boardIdeas, filteredIdeas, effectiveBoardIdeaId, selectedBoardIdea, currentLevel }: any) {
  return (${step.body.replace(/^  /gm, "")}  );
}
`;
  })
  .join("\n");

fs.writeFileSync(
  filePath,
  finalBeforeSteps + newRemainingContent + "\n" + stepFunctionsCode,
  "utf8",
);
