import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { Navigate, useNavigate, Link } from "react-router-dom"
import { useOwnerDetails } from "../contexts/OwnerDetailsContext";
import axios from "axios";
import { urlDeploy, urlLocal } from "../script/script1";
import "../styles/DeleteOwner.scss"

const DeleteOwner = () => {
    const {jwt}=useJwt()
    const [ownerId, setOwnerId]=useState()
    const [firstName,setFirstName]=useState()
    const [lastName,setLastName]=useState()
    const [message, setMessage]=useState()
    const navigate = useNavigate()
    const{ownerDetails,changeOwnerDetails}=useOwnerDetails()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(e)
        console.log(e.nativeEvent.target[0].value)
        let inputIdVal=e.nativeEvent.target[0].value
        let inputFirstNameVal=e.nativeEvent.target[1].value
        let inputLastNameVal=e.nativeEvent.target[2].value
        console.log(inputIdVal)
        console.log(inputFirstNameVal)
        console.log(inputLastNameVal)
        if (
            inputIdVal==ownerId && 
            inputFirstNameVal==firstName &&
            inputLastNameVal==lastName
        ){
            console.log("run delete procedure..")
            const url=`${urlLocal}/clinic/owner/${ownerDetails.id}`
            //const url=`${urlDeploy}/clinic/owner/${ownerDetails.id}`
            const response=await axios.delete(
                url,{
                    headers:{
                        'Authorization':jwt,
                        'Content-Type':'application/json'
                    }
                }


            ).then((response)=>{
                console.log(response)
                console.log(response.status)
                console.log(response.statusText)
                console.log(response.request.status)
                  
                if (response.status==204){
                    
                    setMessage(`The owner ID ${ownerId} has been deleted.`)
                }
                
            }).catch((error)=>{
                console.log(error)
                 
                if (axios.isAxiosError(error)) {
                    console.error(error.response?.data)
                    console.log(error.response.status)
                    //setMessage(error.message)
                    //console.log(error.response?.data)
                    if (error.response?.status == 404) {
                        setMessage("Error 404: There is no such owner.")
                    } else {
                        setMessage(error.message)
                    }
                

  }
            })
        }else{
            console.log("wrong input values")
            setMessage("You have entered wrong values.")
        }
       
    }

     useEffect(() => {
        setOwnerId(ownerDetails.id)
        setFirstName(ownerDetails.first_name)
        setLastName(ownerDetails.last_name)
    },[])   // ovde mora ,[] 

    return ( 
        <div className="delete-owner-page">
        <h2 className="h2-delete-owner">WARNING: This operation cannot be undone!</h2>
        <h2>You are trying to delete owner ID {ownerId}, {firstName} {lastName}.</h2>
        <h2>If yes, type owner's ID, first and last name and click ENTER.</h2>
        {message && <h3>{message}</h3>}
        
        <form action="submit" onSubmit={handleSubmit} className="delete-owner-form">
        <input type="text" placeholder="Owner's ID: " id="inputOwnerId"/>
        <input type="text" placeholder="First Name: " id="inputFirstName"/>
        <input type="text" placeholder="Last Name: " id="inputLastName"/>
        <button type="submit" id="btnSubmit">Submit</button>
        </form>
        </div>
     );
}
 
export default DeleteOwner;