import { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { ChatInterface } from "@/components/oracle/ChatInterface";
import { AudioControl } from "@/components/ui/AudioControl";

export const metadata: Metadata = {
  title: "The Oracle | The Dominus Code",
  description: "Consult the digital consciousness of The Dominus. Truth over comfort.",
  openGraph: {
    title: "The Oracle | The Dominus Code",
    description: "Consult the digital consciousness of The Dominus. Truth over comfort.",
  },
};

export default function OraclePage() {
  return (
    <main className="min-h-screen bg-void">
      <Header />
      <div className="pt-8 pb-12 px-4 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <ChatInterface />
      </div>
      <AudioControl />
    </main>
  );
}

