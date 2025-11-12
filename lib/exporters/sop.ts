import type { Process, ProcessStep } from "@/types";

export function generateSOPMarkdown(
  process: Process,
  steps: ProcessStep[]
): string {
  let markdown = `# Standard Operating Procedure: ${process.name}\n\n`;
  markdown += `## Process Overview\n\n`;
  markdown += `**Description:** ${process.description}\n\n`;
  markdown += `**Process Owner:** ${process.owner}\n\n`;
  markdown += `**Category:** ${process.category}\n\n`;
  markdown += `**Last Updated:** ${new Date(process.updated_at).toLocaleDateString()}\n\n`;

  markdown += `---\n\n`;

  markdown += `## Process Steps\n\n`;

  steps.forEach((step, index) => {
    markdown += `### Step ${index + 1}: ${step.step_name}\n\n`;

    if (step.description) {
      markdown += `**Description:** ${step.description}\n\n`;
    }

    markdown += `**Responsible Role:** ${step.role_responsible}\n\n`;

    if (step.time_estimate) {
      markdown += `**Estimated Time:** ${step.time_estimate}\n\n`;
    }

    if (step.systems_used.length > 0) {
      markdown += `**Systems/Tools Used:**\n`;
      step.systems_used.forEach((system) => {
        markdown += `- ${system}\n`;
      });
      markdown += `\n`;
    }

    if (step.inputs.length > 0) {
      markdown += `**Required Inputs:**\n`;
      step.inputs.forEach((input) => {
        markdown += `- ${input}\n`;
      });
      markdown += `\n`;
    }

    if (step.outputs.length > 0) {
      markdown += `**Expected Outputs:**\n`;
      step.outputs.forEach((output) => {
        markdown += `- ${output}\n`;
      });
      markdown += `\n`;
    }

    if (step.decision_points) {
      markdown += `**Decision Points:** ${step.decision_points}\n\n`;
    }

    if (step.pain_points) {
      markdown += `**Known Issues/Pain Points:** ${step.pain_points}\n\n`;
    }

    if (step.notes) {
      markdown += `**Additional Notes:** ${step.notes}\n\n`;
    }

    markdown += `---\n\n`;
  });

  markdown += `## Quick Reference Guide\n\n`;
  markdown += `| Step | Action | Owner | Time |\n`;
  markdown += `|------|--------|-------|------|\n`;

  steps.forEach((step, index) => {
    markdown += `| ${index + 1} | ${step.step_name} | ${step.role_responsible} | ${step.time_estimate || "N/A"} |\n`;
  });

  markdown += `\n---\n\n`;
  markdown += `*This SOP was generated using the Process Documentation Tool*\n`;

  return markdown;
}

export function generateSOPText(
  process: Process,
  steps: ProcessStep[]
): string {
  let text = `STANDARD OPERATING PROCEDURE\n`;
  text += `${process.name}\n`;
  text += `${"=".repeat(50)}\n\n`;

  text += `Process Owner: ${process.owner}\n`;
  text += `Category: ${process.category}\n`;
  text += `Last Updated: ${new Date(process.updated_at).toLocaleDateString()}\n\n`;

  text += `DESCRIPTION\n`;
  text += `${process.description}\n\n`;

  text += `${"=".repeat(50)}\n\n`;
  text += `PROCESS STEPS\n\n`;

  steps.forEach((step, index) => {
    text += `STEP ${index + 1}: ${step.step_name.toUpperCase()}\n`;
    text += `${"-".repeat(50)}\n`;
    text += `Responsible: ${step.role_responsible}\n`;

    if (step.time_estimate) {
      text += `Time Required: ${step.time_estimate}\n`;
    }

    if (step.description) {
      text += `\nDescription:\n${step.description}\n`;
    }

    if (step.systems_used.length > 0) {
      text += `\nSystems/Tools:\n`;
      step.systems_used.forEach((system) => {
        text += `  - ${system}\n`;
      });
    }

    if (step.inputs.length > 0) {
      text += `\nRequired Inputs:\n`;
      step.inputs.forEach((input) => {
        text += `  - ${input}\n`;
      });
    }

    if (step.outputs.length > 0) {
      text += `\nExpected Outputs:\n`;
      step.outputs.forEach((output) => {
        text += `  - ${output}\n`;
      });
    }

    if (step.pain_points) {
      text += `\nKnown Issues:\n${step.pain_points}\n`;
    }

    text += `\n`;
  });

  return text;
}
