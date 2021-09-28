import { Link } from "react-router-dom";

const SideBar = () => {
    return <>
        <div className="sideBarWrapper">
            <ul>
                <li>User Profile</li>
                <li>Messages</li>
                <li>
                    <Link to="/todo">ToDo</Link>
                </li>
                <li>LogOut</li>
            </ul>
        </div>
    </>
}

export default SideBar;