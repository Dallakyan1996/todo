import { useDispatch, useSelector } from "react-redux"
import "./style.css"
import AddTask from "./TaskInput"
import { FaTrashAlt, FaPen, FaCheck } from 'react-icons/fa';
import ToDoFooter from "./ToDoFooter";
import { useState, useEffect } from "react";

const ToDoItem = () => {
    let state = useSelector((state) => state)
    let completedTasks = state.filter(i => i.isCompleted)
    let quantityAllTasks = state.length;
    let quantityCompletedTasks = completedTasks.length;
    let [editTask, setEditTask] = useState(false)
    const dispatch = useDispatch();
    // console.log(state)

    let headers = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': "*",

    }
    useEffect(() => {
        fetch('http://localhost:3000/list-movies', {
            // mode: 'no-cors',
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }, [])
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
                        <button className={v.edit ? "editBtn editBtnDone" : "editBtn editBtnPen"} onClick={() => {
                            dispatch({
                                type: "EDIT-TASK",
                                payload: [
                                    state[i].edit = !state[i].edit
                                ]
                            })
                        }
                        } >
                            {!v.edit ? <FaPen /> : <FaCheck />}</button>
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