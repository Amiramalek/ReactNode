import React, { useState, useRef } from "react";



const About = () => {
    return(
        <>
            <section className="bg-[url('http://localhost:3000/assets/images/abtt-banner.jpg')] bg-opacity-25 about-us bg-cover bg-center w-full py-16 md:py-32">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="main-about items-center">
                    <div className="text-center pt-4 md:pt-0">
                        <h2 className="text-3xl md:text-2xl lg:text-5xl text-white font-semibold">
                        About Us
                        </h2>
                    </div>
                    </div>
                </div>
            </section>


 
            <section className="services py-16">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="main-about md:justify-center md:flex md:gap-14 items-center">   
                        <div className="about-left">
                            <img className="w-full" src="assets/images/about-us.png"/>
                        </div>
                        <div className="about-right xs:text-center md:text-left xs:pt-8 md:pt-0">
                            <h2 className="text-custom-heading md:text-2xl lg:text-5xl font-bold max-w-md mt-2 mb-4">Dr. Amira Malek</h2>
                            <p className="text-custom-description md:text-sm lg:text-base font-medium max-w-xl">Dr. Amira Malek leads Organic Dental with a passion for personalized, high-quality dental care. Specializing in both cosmetic and surgical dentistry, Amira Malek combines advanced</p>
                        
                            <div className="about-listing mt-6">
                                <ul className="grid grid-cols-2 gap-4 text-left">
                                    <li className="flex items-center gap-2 text-xs md:text-sm lg:text-lg">
                                        <img src="assets/images/service-fill.png" alt="icon" />
                                        All-On-4 Dental Implants
                                    </li>
                                    <li className="flex items-center gap-2 text-xs md:text-sm lg:text-lg">
                                        <img src="assets/images/service-fill.png" alt="icon" />
                                        Porcelain Veneers
                                    </li>
                                    <li className="flex items-center gap-2 text-xs md:text-sm lg:text-lg">
                                        <img src="assets/images/service-fill.png" alt="icon" />
                                        Snap-On Smile
                                    </li>
                                    <li className="flex items-center gap-2 text-xs md:text-sm lg:text-lg">
                                        <img src="assets/images/service-fill.png" alt="icon" />
                                        Bonding
                                    </li>
                                    <li className="flex items-center gap-2 text-xs md:text-sm lg:text-lg">
                                        <img src="assets/images/service-fill.png" alt="icon" />
                                        Inlays and Onlays
                                    </li>
                                    <li className="flex items-center gap-2 text-xs md:text-sm lg:text-lg">
                                        <img src="assets/images/service-fill.png" alt="icon" />
                                        Teeth Whitening & Cleaning
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </section>


            <section className="about-us bg-[#8B6D5C] py-6 xs:py-4">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="main-about items-center">
                    <div className="xs:text-center xs:pt-4 xs:pb-2 md:pt-0 md:pb-0">
                        <h2 className="text-white text-xl xs:text-3xl md:text-2xl lg:text-5xl font-bold mt-2 mb-4">
                        Our Mission
                        </h2>
                        <p className="text-white text-sm xs:text-base md:text-sm lg:text-base font-medium mt-2">
                        At Amira Malek Dental, our mission is to provide exceptional dental care in a compassionate and patient-centered environment. We are dedicated to helping each patient achieve optimal oral health through personalized treatment plans that meet their unique needs. With a focus on comfort, education, and trust, we strive to create long-lasting relationships with our patients while improving their smiles and overall well-being.
                        </p>
                        <p className="text-white text-sm xs:text-base md:text-sm lg:text-base font-medium mt-2">
                        We aim to deliver a wide range of preventive, cosmetic, restorative, and surgical dental services that enhance both the appearance and health of your smile. Our commitment to staying at the forefront of dental technology ensures that every patient receives the highest quality care in a modern, comfortable setting.
                        </p>
                        <p className="text-white text-sm xs:text-base md:text-sm lg:text-base font-medium mt-2">
                        Whether you're visiting us for a routine check-up, a cosmetic procedure, or complex dental care, we promise to provide outstanding service with a focus on your comfort and satisfaction. Your smile is our priority, and we're here to help you maintain it for a lifetime.
                        </p>
                        <p className="text-white text-sm xs:text-base md:text-sm lg:text-base font-medium mt-2">
                        Thank you for choosing Amira Malek Dental as your trusted dental care provider. We look forward to helping you achieve your healthiest and happiest smile.
                        </p>
                    </div>
                    </div>
                </div>
                </section>

                <section className="about-us py-10 xs:py-6">
                <div className="md:container md:mx-auto px-[15px]">
                    <div className="main-about md:justify-center md:flex md:gap-14 items-center">
                    <div className="about-right xs:text-center md:text-left xs:pt-4 md:pt-0 mb-6 md:mb-0">
                        <span className="text-base xs:text-lg md:text-xl lg:text-2xl text-[#8B6D5C] font-semibold">
                        What We Do
                        </span>
                        <h2 className="text-custom-heading text-xl xs:text-3xl md:text-2xl lg:text-5xl font-bold max-w-md mt-2 mb-4">
                        Your Smile, Our Priority
                        </h2>
                        <p className="text-custom-description text-sm xs:text-base md:text-sm lg:text-base font-medium max-w-xl">
                        At Amira Malek Dental, we believe that every smile tells a story. Our mission is to help you feel confident, healthy, and proud of your smile through personalized dental care that puts your comfort first.
                        </p>
                        <p className="text-custom-description text-sm xs:text-base md:text-sm lg:text-base font-medium max-w-xl mt-2">
                        Dr. Amira Malek leads our clinic with years of experience and a deep passion for dentistry. We specialize in a comprehensive range of services including preventive care, cosmetic enhancements, restorative procedures, and surgical treatments—all performed with cutting-edge technology and an eye for detail. Whether you're coming in for a routine cleaning or a full smile transformation, we take the time to understand your goals, educate you on your options, and provide a treatment plan tailored just for you. Our caring team is dedicated to creating a calm and welcoming environment where patients of all ages feel at ease. We don’t just treat teeth—we care for the person behind the smile.
                        </p>
                    </div>
                    <div className="about-left mt-4 md:mt-0">
                        <img className="w-full" src="assets/images/aboutt.png" alt="About Amira Malek Dental" />
                    </div>
                    </div>
                </div>
            </section>

        </>
    )
};
export default About;