let intitialState = {
    dataIsReturn: false,
    tasks: []
}



const tasksReducer = (state = intitialState, action) => {
    switch (action.type) {
        case "INITIAL-STATE": return {
            ...state,
            tasks: [...action.payload.data]
        }
        case "ADD-TASK": return {
            ...state,
            tasks: [...action.payload]
        }

        case "CHECKED": return {
            ...state,
        }
        case "DATA-IS-RETURNED": return {
            ...state,
            dataIsReturn: true
        }
        case "DELETE": return {
            ...state,
        }
        case "DELETE-COMPLETED": return {
            ...state,
            tasks: [...action.payload]
        }
        case "EDIT-TASK": return {
            ...state,
        }
        case "EDIT-TASK-TEXT": return {
            ...state,
        }
        default: return state
    }

}

export default tasksReducer;