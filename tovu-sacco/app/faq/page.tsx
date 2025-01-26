"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is a Sacco?",
    answer:
      "A Sacco (Savings and Credit Cooperative Organization) is a member-owned financial cooperative that provides savings, credit and other financial services to its members.",
  },
  {
    question: "How do I join Tovu Sacco?",
    answer:
      "To join Tovu Sacco, you need to fill out an application form, provide necessary identification documents, and pay a small membership fee. You can start this process online through our membership page or visit our office.",
  },
  {
    question: "What types of loans do you offer?",
    answer:
      "We offer various types of loans including personal loans, business loans, emergency loans, and asset financing loans. Each loan type has specific terms and conditions.",
  },
  {
    question: "How are dividends calculated and paid?",
    answer:
      "Dividends are calculated based on your share capital and the Sacco's performance for the year. They are usually paid out annually after approval at the Annual General Meeting.",
  },
  {
    question: "What are the minimum savings requirements?",
    answer:
      "Members are required to maintain a minimum monthly contribution as specified in our by-laws. This helps build your savings and increases your borrowing capacity.",
  },
  {
    question: "How secure are my savings?",
    answer:
      "Your savings are secure with us. We are regulated by relevant financial authorities and have implemented robust security measures to protect members' funds.",
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="max-w-xl mb-8">
        <Input
          type="search"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <Accordion type="single" collapsible className="w-full max-w-3xl">
        {filteredFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

