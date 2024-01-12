import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
export type FilterValuesType = "all" | "active" | "completed";
function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");
  localStorage.setItem("tasks", JSON.stringify(tasks))
  // const tasks2: Array<TaskType> = [
  //   { id: 1, title: "Terminator", isDone: false },
  //   { id: 2, title: "Harry Potter", isDone: true },
  //   { id: 3, title: "Lord of the Rings", isDone: true }
  // ]

  function removeTask(id: string) {
    let resultTasks = tasks.filter((t) => t.id !== id)
    setTasks(resultTasks)
  }
  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    };
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeStatus(taskId: string, isDone: boolean) {
    const task = tasks.find(task => task.id === taskId);
      if(task) {
        task.isDone = isDone;
      }
    setTasks([...tasks])
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <Todolist title="Что изучить"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask} 
        changeTaskStatus = {changeStatus} 
        filter ={filter} />
    </div>

  );
}



export default App;
