import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'

function App() {
  const [todoInput, setTodoInput] = useState("")
  const [todos, setTodos] = useState([])

  return (
    <>
      <Navbar />

      <div className="h-[80vh] my-9 mx-9 py-3 px-6 bg-violet-200 rounded-lg">
        <div>
          <h2 className="mb-1 text-violet-500 text-lg font-medium">Add a Todo</h2>
          <div className="flex">
            <input value={todoInput} type="text" className="w-full py-1 px-2 bg-slate-100 border hover:border-violet-500 focus:border-violet-500 rounded-md outline-none text-violet-700 font-medium" />
            <button type="button" className="ml-2 py-1 px-3 bg-violet-500 hover:bg-violet-700 rounded-md text-slate-100">Add</button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-1 text-violet-500 text-lg font-medium">Todos</h2>
          {todos.map((todoItem, index) => {
            return (
              <ul key={index} className="mb-1">
                <li className="p-2 bg-slate-50 border border-violet-500 rounded-md flex justify-between items-center gap-2">
                  <div className="w-1/2 flex item-center gap-1">
                    <input type="text" disabled className="w-full py-1 px-2 bg-slate-50 border border-slate-50 hover:border-violet-500 focus:border-violet-500 rounded-md outline-none text-violet-700 font-medium" />
                    <input type="checkbox" className="w-5 accent-violet-500" />
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