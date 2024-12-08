import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import SignInScreen from '../auth/SignInScreen';

const HomeScreen = () => {
  const slides = [
    {
      id: 1,
      link: 'https://www.lotteria.vn/media/banner/b/a/banner_banner_web_18__1.jpg',
    },
    {
      id: 2,
      link: 'https://www.lotteria.vn/media/banner/b/a/banner_banner_web_16_.jpg',
    },
    {
      id: 3,
      link: 'https://www.lotteria.vn/media/banner/m/_/m_n_th_u_free_banner_web.jpg',
    },
    {
      id: 4,
      link: 'https://www.lotteria.vn/media/banner/b/a/banner_-_delivery_ti_c_chill_-_ti_c_b_ng_n__banner_web_2_-min_1_.jpg',
    },
    {
      id: 5,
      link: 'https://www.lotteria.vn/media/banner/b/a/banner_-_th_ng_12_u_i_12k_banner_web_2_.jpg',
    },
    {
      id: 6,
      link: 'https://www.lotteria.vn/media/banner/b/a/banner_banner_web_16__2.jpg',
    },
  ];

  return (
    <div>
      <div>
        <Swiper
          pagination={false}
          modules={[Pagination, Autoplay]}
          loop={true}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img src={slide.link} alt={`Slide ${slide.id}`} width='100%' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <SignInScreen />
      </div>
    </div>
  );
};

export default HomeScreen;
