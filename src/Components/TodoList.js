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

    let headers = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': "*",

    }
    const postDelete = (id) => {
        fetch('http://localhost:3000/delete-task', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
    }
    const postComplete = (id) => {
        fetch('http://localhost:3000/complete-task', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
    }
    useEffect(() => {
        fetch('http://localhost:3000/task-list', {
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(data => {

                // a.push(data)
                dispatch({
                    type: 'INITIAL-STATE',
                    payload: {
                        data: data
                    }
                })
                // console.log(state)
            });
    }, [])
    return (
        <>
            <div className="toDoDiv">TO-DO LIST</div>
            <div>
                <AddTask />
            </div>
            <div className="container">
                {

                    <div>
                        {state.map((v, i) => <div key={v._id} className="tasksDiv">
                            <input id={v.id} className="checkBoxInput" defaultChecked={v.isCompleted ? true : false} type="checkBox" onChange={(e) => {
                                postComplete(v.id)
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
                                postDelete(v.id)
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
                }
            </div>
        </>
    )
}

export default ToDoItem;