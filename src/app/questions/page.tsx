import type { Metadata } from "next";
import Quiz from "./Quiz";

export const metadata: Metadata = {
  title: "Trois questions — Note",
};

export default function PageQuestions() {
  return <Quiz />;
}