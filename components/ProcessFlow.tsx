"use client";

import { useEffect, useRef } from "react";
import type { ProcessStep } from "@/types";
import mermaid from "mermaid";

interface ProcessFlowProps {
  steps: ProcessStep[];
}

export default function ProcessFlow({ steps }: ProcessFlowProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
    });
  }, []);

  useEffect(() => {
    if (mermaidRef.current && steps.length > 0) {
      const chart = generateMermaidChart(steps);
      mermaid.render("mermaid-diagram", chart).then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
        }
      });
    }
  }, [steps]);

  if (steps.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No steps documented yet. Start the interview to build your process map.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div ref={mermaidRef} className="mermaid-container" />
    </div>
  );
}

function generateMermaidChart(steps: ProcessStep[]): string {
  let chart = "graph TD\n";
  chart += "    Start([Start Process])\n";

  steps.forEach((step, index) => {
    const nodeId = `step${index}`;
    const nextNodeId = index < steps.length - 1 ? `step${index + 1}` : "End";

    // Sanitize step name for Mermaid
    const stepName = step.step_name.replace(/["\[\]]/g, "");
    const role = step.role_responsible.replace(/["\[\]]/g, "");

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

// Generate swimlane diagram
export function generateSwimlaneChart(steps: ProcessStep[]): string {
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

  let chart = "graph TD\n";

  // Create subgraphs for each role
  let stepCounter = 0;
  roleGroups.forEach((roleSteps, role) => {
    chart += `    subgraph ${role.replace(/\s+/g, "_")}\n`;
    roleSteps.forEach((step) => {
      const nodeId = `step${stepCounter}`;
      const stepName = step.step_name.replace(/["\[\]]/g, "");
      chart += `        ${nodeId}["${stepName}"]\n`;
      stepCounter++;
    });
    chart += "    end\n";
  });

  return chart;
}
