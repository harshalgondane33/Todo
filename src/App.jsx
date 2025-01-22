import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { stringify, v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [Finished, setFinished] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true); 
  const [successMessage, setSuccessMessage] = useState("");
  const [lastAction, setlastAction] = useState(null)


  useEffect(() => {
    let todostring=localStorage.getItem("todos")
    if(todostring){
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    } 
    setIsInitialLoad(false)
    //console.log(todos)
  },[] )
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    //console.log(todos)
  }, [todos,isInitialLoad]);
  // const saveToLS = () => {
  //   console.log(todos)
  //   localStorage.setItem("todos",JSON.stringify(todos))
  //   console.log(todos)
  // }
  
  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleAdd = ()=>
  {
    if (todo.trim() === ""){ 
      alert("Todo cannot be empty!");
      return;
    }
    //console.log(todo)
    //let uid=uuidv4();
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    settodos([...todos,newTodo]);
    settodo("")
    setlastAction({type:"add",todo:newTodo})
    //console.log(todos)
    //saveToLS();
    setSuccessMessage("Todo successfully added!");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    
  }
  const handleEdit = (e,id) => {
    const newTodo = prompt("Edit your todo:");
    if(newTodo)
    {
      let index= todos.findIndex(item => {
        return item.id===id;
      })
      let newTodos=[...todos];
      newTodos[index].todo=newTodo;
      settodos(newTodos)

      setSuccessMessage("Todo successfully Edited!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    }
    //saveToLS();
  }
  const handleDelete = (e,id) => {
    const deletedTodo = todos.find((item) => item.id === id);
    let newTodos= todos.filter(item => {
      return item.id!==id;
    })
    settodos(newTodos)
    setlastAction({type:"delete",todo:deletedTodo})
    //saveToLS();
    setSuccessMessage("Todo Deleted!");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  }
  const handlefinish = () =>
  {
    setFinished(!Finished) 
  }
  const handleCheckbox = (e) => {
    let id=e.target.name;
    let index= todos.findIndex(item => {
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    settodos(newTodos)
    //saveToLS();
  }
  const handleKeydown = (e) => {
    if(e.key=="Enter")
    {
      handleAdd()
    }
  }

  const handleUndo = () => {
    if(lastAction)
    {
      if(lastAction.type==="add")
      {
        const updatedTodos = todos.filter(
          (item) => item.id !== lastAction.todo.id
        );
        settodos(updatedTodos);
      }
      else if(lastAction.type="delete")
      {
        settodos([...todos, lastAction.todo]);
      }
    }
    setlastAction(null);
    setSuccessMessage("");
  }
  

  return (
    <>
      <Navbar/>
      <div className="md:container bg-slate-200 mx-4 rounded-xl md:mx-auto my-5 p-5 min-h-[80vh] md:w-1/2">
         {/* Success Message */}
         {successMessage && (
          <div className="absolute bottom-2 right-2 bg-gray-600 text-white px-8 py-2 rounded-md shadow-lg">
            {successMessage}
            {lastAction && (
              <button
                className="ml-4 bg-yellow-200 text-black px-2 py-1 rounded-md border border-black"
                onClick={handleUndo}
              >
                Undo
              </button>
            )}
          </div>
        )}
      <h2 className='text-2xl font-bold'>Add Todo</h2>
        <div className="addTodo my-0-5 flex bg-slate-400 rounded-xl p-3">
          <input className="rounded-sm w-screen" type='text' value={todo} onChange={handleChange} onKeyDown={handleKeydown}/>
          <button className='bg-yellow-100 rounded-md border-solid border-black border-2 w-24 my-1 mx-2 hover:font-bold transition-all' onClick={handleAdd}>Add</button>
        </div>
        <h2 className='text-2xl font-bold text-black'>Your Todos</h2>
        <input type="checkbox" className='my-2' checked={Finished} onChange={handlefinish}/> Show Finished
        <div className="yourTodo my-2 min-h-[55vh] bg-slate-400 rounded-xl p-3 text-white">
          {todos.length==0 && <div className='my-1'>No Todos To display</div>}
          {todos.map(item => {
           return (Finished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between bg-slate-700 my-1 p-1 rounded-md">
            <input name={item.id} type='checkbox' checked={item.isCompleted} onChange={handleCheckbox} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            <div className="buttons flex gap-1 text-black">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-yellow-200 rounded-md w-fit border-2 border-solid border-black p-1'><FaEdit /></button>
              <button onClick={(e)=> handleDelete(e,item.id)} className='bg-yellow-200 rounded-md w-fit border-2 border-solid border-black p-1'><MdDelete /></button>
            </div>
            </div>
          })}
          </div>
      </div>
    </>
  )
}

export default App
