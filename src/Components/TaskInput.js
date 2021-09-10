import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik, Form } from "formik"

const AddTask = () => {
    const [text, setText] = useState("")
    let state = useSelector((state) => state)
    const dispatch = useDispatch();

    const postTask = (task) => {
        return fetch('http://localhost:3000/add-task', {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                taskText: task,
                isCompleted: false,
                edit: false
            })
        }).then(response => response.json());
    }

    return <div className="textInputDiv">
        <Formik initialValues={{ id: "" }}>
            <Form className="form" >
                <input type="text" className="textInput" placeholder="What you want to do" value={text} onChange={(e) => {
                    setText(e.target.value)
                }} />
                <button className="addBtn" onClick={() => {
                    if (text) {
                        postTask(text)
                            .then((res) => {
                                console.log(res);
                                    dispatch({
                                        type: 'ADD-TASK',
                                        payload: [
                                            ...state,
                                            state.push({
                                                _id: res,
                                                taskText: text,
                                                isCompleted: false,
                                                edit: false
                                            })
                                        ]
                                    })
                                    console.log(state)
                            }
                            )
                    }
                    setText("")
                }}>Add Task</button>
            </Form>
        </Formik>
    </div>
}

export default AddTask;