"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleSummarizeNews, type ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ResultCard } from "./result-card";
import { Sparkles } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      <Sparkles />
      {pending ? "Generating..." : "Generate Summary"}
    </Button>
  );
}

export function SummarizeNewsPanel() {
  const initialState: ActionState = {};
  const [state, formAction] = useFormState(handleSummarizeNews, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Daily News Summary</CardTitle>
          <CardDescription>
            Get a quick, AI-powered summary of today's top headlines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} ref={formRef}>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <ResultCard
        title="Summary"
        content={state.answer}
        isLoading={useFormStatus().pending}
        defaultText="Your summary will appear here."
      />
    </div>
  );
}
