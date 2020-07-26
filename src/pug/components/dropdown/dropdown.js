// const output = target.closest('.dropdown').querySelector('.js-dropdown__text');
const summary = document.querySelectorAll('.dropdown__summary');

// Close all
function closeAll() {
  document.querySelectorAll('.dropdown_expanded')
    .forEach(el => {
      el.classList.remove('dropdown_expanded')
    })
}


// Listeners
summary.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('.dropdown').classList.contains('dropdown_expanded')) {
      closeAll();
    } else {
      closeAll();
      e.target.closest('.dropdown').classList.toggle('dropdown_expanded')
    }
  })
})


document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown_expanded') && !e.target.classList.contains('dropdown__summary')) {
    closeAll();
  }
})



/* iBox  */ 


// // Формирование правильной формы слова в зависимости от колличества элементов
// export function phraser(single, pluralFirstType, pluralSecondType, number) {
//   if (number > 0 && number < 5 || number >= 20) {
//     let lastNumber = number % 10
//     switch (lastNumber) {
//       case 1: return `${number} ${single}`;
//       case 2:
//       case 3:
//       case 4: return `${number} ${pluralFirstType}`;
//       default: return `${number} ${pluralSecondType}`;
//     }
//   }
//   return `${number} ${pluralSecondType}`;
// };



// export default function iBox(el) {

//   // Находим цель
//   const targets = document.querySelectorAll(el)

//   // Инициализация
//   function iBoxInit({ defaultPhrase, items, actionButtons }) {

//     // Если элемент не найден или не введен, выходим из функции
//     if (!targets.length) {
//       console.log(`iBox не инициализирован, аргумент ${el} = ${targets}`);
//       return;
//     }

//     defaultPhrase = defaultPhrase || items.map(item => {
//       return item.minNumber ? phraser(...item.phrases, item.minNumber) : '';
//     }).join(`, `);


//     targets.forEach(target => {

//       // Собираем элементы
//       const applyButton = target.querySelector('.done');
//       const resetButton = target.querySelector('.reset');
//       const minusButtons = target.querySelectorAll('.decrease');
//       const plusButtons = target.querySelectorAll('.increase');
//       const numbers = target.querySelectorAll('.increment-box__number');

//       //Mutation Observer     
//       const observer = new MutationObserver(mutations => {
//         mutations.forEach(mutation => {
//           if (mutation.attributeName === 'value'){
//             if (mutation.target.value === mutation.target.dataset.minNumber){
//               mutation.target.parentElement.querySelector('.decrease').classList.add('decrease_disabled');
//               ![...numbers].reduce((acc, el) => acc = +acc + +el.value, 0) ? resetButton.style.visibility = 'hidden' : null;
//             } else {
//               mutation.target.parentElement.querySelector('.decrease').classList.remove('decrease_disabled');
//               resetButton.style.visibility = 'visible';
//             }
//           }
//         })
//       });
      

//       ![...numbers].reduce((acc, number, index) => {
//         number.setAttribute('data-min-number', items[index].minNumber)
//         observer.observe(number, { attributes: true })
//         return acc = +acc + +number.value
//       }, 0) ? resetButton.style.visibility = 'hidden' : null;


//       // Action buttons
//       if (!actionButtons) {
//         target.querySelector('.action-buttons').style.display = 'none';
//         target.querySelector('.increment-box__rows').style.margin = 0;
//       } else {

//         // Кнопка Применить
//         applyButton.addEventListener('click', (e) => {
//           iBoxRender(defaultPhrase, items);
//         }, true)

//         // Кнопка Очистить
//         function reset() {
//           numbers.forEach(number => {
//             number.value = number.dataset.minNumber;            
//             number.setAttribute('value', number.value)
//           });
//           output.textContent = defaultPhrase;
//         }
//         resetButton.addEventListener('click', function (e) {
//           reset();
//           e.target.style.visibility = 'hidden';
//         }, true)
//       }

//       //Кнопки " - "
//       minusButtons.forEach(minusButton => {
//         minusButton.addEventListener('click', function (e) {
//           const number = this.parentElement.querySelector('.increment-box__number');
//           if (number.value > number.dataset.minNumber) {
//             number.value--;
//             number.setAttribute('value', number.value);
//             if (!actionButtons) iBoxRender(defaultPhrase, items);
//           }
//         })
//       })

//       //  Кнопки " + "
//       plusButtons.forEach(plusButton => {
//         plusButton.addEventListener('click', function (e) {
//           const number = this.parentElement.querySelector('.increment-box__number')
//           number.value++;
//           number.setAttribute('value', number.value);
//           if (!actionButtons) iBoxRender(defaultPhrase, items);
//         })
//       })

//       // Рендер iBox
//       function iBoxRender(defaultPhrase, items) {        
        
//         const map = new Map()
//         numbers.forEach((number, index) => {
//           if (number.value <= number.dataset.minNumber){
//             number.parentElement.querySelector('.decrease').classList.add('decrease_disabled')
//           }
//           if (map.has(items[index].phrases)) {
//             map.set(items[index].phrases, map.get(items[index].phrases) + +number.value)
//           } else {
//             map.set(items[index].phrases, +number.value)
//           }
//         })

//         const result = [];

//         [...map].forEach(i => i[1] && result.push(phraser(...i[0], i[1])));

//         output.textContent = !result.length ? defaultPhrase : result.join(`, `).length > 19 ? result.join(`, `).slice(0, 20) + '...' : result.join(`, `);
//       }

//       iBoxRender(defaultPhrase, items);
//     })
//   }

//   return {
//     init: iBoxInit,
//   }
// };