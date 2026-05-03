import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "How long does delivery usually take?",
      answer: "Most deliveries are completed within 30-45 minutes depending on your location and the restaurant's preparation time.",
    },
    {
      question: "Is there a minimum order amount?",
      answer: "Minimum order amounts vary by restaurant. You can check the restaurant's specific minimum on their menu page.",
    },
    {
      question: "Do you offer contact-free delivery?",
      answer: "Yes, you can select 'leave at door' during checkout for a completely contact-free delivery experience.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you can track it in real-time using the 'My Orders' section on your dashboard.",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Got questions? We've got answers. If you have some other questions, feel free to send us an email.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
