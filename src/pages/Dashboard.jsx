import { useState } from 'react'
import { Link } from 'react-router'
import Headers from '../components/Headers'
import HabitGrid from '../components/HabitGrid'
import MetricCard from '../components/MetricCard'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Dashboard({ habits, markHabitCompleted }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return { year: today.getFullYear(), month: today.getMonth() }
  })
   const numberOfDays = new Date(selectedDate.year, selectedDate.month + 1, 0).getDate()
   const today = new Date().getDate()
const monthPrefix = `${selectedDate.year}-${selectedDate.month + 1}-`
const count = habits.reduce(
  (total, habit) =>
    total +
    (habit.completedDays ?? []).filter((date) => date.startsWith(monthPrefix)).length,
  0
)
const progressOfDay=habits.reduce((total,habit)=>total+(habit.completedDays ?? []).filter((date)=>
 date===`${selectedDate.year}-${selectedDate.month + 1}-${today}`
).length,0)
const metrics = [
  { label: 'Total habits', value: habits.length, caption: 'Active routines' },
  { label: 'Completed Habits', value: count, caption: 'This month' },
  { label: 'Monthly Consistency', value: Math.floor((count/numberOfDays)*100)+"%", caption: 'Keep it going' },
  { label: "Today's progress", value: `${progressOfDay}/${habits.length}`, caption: 'This month' },
]




  function changeMonth(offset) {
    setSelectedDate(({ year, month }) => {
      const nextDate = new Date(year, month + offset, 1)
      return { year: nextDate.getFullYear(), month: nextDate.getMonth() }
    })
  }

  return (
    <>
      <Headers />
      <main className="tracker-app" id="dashboard">
        <div className="dashboard-toolbar">
        <div className="dashboard-month">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button>
          <span>{monthNames[selectedDate.month]} {selectedDate.year}</span>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">›</button>
        </div>
        <section className="metrics" aria-label="Habit metrics">
          {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
        </section>
        </div>

        <div className="habit-list" id="habits">
        {habits.length > 0 ? (
          <HabitGrid
            year={selectedDate.year}
            month={selectedDate.month}
            habits={habits}
            markHabitCompleted={markHabitCompleted}
          
          />
        ) : (
          <section className="empty-habits" aria-labelledby="empty-habits-title">
            <h2 id="empty-habits-title">No habits added yet</h2>
            <p>Add your daily routines to view your monthly habit tracking table and live progress charts.</p>
            <Link className="empty-habits-link" to="/addhabit">Add your first habit</Link>
          </section>
        )}
        </div>
      </main>
    </>
  )
}
