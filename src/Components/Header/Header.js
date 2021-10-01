import "./header.css";
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { apiObject } from "../../service/API";
import { FaSignInAlt } from "react-icons/fa";
import { history } from "../../helpers/history";


const Header = () => {
    const userInfo = JSON.parse(localStorage.getItem("toDoCurrentUser"))
    const logout = () => {
        apiObject.logout();
        history.push('/login');
        window.location.reload(true);
    }
    return <>
        <div className="headerWrapper">
            <div className="headerContnet">
                <span className="appName">TO-DO APP</span>
                <div className="dropdown show">
                    <a
                        className="drop"
                        href="/#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <div className="userInfoDiv">
                            <span className="userName">{userInfo.firstName}{"  " + userInfo.lastName}</span>
                            {userInfo.gender === "male" || userInfo.gender === "Male"  ?
                                <img class="userImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="user"></img> :
                                <img class="userImg" src="https://library.kissclipart.com/20180926/sjq/kissclipart-female-logo-png-clipart-community-christian-academ-6433ddc8ddcc4c8f.png" alt="user"></img>
                            }
                        </div>
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <Link className="dropdown-item drop-down-a" to="/change-password">
                            <i className="fa fa-lock logoutIcon"></i>
                            Change Password
                        </Link>
                        <Link className="dropdown-item drop-down-a" to="/login"
                        >
                            <div onClick={logout}>
                                <li>
                                    <NavLink exact activeClassName="active" to="/login">
                                        <FaSignInAlt />
                                        <span>
                                            LogOut
                                        </span>
                                    </NavLink>
                                </li>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}



export default Header;