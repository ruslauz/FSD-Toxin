import Swiper from 'swiper/swiper-bundle'
import 'swiper/swiper-bundle.css'


const swiper = new Swiper('.swiper-container_registration', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
})