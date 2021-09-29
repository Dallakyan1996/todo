import { Link } from "react-router-dom";
import { apiObject } from "../../service/API";
import { history } from "../../helpers/history";

const SideBar = () => {
    const logout = () => {
        apiObject.logout();
        history.push('/login');
    }
    return <>
        <div className="sideBarWrapper">
            <ul>
                <li>User Profile</li>
                <li>Messages</li>
                <li>
                    <Link to="/todo">ToDo</Link>
                </li>
                <li >
                    <Link onClick={logout}>logOut</Link>
                </li>
            </ul>
        </div>
    </>
}

export default SideBar;