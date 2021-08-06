import { useDispatch, useSelector } from "react-redux"
import "./style.css"
import AddTask from "./TaskInput"
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import ToDoFooter from "./ToDoFooter";
import { useState } from "react";

const ToDoItem = () => {
    let state = useSelector((state) => state)
    let completedTasks = state.filter(i => i.isCompleted)
    let quantityAllTasks = state.length;
    let quantityCompletedTasks = completedTasks.length;
    let [editTask, setEditTask] = useState(false)
    const dispatch = useDispatch();
    console.log(state)
    return (
        <>

            <div className="toDoDiv">TO-DO LIST</div>
            <div>
                <AddTask />
            </div>
            <div className="container">
                <div>
                    {state.map((v, i) => <div key={v.id} className="tasksDiv">
                        <input id={v.id} className="checkBoxInput" type="checkBox" onChange={(e) => {
                            dispatch(
                                {
                                    type: "CHECKED",
                                    payload: [
                                        ...state,
                                        state[i].isCompleted = e.target.checked
                                    ]
                                })
                        }} />{!v.edit ?
                            <label htmlFor={v.id} className={!v.isCompleted ? "taskText" : "taskText taskTextCompleted"} >{v.taskText}</label> :
                            <input type="text" className="editTextInput" defaultValue={v.taskText} onChange={(e) => {
                                if (e.target.value) {
                                    dispatch({
                                        type: "EDIT-TASK-TEXT",
                                        payload: [
                                            ...state,
                                            v.taskText = e.target.value
                                        ]
                                    })
                                }
                            }} />

                        }
                        <button className="editBtn" onClick={() => {
                            dispatch({
                                type: "EDIT-TASK",
                                payload: [
                                    state[i].edit = !state[i].edit
                                ]
                            })
                        }
                        } ><FaPen /></button>
                        <button className="deleteBtn" onClick={() => {
                            setEditTask(false)
                            dispatch({
                                type: "DELETE",
                                payload: [
                                    ...state,
                                    state.splice(i, 1)
                                ]
                            })
                        }}><FaTrashAlt /></button>
                    </div>)}
                    <ToDoFooter quantityAllTasks={quantityAllTasks} completedTasks={completedTasks} quantityCompletedTasks={quantityCompletedTasks} />
                </div>
            </div>

        </>
    )
}

export default ToDoItem;