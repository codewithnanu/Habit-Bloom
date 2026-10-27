import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import AddHabit from './components/AddHabit'
import Dashboard from './pages/Dashboard'
import Heatmap from './pages/Heatmap'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'

function App() {
  const [habits, setHabits] = React.useState(() => {
    try {
      const savedHabits = JSON.parse(localStorage.getItem('habits') ?? '[]')
      return Array.isArray(savedHabits) ? savedHabits : []
    } catch {
      return []
    }
  })

  React.useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  function markHabitCompleted(id, date) {
    setHabits((currentHabits) => currentHabits.map((habit) => {
      if (habit.id !== id) return habit
      const completedDays = habit.completedDays ?? []
      return {
        ...habit,
        completedDays: completedDays.includes(date)
          ? completedDays.filter((completedDate) => completedDate !== date)
          : [...completedDays, date],
      }
    }))
  }

  return (
    <Routes>
      <Route index element={<Dashboard habits={habits} markHabitCompleted={markHabitCompleted} />} />
      <Route path="/heatmap" element={<Heatmap habits={habits}/>} />
      <Route path="/stats" element={<Statistics habits={habits} />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/addhabit" element={<AddHabit habits={habits} setHabits={setHabits} />} />
    </Routes>
  )
}

export default App
