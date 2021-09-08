import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik, Form } from "formik"
const AddTask = () => {
    const [text, setText] = useState("")
    let state = useSelector((state) => state)
    const dispatch = useDispatch();

    const postTask = (task) => {
        fetch('http://localhost:3000/task', {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                task: task
            })
        })
    }

    return <div className="textInputDiv">
        <Formik initialValues={{ id: "" }}>
            <Form className="form" >
                <input type="text" className="textInput" placeholder="What you want to do" value={text} onChange={(e) => {
                    setText(e.target.value)
                }} />
                <button className="addBtn" onClick={() => {
                    postTask(text)
                    if (text) {
                        dispatch({
                            type: 'ADD-TASK',
                            payload: [
                                ...state,
                                state.push({
                                    id: Math.random(),
                                    taskText: text,
                                    isCompleted: false,
                                    edit: false
                                })
                            ]
                        })
                    }
                    setText("")
                }}>Add Task</button>
            </Form>
        </Formik>
    </div>
}

export default AddTask;