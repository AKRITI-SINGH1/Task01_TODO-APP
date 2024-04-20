import { useState, useEffect } from 'react'
import Nav from './component/Nav'
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  
  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }


  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }


  const handleChange = (e)=>{
    setTodo(e.target.value)
    
  }


 const handleCheckbox = (e) => {
  let id =  e.target.name;
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  console.log(index)
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos)
  saveToLS()
 }
 
   return (
    <>
    <Nav/>
    <div className="mx-3 md:container md:mx-auto my-4 rounded-xl p-5 bg-pink-300 min-h-[80vh] md:w-1/2">
      <h1 className=' font-bold text-center text-2xl'>Plan Your Day At One Spot</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-lg font-bold'> Assign Your Tasks </h2>
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1'/>
        <button onClick={handleAdd} disabled= {todo.length<=2} className='bg-pink-600 hover:bg-pink-400 disabled:bg-pink-500 p-3 py-1 text-sm font-bold text-black rounded-md '>Save</button>
      </div>
      <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Done Tasks
      <label className='mx-2' htmlFor="show"></label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

        <h2 className='text-lg font-bold'> My Task List</h2>
      <div className="todos">
        {todos.length ===0 && <div className='m-5' >Add Task to get started</div> }
        
      {todos.map(item=>{
        
         return (showFinished || !item.isCompleted) &&  <div key={item.id} className="todo flex my-3 justify-between">
          <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=> handleEdit(e, item.id)} className='bg-pink-600 hover:bg-pink-400 p-3 py-1 text-sm font-bold text-black rounded-md mx-1'>
              <MdEditSquare /></button>

            <button onClick={(e)=> handleDelete(e, item.id)} className='bg-pink-600 hover:bg-pink-400 p-3 py-1 text-sm font-bold text-black rounded-md mx-1'>
              <AiFillDelete /></button>
          </div>
        </div>
         
        })}
      </div>
    </div>
    </>
   )
}
export default App
