getTemplate = () => {
  return `
  <div class="calendar">
		<div class="calendar__header">
			<button class="calendar__header-button  js-prev-button">prev</button>
			<div class="calendar__month-and-year js-month-and-year"></div>
			<button class="calendar__header-button js-next-button">next</button>
		</div>
		<div class="calendar__week">
			<div class="calendar__week-day">Пн</div>
			<div class="calendar__week-day">Вт</div>
			<div class="calendar__week-day">Ср</div>
			<div class="calendar__week-day">Чт</div>
			<div class="calendar__week-day">Пт</div>
			<div class="calendar__week-day">Сб</div>
			<div class="calendar__week-day">Вс</div>
		</div>
		<div class="calendar__days"></div>
		<div class="calendar__footer">
			<div class="action-buttons">
				<button class="reset">очистить</button>
				<button class="done">применить</button>
			</div>
		</div>
	</div>
`
}

class Calendar {
  constructor(selector, options) {
    options = options || {}
    this.$el = document.querySelector(selector)
    this.currentDate = new Date()
    this.month = this.currentDate.getMonth()
    this.year = this.currentDate.getFullYear()
    this.dayCellsAmount = 42
    this.dateRange = []
    this.$output = document.querySelector(options.output)
    this.placeholder = options.placeholder

    this.#setup()
    this.#render(this.month, this.year)
  }

  #render(month, year) {
    const $jsMonthAndYear = this.$el.querySelector('.js-month-and-year')
    const date = new Date(year, month);
    const day = date.getDay();
    const calendarMonth = date.getMonth();
    const calendarYear = date.getFullYear();
    const $days = document.createElement('div');
    $jsMonthAndYear.textContent = `${date.toLocaleDateString('ru-RU', { month: 'long' })} ${calendarYear}`;
    $days.classList.add('days');
    date.setDate(2 - (day || 7));

    for (let i = 0; i < this.dayCellsAmount; i++) {
      const $day = document.createElement('div');
      $day.textContent = date.getDate();
      $day.setAttribute('data-date', date.toLocaleDateString());
      $day.setAttribute('data-timestamp', +date);
      $day.classList.add('day');
      date.toLocaleDateString() == this.currentDate.toLocaleDateString() && $day.classList.add('day__current-day');
      calendarMonth > date.getMonth() && $day.classList.add('day__prev-month');
      calendarMonth < date.getMonth() && $day.classList.add('day__next-month');
      if (this.dateRange) {
        let [firstDay, lastDay] = this.dateRange;
        if (this.dateRange.length < 2) {
          +$day.dataset.timestamp === firstDay && $day.classList.add('day_selected');
        } else {
          +$day.dataset.timestamp === firstDay && $day.classList.add('day_selected', 'day_first-day');
          +$day.dataset.timestamp === lastDay && $day.classList.add('day_selected', 'day_last-day');
          (+$day.dataset.timestamp > firstDay && +$day.dataset.timestamp < lastDay) && $day.classList.add('day__in-range');
        }
      }
      $days.append($day);
      date.setDate(date.getDate() + 1);
    }
    this.$el.querySelector('.days') && this.$el.querySelector('.calendar__days').removeChild(this.$el.querySelector('.days'));
    this.$el.querySelector('.calendar__days').append($days);
  }

  #setup() {
    this.$el.innerHTML = getTemplate()
    const $prevButton = this.$el.querySelector('.js-prev-button')
    const $nextButton = this.$el.querySelector('.js-next-button')
    const $resetButton = this.$el.querySelector('.reset')
    const $applyButton = this.$el.querySelector('.done')
    const $calendar = this.$el.querySelector('.calendar')

    $prevButton.addEventListener('click', (e) => {
      this.month--
      this.#render(this.month, this.year)
    })
    $nextButton.addEventListener('click', (e) => {
      this.month++
      this.#render(this.month, this.year)
    })
    $resetButton.addEventListener('click', (e) => {
      this.reset()
      this.#render(this.month, this.year);
    })
    $applyButton.addEventListener('click', (e) => {
      this.dateOutput()
    })

    $calendar.addEventListener('click', (e) => {
      if (e.target.classList.contains('day')) {
        if (this.dateRange.length < 2) {
          e.target.classList.add('day_selected')
          this.dateRange.push(+e.target.dataset.timestamp)
          // this.dateOutput()
          if (this.dateRange.length === 2) {
            this.dateRange.sort((a, b) => a - b)
            this.#render(this.month, this.year);
          }
        } else if (this.dateRange.length === 2) {
          this.reset();
          this.#render(this.month, this.year);
        }
      }
    })
  }

  dateOutput() {
    if (!this.$output) return
    const $selectedDays = this.$el.querySelectorAll('.day_selected')
    this.$output.textContent = [...$selectedDays].map(day => day.dataset.date).join(' - ')
  }

  reset() {
    this.dateRange.length = 0;
    if (this.$output) this.$output.textContent = this.placeholder;
  }
}
