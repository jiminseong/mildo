const fs = require('fs');
const file = 'src/app/components/StudentSteps.tsx';
const lines = fs.readFileSync(file, 'utf8').split('\n');

let newLines = [];
let extractedSteps = [];
let currentStep = null;
let currentStepLines = [];
let braceCount = 0;
let capturingProps = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we found `if (resolvedStep === X) {`
    const match = line.match(/^  if \(resolvedStep === (\d+)\) \{/);
    if (match && currentStep === null) {
        currentStep = match[1];
        braceCount = 1;
        currentStepLines = [];
        newLines.push(`  if (resolvedStep === ${currentStep}) return <Step${currentStep} {...props} />;`);
        continue;
    }
    
    if (currentStep !== null) {
        // Count braces to find the matching closing brace
        // We know that `if (...) {` is at indent 2, and the closing brace is `  }`
        let openBraces = (line.match(/\{/g) || []).length;
        let closeBraces = (line.match(/\}/g) || []).length;
        
        braceCount += openBraces - closeBraces;
        
        if (braceCount === 0 && line === '  }') {
            // We found the end of the step!
            extractedSteps.push({
                num: currentStep,
                body: currentStepLines.join('\n')
            });
            currentStep = null;
            continue;
        } else {
            currentStepLines.push(line);
        }
        continue; // skip pushing to newLines
    }
    
    newLines.push(line);
}

// Now we need to insert the props object before the first `if (resolvedStep === 1)`
const firstIfIndex = newLines.findIndex(l => l.includes('if (resolvedStep === 1) return <Step1'));
if (firstIfIndex > -1) {
    newLines.splice(firstIfIndex, 0, `  const props = {
    ctx, state, activeStep, setActiveStep, setIntroPlaying, introPlaying,
    highestUnlockedStep, resolvedStep, currentIdea, boardIdeas,
    filteredIdeas, effectiveBoardIdeaId, selectedBoardIdea, currentLevel
  };`);
}

// generate the Step functions
const stepFunctions = extractedSteps.map(step => {
    return `
function Step${step.num}({ ctx, state, activeStep, setActiveStep, setIntroPlaying, introPlaying, highestUnlockedStep, resolvedStep, currentIdea, boardIdeas, filteredIdeas, effectiveBoardIdeaId, selectedBoardIdea, currentLevel }: any) {
${step.body}
}
`;
}).join('\n');

fs.writeFileSync(file, newLines.join('\n') + '\n' + stepFunctions, 'utf8');
console.log("Done");
