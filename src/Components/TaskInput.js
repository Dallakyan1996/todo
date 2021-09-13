import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Formik, Form } from "formik"
import { apiObject } from "../service/API"

const AddTask = () => {
    const [text, setText] = useState("")
    let state = useSelector((state) => state)
    const dispatch = useDispatch();

    const postTask = apiObject.postTask

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