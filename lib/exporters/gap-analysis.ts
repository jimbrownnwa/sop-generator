import type { Process, ProcessStep } from "@/types";

interface GapAnalysisResult {
  undocumentedSteps: string[];
  manualHandoffs: string[];
  singlePointsOfFailure: string[];
  bottlenecks: string[];
  recommendations: string[];
}

export function analyzeProcessGaps(
  process: Process,
  steps: ProcessStep[]
): GapAnalysisResult {
  const gaps: GapAnalysisResult = {
    undocumentedSteps: [],
    manualHandoffs: [],
    singlePointsOfFailure: [],
    bottlenecks: [],
    recommendations: [],
  };

  // Analyze each step
  steps.forEach((step, index) => {
    // Check for incomplete documentation
    if (!step.description || step.description.trim().length < 10) {
      gaps.undocumentedSteps.push(
        `Step ${index + 1} (${step.step_name}): Lacks detailed description`
      );
    }

    if (step.systems_used.length === 0) {
      gaps.undocumentedSteps.push(
        `Step ${index + 1} (${step.step_name}): No systems/tools documented`
      );
    }

    // Detect manual handoffs (steps with manual in description or pain points)
    const hasManualWork =
      step.step_name.toLowerCase().includes("manual") ||
      step.description.toLowerCase().includes("manual") ||
      step.pain_points.toLowerCase().includes("manual") ||
      step.systems_used.some(
        (s) => s.toLowerCase().includes("email") || s.toLowerCase().includes("excel")
      );

    if (hasManualWork) {
      gaps.manualHandoffs.push(
        `Step ${index + 1} (${step.step_name}): Manual process detected`
      );
    }

    // Detect single points of failure (only one person/role can do it)
    if (
      step.role_responsible &&
      !step.role_responsible.toLowerCase().includes("team") &&
      !step.role_responsible.toLowerCase().includes("department")
    ) {
      gaps.singlePointsOfFailure.push(
        `Step ${index + 1} (${step.step_name}): Relies on specific individual (${step.role_responsible})`
      );
    }

    // Detect potential bottlenecks
    if (step.pain_points) {
      if (
        step.pain_points.toLowerCase().includes("delay") ||
        step.pain_points.toLowerCase().includes("slow") ||
        step.pain_points.toLowerCase().includes("wait")
      ) {
        gaps.bottlenecks.push(
          `Step ${index + 1} (${step.step_name}): ${step.pain_points}`
        );
      }
    }
  });

  // Generate recommendations
  if (gaps.manualHandoffs.length > 0) {
    gaps.recommendations.push(
      `Consider automating ${gaps.manualHandoffs.length} manual steps to improve efficiency and reduce errors`
    );
  }

  if (gaps.singlePointsOfFailure.length > 0) {
    gaps.recommendations.push(
      `Cross-train team members on ${gaps.singlePointsOfFailure.length} critical steps to reduce dependency on individuals`
    );
  }

  if (gaps.bottlenecks.length > 0) {
    gaps.recommendations.push(
      `Address ${gaps.bottlenecks.length} identified bottlenecks to improve process throughput`
    );
  }

  if (gaps.undocumentedSteps.length > 0) {
    gaps.recommendations.push(
      `Complete documentation for ${gaps.undocumentedSteps.length} steps to ensure process clarity`
    );
  }

  // Check for lack of system integration
  const systemsUsed = new Set<string>();
  steps.forEach((step) => {
    step.systems_used.forEach((system) => systemsUsed.add(system));
  });

  if (systemsUsed.size > 3) {
    gaps.recommendations.push(
      `Multiple systems in use (${systemsUsed.size}). Consider integration opportunities to streamline data flow`
    );
  }

  return gaps;
}

export function generateGapAnalysisMarkdown(
  process: Process,
  steps: ProcessStep[]
): string {
  const gaps = analyzeProcessGaps(process, steps);

  let markdown = `# Gap Analysis Report: ${process.name}\n\n`;
  markdown += `**Generated:** ${new Date().toLocaleDateString()}\n\n`;
  markdown += `**Process Owner:** ${process.owner}\n\n`;

  markdown += `## Executive Summary\n\n`;
  markdown += `This report identifies potential gaps, risks, and improvement opportunities in the **${process.name}** process.\n\n`;

  markdown += `---\n\n`;

  // Undocumented Steps
  markdown += `## 1. Documentation Gaps\n\n`;
  if (gaps.undocumentedSteps.length > 0) {
    markdown += `**Found ${gaps.undocumentedSteps.length} documentation gap(s):**\n\n`;
    gaps.undocumentedSteps.forEach((gap) => {
      markdown += `- ${gap}\n`;
    });
  } else {
    markdown += `✓ All steps are adequately documented.\n`;
  }
  markdown += `\n`;

  // Manual Handoffs
  markdown += `## 2. Manual Handoffs\n\n`;
  if (gaps.manualHandoffs.length > 0) {
    markdown += `**Found ${gaps.manualHandoffs.length} manual handoff(s):**\n\n`;
    gaps.manualHandoffs.forEach((handoff) => {
      markdown += `- ${handoff}\n`;
    });
    markdown += `\n**Impact:** Manual handoffs increase cycle time and risk of errors.\n`;
  } else {
    markdown += `✓ No obvious manual handoffs detected.\n`;
  }
  markdown += `\n`;

  // Single Points of Failure
  markdown += `## 3. Single Points of Failure\n\n`;
  if (gaps.singlePointsOfFailure.length > 0) {
    markdown += `**Found ${gaps.singlePointsOfFailure.length} single point(s) of failure:**\n\n`;
    gaps.singlePointsOfFailure.forEach((spof) => {
      markdown += `- ${spof}\n`;
    });
    markdown += `\n**Risk:** Process disruption if key personnel are unavailable.\n`;
  } else {
    markdown += `✓ No single points of failure identified.\n`;
  }
  markdown += `\n`;

  // Bottlenecks
  markdown += `## 4. Process Bottlenecks\n\n`;
  if (gaps.bottlenecks.length > 0) {
    markdown += `**Found ${gaps.bottlenecks.length} potential bottleneck(s):**\n\n`;
    gaps.bottlenecks.forEach((bottleneck) => {
      markdown += `- ${bottleneck}\n`;
    });
    markdown += `\n**Impact:** Bottlenecks limit process throughput and cause delays.\n`;
  } else {
    markdown += `✓ No obvious bottlenecks reported.\n`;
  }
  markdown += `\n`;

  // Recommendations
  markdown += `## 5. Recommendations\n\n`;
  if (gaps.recommendations.length > 0) {
    gaps.recommendations.forEach((rec, index) => {
      markdown += `${index + 1}. ${rec}\n`;
    });
  } else {
    markdown += `The process appears to be well-documented and optimized. Continue monitoring for improvement opportunities.\n`;
  }

  markdown += `\n---\n\n`;
  markdown += `*This gap analysis was automatically generated by the Process Documentation Tool*\n`;

  return markdown;
}
