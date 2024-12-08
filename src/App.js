import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, settodo] = useState("")
  const [tasks, setTasks] = useState(() => {
    const prevtasks = localStorage.getItem("tasks");
    return prevtasks ? JSON.parse(prevtasks) : [];
  });
  

  const addtask = () => {
    setTasks([...tasks, { id: uuidv4(), text: todo, checked: false }])
    settodo("")
  }

  const deletetask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const togglecheck = (id) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, checked: !task.checked } : task)
    )
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  

  return (
    <>
      <section className="bg-pink-100 h-screen pt-32 ">
        <section className="w-1/3 bg-pink-400 rounded-lg mx-auto h-3/5">
          {/* add task */}
          <section className="flex gap-5 p-2 mb-5">
            <input type="text" className=" rounded w-full p-2 focus:outline-pink-400" value={todo} onChange={(e) => settodo(e.target.value)} />
            <button className="w-1/3 bg-pink-100 rounded p-2" onClick={addtask}  >add task</button>
          </section>
          {/* tasks */}
          <section >
            {/* task */}
            {tasks.map(task => {
              return (
                <section key={task.id} className={`flex justify-between px-5 py-2 m-2 bg-pink-100 rounded  ${task.checked ? ' text-gray-600 bg-green-200' : ''}`}>
                  <section className={`flex gap-2 ${task.checked?"line-through":""}`}>
                    <input type="checkbox" checked={task.checked} onChange={() => togglecheck(task.id)} />
                    <p>{task.text}</p>
                  </section>
                  {task.checked?
                  <p className=" text-green-600 font-medium">done</p>
                  :<p className="text-xl text-pink-400 font-bold cursor-pointer" onClick={() => deletetask(task.id)}>x</p>
                }
                </section>
              )
            })}
          </section>
        </section>
      </section>
    </>
  );
}

export default App;
