import React, { useState, useRef } from "react";



const Return = () => {
    return(
        <>
            <section className="bg-[url('http://localhost:3000/assets/images/abtt-banner.jpg')] bg-opacity-25 about-us bg-cover bg-center w-full py-16 md:py-32">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="main-about items-center">
                    <div className="text-center pt-4 md:pt-0">
                        <h2 className="text-3xl md:text-2xl lg:text-5xl text-white font-semibold">
                        Return Policy
                        </h2>
                    </div>
                    </div>
                </div>
            </section>

            <section className="return-policy py-8">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="max-w-4xl mx-auto text-left text-black md:text-sm lg:text-base space-y-6">
          
                    <p>
                        At Amira Malek Dental, we strive to provide the highest quality products and services. If for any reason you are not satisfied with your purchase or service, please review our return and refund policy below:
                    </p>

                    <ul className="list-decimal pl-5 space-y-3">
                        <li><strong>Returns</strong> must be requested within 30 days of purchase or service date.</li>
                        <li><strong>Eligibility</strong>: Returns are only accepted for products that are unused, unopened, and in their original condition.</li>
                        <li><strong>Refund Process</strong>: If your return is accepted, we will process a refund within 10 business days to your original payment method.</li>
                        <li><strong>Exclusions</strong>: Services such as dental treatments and consultations are not eligible for returns or refunds. Any products that are used or opened cannot be returned.</li>
                        <li><strong>Shipping Costs</strong>: Customers are responsible for return shipping costs, unless the return is due to a mistake on our part (such as sending the wrong product).</li>
                        <li><strong>Damaged or Defective Items</strong>: If your product is damaged or defective upon arrival, please contact us within 7 days of receiving your order for a replacement or refund. You may be required to send us photos of the damaged product.</li>
                    </ul>

                    <p>
                        If you are dissatisfied with any of our products or services, please reach out to us directly, and we will do our best to resolve the issue.
                    </p>

                    <p>
                        For returns or further questions, please contact us using the information below:
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
export default Return;