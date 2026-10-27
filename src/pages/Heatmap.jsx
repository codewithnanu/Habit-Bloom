import { useState } from 'react'
import Headers from '../components/Headers'
import './Heatmap.css'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function Heatmap({habits}) {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingDays = (new Date(year, month, 1).getDay() + 6) % 7
  const days = []
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  function changeMonth(offset) {
    setSelectedDate((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1))
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
      let level=0;
  
    if(percent===0){
level=0;
    }
    if(percent>0 && percent<=25){
      level=1;
    }
     if(percent>25 && percent<=50){
      level=2;
    }
     if(percent>50 && percent<=75){
      level=3;
    }
 if (percent > 75) {
  level = 4
}

    return { day,level }
  })

  return (
    <>
      <Headers />
      <main className="heatmap-page">
        <section className="heatmap-panel" aria-labelledby="heatmap-title">
        <div className="heatmap-heading">
          <div>
            <h1 id="heatmap-title">Habit activity</h1>
            <p>See your daily consistency throughout the month.</p>
          </div>
          <div className="heatmap-month-navigation">
            <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">
              ‹
            </button>
            <span className="heatmap-period">{monthNames[month]} {year}</span>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">
              ›
            </button>
          </div>
        </div>

        <div
          className="monthly-heatmap"
          role="img"
          aria-label={`Habit activity heatmap for ${monthNames[month]} ${year}`}
        >
          <div className="monthly-heatmap-weekdays" aria-hidden="true">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
            <span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div className="monthly-heatmap-days">
            {dailyProgress.map(({day,level}) => (
              <span
                className={`heatmap-cell level-${level}`}
                key={day}
                style={day === 1 ? { gridColumnStart: leadingDays + 1 } : undefined}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        <div className="heatmap-legend" aria-label="Activity level legend">
          <span>Less</span>
          <span className="heatmap-cell level-0" aria-hidden="true" />
          <span className="heatmap-cell level-1" aria-hidden="true" />
          <span className="heatmap-cell level-2" aria-hidden="true" />
          <span className="heatmap-cell level-3" aria-hidden="true" />
          <span className="heatmap-cell level-4" aria-hidden="true" />
          <span>More</span>
        </div>
        </section>
      </main>
    </>
  )
}
