import { useDispatch, useSelector } from "react-redux"
import "./style.css"
import AddTask from "./TaskInput"
import { FaTrashAlt, FaPen, FaCheck } from 'react-icons/fa';
import ToDoFooter from "./ToDoFooter";
import { useState, useEffect } from "react";
import { apiObject } from "../service/API";

const ToDoItem = () => {
    let state = useSelector((state) => state)
    let completedTasks = state.filter(i => i.isCompleted)
    let quantityAllTasks = state.length;
    let quantityCompletedTasks = completedTasks.length;
    const dispatch = useDispatch();
    const getTasks = apiObject.getTasks;
    const postDelete = apiObject.postDelete;
    const postChecked = apiObject.postChecked;
    const postEditText = apiObject.postEditText;

    useEffect(() => {
        getTasks()
            .then(data => {
                dispatch({
                    type: 'INITIAL-STATE',
                    payload: {
                        data: data
                    }
                })
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
                            <input id={v._id} className="checkBoxInput" defaultChecked={v.isCompleted ? true : false} type="checkBox" onChange={(e) => {
                                postChecked(v._id, e.target.checked).then(
                                    dispatch(
                                        {
                                            type: "CHECKED",
                                            payload: [
                                                ...state,
                                                state[i].isCompleted = e.target.checked
                                            ]
                                        })
                                )
                            }} />{!v.edit ?
                                <label htmlFor={v._id} className={!v.isCompleted ? "taskText" : "taskText taskTextCompleted"} >{v.taskText}</label> :
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
                            <button className={v.edit ? "editBtn editBtnDone" : "editBtn editBtnPen"} onClick={(e) => {
                                postEditText(v._id, state[i].taskText).then(
                                    dispatch({
                                        type: "EDIT-TASK",
                                        payload: [
                                            state[i].edit = !state[i].edit
                                        ]
                                    }))
                            }
                            } >
                                {!v.edit ? <FaPen /> : <FaCheck />}</button>
                            <button className="deleteBtn" onClick={() => {
                                postDelete(v._id).then(
                                    dispatch({
                                        type: "DELETE",
                                        payload: [
                                            ...state,
                                            state.splice(i, 1)
                                        ]
                                    })
                                )
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