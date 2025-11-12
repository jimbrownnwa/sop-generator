"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Process, ProcessStep, ConversationMessage } from "@/types";

// Hardcoded question flow for MVP
const questionFlow = [
  {
    id: "trigger",
    question: "What triggers this process? What event or condition causes it to start?",
  },
  {
    id: "first_step",
    question: "What's the very first step that happens after the process is triggered?",
  },
  {
    id: "role",
    question: "Who is responsible for this step? What role or person does it?",
  },
  {
    id: "systems",
    question: "What tools or systems do they use for this step?",
  },
  {
    id: "inputs",
    question: "What information or materials are needed as input for this step?",
  },
  {
    id: "outputs",
    question: "What's the output or result of this step?",
  },
  {
    id: "time",
    question: "Approximately how long does this step take?",
  },
  {
    id: "pain_points",
    question: "Are there any pain points, delays, or issues with this step?",
  },
  {
    id: "next_step",
    question: "What happens next? Describe the next step in the process.",
  },
];

export default function InterviewPage() {
  const router = useRouter();
  const params = useParams();
  const processId = params.id as string;

  const [process, setProcess] = useState<Process | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [currentStep, setCurrentStep] = useState<Partial<ProcessStep>>({});
  const [isComplete, setIsComplete] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load process from localStorage
    const processes = JSON.parse(localStorage.getItem("processes") || "[]");
    const foundProcess = processes.find((p: Process) => p.id === processId);

    if (!foundProcess) {
      router.push("/");
      return;
    }

    setProcess(foundProcess);

    // Load existing session or start new
    const savedSession = localStorage.getItem(`interview_${processId}`);
    if (savedSession) {
      const session = JSON.parse(savedSession);
      setMessages(session.messages);
      setSteps(session.steps);
      setCurrentQuestionIndex(session.currentQuestionIndex);
      setCurrentStep(session.currentStep);
    } else {
      // Start with first question
      addAssistantMessage(questionFlow[0].question);
    }
  }, [processId, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addAssistantMessage = (content: string) => {
    const message: ConversationMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: ConversationMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    addUserMessage(currentInput);

    // Process the answer based on current question
    const currentQuestion = questionFlow[currentQuestionIndex];
    processAnswer(currentQuestion.id, currentInput);

    setCurrentInput("");
  };

  const processAnswer = (questionId: string, answer: string) => {
    const updatedStep = { ...currentStep };

    switch (questionId) {
      case "trigger":
        updatedStep.description = `Triggered by: ${answer}`;
        break;
      case "first_step":
        updatedStep.step_name = answer;
        break;
      case "role":
        updatedStep.role_responsible = answer;
        break;
      case "systems":
        updatedStep.systems_used = answer.split(",").map((s) => s.trim());
        break;
      case "inputs":
        updatedStep.inputs = answer.split(",").map((s) => s.trim());
        break;
      case "outputs":
        updatedStep.outputs = answer.split(",").map((s) => s.trim());
        break;
      case "time":
        updatedStep.time_estimate = answer;
        break;
      case "pain_points":
        updatedStep.pain_points = answer;
        break;
      case "next_step":
        // Save current step and start a new one
        const completedStep: ProcessStep = {
          id: Date.now().toString(),
          process_id: processId,
          sequence_order: steps.length,
          step_name: updatedStep.step_name || "",
          description: updatedStep.description || "",
          role_responsible: updatedStep.role_responsible || "",
          systems_used: updatedStep.systems_used || [],
          inputs: updatedStep.inputs || [],
          outputs: updatedStep.outputs || [],
          decision_points: "",
          time_estimate: updatedStep.time_estimate || "",
          frequency: "",
          pain_points: updatedStep.pain_points || "",
          notes: "",
          dependencies: [],
        };

        const newSteps = [...steps, completedStep];
        setSteps(newSteps);

        // Start new step
        setCurrentStep({
          step_name: answer,
        });

        // Save session
        saveSession(newSteps, 1); // Reset to role question for new step

        // Ask about the new step
        setTimeout(() => {
          addAssistantMessage(questionFlow[2].question); // Start with "Who does this?"
        }, 500);

        setCurrentQuestionIndex(2);
        return;
    }

    setCurrentStep(updatedStep);

    // Move to next question
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questionFlow.length) {
      setCurrentQuestionIndex(nextIndex);
      saveSession(steps, nextIndex);

      setTimeout(() => {
        addAssistantMessage(questionFlow[nextIndex].question);
      }, 500);
    } else {
      // Completed initial questions, ask if there are more steps
      setTimeout(() => {
        addAssistantMessage(
          "Is there another step after this, or is the process complete? (Type 'done' if finished, or describe the next step)"
        );
      }, 500);
      setCurrentQuestionIndex(8); // Keep at next_step question
    }
  };

  const saveSession = (currentSteps: ProcessStep[], questionIndex: number) => {
    const session = {
      messages,
      steps: currentSteps,
      currentQuestionIndex: questionIndex,
      currentStep,
    };
    localStorage.setItem(`interview_${processId}`, JSON.stringify(session));
    localStorage.setItem(`steps_${processId}`, JSON.stringify(currentSteps));
  };

  const handleComplete = () => {
    // Save final step
    if (currentStep.step_name) {
      const finalStep: ProcessStep = {
        id: Date.now().toString(),
        process_id: processId,
        sequence_order: steps.length,
        step_name: currentStep.step_name || "",
        description: currentStep.description || "",
        role_responsible: currentStep.role_responsible || "",
        systems_used: currentStep.systems_used || [],
        inputs: currentStep.inputs || [],
        outputs: currentStep.outputs || [],
        decision_points: "",
        time_estimate: currentStep.time_estimate || "",
        frequency: "",
        pain_points: currentStep.pain_points || "",
        notes: "",
        dependencies: [],
      };
      const finalSteps = [...steps, finalStep];
      localStorage.setItem(`steps_${processId}`, JSON.stringify(finalSteps));
    }

    // Update process status
    const processes = JSON.parse(localStorage.getItem("processes") || "[]");
    const updatedProcesses = processes.map((p: Process) =>
      p.id === processId ? { ...p, status: "completed", updated_at: Date.now() } : p
    );
    localStorage.setItem("processes", JSON.stringify(updatedProcesses));

    // Navigate to review
    router.push(`/process/${processId}/review`);
  };

  if (!process) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen flex">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold">{process.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {steps.length} steps documented
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Send
            </button>
          </form>

          {steps.length > 0 && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleComplete}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Complete Interview
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Sidebar */}
      <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
        <h2 className="font-bold mb-4">Progress</h2>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
            >
              <div className="text-sm font-medium">Step {index + 1}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {step.step_name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
