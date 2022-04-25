import "./user-profile.css"

const UserProfile = () => {
    const userInfo = JSON.parse(localStorage.getItem("toDoCurrentUser"))

    return <>
        <div className="userProfileWrapper">
            <div className="userImgName">
                {userInfo.gender === "male" || userInfo.gender === "Male" ?
                    <img className="userProfileImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="user"></img> :
                    <img className="userProfileImg" src="https://library.kissclipart.com/20180926/sjq/kissclipart-female-logo-png-clipart-community-christian-academ-6433ddc8ddcc4c8f.png" alt="user"></img>
                }
                <div className="userNameProfilePage">{userInfo.firstName}{"  " + userInfo.lastName}</div>
            </div>
        </div>
            <div className="userProfileContent"></div>
    </>
}

export default UserProfile;