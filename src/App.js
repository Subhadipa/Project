//import React from 'react';
import { useState,useEffect } from "react"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from "./components/Footer"
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask"
import About from "./components/About"

//Using Function
function App() {
  const [showAddTask,setShowAddTask]=useState
  (false)
  const [tasks,setTasks]=useState([])
  useEffect(()=>{
    const getTasks=async()=>{
      const tasksFromServer=await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks() 

  },[]
  
)  
//Fetch Tasks
const fetchTasks=async()=>{
  const res=await fetch('http://localhost:5000/tasks')
  const data=await res.json()
  
  return data
}

//Fetch Tasks
const fetchTask=async(id)=>{
  const res=await fetch(`http://localhost:5000/tasks/${id}`)
  const data=await res.json()
  
  return data
}

  
  
  /*  {
            id:1,
            text:'Doctors Appointment',
            day:'Feb 5th at 2:30pm',
            reminder:true
    
        },
        {
            id:2,
            text:'Meeting at School',
            day:'Feb 6th at 1:30pm',
            reminder:true
    
        },
        {
            id:3,
            text:'Food Shopping',
            day:'Feb 5th at 2:30pm',
            reminder:false
    
        }*/
    


//Add Task
const addTask=async (task)=>
{
  {
    const res = await fetch('http://localhost:5000/tasks', 
    {
      method: 'POST',
      headers: 
      {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data=await res.json()
    setTasks([...tasks,data])
  //console.log(task)
  // const id=Math.floor(Math.random()*10000)+1
  // const newTask={id,...task}
  // setTasks([...tasks,newTask])
  }
}
//Delete Task
const deleteTask=async (id)=>
{
  await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method:'DELETE',
  }
  
  )
  //  console.log('delete',id)
  setTasks(tasks.filter((task)=>task.id!==id))
}
//Toogle Reminder
const toogleReminder=async (id)=>
{
  const taskToToogle=await fetchTask(id)
  const updTask={...taskToToogle,
    reminder:!taskToToogle.reminder}
    const res=await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method:'PUT',
      headers:
      {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data=await res.json()

  //console.log(id)
  setTasks(
    tasks.map((task)=>
    task.id===id? {...task,reminder:
      data.reminder} :task
      )
  )
}
  return (
    <Router>
    
    <div className='container'>
   <Header onAdd={()=>setShowAddTask
    (!showAddTask)} 
    showAdd={showAddTask}
    />
   <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toogleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
 {/* //Using Class
class App extends React.Component{
  render()
  {
    return <h1>Hello from a class</h1>
  }
}  */}

export default App;
