import Link from "next/link";
import { MessageSquare, Eye, FileStack, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, FeatureCard, IconBadge, Container, Section } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      {/* Hero Section */}
      <Section>
        <div className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30"></div>

          <Container maxWidth="7xl" padding="lg">
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
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
                <Link href="/process/new">
                  <Button variant="primary" size="lg" icon={ArrowRight}>
                    Start Documenting
                  </Button>
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
          </Container>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <Container maxWidth="7xl" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<IconBadge icon={MessageSquare} color="blue" />}
              title="Conversational Interface"
              description="Answer simple questions in a chat-like interface. No complex forms or templates to fill out."
            />

            <FeatureCard
              icon={<IconBadge icon={Eye} color="emerald" />}
              title="Real-Time Visualization"
              description="Watch your process map build dynamically as you document each step and decision point."
            />

            <FeatureCard
              icon={<IconBadge icon={FileStack} color="indigo" />}
              title="Complete Documentation Suite"
              description="Export professional SOPs, process flowcharts, and comprehensive gap analysis reports."
            />
          </div>
        </Container>
      </Section>

      {/* Secondary CTA Section */}
      <Section>
        <Container maxWidth="4xl" padding="lg">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to document your processes?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join operations teams who are transforming tribal knowledge into
              documented, repeatable processes.
            </p>
            <Link href="/process/new">
              <Button variant="secondary" size="lg" icon={ArrowRight}>
                Get Started Now
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <Container maxWidth="7xl" padding="md">
          <p className="text-center text-sm text-slate-500">
            © 2025 Process Documentation Tool. Built for businesses that value
            clarity and efficiency.
          </p>
        </Container>
      </footer>
    </main>
  );
}
