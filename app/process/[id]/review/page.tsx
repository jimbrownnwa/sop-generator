"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Process, ProcessStep } from "@/types";
import ProcessFlow from "@/components/ProcessFlow";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const processId = params.id as string;

  const [process, setProcess] = useState<Process | null>(null);
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [editingStep, setEditingStep] = useState<string | null>(null);

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

  const handleStepUpdate = (stepId: string, field: string, value: any) => {
    const updatedSteps = steps.map((step) =>
      step.id === stepId ? { ...step, [field]: value } : step
    );
    setSteps(updatedSteps);
    localStorage.setItem(`steps_${processId}`, JSON.stringify(updatedSteps));
  };

  const handleDeleteStep = (stepId: string) => {
    const updatedSteps = steps.filter((step) => step.id !== stepId);
    setSteps(updatedSteps);
    localStorage.setItem(`steps_${processId}`, JSON.stringify(updatedSteps));
  };

  if (!process) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{process.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {process.description}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {steps.length} steps documented
            </p>
          </div>
          <button
            onClick={() => router.push(`/process/${processId}/export`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Export Documents
          </button>
        </div>

        {/* Visual Process Flow */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold mb-4">Process Flow</h2>
          <ProcessFlow steps={steps} />
        </div>

        {/* Step Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold mb-4">Process Steps</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">
                    Step {index + 1}: {step.step_name}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setEditingStep(
                          editingStep === step.id ? null : step.id
                        )
                      }
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {editingStep === step.id ? "Done" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDeleteStep(step.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {editingStep === step.id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Step Name
                      </label>
                      <input
                        type="text"
                        value={step.step_name}
                        onChange={(e) =>
                          handleStepUpdate(step.id, "step_name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        value={step.description}
                        onChange={(e) =>
                          handleStepUpdate(
                            step.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Role Responsible
                      </label>
                      <input
                        type="text"
                        value={step.role_responsible}
                        onChange={(e) =>
                          handleStepUpdate(
                            step.id,
                            "role_responsible",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Role:</span>{" "}
                      {step.role_responsible}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span>{" "}
                      {step.time_estimate || "Not specified"}
                    </div>
                    <div>
                      <span className="font-medium">Systems:</span>{" "}
                      {step.systems_used.join(", ") || "None"}
                    </div>
                    <div>
                      <span className="font-medium">Inputs:</span>{" "}
                      {step.inputs.join(", ") || "None"}
                    </div>
                    <div>
                      <span className="font-medium">Outputs:</span>{" "}
                      {step.outputs.join(", ") || "None"}
                    </div>
                    {step.pain_points && (
                      <div className="col-span-2">
                        <span className="font-medium">Pain Points:</span>{" "}
                        {step.pain_points}
                      </div>
                    )}
                    {step.description && (
                      <div className="col-span-2">
                        <span className="font-medium">Description:</span>{" "}
                        {step.description}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/process/${processId}/interview`)}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Back to Interview
          </button>
          <button
            onClick={() => router.push(`/process/${processId}/export`)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Continue to Export
          </button>
        </div>
      </div>
    </main>
  );
}
