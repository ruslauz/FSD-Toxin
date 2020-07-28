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
  if (e.target.classList.contains('dropdown__layer')) {
    closeAll();
  }
})



