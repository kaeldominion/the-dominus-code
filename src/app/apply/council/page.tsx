import { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { COUNCIL_QUESTIONS, COUNCIL_SYSTEM } from "@/lib/oracle-constants";

export const metadata: Metadata = {
  title: "Council Application | The Dominus Code",
  description: "Apply for The Council. Access to the inner circle is not bought; it is earned.",
};

export default function CouncilApplicationPage() {
  return (
    <ApplicationForm
      questions={COUNCIL_QUESTIONS}
      title="Council"
      systemPrompt={COUNCIL_SYSTEM}
      applicationType="council"
    />
  );
}

