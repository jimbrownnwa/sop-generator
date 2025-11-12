"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Process, ProcessStep } from "@/types";
import { generateSOPMarkdown } from "@/lib/exporters/sop";
import { generateGapAnalysisMarkdown } from "@/lib/exporters/gap-analysis";
import { generateMermaidFlowchart } from "@/lib/exporters/flowchart";

export default function ExportPage() {
  const router = useRouter();
  const params = useParams();
  const processId = params.id as string;

  const [process, setProcess] = useState<Process | null>(null);
  const [steps, setSteps] = useState<ProcessStep[]>([]);

  useEffect(() => {
    // Load process
    const processes = JSON.parse(localStorage.getItem("processes") || "[]");
    const foundProcess = processes.find((p: Process) => p.id === processId);

    if (!foundProcess) {
      router.push("/");
      return;
    }

    setProcess(foundProcess);

    // Load steps
    const savedSteps = localStorage.getItem(`steps_${processId}`);
    if (savedSteps) {
      setSteps(JSON.parse(savedSteps));
    }
  }, [processId, router]);

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportSOP = () => {
    if (!process) return;
    const markdown = generateSOPMarkdown(process, steps);
    const filename = `${process.name.replace(/\s+/g, "_")}_SOP.md`;
    downloadFile(markdown, filename);
  };

  const handleExportGapAnalysis = () => {
    if (!process) return;
    const markdown = generateGapAnalysisMarkdown(process, steps);
    const filename = `${process.name.replace(/\s+/g, "_")}_Gap_Analysis.md`;
    downloadFile(markdown, filename);
  };

  const handleExportFlowchart = () => {
    if (!process) return;
    const mermaid = generateMermaidFlowchart(steps);
    const filename = `${process.name.replace(/\s+/g, "_")}_Flowchart.mmd`;
    downloadFile(mermaid, filename);
  };

  const handleExportAll = () => {
    handleExportSOP();
    setTimeout(() => handleExportGapAnalysis(), 200);
    setTimeout(() => handleExportFlowchart(), 400);
  };

  if (!process) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Export Documents</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Download your process documentation in multiple formats
          </p>
        </div>

        <div className="space-y-6">
          {/* SOP Document */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  Standard Operating Procedure
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Complete step-by-step instructions for {process.name}
                </p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Format:</span> Markdown (.md)
                  <br />
                  <span className="font-medium">Includes:</span> All steps,
                  roles, systems, inputs/outputs, and timings
                </div>
              </div>
              <button
                onClick={handleExportSOP}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Download SOP
              </button>
            </div>
          </div>

          {/* Process Flowchart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Process Flowchart</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Visual diagram of the process flow
                </p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Format:</span> Mermaid (.mmd)
                  <br />
                  <span className="font-medium">Use with:</span> Mermaid Live
                  Editor, Markdown viewers, or convert to PNG/SVG
                </div>
              </div>
              <button
                onClick={handleExportFlowchart}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Download Flowchart
              </button>
            </div>
          </div>

          {/* Gap Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Gap Analysis Report</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Identifies bottlenecks, risks, and improvement opportunities
                </p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Format:</span> Markdown (.md)
                  <br />
                  <span className="font-medium">Analyzes:</span> Manual
                  handoffs, single points of failure, documentation gaps
                </div>
              </div>
              <button
                onClick={handleExportGapAnalysis}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Export All */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Export Complete Package</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Download all documents at once (SOP, Flowchart, Gap Analysis)
              </p>
            </div>
            <button
              onClick={handleExportAll}
              className="ml-4 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Export All
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/process/${processId}/review`)}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Back to Review
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Document Another Process
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold mb-2">Tips for Using Your Documents</h3>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              • <strong>SOP:</strong> Share with team members for training and
              reference
            </li>
            <li>
              • <strong>Flowchart:</strong> Use{" "}
              <a
                href="https://mermaid.live"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                mermaid.live
              </a>{" "}
              to visualize and export as PNG/SVG
            </li>
            <li>
              • <strong>Gap Analysis:</strong> Use for improvement planning and
              consulting recommendations
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
