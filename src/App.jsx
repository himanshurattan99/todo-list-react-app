import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Components/Navbar'

function App() {
  // States for managing todos: new todo input, todos list, editing ID and edit input
  const [todoInput, setTodoInput] = useState("")
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editInput, setEditInput] = useState("")

  // Update the todo input state as user types
  const updateTodoInput = (e) => {
    setTodoInput(e.target.value)
  }

  // Add a new todo to the list
  const addTodo = () => {
    setTodos([...todos, { id: uuidv4(), "text": todoInput, "isCompleted": false }])
    setTodoInput("")
  }

  // Toggle the completion status of a todo
  const handleTodoCheckBox = (id) => {
    setTodos(todos.map((todo) =>
      (todo.id === id) ?
        { ...todo, isCompleted: !todo.isCompleted } : todo
    ))
  }

  // Update the edit input state
  const updateEditInput = (e) => {
    setEditInput(e.target.value)
  }

  // Start edit mode for selected todo
  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditInput(todo.text)
  }

  // Save edited todo and reset editing state
  const saveEdit = (id) => {
    // Prevent empty todos
    if (editInput.trim() === "") return

    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, text: editInput } : todo
    ))
    setEditingId(null)
    setEditInput("")
  }

  // Remove a todo from the list
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
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
          {todos.map((todoItem) => {
            // Check if current todo is in edit mode
            const isEditing = (editingId === todoItem.id)

            return (
              <ul key={todoItem.id} className="mb-1">
                <li className="p-2 bg-slate-50 border border-violet-500 rounded-md flex justify-between items-center gap-2">
                  <div className="w-1/2 flex item-center gap-1">
                    {(isEditing) ?
                      (
                        // Edit mode: Show edit input
                        <input onChange={updateEditInput} value={editInput} autoFocus type="text" className="w-full py-1 px-2 bg-slate-100 border hover:border-violet-500 focus:border-violet-500 rounded-md outline-none text-violet-700 font-medium" />
                      )
                      : (
                        // View mode: Show todo text and checkbox
                        <>
                          <input value={todoItem.text} disabled type="text" className={`w-full py-1 px-2 bg-slate-50 border border-slate-50 hover:border-violet-500 focus:border-violet-500 rounded-md outline-none text-violet-700 font-medium ${todoItem.isCompleted ? 'line-through' : ''}`} />
                          <input onChange={() => handleTodoCheckBox(todoItem.id)} checked={todoItem.isCompleted} type="checkbox" className="w-5 accent-violet-500" />
                        </>
                      )
                    }
                  </div>

                  <div className="flex gap-1">
                    {(isEditing) ?
                      (
                        // Edit mode: Show Save button
                        <button onClick={() => saveEdit(todoItem.id)} type="button" className="py-1 px-3 bg-violet-500 hover:bg-violet-700 rounded-md text-slate-100">
                          Save
                        </button>
                      )
                      : (
                        // View mode: Show Edit and Delete buttons
                        <>
                          <button onClick={() => startEditing(todoItem)} type="button" className="py-1 px-3 bg-violet-500 hover:bg-violet-700 rounded-md text-slate-100">
                            Edit
                          </button>
                          <button onClick={() => deleteTodo(todoItem.id)} type="button" className="py-1 px-3 bg-violet-500 hover:bg-violet-700 rounded-md text-slate-100">
                            Delete
                          </button>
                        </>
                      )
                    }
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