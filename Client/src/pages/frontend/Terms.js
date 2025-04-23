import React, { useState, useRef } from "react";



const Terms = () => {
    return(
        <>
            <section className="bg-[url('http://localhost:3000/assets/images/abtt-banner.jpg')] bg-opacity-25 about-us bg-cover bg-center w-full py-16 md:py-32">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="main-about items-center">
                    <div className="text-center pt-4 md:pt-0">
                        <h2 className="text-3xl md:text-2xl lg:text-5xl text-white font-semibold">
                        Terms of Service
                        </h2>
                    </div>
                    </div>
                </div>
            </section>

            <section className="terms-and-conditions py-8">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="max-w-4xl mx-auto text-left text-black md:text-sm lg:text-base space-y-6">
           
                    <p>
                        Welcome to Amira Malek Dental! By using our website or receiving our services, you agree to abide by the following terms and conditions:
                    </p>

                    <ul className="list-decimal pl-5 space-y-3">
                        <li><strong>Agreement</strong>: By accessing and using our website or services, you agree to comply with these terms and conditions.</li>
                        <li><strong>Services</strong>: We offer preventive, cosmetic, restorative, and surgical dental care services.</li>
                        <li><strong>Appointments</strong>: You can book appointments online, by phone, or in person. Please ensure you provide 24 hours’ notice if you need to cancel or reschedule. Late cancellations may incur a fee.</li>
                        <li><strong>Fees and Payments</strong>: Payment for services is due at the time of service. We accept major credit cards, cash, and most insurance plans (you are responsible for any unmet balance).</li>
                        <li><strong>Your Responsibility</strong>: You agree to provide accurate health information and follow all pre‑ and post‑treatment instructions.</li>
                        <li><strong>Privacy</strong>: We respect your privacy and handle your personal and health information in accordance with our Privacy Policy.</li>
                        <li><strong>Changes</strong>: We reserve the right to update these terms. Continued use of our website or services indicates acceptance of the updated terms.</li>
                    </ul>

                    <p>
                        If you have any questions about our Terms and Conditions, please feel free to contact us directly.
                    </p>

                    <p>
                        For further inquiries, please contact us using the information below:
                    </p>
                    <p>
                        Thank you for choosing Amira Malek Dental! We appreciate your understanding and cooperation.
                    </p>
                    </div>
                </div>
            </section>

        </>
    )
};
export default Terms;