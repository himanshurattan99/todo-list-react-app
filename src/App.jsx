import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'

function App() {
  // State for input field and list of todos
  const [todoInput, setTodoInput] = useState("")
  const [todos, setTodos] = useState([])

  // Update the todo input state as user types
  const updateTodoInput = (e) => {
    setTodoInput(e.target.value)
  }

  // Add a new todo to the list
  const addTodo = () => {
    setTodos([...todos, { "text": todoInput, "isCompleted": false }])
    setTodoInput("")
  }

  // Toggle the completion status of a todo
  const handleTodoCheckBox = (key) => {
    // Find the todo with matching key and toggle its completion
    let newTodos = [...todos]
    newTodos[key].isCompleted = !(todos[key].isCompleted)

    setTodos(newTodos)
  }

  return (
    <>
      <Navbar />

      <div className="h-[80vh] my-6 mx-3 py-3 px-6 bg-violet-200 rounded-lg">
        <div>
          <h2 className="mb-1 text-violet-500 text-lg font-medium">Add a Todo</h2>
          <div className="flex">
            <input onChange={updateTodoInput} value={todoInput} type="text" className="w-full py-1 px-2 bg-slate-100 border hover:border-violet-500 focus:border-violet-500 rounded-md outline-none text-violet-700 font-medium" />
            <button onClick={addTodo} disabled={todoInput.length === 0} type="button" className="ml-2 py-1 px-3 bg-violet-500 hover:bg-violet-700 rounded-md text-slate-100">Add</button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-1 text-violet-500 text-lg font-medium">Todos</h2>
          {todos.map((todoItem, index) => {
            return (
              <ul key={index} className="mb-1">
                <li className="p-2 bg-slate-50 border border-violet-500 rounded-md flex justify-between items-center gap-2">
                  <div className="w-1/2 flex item-center gap-1">
                    <input value={todoItem.text} disabled type="text" className={`w-full py-1 px-2 bg-slate-50 border border-slate-50 hover:border-violet-500 focus:border-violet-500 rounded-md outline-none text-violet-700 font-medium ${todoItem.isCompleted ? 'line-through' : ''}`} />
                    <input onChange={() => handleTodoCheckBox(index)} type="checkbox" className="w-5 accent-violet-500" />
                  </div>

                  <div className="flex gap-1">
                    <button type="button" className="py-1 px-3 bg-violet-500 hover:bg-violet-700 rounded-md text-slate-100">
                      Edit
                    </button>
                    <button type="button" className="py-1 px-3 bg-violet-500 hover:bg-violet-700 rounded-md text-slate-100">
                      Delete
                    </button>
                  </div>
                </li>
              </ul>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App