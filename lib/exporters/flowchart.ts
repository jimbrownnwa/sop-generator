import type { ProcessStep } from "@/types";

export function generateMermaidFlowchart(steps: ProcessStep[]): string {
  let chart = "graph TD\n";
  chart += "    Start([Start Process])\n";

  steps.forEach((step, index) => {
    const nodeId = `step${index}`;
    const nextNodeId = index < steps.length - 1 ? `step${index + 1}` : "End";

    // Sanitize step name for Mermaid
    const stepName = step.step_name.replace(/["\[\]]/g, "").substring(0, 50);
    const role = step.role_responsible.replace(/["\[\]]/g, "").substring(0, 30);

    if (index === 0) {
      chart += `    Start --> ${nodeId}\n`;
    }

    chart += `    ${nodeId}["${stepName}<br/><i>(${role})</i>"]\n`;

    if (index < steps.length - 1) {
      chart += `    ${nodeId} --> ${nextNodeId}\n`;
    } else {
      chart += `    ${nodeId} --> End\n`;
      chart += "    End([Process Complete])\n";
    }
  });

  return chart;
}

export function generateSwimlaneFlowchart(steps: ProcessStep[]): string {
  if (steps.length === 0) return "";

  // Group steps by role
  const roleGroups = new Map<string, ProcessStep[]>();
  steps.forEach((step) => {
    const role = step.role_responsible || "Unassigned";
    if (!roleGroups.has(role)) {
      roleGroups.set(role, []);
    }
    roleGroups.get(role)!.push(step);
  });

  let chart = "graph TB\n";

  // Create nodes for each step
  steps.forEach((step, index) => {
    const nodeId = `step${index}`;
    const stepName = step.step_name.replace(/["\[\]]/g, "").substring(0, 50);
    chart += `    ${nodeId}["${stepName}"]\n`;

    if (index > 0) {
      chart += `    step${index - 1} --> ${nodeId}\n`;
    }
  });

  // Add role styling (simplified for markdown export)
  chart += "\n";
  roleGroups.forEach((roleSteps, role) => {
    chart += `    %% ${role}\n`;
  });

  return chart;
}
