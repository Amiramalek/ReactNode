import React, { useEffect, useState } from "react";
import { getAllServices } from "../../api";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <section className="bg-[url('http://localhost:3000/assets/images/about-banner.jpg')] bg-opacity-25 bg-cover bg-center w-full py-16 md:py-32">
        <div className="md:container md:mx-auto px-4">
          <div className="text-center pt-4 md:pt-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold">
              Services
            </h2>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-lg font-medium">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-0">
              {services.map((item, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                  <div className="relative group shadow-lg rounded-lg overflow-hidden bg-white">
                    <img
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      src={`http://localhost:5000/${item.image?.replace(/\\/g, "/")}`}
                      alt={item.name}
                    />
                    {/* Title Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="text-white text-lg md:text-xl lg:text-2xl font-semibold text-center">
                        {item.name}
                      </span>
                    </div>
                    {/* Description on hover */}
                    <div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <p className="text-gray-700 md:text-sm lg:text-base font-medium text-center">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Service;
