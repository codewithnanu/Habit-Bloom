import Headers from '../components/Headers'
import './Statistics.css'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Statistics({ habits }) {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const numberOfDays = new Date(year, month + 1, 0).getDate()
  const days = []

  for (let day = 1; day <= numberOfDays; day++) {
    days.push(day)
  }

  const dailyProgress = days.map((day) => {
    const date = `${year}-${month + 1}-${day}`
    let completedCount = 0

    for (const habit of habits) {
      if ((habit.completedDays ?? []).includes(date)) {
        completedCount++
      }
    }

    const percent = habits.length > 0
      ? Math.floor((completedCount / habits.length) * 100)
      : 0

    return { day, percent }
  })

  const monthlyProgress = []

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const monthPrefix = `${year}-${monthIndex + 1}-`
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    let completedCount = 0

    for (const habit of habits) {
      const completedDays = habit.completedDays ?? []
      completedCount += completedDays.filter((date) => date.startsWith(monthPrefix)).length
    }

    const possibleCompletions = habits.length * daysInMonth
    const percent = possibleCompletions > 0
      ? Math.floor((completedCount / possibleCompletions) * 100)
      : 0

    monthlyProgress.push({ month: monthIndex, percent })
  }

  return (
    <>
      <Headers />
      <main className="statistics-page">
        <h1>Habit progress</h1>

      <section className="progress-section" aria-labelledby="daily-progress-title">
        <h2 id="daily-progress-title">Daily progress — {monthNames[month]} {year}</h2>
        <div className="daily-progress-chart">
          {dailyProgress.map(({ day, percent }) => (
            <div className="daily-progress-item" key={day}>
              <div className="daily-progress-percent">{percent}%</div>
              <div className="daily-progress-track">
                <div
                  className="daily-progress-fill"
                  style={{ height: `${percent}%` }}
                />
              </div>
              <div className="daily-progress-day">{day}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="progress-section" aria-labelledby="monthly-progress-title">
        <h2 id="monthly-progress-title">Monthly progress</h2>
        <div className="monthly-progress-chart">
          {monthlyProgress.map(({ month, percent }) => (
            <div className="monthly-progress-item" key={month}>
              <div className="daily-progress-percent">{percent}%</div>
              <div className="daily-progress-track">
                <div
                  className="daily-progress-fill"
                  style={{ height: `${percent}%` }}
                />
              </div>
              <div className="monthly-progress-month">{monthNames[month]}</div>
            </div>
          ))}
        </div>
      </section>
      </main>
    </>
  )
}
