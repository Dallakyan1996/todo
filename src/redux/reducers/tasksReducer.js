let intitialState = []


const tasksReducer = (state = intitialState, action) => {
    switch (action.type) {
        case "INITIAL-STATE": return state = action.payload.data
        case "ADD-TASK": return [
            ...state
        ]

        case "CHECKED": return [
            ...state
        ]
        case "DELETE": return [
            ...state
        ]
        case "DELETE-COMPLETED": return state = action.payload
        case "EDIT-TASK": return [
            ...state
        ]
        case "EDIT-TASK-TEXT": return [
            ...state
        ]
        default: return state
    }

}

export default tasksReducer;