import type { JSX } from "react";

export type FAQItemType = {
  id: number;
  question: string;
  answer: string | JSX.Element;
};
