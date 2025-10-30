"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AskQuestionForm } from "./ask-question-form";
import { SummarizeNewsPanel } from "./summarize-news-panel";
import { Bot, Newspaper } from "lucide-react";

export function ControlPanel() {
  return (
    <Tabs defaultValue="ask" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ask">
          <Bot />
          Ask a Question
        </TabsTrigger>
        <TabsTrigger value="summarize">
          <Newspaper />
          Daily Summary
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ask">
        <AskQuestionForm />
      </TabsContent>
      <TabsContent value="summarize">
        <SummarizeNewsPanel />
      </TabsContent>
    </Tabs>
  );
}
