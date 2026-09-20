import { createContext,useContext,useEffect,useState } from "react";

const OwnerDetailsContext=createContext(null)

export const useOwnerDetails =()=>{
    return useContext(OwnerDetailsContext)
}

export const OwnerDetailsProvider=({children})=>{

    const [ownerDetails,setOwnerDetails]=useState(null)
    

    const changeOwnerDetails=(ownerDetailsData)=>{
        setOwnerDetails(ownerDetailsData)
        console.log("context...")
        console.log(ownerDetailsData)
        localStorage.setItem("ownerDetails",ownerDetailsData)
        


    }
    useEffect(()=>{
        const currentOwner=localStorage.getItem("ownerDetails")
    },[]);
    return(
        <OwnerDetailsContext.Provider value={{ownerDetails,changeOwnerDetails}}>
            {children}
        </OwnerDetailsContext.Provider>
    );



}

