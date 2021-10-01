let intitialState = {}

const userInfoReducer = (state = intitialState, action) => {
    switch (action.type) {
        case "SET-USER-INFO": return state = action.payload.userInfo
        default: return state
    }
}

export default userInfoReducer;

