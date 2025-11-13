import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SwiperSlider = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("https://ai-model-server-phi.vercel.app/models/latest")
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div data-aos="fade-left" className="my-2">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={true}
        modules={[Autoplay]}
      >
        {models.map((model) => (
          <SwiperSlide key={model.id} className="relative flex justify-center">
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-[400px] object-cover opacity-30"
            />
            <h3 className="absolute inset-0 flex justify-center items-center text-purple-500 text-3xl font-semibold">
              {model.name}
            </h3>
            <h3 className="absolute top-55 left-0 right-0 flex justify-center items-center text-purple-800 text-center">
              {model.description.split(" ").slice(0, 10).join(" ")}...
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
