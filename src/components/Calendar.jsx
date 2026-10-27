import React from "react";


export default function Calendar({habitId, markHabitCompleted,completedDays}) {
    const [year, setYear] = React.useState(2024)
    const [month, setMonth] = React.useState(9)
   
   
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const handleNext=()=>{
        if(month<11){
            setMonth(month + 1);

        }
        if(month===11){
            setMonth(0);
            setYear(year + 1)
        }
    }
    const handlePrev=()=>{
        if(month>0){
            setMonth(month - 1);
        }
        if(month===0){
            setMonth(11);
            setYear(year - 1)
        }
    }
  
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    const firstWeekday = new Date(year, month, 1).getDay();
    
    const days=[];
    for(let i = 1; i <= numberOfDays; i++) {
        days.push(i);
    }
      function handleDayClick(day){
markHabitCompleted(habitId,`${year}-${month+1}-${day}`)
      }
      function isCompletedDay(day){
        if(completedDays.includes(`${year}-${month+1}-${day}`)){
            return true 
        }
        else{
            return false
        }
      }


    return(
        <div className="calendar">
            <button onClick={handlePrev}>prev</button>
            <span className="month">{monthNames[month]}</span>
            <span className="year">{year}</span>
            <button onClick={handleNext}>next</button>
        
            <div className="calendar-days">
             
                {days.map((day,index) => (
                    
                   <button
  className={isCompletedDay(day) ? "day completed" : "day"}
  onClick={() => handleDayClick(day)}
  key={index}
>
  {day}
</button>
                ))}
               
            </div>
          
        </div>
    )
}