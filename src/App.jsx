import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import Navbar from './Components/Navbar'
import Button from './Components/Button'
import DeleteDialog from './Components/DeleteDialog'

function App() {
  // States for managing todos: new todo input, todos list, editing ID, edit input, todo to delete, and filter
  const [todoInput, setTodoInput] = useState("")
  const [todos, setTodos] = useState(() => {
    // Initialize todos state with localStorage data if it exists
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  })
  const [editingId, setEditingId] = useState(null)
  const [editInput, setEditInput] = useState("")
  const [todoToDelete, setTodoToDelete] = useState(null)
  const [filter, setFilter] = useState("all")

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  // Remove a todo from the list and close the delete confirmation dialog
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setTodoToDelete(null)
  }

  return (
    <>
      <Navbar />

      <div className="h-[80vh] my-6 mx-3 py-3 px-6 bg-violet-200 rounded-lg">
        <div>
          <h2 className="mb-1 text-violet-500 text-lg font-medium">Add a Todo</h2>
          <div className="flex">
            <input onChange={updateTodoInput} value={todoInput} type="text" className="w-full py-1 px-2 bg-slate-100 border hover:border-violet-500 focus:border-violet-500 rounded-md outline-none text-violet-700 font-medium" />
            <Button onClick={addTodo} disabled={todoInput.length === 0} className="ml-2" >
              Add
            </Button>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button onClick={() => setFilter("all")} variant={filter === "all" ? 'filterActive' : 'filter'} >
            All
          </Button>
          <Button onClick={() => setFilter("completed")} variant={filter === "completed" ? 'filterActive' : 'filter'} >
            Completed
          </Button>
          <Button onClick={() => setFilter("uncompleted")} variant={filter === "uncompleted" ? 'filterActive' : 'filter'} >
            Uncompleted
          </Button>
        </div>

        <div className="mt-5">
          <h2 className="mb-1 text-violet-500 text-lg font-medium">Todos</h2>
          {todos.map((todoItem) => {
            // Filter todos based on the current filter state
            if (filter === "completed" && !todoItem.isCompleted) return null;
            if (filter === "uncompleted" && todoItem.isCompleted) return null;

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
                        <Button onClick={() => saveEdit(todoItem.id)}>
                          Save
                        </Button>
                      )
                      : (
                        // View mode: Show Edit and Delete buttons
                        <>
                          <Button onClick={() => startEditing(todoItem)}>
                            Edit
                          </Button>
                          <Button onClick={() => setTodoToDelete(todoItem.id)}>
                            Delete
                          </Button>
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

      {(todoToDelete !== null) ?
        (
          <DeleteDialog
            onClose={() => setTodoToDelete(null)}
            onConfirm={() => deleteTodo(todoToDelete)}
          />
        ) : null
      }
    </>
  )
}

export default App