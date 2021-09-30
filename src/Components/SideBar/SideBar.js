import { NavLink } from "react-router-dom";
import { apiObject } from "../../service/API";
import { history } from "../../helpers/history";
import "./side_bar.css"

const SideBar = () => {
    const logout = () => {
        apiObject.logout();
        history.push('/login');
        window.location.reload(true);
    }
    return <>
        <div className="sideBarWrapper">
            <div className="sideBarContent">
                <ul>
                    <div>
                        <li>
                            <NavLink exact activeClassName="active" to="/user-profile">
                                User Profile
                            </NavLink>
                        </li>
                    </div>
                    <div>
                        <li>
                            <NavLink exact activeClassName="active" to="/messages">
                                Messages
                            </NavLink>
                        </li>
                    </div>
                    <div>
                        <li>
                            <NavLink exact activeClassName="active" to="/todo">
                                ToDo
                            </NavLink>
                        </li>
                    </div>
                    <div onClick={logout}>
                        <li>
                            <NavLink exact activeClassName="active" to="/login">logOut</NavLink>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </>
}

export default SideBar;