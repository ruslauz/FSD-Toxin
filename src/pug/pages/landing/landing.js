import $ from 'jquery/dist/jquery'
import ibg from '../../../js/ibg'
import Swiper from 'swiper/swiper-bundle'
import 'swiper/swiper-bundle.css'


const swiper = new Swiper('.swiper-container_landing', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
})