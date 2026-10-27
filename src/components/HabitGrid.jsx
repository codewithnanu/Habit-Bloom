import './HabitGrid.css'

export default function HabitGrid({ year, month, habits, markHabitCompleted }) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const numberOfDays = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const days = []

for (let day = 1; day <= numberOfDays; day++) {
  days.push(day)
}

  function dateKey(day) {
    return `${year}-${month + 1}-${day}`
  }

  function done(day) {
    const date = dateKey(day)
    return habits.filter((habit) => (habit.completedDays ?? []).includes(date)).length
  }

  function progress(day) {
    return habits.length ? Math.round((done(day) / habits.length) * 100) : 0
  }
  

  return (
    <>
      <div className="monthly-grid">
        <div>Habit</div>
        <div className="grid">
          {days.map((day) => {
            const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(year, month, day).getDay()]
            return <div className="calendar-day-heading" key={`heading-${day}`}><span>{weekday}</span><span>{day}</span></div>
          })}
        </div>
      </div>

      {habits.map((habit) => (
        <div className="monthly-grid" key={habit.id}>
          <div className="habit-label-cell">
            <span className="habit-name" title={habit.name}>{habit.name}</span>
          </div>
          <div className="grid">
            {days.map((day) => {
              const completed = (habit.completedDays ?? []).includes(dateKey(day))
              const isToday =
                year === today.getFullYear() &&
                month === today.getMonth() &&
                day === today.getDate()

              return (
                <button
                  className={`${completed ? 'completed-day' : 'incomplete-day'}${isToday ? ' today' : ''}`}
                  key={`${habit.id}-${day}`}
                  onClick={() => {markHabitCompleted(habit.id, dateKey(day))
                    
                  }}
                  aria-label={`${habit.name}, ${monthNames[month]} ${day}: ${completed ? 'completed' : 'not completed'}`}
                  aria-pressed={completed}
                >
                  {completed ? 'X' : 'O'}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      <div className="monthly-grid summary-row progress-row">
        <div>Progress</div>
        <div className="grid">{days.map((day) => <span key={`progress-${day}`}>{progress(day)}%</span>)}</div>
      </div>
      <div className="monthly-grid summary-row">
        <div>Done</div>
        <div className="grid">{days.map((day) => <span key={`done-${day}`}>{done(day)}</span>)}</div>
      </div>
      <div className="monthly-grid summary-row">
        <div>Not Done</div>
        <div className="grid">{days.map((day) => <span key={`not-done-${day}`}>{habits.length - done(day)}</span>)}</div>
      </div>
    </>
  )
}
