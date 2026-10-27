import {useState,useEffect} from 'react' 
import './index.css'

function App(){ 
    const [todos,setTodos]=useState(()=>{
      const savedTodos=localStorage.getItem("todos") 
      return savedTodos?JSON.parse(savedTodos):[]
    })
    const [task,setTask]=useState("")
    const [editIndex,setEditIndex]=useState(null) 
    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos))
    },[todos])
    function addTask(){ 
      const trimmedTask=task.trim()
      if (trimmedTask==='') return  
      const alreadyExists=todos.some(
        (todo,index)=>
          todo.text.toLowerCase()===trimmedTask.toLowerCase() && index!==editIndex
      )
      if (alreadyExists){
        alert('Task already exists') 
        return 
      }
      if (editIndex!=null){
        const updatedTodos=[...todos]
        updatedTodos[editIndex].text=task 
        setTodos(updatedTodos) 
        setEditIndex(null)
      }else{
        
        const newTask={
          text:task,
          completed:false
        } 
        setTodos([...todos,newTask])
      }
      setTask('') 
    } 
    function deleteTask(index){
      const confirmDelete=window.confirm('Are you sure you want to delete this task?') 
      if (!confirmDelete) return 
      const updatedTodos=todos.filter((_,i)=>i!=index)
      setTodos(updatedTodos)
    }  
    function editTask(index){
      setTask(todos[index].text) 
      setEditIndex(index)
      
    } 
    function toggleComplete(index){
      const updatedTodos=[...todos]
      updatedTodos[index].completed=!updatedTodos[index].completed 
      setTodos(updatedTodos)
    }
    return (
      <div className='container'>
        <h1>To-Do List</h1>
        <div className='input-section'>
          <input type="text" placeholder='Enter a task' value={task} onChange={(e)=>setTask(e.target.value)}/> 
          <button onClick={addTask}>
            {editIndex!==null?"Update":"Add"}
          </button>
        </div> 
        <ul> 
          {todos.map((todo,index)=>(
            <li key={index}>
              <span className={
                todo.completed?'completed':''
              }>
                {todo.text}
              </span>
              <div className='btn-group'>
                <button className='complete-btn' onClick={()=>toggleComplete(index)}>
                ✓
                </button> 
                <button className='edit-btn' onClick={()=>editTask(index)}>
                Edit
                </button>
                <button className='delete-btn' onClick={()=>deleteTask(index)}>
                Delete
                </button>
              </div> 
            </li>
          ))}
        </ul>
      </div>
    )
} 

export default App 