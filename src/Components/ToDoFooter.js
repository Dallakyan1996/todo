import { useDispatch, useSelector } from "react-redux";
import { apiObject } from "../service/API";

const ToDoFooter = (props) => {
    let state = useSelector(state => state);
    let pendingTasks = state.filter(i => !i.isCompleted);
    const getClearCompleted = apiObject.getClearCompleted


    const dispatch = useDispatch()
    return <div className="footerDiv">
        <h5> You have {props.quantityAllTasks - props.quantityCompletedTasks} pending tasks  </h5>
        <button className="clearCompletedBtn" onClick={
            function () {
                getClearCompleted().then(
                    dispatch({
                        type: "DELETE-COMPLETED",
                        payload: [...pendingTasks]

                    })
                )
            }
        }>Clear completed tasks</button>
    </div >
}

export default ToDoFooter;