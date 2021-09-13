let headers = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': "*",

}

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

const postDelete = (_id) => {
    return fetch('http://localhost:3000/delete-task', {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ _id })
    }).then(response => response.json());
}

const postChecked = (_id, isChecked) => {
    return fetch('http://localhost:3000/complete-task', {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ _id, isChecked })
    }).then(response => response.json());
}

const postEditText = (_id, newText) => {
    return fetch('http://localhost:3000/edit-task', {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ _id, newText })
    }).then(response => response.json());
}

const getTasks = () => {
    return fetch('http://localhost:3000/task-list', {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
}

const getClearCompleted = () => {
    return fetch('http://localhost:3000/clear-completed', {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
}
export const apiObject = {
    postTask,
    getTasks,
    postDelete,
    postEditText,
    postChecked,
    getClearCompleted
}