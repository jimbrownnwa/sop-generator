import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-balance">
          Process Documentation Tool
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Transform your business processes into professional SOPs through
          guided conversational interviews
        </p>
        <div className="space-y-4">
          <Link
            href="/process/new"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Document a New Process
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            20-30 minutes • Generates SOP, Process Map & Gap Analysis
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Conversational</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Answer simple questions in a chat-like interface
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Visual Feedback</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              See your process map build in real-time
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Multiple Outputs</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Get SOPs, flowcharts, and gap analysis reports
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
