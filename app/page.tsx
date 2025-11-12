import Link from "next/link";
import { MessageSquare, Eye, FileStack, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-20">
            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight animate-fade-in">
              Process Documentation
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mb-8 leading-relaxed">
              Transform your business processes into professional SOPs through
              guided conversational interviews
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/process/new"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg text-lg"
              >
                Start Documenting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Time indicator */}
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>20-30 minutes • Generates SOP, Process Map & Gap Analysis</span>
              </div>
            </div>

            {/* Trust indicator */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 font-medium">
                Built for consultants, operations teams, and business leaders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <MessageSquare className="w-7 h-7" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Conversational Interface
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Answer simple questions in a chat-like interface. No complex forms
              or templates to fill out.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Eye className="w-7 h-7" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Real-Time Visualization
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Watch your process map build dynamically as you document each step
              and decision point.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <FileStack className="w-7 h-7" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Complete Documentation Suite
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Export professional SOPs, process flowcharts, and comprehensive gap
              analysis reports.
            </p>
          </div>
        </div>
      </div>

      {/* Secondary CTA Section */}
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to document your processes?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join operations teams who are transforming tribal knowledge into
            documented, repeatable processes.
          </p>
          <Link
            href="/process/new"
            className="inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <p className="text-center text-sm text-slate-500">
            © 2025 Process Documentation Tool. Built for businesses that value
            clarity and efficiency.
          </p>
        </div>
      </footer>
    </main>
  );
}
