import { useDispatch, useSelector } from "react-redux"
import "../style/style.css"
import AddTask from "../TaskInput/TaskInput"
import { FaTrashAlt, FaPen, FaCheck } from 'react-icons/fa';
import ToDoFooter from "../ToDoFooter/ToDoFooter";
import { useEffect, useState } from "react";
import { apiObject } from "../../service/API";

const ToDoApp = () => {
    let state = useSelector((state) => state.tasksReducer)
    let completedTasks = state.tasks && state.tasks.filter(i => i.isCompleted)
    let quantityAllTasks = state.tasks.length;
    let quantityCompletedTasks = completedTasks.length;
    // debugger;
    const dataIsReturned = state.dataIsReturn;
    const dispatch = useDispatch();
    const getTasks = apiObject.getTasks;
    const postDelete = apiObject.postDelete;
    const postChecked = apiObject.postChecked;
    const postEditText = apiObject.postEditText;
    // const [loader, setLoader] = useState(true)

    useEffect(() => {
        getTasks()
            .then(data => {
                dispatch({
                    type: 'INITIAL-STATE',
                    payload: {
                        data: data
                    }
                })
                dispatch({
                    type: 'DATA-IS-RETURNED'
                })
            });
    }, [])
    return (
        <>
            <div className= "toDoApp">
                <div className="toDoDiv">TO-DO LIST</div>
                <div>
                    <AddTask />
                </div>
                <div className="">
                    {
                        dataIsReturned &&
                        <div>
                            {state && state.tasks.map((v, i) => <div key={v._id} className="tasksDiv">
                                <input id={v._id} className="checkBoxInput" defaultChecked={v.isCompleted ? true : false} type="checkBox" onChange={(e) => {
                                    postChecked(v._id, e.target.checked).then(
                                        state.tasks[i].isCompleted = e.target.checked,
                                        dispatch(
                                            {
                                                type: "CHECKED",
                                            })
                                    )
                                }} />{!v.edit ?
                                    <label htmlFor={v._id} className={!v.isCompleted ? "taskText" : "taskText taskTextCompleted"} >{v.taskText}</label> :
                                    <input type="text" className="editTextInput" defaultValue={v.taskText} onChange={(e) => {
                                        if (e.target.value) {
                                            v.taskText = e.target.value
                                            dispatch({
                                                type: "EDIT-TASK-TEXT",
                                                payload: {
                                                    ...state.tasks,
                                                }
                                            })

                                        }
                                    }} />
                                }
                                <button className={v.edit ? "editBtn editBtnDone" : "editBtn editBtnPen"} onClick={(e) => {
                                    postEditText(v._id, state.tasks[i].taskText).then(
                                        state.tasks[i].edit = !state.tasks[i].edit,
                                        dispatch({
                                            type: "EDIT-TASK",
                                            payload: {
                                                ...state.tasks,
                                            }
                                        }))
                                }
                                } >
                                    {!v.edit ? <FaPen /> : <FaCheck />}</button>
                                <button className="deleteBtn" onClick={() => {
                                    postDelete(v._id).then(
                                        state.tasks.splice(i, 1),
                                        dispatch({
                                            type: "DELETE",
                                            payload: {
                                                ...state
                                            }
                                        })
                                    )
                                }}><FaTrashAlt /></button>
                            </div>)}
                            <ToDoFooter quantityAllTasks={quantityAllTasks} completedTasks={completedTasks} quantityCompletedTasks={quantityCompletedTasks} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ToDoApp;
