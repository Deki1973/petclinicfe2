import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { Link, NavLink, UNSAFE_shouldHydrateRouteLoader } from "react-router-dom"
import '../styles/NavBar.scss'
import { urlDeploy, urlLocal } from "../script/script1";


const NavBar = () => {

    const { jwt, changeJwt, signout } = useJwt()

    //const [userName, setUserName]=useState("nurse11")
    //const [passWord, setPassWord]=useState("privremena1.")
    const [userName, setUserName] = useState()
    const [passWord, setPassWord] = useState()
    const [userData, setUserData] = useState()


    const handleSignInClick = () => {
        changeJwt(userName, passWord)

    }

    const fetchUserData = async (e) => {

        //https://stackoverflow.com/questions/45256329/how-to-get-the-response-data-from-promise-in-react
        const url = `${urlLocal}/auth/users/me/`
        //const url=`${urlDeploy}/auth/users/me`
        const resposne = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const jsonData = response.json()
            console.log(jsonData)
            return jsonData



        }).then((data) => {
            const items = data;
            console.log(items)
            setUserData(items)
            console.log(items.id)
            console.log(items.email)
            console.log(items.username)

        }).catch((error) => {
            console.log(error)
            window.alert(error)
            
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        
        const submitterId=e.nativeEvent.submitter.id
        if (submitterId=='btnSignIn'){
            console.log("button sign in")
            changeJwt(userName, passWord)
        }
        
    }


    useEffect(() => {
        console.log("use effect...")
        if (jwt != null) {
            fetchUserData()
        }
        if (jwt == null) {
            setUserData(null)
        }


    }, [jwt])
    

    return (
        <div className="navBar">
            <div className="p-jwt">{jwt != null ? <p>{jwt}</p> : <p></p>}</div>




            <div>
                <div className="sign-in-form">
                    <form action="submit" onSubmit={handleSubmit} className="sign-in-form">
                        <input type="text" id="input-username-2" placeholder="Username:" onChange={e=>{
                            console.log(e.nativeEvent.target.value)
                            setUserName(e.nativeEvent.target.value)
                        }}/>
                        <input type="password" id="input-password-2" placeholder="Password: " onChange={e=>{
                            console.log(e.nativeEvent.target.value)
                            setPassWord(e.nativeEvent.target.value)
                        }}/>
                        <div className="sign-in-form-buttons">
                            {jwt != null ? <button onClick={signout} className="button-sign-out">You are logged in {userData && userData.username}</button> : <button onClick={handleSignInClick} className="button-sign-in">Click here to sign in</button>}
                        </div>
                    </form>
                </div>
                <div className="navBarLinks">

                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : "inactive")}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/owner"
                        className={({ isActive }) => (isActive ? "active" : "inactive")}
                    >
                        Owner
                    </NavLink>
                    <NavLink
                        to="/pet"
                        className={({ isActive }) => (isActive ? "active" : "inactive")}
                    >
                        Pet
                    </NavLink>
                    <NavLink
                        to="/vet"
                        className={({ isActive }) => (isActive ? "active" : "inactive")}
                    >
                        Vet
                    </NavLink>
                    <NavLink
                        to="/appt"
                        className={({ isActive }) => (isActive ? "active" : "inactive")}
                    >
                        Appointment
                    </NavLink>


                </div>
            </div>
        </div>
    );
}

export default NavBar