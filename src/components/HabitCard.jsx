import React from "react";
import Calendar from "./Calendar";
export default function HabitCard({name, description,id, markHabitCompleted,completedDays}) {
  
        
    
    return (
        <>
<div className="habit-card">
            <div className="habit-name">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            {/* <Calendar habitId={id } markHabitCompleted={markHabitCompleted} completedDays={completedDays} /> */}
         
</div>
          
        </>
    )
}
