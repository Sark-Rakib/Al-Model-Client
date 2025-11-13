import React from "react";

const StaticSections = () => {
  return (
    <div className="w-11/12 mx-auto my-16 space-y-10">
      <section
        data-aos="fade-up"
        className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-10 shadow-md"
      >
        <h2 className="text-4xl font-bold text-purple-700 mb-5 text-center">
          About AI Models
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg text-center md:w-3/4 mx-auto">
          AI models are systems built to mimic human intelligence using
          mathematical algorithms and neural networks. They learn from vast
          datasets to make predictions, generate text, recognize images, and
          even have conversations — like chatbots or virtual assistants. In
          today’s world, AI models are the backbone of innovations in areas such
          as healthcare, self-driving cars, financial forecasting, and creative
          content generation.
        </p>
      </section>

      <section
        data-aos="fade-up"
        className="bg-purple-600 text-white rounded-2xl py-10 px-10 flex flex-col items-center justify-center shadow-lg"
      >
        <h2 className="text-4xl font-bold mb-4">Get Started with AI Models</h2>
        <p className="text-lg text-center mb-4 md:w-2/3">
          Ready to explore and manage your own AI models? Create an account to
          start building, updating, and exploring advanced models today!
        </p>

        <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-200 transition-all">
          Register or Log In
        </button>
      </section>
    </div>
  );
};

export default StaticSections;
