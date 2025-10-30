"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleAskQuestion, type ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ResultCard } from "./result-card";
import { SendHorizonal } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <SendHorizonal />
      {pending ? "Analyzing..." : "Ask"}
    </Button>
  );
}

export function AskQuestionForm() {
  const initialState: ActionState = {};
  const [state, formAction] = useActionState(handleAskQuestion, initialState);
  const { toast } = useToast();

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
          <CardTitle className="font-headline">Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="question"
              placeholder="Ask anything about today's top stories..."
              className="min-h-24"
              required
            />
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      <ResultCard
        title="Answer"
        content={state.answer}
        isLoading={useFormStatus().pending}
        defaultText="Your answer will appear here."
      />
    </div>
  );
}
