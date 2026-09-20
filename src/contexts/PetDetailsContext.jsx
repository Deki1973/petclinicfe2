import { createContext,useContext,useEffect,useState } from "react";

const PetDetailsContext=createContext(null)

export const usePetDetails =()=>{
    return useContext(PetDetailsContext)
}

export const PetDetailsProvider=({children})=>{

    const [petDetails,setPetDetails]=useState(null)
    

    const changePetDetails=(petDetailsData)=>{
        setPetDetails(petDetailsData)
        console.log("context...")
        console.log(petDetailsData)
        localStorage.setItem("petDetails",petDetailsData)
        


    }
    useEffect(()=>{
        const currentPet=localStorage.getItem("petDetails")
    },[]);
    return(
        <PetDetailsContext.Provider value={{petDetails,changePetDetails}}>
            {children}
        </PetDetailsContext.Provider>
    );



}

