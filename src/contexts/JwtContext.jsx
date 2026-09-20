import { createContext, useContext, useEffect, useState } from "react";
import { urlDeploy, urlLocal } from "../script/script1";

const JwtContext = createContext(null);

export const useJwt = () => {
    return useContext(JwtContext)
}

export const JwtProvider = ({ children }) => {
    const [jwt, setJwt] = useState()


    const getJwt = async (userName, passWord) => {
        //const userName="nurse11"
        //const userName="admin"
        //const passWord="privremena1."
        console.log(userName + "|" + passWord)
        //const url=`http://localhost:8000/auth/jwt/create/`
        const url=`${urlLocal}/auth/jwt/create/`

        const response = await fetch(url,
            {
                method: "POST",
                mode: "cors",
                headers: {

                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    username: userName,
                    password: passWord
                })


            }
        ).catch((error)=>{
            window.alert(error)
        })
        console.log(response)
        const responseObj = await response.json()
        console.log(responseObj)
        console.log("access token: ")
        console.log(responseObj["access"])
        console.log("refresh token: ")
        console.log(responseObj["refresh"])
        setJwt("JWT " + responseObj["access"])
       



    }

    const changeJwt = (userName, passWord) => {
        getJwt(userName, passWord)
    }

    const signout = () => {
        setJwt(null)
    }

    useEffect(() => {

    }, [])

    return (
        <JwtContext.Provider value={{ changeJwt, jwt, signout }}>
            {children}
        </JwtContext.Provider>
    )
}