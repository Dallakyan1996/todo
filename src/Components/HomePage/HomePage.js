import "./home_page.css"
import SideBar from "../SideBar/SideBar";
import { Route } from 'react-router-dom'
import ToDoApp from "../ToDoList/TodoList";
const HomePage = () => {
    return <div className="homePageWrapper">
        <SideBar />
        <Route path="/todo" component={ToDoApp} />
    </div>
}

export default HomePage;