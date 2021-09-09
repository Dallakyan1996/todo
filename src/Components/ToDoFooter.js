import { useDispatch, useSelector } from "react-redux";

const ToDoFooter = (props) => {
    let state = useSelector(state => state);
    let pendingTasks = state.filter(i => !i.isCompleted)
    // let headers = {
    //     'Access-Control-Allow-Credentials': 'true',
    //     'Access-Control-Allow-Origin': "*",

    // }
    const postDelCompleted = () => {
        fetch('http://localhost:3000/clear-completed', {
            method: 'get',
            // headers: headers
        })
    }
    const dispatch = useDispatch()
    return <div className="footerDiv">
        <h5> You have {props.quantityAllTasks - props.quantityCompletedTasks} pending tasks  </h5>
        <button className="clearCompletedBtn" onClick={
            // pendingId(),
            // postDelCompleted(),
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