import iBox from '../../components/dropdown/dropdown'
import phraser from '../../components/dropdown/dropdown'
const guest = ["гость", "гостя", "гостей"];
const baby = ["младенец", "младенца", "младенцев"];
const bedroom = ["спальня", "спальни", "спалень"];
const bed = ["кровать", "кровати", "кроватей"];
const bathroom = ["ванная комната", "ванные комнаты", "ванных комнат"];

// Гости
iBox('.js-guest-increment-box').init({
  defaultPhrase: 'Cколько гостей',
  items: [
    {
      minNumber: 1,
      phrases: guest,
    },
    {
      minNumber: 0,
      phrases: guest,
    },
    {
      minNumber: 0,
      phrases: baby,
    }
  ],
  actionButtons: true
});

// Удобства
iBox('.js-convenience-increment-box').init({
  // defaultPhrase: 'Уточните удобства',
  items: [
    {
      minNumber: 1,
      phrases: bedroom,
    },
    {
      minNumber: 1,
      phrases: bed,
    },
    {
      minNumber: 0,
      phrases: bathroom,
    }
  ],
  actionButtons: false
});