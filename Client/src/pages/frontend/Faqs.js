import React, { useState, useRef } from "react";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
    {
      question: 'What types of dental services do you offer?',
      answer: 'We offer a wide range of dental services, including routine checkups, cleanings, fillings, crowns, bridges, root canals, implants, teeth whitening, and cosmetic dentistry.',
    },
    {
      question: 'How often should I visit the dentist?',
      answer: "It's generally recommended to visit the dentist every six months for a routine checkup and cleaning to maintain good oral health.",
    },
    {
      question: 'What should I do in case of a dental emergency?',
      answer: "If you're experiencing a dental emergency, such as a broken tooth, severe pain, or a lost filling, please contact our office immediately. We will do our best to accommodate emergency visits.",
    },
    {
      question: 'How can I prevent tooth decay and gum disease?',
      answer: "Regular brushing and flossing, along with visiting your dentist for checkups and cleanings, are key to preventing tooth decay and gum disease. We also recommend a balanced diet and avoiding tobacco products.",
    },
    {
      question: 'Are your treatments safe?',
      answer: "Yes, all of our treatments and procedures are performed with the highest safety standards. We use state-of-the-art equipment and follow strict sterilization protocols to ensure your safety.",
    },
    {
      question: 'What should I do if I experience pain after a dental procedure?',
      answer: "It’s normal to experience some discomfort after a procedure, but it should be temporary. Over-the-counter pain relievers, as recommended by your dentist, can help manage the pain. If the pain persists, please contact our office.",
    },
    {
      question: 'How can I whiten my teeth?',
      answer: "We offer professional teeth whitening treatments that are safe and effective. In addition, maintaining good oral hygiene and avoiding staining foods and drinks can help keep your smile bright.",
    },
    {
      question: 'What options do I have if I need braces?',
      answer: "We offer several orthodontic treatments, including traditional metal braces, clear braces, and Invisalign. During your consultation, we will discuss the best option for your needs.",
    },
    {
      question: 'Is teeth whitening safe?',
      answer: "Yes, professional teeth whitening treatments are safe when done under the care of a dentist. We offer whitening services that are designed to minimize sensitivity while delivering great results.",
    },
    {
      question: 'Can I get dental implants if I have missing teeth?',
      answer: "Yes, dental implants are an effective solution for replacing missing teeth. Our team will assess your oral health and determine if you are a good candidate for implants.",
    },
    {
      question: 'How can I help my child prevent cavities?',
      answer: "Teaching your child to brush and floss regularly, limiting sugary foods and drinks, and visiting the dentist regularly for checkups and cleanings can help prevent cavities.",
    },    
  ];

const Faqs = () => {

    const [activeIndex, setActiveIndex] = useState(0); // Default open index 0
    
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return(
        <>
            <section className="bg-[url('http://localhost:3000/assets/images/abtt-banner.jpg')] bg-opacity-25 about-us bg-cover bg-center w-full py-16 md:py-32">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="main-about items-center">
                    <div className="text-center pt-4 md:pt-0">
                        <h2 className="text-3xl md:text-2xl lg:text-5xl text-white font-semibold">
                        Frequently Asked Questions
                        </h2>
                    </div>
                    </div>
                </div>
            </section>
 
            <section className="md:container md:mx-auto px-[15px] pt-8 faq">
                <div className="main-faq mx-auto">
                    <div className="items-center">
                        <div className="w-full text-center md:w-full px-4 mb-8">
                            <h2 className="text-custom-heading md:text-2xl lg:text-5xl font-bold mt-2 mb-4">
                            Get Every Answers From Here
                            </h2>
                        </div>
                        <div className="w-full md:w-3/5 xs:text-center md:pr-10 mx-auto">
                            <div className="faq-ask mx-auto">
                                {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="xs:text-left faq-main border-gray-300 p-4 text-white bg-[#8B6D5C] mb-4"
                                >
                                    <div
                                    className={`faq-heading flex justify-between items-center cursor-pointer ${
                                        activeIndex === index ? 'border-b pb-4' : ''
                                    }`}
                                    onClick={() => toggleAccordion(index)}
                                    >
                                    <h2 className="md:text-sm lg-text-base font-semibold">
                                        {faq.question}
                                    </h2>
                                    <span className="text-2xl text-white">
                                        {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                                    </span>
                                    </div>
                                    {activeIndex === index && (
                                    <div className="lg-text-base md:text-sm faq-content mt-3 text-white transition-all duration-300">
                                        <p>{faq.answer}</p>
                                    </div>
                                    )}
                                </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

          
        </>
    )
};
export default Faqs;