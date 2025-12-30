import { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { DYNASTY_QUESTIONS, DYNASTY_SYSTEM } from "@/lib/oracle-constants";

export const metadata: Metadata = {
  title: "Dynasty Application | The Dominus Code",
  description: "Apply for The Dynasty. You are not applying for a relationship. You are applying for a position.",
};

export default function DynastyApplicationPage() {
  return (
    <ApplicationForm
      questions={DYNASTY_QUESTIONS}
      title="Dynasty"
      systemPrompt={DYNASTY_SYSTEM}
      applicationType="dynasty"
    />
  );
}

