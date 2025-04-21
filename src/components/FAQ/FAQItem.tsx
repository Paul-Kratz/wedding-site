import type { FAQItemType } from "@/components/FAQ/types";
import { Col } from "react-bootstrap";

export const FAQItem = ({ item }: { item: FAQItemType }) => {
  return (
    <Col key={item.id} xs={12} md={6} className="mb-4">
      <h5>{item.question}</h5>
      <p>{item.answer}</p>
    </Col>
  );
};
