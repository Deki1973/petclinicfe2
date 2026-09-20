import {createContext, useContext, useEffect, useState } from "react"

const VetDetailsContext=createContext(null)

export const useVetDetails =()=>{
    return useContext(VetDetailsContext)
}

export const VetDetailsProvider=({children})=>{
    const [vetDetails, setVetDetails]=useState(null)

    const changeVetDetails=(vetDetailsData)=>{
        setVetDetails(vetDetailsData)
        console.log("vet context...")
        console.log(vetDetailsData)
        localStorage.setItem("vetDetails",vetDetailsData)
    }
    useEffect(()=>{
        const currentVet=localStorage.getItem("vetDetails")
    },[]);

    return(
        <VetDetailsContext.Provider value={{vetDetails,changeVetDetails}}>
            {children}
        </VetDetailsContext.Provider>
    );
}