import $ from 'jquery/dist/jquery'
import 'jquery.maskedinput/src/jquery.maskedinput'

$('.js-masked-input').mask("99.99.9999", { placeholder: "ДД.ММ.ГГГГ" })