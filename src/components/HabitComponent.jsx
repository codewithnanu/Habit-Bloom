import HabitCard from './HabitCard'
import React from 'react'
import HabitGrid from "./HabitGrid.jsx"
import DailyProgress from "./DailyProgress.jsx"
export default function HabitComponent() {
// const [habits, setHabits] = React.useState([{
//   name:"Exercise",
//   description:"Do 30 minutes of exercise every day",
//   id:"habit-1",

// },{
//   name:"Read",
//   description:"Read for 20 minutes every day",
//   id:"habit-2",
 
// },{
//   name:"Meditate",
//   description:"Meditate daily for 10 minutes",
//   id:"",
  
// },
// ])
  
   

//array of habit components
return(
    
<>
{/* {
   habits.map((habit)=>{
    return(
      <HabitCard name={habit.name} description={habit.description} completedDays={habit.completedDays} id={habit.id} markHabitCompleted={markHabitCompleted} />
    )
  })

} */}
<HabitGrid/>
{/* <DailyProgress/> */}

</>
)

}

