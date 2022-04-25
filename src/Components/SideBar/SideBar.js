import { NavLink } from "react-router-dom";
import { apiObject } from "../../service/API";
import { history } from "../../helpers/history";
import { FaUserCircle, FaEnvelope, FaTasks, FaSignInAlt } from "react-icons/fa";
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
                            <NavLink exact activeClassName="active" to="/">
                                <FaUserCircle />
                                <span>
                                    User Profile
                                </span>
                            </NavLink>
                        </li>
                    </div>
                    <div>
                        <li>
                            <NavLink exact activeClassName="active" to="/messages">
                                <FaEnvelope />
                                <span>
                                    Messages
                                </span>
                            </NavLink>
                        </li>
                    </div>
                    <div>
                        <li>
                            <NavLink exact activeClassName="active" to="/todo">
                                <FaTasks />
                                <span>
                                    ToDo
                                </span>
                            </NavLink>
                        </li>
                    </div>
        
                </ul>
            </div>
        </div>
    </>
}

export default SideBar;