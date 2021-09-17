import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/hendle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('toDoCurrentUser')));

let acces_token = JSON.parse(localStorage.getItem('toDoCurrentUser')) && JSON.parse(localStorage.getItem('toDoCurrentUser')).token.toString()


const postTask = (task,id) => {
    return fetch('http://localhost:3001/add-task', {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + acces_token,
        },
        body: JSON.stringify({
            userID: id,
            taskText: task,
            isCompleted: false,
            edit: false
        })
    }).then(handleResponse).then(response => {
        // console.log(acces_token)
        JSON.stringify(response)
    });
}

const postDelete = (_id) => {
    return fetch('http://localhost:3001/delete-task', {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + acces_token,
        },
        body: JSON.stringify({ _id })
    }).then(response => response.json());
}

const postChecked = (_id, isChecked) => {
    return fetch('http://localhost:3001/complete-task', {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + acces_token,
        },
        body: JSON.stringify({ _id, isChecked })
    }).then(response => response.json());
}

const postEditText = (_id, newText) => {
    return fetch('http://localhost:3001/edit-task', {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + acces_token,
        },
        body: JSON.stringify({ _id, newText })
    }).then(response => response.json());
}

const getTasks = () => {
    return fetch('http://localhost:3001/task-list', {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true',
            'Authorization': 'Bearer ' + acces_token,
        }
    }).then(response => response.json())
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch('http://localhost:3001/auth/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user)
            localStorage.setItem('toDoCurrentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function registration(email, firstName, lastName, birthDay, password, gender) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName, birthDay, password, gender })
    };

    return fetch('http://localhost:3001/auth/registration', requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

const getClearCompleted = () => {
    return fetch('http://localhost:3001/clear-completed', {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true',
            'Authorization': 'Bearer ' + acces_token,
        }
    }).then(response => response.json())
}

function logout() {
    localStorage.removeItem('toDoCurrentUser');
    currentUserSubject.next(null);
}

export const apiObject = {
    postTask,
    getTasks,
    login,
    postDelete,
    postEditText,
    postChecked,
    getClearCompleted,
    registration,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
}