import React from "react";

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start py-20 px-6 bg-gray-50">

      {/* Header */}
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-12">
        About E-Computer Shop
      </h1>

      {/* Our Story Section */}
      <div className="max-w-4xl text-center mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Empowering Your Digital World
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At E-Computer Shop, we provide the latest computers, accessories, and smart solutions 
          to help you achieve your goals. Whether it’s gaming, programming, or office work, 
          we have the right tools for you. Our mission is to combine technology and expertise 
          to bring the best digital experience to our customers.
        </p>
      </div>

      {/* Features / Why Choose Us */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        
        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Wide Selection</h3>
          <p className="text-gray-600">
            From laptops to accessories, find the perfect products for your needs.
          </p>
        </div>

        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Expert Support</h3>
          <p className="text-gray-600">
            Our team is ready to guide you with professional advice and service.
          </p>
        </div>

        <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Quality Guaranteed</h3>
          <p className="text-gray-600">
            We ensure top-quality products and reliable brands for all customers.
          </p>
        </div>

      </div>

      {/* Optional Footer Text */}
      <div className="max-w-4xl text-center mt-16">
        <p className="text-gray-700 text-lg">
          We pride ourselves on providing the best technology solutions with excellent customer service.  
          Join thousands of happy customers who trust E-Computer Shop for their digital needs.
        </p>
      </div>

    </div>
  );
}
