import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import SignInScreen from '../auth/SignInScreen';
import { Divider } from 'antd';
import ProductList from '../product/components/ProductList';
import { highlightItems, slides } from '../../constant/home';
import { getCategories } from '../../service/category';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slice/modal';
import { ModalTypes } from '../../constant/modal';
import SignUpScreen from '../auth/SignUpScreen';
import useAuth from '../../hook/useAuth';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAdmin } = useAuth();
  console.log(isAdmin);

  useEffect(() => {
    if (location.state?.openModal) {
      dispatch(openModal({ name: ModalTypes.SIGN_IN }));
    }
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRes = await getCategories();
      if (categoriesRes && categoriesRes) {
        setCategories(categoriesRes.data);
      } else {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

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
      <div className='container mx-auto'>
        <div className='grid grid-cols-4 gap-4 mt-4 c bg-footer-main px-0'>
          {highlightItems.map((item) => (
            <div
              key={item.id}
              className='bg-contain bg-left px-5 bg-no-repeat h-[110px] relative hover:bg-red-500 hover:text-white cursor-pointer group'
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <p className='text-[#ff5b6a] text-lg font-semibold absolute top-1/2 -translate-y-1/2 right-[30px] group-hover:text-white'>
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <div className='pt-8' key={category.id}>
                <div className='w-10'>
                  <Divider
                    className='max-w-2'
                    style={{ border: '1px red solid' }}
                  />
                </div>
                <p className='text-xl font-semibold'>{category.name}</p>
                <div className='pt-6'>
                  <ProductList category={category} />
                </div>
              </div>
            );
          })}

        {/* <div className='pt-8'>
          <div className='w-10'>
            <Divider className='max-w-2' style={{ border: '1px red solid' }} />
          </div>
          <p className='text-xl font-semibold'>ƯU ĐÃI ĐẶC BIỆT</p>
          <div className='pt-6'>
            <ProductList category={''} />
          </div>
        </div> */}

        <SignInScreen />
        <SignUpScreen />
      </div>
    </div>
  );
};

export default HomeScreen;
