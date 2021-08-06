import { useDispatch, useSelector } from "react-redux";

const ToDoFooter = (props) => {
    let state = useSelector(state => state);
    let pendingTasks = state.filter(i => !i.isCompleted)
    const dispatch = useDispatch()
    return <div className="footerDiv">
        <h5> You have {props.quantityAllTasks - props.quantityCompletedTasks} pending tasks  </h5>
        <button className="clearCompletedBtn" onClick={
            function () {
                dispatch({
                    type: "DELETE-COMPLETED",
                    payload: [...pendingTasks]

                })
            }
        }>Clear completed tasks</button>
    </div >
}

export default ToDoFooter;