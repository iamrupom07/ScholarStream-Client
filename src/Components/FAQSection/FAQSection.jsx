import React from "react";

const FAQSection = () => {
  const faqs = [
    {
      id: 1,
      question: "How often is the scholarship database updated?",
      answer:
        "Our database is updated daily. We have a dedicated team that verifies and adds new scholarship opportunities, ensuring you have access to the latest funding options as soon as they become available.",
    },
    {
      id: 2,
      question: "Is there a fee to search for scholarships?",
      answer:
        "No. Our core scholarship search functionality is completely free for all users. We believe financial barriers should not prevent you from finding financial aid.",
    },
    {
      id: 3,
      question: "Can international students apply for these scholarships?",
      answer:
        "Yes, absolutely! We feature thousands of scholarships specifically tailored for international students, as well as those that are open to applicants globally. Use the 'Eligibility' filter to narrow your search.",
    },
    {
      id: 4,
      question: "What information do I need to apply for a scholarship?",
      answer:
        "While requirements vary, most applications typically require academic transcripts, a letter of recommendation, a personal essay or statement of purpose, and proof of enrollment or acceptance.",
    },
    {
      id: 5,
      question: "How do I save my favorite scholarships?",
      answer:
        "You must create a free user account to save scholarships. Once logged in, simply click the 'Save' or 'Heart' icon on any scholarship card to add it to your personalized dashboard for later viewing.",
    },
  ];

  return (
    <section className="py-24 ">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Common Questions</h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about our service and the application
            process.
          </p>
        </div>

        {/* FAQ Accordion using DaisyUI Collapse */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              tabIndex={0}
              className="collapse collapse-plus  border border-base-300 rounded-box shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <input type="checkbox" className="peer" />

              {/* Collapse Title (The Question) */}
              <div className="collapse-title text-xl font-medium  peer-checked:bg-black peer-checked:text-primary-content">
                {faq.question}
              </div>

              {/* Collapse Content (The Answer) */}
              <div className="collapse-content">
                <p className="pt-4 text-gray-700 leading-relaxed border-t border-base-300 mt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-base-100 rounded-box shadow-inner">
          <h3 className="text-2xl font-semibold mb-3">Still have questions?</h3>
          <p className="mb-4 text-gray-600">
            Contact our support team for personalized assistance.
          </p>
          <button className="btn btn-primary btn-wide">Contact Support</button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
