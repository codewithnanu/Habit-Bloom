import './AddHabit.css'
import React from 'react'
import Headers from './Headers'

export default function AddHabit({ habits, setHabits, onAdded }) {
  const [habitName, setHabitName] = React.useState('')
  const [habitDescription, setHabitDescription] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const emoji = ['🏃', '🧘', '📚', '💧', '😴', '🥗', '🧹', '🎨', '🧠', '🚶', '🏋️', '🧘‍♀️']
  const [currentEmoji,setCurrentEmoji]=React.useState('🏃')
const [colors,setColors]=React.useState(["lavender","peach","blue","pink","yellow","mint" ])
const [currentColor,setCurrentColor]=React.useState("lavender")


  function handleAddHabit(event) {
    event.preventDefault()

    if (!habitName.trim()) {
      setErrorMessage('Please enter both habit name and description')
      return
    }

    setErrorMessage('')
    const newHabit = {
      name: habitName.trim(),
      color:currentColor,
      emoji:currentEmoji,
      id: `habit-${habits.length + 1}`,
      completedDays: [],
    }

    setHabits([...habits, newHabit])
    setHabitName('')
  

  }
  function changeEmoji(value){
    setCurrentEmoji(value)
  }
  function showEmoji(){
    setShow(!show)
  }
  function changeColor(value){
    setCurrentColor(value)
  
  }
  function deleteHabit(habitId){
  setHabits(  habits.filter((habit)=>{
      habit.id!=habitId
    }))
  }
  return (
    <>
      <Headers />
      <main className="add-habit-page">
        <section className="add-habit-intro" aria-labelledby="add-habit-title">
          <h1 id="add-habit-title">Build habits that stick</h1>
          <p>Add the routines you want to track — no account required. Everything lives securely in your browser.</p>
        </section>
        <div className="add-habit-layout">
          <section className="add-habit-panel" aria-label="New habit details">
            <h1>Add a Habit</h1>
          <form id="add-habit" onSubmit={handleAddHabit} className="add-habit-form">
            <label>Habit Name</label>
            <input
              required
              type="text"
              placeholder="Enter habit name"
              value={habitName}
              onChange={(event) => setHabitName(event.target.value)}
              aria-label="Habit name"
            />
            <label>Icon</label>
              <button className="selected-habit-emoji" type="button">
                {currentEmoji}
            </button>
            {/* <button onClick={()=>showEmoji}>
              tap to change
            </button> */}
        
    <div className="emoji-section">
  
       {emoji.map((icon) => {
        return (
          <button
            key={icon}
            type="button"
            onClick={() => changeEmoji(icon)}
            aria-label={`Choose ${icon} icon`}
            title={`Choose ${icon} icon`}
          >
            {icon}
          </button>
        )
       })}
            </div>
        
        
           
            <label>Color Tag</label>
            <div className="color-options" role="group" aria-label="Choose a habit color">
{colors.map((color) => (
  <button
    key={color}
    type="button"
    onClick={() => changeColor(color)}
    className={`color-swatch color-${color}${currentColor === color ? ' selected' : ''}`}
    aria-label={color}
    title={color}
  />
))}
{/*               
              <button className="color-swatch color-peach" type="button" aria-label="Peach" title="Peach" />
              <button className="color-swatch color-blue" type="button" aria-label="Blue" title="Blue" />
              <button className="color-swatch color-pink" type="button" aria-label="Pink" title="Pink" />
              <button className="color-swatch color-yellow" type="button" aria-label="Yellow" title="Yellow" />
              <button className="color-swatch color-mint" type="button" aria-label="Mint" title="Mint" /> */}
            </div>
            {/* <label>Frequency</label>
          <div className="frequency-options">
            <button type="button">Every day</button>
            <button type="button">Specific days</button>
            <button type="button">Per week</button>
          </div> */}

            {/* <input
              required
              type="text"
              placeholder="Enter habit description"
              value={habitDescription}
              onChange={(event) => setHabitDescription(event.target.value)}
              aria-label="Habit description"
            /> */}
            <span className="error-message">{errorMessage}</span>
            <button className="add-habit-submit" type="submit">Add Habit</button>
          </form>
          </section>
          <section className="your-habits-panel" aria-labelledby="your-habits-title">
            <div className="your-habits-heading">
              <h2 id="your-habits-title">Your Habits</h2>
              <span>{habits.length}</span>
            </div>
            {habits.length > 0 ? (
              <ul className="your-habits-list">
                {habits.map((habit) => (
                  <li className="your-habit-card" key={habit.id}>
                    <span className={`your-habit-color-strip your-habit-${habit.color}-strip`} aria-hidden="true" />
                    <span className="your-habit-icon" aria-hidden="true">{habit.emoji}</span>
                    <div className="your-habit-details">
                      <span className="your-habit-name">{habit.name}</span>
                      {/* <span className="your-habit-frequency">Every day</span> */}
                    </div>
                    <button onClick={()=>deleteHabit(habit.id)} className="remove-habit-button" type="button" aria-label={`Remove ${habit.name}`}>
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
             
            <div>no habits yet</div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
