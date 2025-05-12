import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { getAllReviews, getAllServices, bookAppointment } from "../../api";

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
  ];


  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        src="assets/images/arrow-right.png"
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style, display: "block", width: "50px", height: "50px" }}
        onClick={onClick}
        alt="Next"
      />
    );
  };
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        src="assets/images/arrow-left.png"
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style, display: "block", width: "50px", height: "50px", zIndex: 1 }}
        onClick={onClick}
        alt="Previous"
      />
    );
  };
  
  const Home = () => {
    const sliderRef = useRef();
    const [reviews, setReviews] = useState([]);
    const [services, setServices] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (location.hash === "#appointment") {
        setTimeout(() => {
          const element = document.getElementById("appointment");
          if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
  
            navigate("/", { replace: true });
          }
        }, 300);
      }
    }, [location, navigate]);


    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    // Fetch reviews dynamically
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const alllReviews = await getAllReviews(); // Fetch data from the API
          setReviews(alllReviews); // Store reviews in state
        } catch (err) {
          console.error("Failed to fetch reviews.", err);
        }
      };
    
      fetchReviews(); // Trigger the fetch when the component mounts, regardless of login status
    }, []); // Empty dependency array ensures it runs once when the component mounts
    


    // Fetch services dynamically
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const fetchedServices = await getAllServices(); // Call the API function to get services
          setServices(fetchedServices); // Set the fetched services in state
        } catch (error) {
          console.error("Failed to fetch services", error);
        }
      };

      fetchServices();
    }, []); // Empty dependency array ensures it only runs on component mount


    const [formData, setFormData] = useState({
      name: "",
      email: "",
      date: "",
      datetime: "",
      auditType: "",
      contact: "",
      message: ""
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await bookAppointment(formData); // Assuming you have a bookAppointment function
        setPopupMessage("Appointment booked successfully!");
        setShowPopup(true);
        setFormData({
          name: "",
          email: "",
          appointmentDate: "",
          dateTime: "",
          auditDetails: "",
          contactNumber: "",
          message: ""
        });
      } catch (err) {
        setPopupMessage("Something went wrong. Please try again.");
        setShowPopup(true);
      }
    };
  
  
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };


    const homeBannerSlider = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false, // disables custom arrows
      autoplay: true, // enables autoplay
      autoplaySpeed: 1000,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
  
    const settingstestimonials = {
      dots: false,
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };    
      

  return (
    <>
    <section className="banner bg-cover bg-center  h-[350px]" style={{ backgroundImage: "url('/assets/images/banner.png')" }}>
      <div className="container mx-auto px-[15px]">
          <div className="banner-header pt-9">
          <h1 className="text-center xs:text-[40px] lg:text-[56px] md:text-[30px] font-thin text-white">Organic <span className="font-bold">Dental service</span> For everyone</h1>
          </div>
      </div>
      </section>
      <section className="banner-bottom -mt-24">
          <div className="md:container md:mx-auto px-[15px]">
            <Slider {...homeBannerSlider}>
              <div className="text-center">
                  <img className="w-full"src="assets/images/banner-img.png"/>
              </div>
              <div className="text-center">
                  <img className="w-full"src="assets/images/homeBanner.png"/>
              </div>
              <div className="text-center">
                  <img className="w-full"src="assets/images/imageHomeBanner.png"/>
              </div>
            </Slider>
          </div>
      </section>

     
      <section className="services bg-[#F5F0E1] xs:pt-36 md:pt-96 xs:-mt-28 md:-mt-80 pb-16">
        <div className="md:container md:mx-auto px-[15px]">
          <div className="main-service-heading">
            <h2 className="text-custom-heading md:text-2xl lg:text-5xl text-center font-extrabold leading-10">
              Services At Our Clinic
            </h2>
            <p className="md:text-sm lg:text-base font-medium text-center mt-5 max-w-lg mx-auto">
              Our clinic offers all kinds of services and constantly study new technology to add new custom services to the list
            </p>
          </div>

          <div className="main-service mt-8 mx-6">
            <Slider {...sliderSettings}>
              {services.length > 0 ? (
                services.map((item, index) => (
                  <div key={index} className="px-3">
                    <div className="services-inner bg-white py-3.5 pb-10 px-4 rounded-xl text-center">
                      <div className="services-img">
                        <img className="w-full h-[250px] object-cover" src={`http://localhost:5000/${item.image}`} alt="service" />
                      </div>
                      <div className="services-content text-center">
                        <h3 className="lg:text-2xl md:text-xl text-black font-semibold mt-5">{item.name}</h3>
                        <p className="text-custom-description md:text-sm lg:text-base font-medium max-w-sm mx-auto mt-3.5 mb-6 line-clamp-2">
                          {item.description}
                        </p>
                        <Link to="/services">
                          <button className="md:text-sm lg:text-sm font-semibold text-white bg-[#8B6D5C] py-4 px-8 flex items-center gap-2 mx-auto">
                            More Details <img src="assets/images/arrow-left-long-fill.png" alt="arrow" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading services...</div> // Display loading text while fetching services
              )}
            </Slider>
          </div>
          <div className="services-bottom-content">
            <p className="text-base text-center text-black mt-8">
              Don’t skip your regular check-up for teeth. <span className="text-[#8B6D5C]">Book an appointment!</span>
            </p>
          </div>
        </div>
      </section>

<section className="about-us py-16">
    <div className="md:container md:mx-auto px-[15px]">
        <div className="main-about md:flex md:gap-14 items-center">
            <div className="about-left">
                <img className="w-full"src="assets/images/about-us.png"/>
            </div>
            <div className="about-right xs:text-center md:text-left xs:pt-8 md:pt-0">
                <span className="md:text-xl lg:text-2xl text-[#8B6D5C] font-semibold">About Doctor</span>
                <h2 className="text-custom-heading md:text-2xl lg:text-5xl font-bold max-w-md mt-2 mb-4">We Care For Your Dental Health</h2>
                <p className="text-custom-description md:text-sm lg:text-base font-medium max-w-xl">Dr. Amira Malek leads Organic Dental with a passion for personalized, high-quality dental care. Specializing in both cosmetic and surgical dentistry, Amira Malek combines advanced</p>
            
               <div className="about-listing mt-6">
               <ul className="grid grid-cols-2 gap-4 text-left">
                    <li className="flex items-center gap-2 lg:text-lg md:text-sm">
                        <img src="assets/images/service-fill.png" alt="icon" />
                        All-On-4 Dental Implants
                    </li>
                    <li className="flex items-center gap-2 lg:text-lg md:text-sm">
                        <img src="assets/images/service-fill.png" alt="icon" />
                        Porcelain Veneers
                    </li>
                    <li className="flex items-center gap-2 lg:text-lg md:text-sm">
                        <img src="assets/images/service-fill.png" alt="icon" />
                        Snap-On Smile
                    </li>
                    <li className="flex items-center gap-2 lg:text-lg md:text-sm">
                        <img src="assets/images/service-fill.png" alt="icon" />
                        Bonding
                    </li>
                    <li className="flex items-center gap-2 lg:text-lg md:text-sm">
                        <img src="assets/images/service-fill.png" alt="icon" />
                        Inlays and Onlays
                    </li>
                    <li className="flex items-center gap-2 lg:text-lg md:text-sm">
                        <img src="assets/images/service-fill.png" alt="icon" />
                        Teeth Whitening & Cleaning
                    </li>
                </ul>

                </div>
                <Link to="/about">
                  <button className="text-sm font-semibold text-white bg-[#8B6D5C] py-4 px-12 mt-10">Read More</button>
                </Link>
            </div>
        </div>
    </div>
</section>
{/* Testimonials Section */}
<section className="testimonials-sec bg-[#F5F0E1] py-16">
  <div className="container max-w-5xl mx-auto px-4">
    <div className="testimonials-heading flex justify-between items-center mb-12">
      <h2 className="text-custom-heading text-3xl md:text-4xl lg:text-5xl font-extrabold max-w-2xl leading-snug">
        What our patients say about us
      </h2>
    </div>

    <div className="testimonials-slider relative">
      <Slider ref={sliderRef} {...settingstestimonials}>
        {reviews.map((item, index) => (
          <div key={index} className="px-3">
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 text-center relative">
              {/* Quotation Icon */}
              

              {/* Content */}
              <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6">@{item.name.split('@')[0]}</h4>
              <div className="flex items-center justify-center gap-1 mt-4">
                {Array.from({ length: item.rating }, (_, i) => (
                  <span key={i} className="text-yellow-500 text-2xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>

    <div className="testimonials-arrow flex justify-center mt-5 gap-5">
      <div className="cursor-pointer" onClick={() => sliderRef.current.slickPrev()}>
        <img src="assets/images/testimonial-left.png" className="lg:w-full md:w-10" alt="left" />
      </div>
      <div className="cursor-pointer" onClick={() => sliderRef.current.slickNext()}>
        <img src="assets/images/testimonial-right.png" className="lg:w-full md:w-10" alt="right" />
      </div>
    </div>
  </div>
</section>


<section id="appointment" className="Book-Appointment pt-16">
        <div className="container mx-auto px-[15px]">
          <div className="flex items-center">
            <div className="w-2/4">
              <img className="w-full h-4/6 object-cover" src="assets/images/form-img.png" />
            </div>
            <div className="w-2/4 pl-14">
              <h2 className="text-custom-heading text-5xl font-extrabold leading-10">
                Book An Appointment
              </h2>
              <p className="text-base font-medium mt-5 mx-auto">
                It is a long established fact that a reader will be distracted.
              </p>
              <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
                <div className="flex gap-x-2.5">
                  <div className="w-2/4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md h-14"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="w-2/4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md h-14"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-x-2.5">
                  <div className="w-2/4">
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md h-14"
                      required
                    />
                  </div>
                  <div className="w-2/4">
                    <input
                      type="date"
                      name="dateTime"
                      value={formData.dateTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md h-14"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-x-2.5">
                  <div className="w-2/4">
                    <input
                      type="text"
                      name="auditDetails"
                      value={formData.auditDetails}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md h-14"
                      placeholder="Audit type or details"
                    />
                  </div>
                  <div className="w-2/4">
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md h-14"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="Write your message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-[#8B6D5C] text-white px-6 py-3 rounded-md font-semibold w-full"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


        {/* Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md text-center w-1/3">
            <h3 className="text-xl font-semibold">{popupMessage}</h3>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-6 py-2 bg-[#8B6D5C] text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      
      <section className="md:container md:mx-auto px-[15px] pt-8 faq">
          <div className="main-faq mx-auto">
              <div className="flex xs:flex-col-reverse md:flex-row items-center ">
                  <div className="xs:pt-6 md:pt-0 xs:w-full xs:text-center md:text-left md:w-8/12 lg:w-3/6 md:pr-10">
                      <span class="md:text-xl lg:text-2xl text-[#8B6D5C] font-semibold">Frequently Asked Questions</span>
                      <h2 class="text-custom-heading md:text-2xl lg:text-5xl font-bold max-w-lg mt-2 mb-4">Get Every Answers From Here</h2>
                      <div className="faq-ask max-w-3xl mx-auto">
                      {faqs.map((faq, index) => (
                        <div key={index} className="xs:text-left faq-main border-gray-300 p-4 text-white bg-[#8B6D5C] mb-4">
                          <div
                            className={`faq-heading flex justify-between items-center cursor-pointer ${activeIndex === index ? 'border-b pb-4' : ''}`}
                            onClick={() => toggleAccordion(index)}
                          >
                            <h2 className="md:text-sm lg-text-base font-semibold">{faq.question}</h2>
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
                  <div className="lg:w-3/6 md:w-4/12">
                      <img className="w-full object-cover" src="assets/images/faq-images.png"/>
                  </div>
                
              </div>
          </div>
      </section>
      
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8B6D5C]">Visit Our Clinic</h2>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
              We are conveniently located and always ready to welcome you. Use the map below to find our exact location.
            </p>
          </div>
          <div className="w-full h-[400px]">
          <iframe
            title="Maryland Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24152.734991893453!2d-78.5560868!3d38.7995467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64debe9f190df:0xf2af37657655f6b1!2sMaryland,+USA!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="border-0 rounded-lg shadow-lg"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
