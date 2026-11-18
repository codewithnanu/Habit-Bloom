import express from "express";
import cors from "cors";
import pool from "./db.js";


const app = express();
app.use(cors());
//  let habits = [
//         { id: 1, name: "Reading", icon: "📚" },
//         { id: 2, name: "Exercise", icon: "🏃" }
//     ];
app.use(express.json());
app.get("/test-db", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result);
});
app.get("/habits", async (req, res) => {
    try{
 const query = {
    text: `
        SELECT
        habits.id,
            habits.name,
            habits.color,
            habits.emoji,

      COALESCE(
    ARRAY_AGG(
        TO_CHAR(habit_completions.completed_date, 'YYYY-MM-DD')
    )
    FILTER (
        WHERE habit_completions.completed_date IS NOT NULL
    ),
    ARRAY[]::text[]
) AS completedDays
        FROM habits
        LEFT JOIN habit_completions
        ON habits.id = habit_completions.habit_id GROUP BY habits.id

    `
};
   const habits=await pool.query(query);
const result=habits.rows;
console.log(result);
    return res.json(result);}
    catch(err){
        console.log(err);
     return   res.status(500).json({
    message: "Failed to fetch habits",
    error: err.message
});
    }
});
app.post("/habits",async (req, res) => {
    try{
        const { name, emoji, color } = req.body;
        if (!name || !emoji || !color) {
    return res.status(400).json({
        message: "All fields are required"
    });
}
const query = {
  text: 'INSERT INTO habits(name,emoji,color) VALUES($1, $2,$3)',
  values: [name,emoji,color],
}

const result= await pool.query(query)
    res.status(201).json({message:"Habit Added Successfully"});}
    catch(err){
            res.status(500).json({
    message: "Failed to add habit",
    error: err.message
    })
}});
app.delete("/habits/:id",async (req, res) => {
    try{
    console.log(req.params);
    const id=req.params.id;
const query = {
  text: 'DELETE  FROM habits WHERE id=$1 RETURNING *',
  values: [id],
}
const result= await pool.query(query);
if(result.rows.length==0){
    res.json({message:"habit not found"})
}
  res.json({message:result.rows[0]})}
  catch(err){
    res.json({message:err.message})
  }
});
app.post("/habits/:id/completions",async(req,res)=>{
    try{
const {id}=req.params;
const {completed_date}=req.body;

if(completed_date.trim()===""||!completed_date){
    return res.json({message:"Missing completed_date"})
}
console.log(req.body);
const query = {
  text: 'INSERT  INTO  habit_completions (habit_id,completed_date) VALUES ($1,$2)',
  values: [id,completed_date],
}
const result=await pool.query(query);
 return res.json({message:"marked complete"})}
catch(err){
   return  res.json({message:err.message})
}

})
app.delete("/habits/:id/completions",async(req,res)=>{
const id=req.params.id;
const {completed_date}=req.body;
if(completed_date.trim()===""||!completed_date){
    return res.json({message:"Missing completed_date"})
}
console.log(req.body);
const query1 = {
  text: 'SELECT * FROM habit_completions where habit_id=$1 AND completed_date=$2',
  values: [id,completed_date],
}
const result1=await pool.query(query1);
if(result1.rows.length==0){
    return res.json({message:"habit with such id and completed_date does not exist"})
}
const query = {
  text: 'DELETE   FROM  habit_completions WHERE habit_id=$1 AND completed_date=$2 RETURNING *',
  values: [id,completed_date],
}
const result=await pool.query(query);
console.log(result)
return res.json({
    message:result.rows[0]
})
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});