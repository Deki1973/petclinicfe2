import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { Navigate, useNavigate, Link } from "react-router-dom"
import { usePetDetails } from "../contexts/PetDetailsContext"
import axios from "axios";
import { urlDeploy, urlLocal } from "../script/script1";
import "../styles/DeletePet.scss"

const DeletePet = () => {
    const {jwt}=useJwt()
    const navigate = useNavigate()
    const{petDetails,changePetDetails}=usePetDetails()

    const [petId, setPetId]=useState()
    const [chipNo,setChipNo]=useState()
    const [petName, setPetName]=useState()
    const [breed, setBreed]=useState()
    const [message, setMessage]=useState()

    const handleSubmit = async (e)=>{
        
        e.preventDefault()
       
        const submitterId=e.nativeEvent.submitter.id
        console.log(submitterId)
        if (submitterId=="btn-cancel"){
            navigate("/pet/")
        }
        
        let inputPetIdVal=e.nativeEvent.target[0].value
        let inputPetNameVal=e.nativeEvent.target[1].value
        let inputBreedVal=e.nativeEvent.target[2].value
        let inputChipNoVal=e.nativeEvent.target[3].value
        console.log("petID")
        console.log(petId)
        console.log(inputPetIdVal)
        console.log(inputPetNameVal)
        console.log(inputBreedVal)
        console.log(inputChipNoVal)

        if(
            inputPetIdVal==petId &&
            inputPetNameVal==petName &&
            inputBreedVal==breed &&
            inputChipNoVal==chipNo
        ){
            console.log("run delete method...")
            
            //const url=`${urlLocal}/clinic/pet/${petDetails.id}`
            const url=`${urlLocal}/clinic/pet/${petDetails.id}`

            const response=await axios.delete(
                url,{
                    headers:{
                        'Authorization':jwt,
                        'Content-Type':'application/json'
                    }
                }

            ).then((response)=>{
                console.log(response)
                if (response.status==204){
                    
                    setMessage("The pet ID "+petId+" has been deleted.")
                }
            }).catch((error)=>{
                console.log(error)
                

                if (axios.isAxiosError(error)) {
                console.error(error.response?.data)
                console.log(error.response.status)
               
                if(error.response?.status==404){
                    setMessage("Error 404: There is no such pet.")
                }else{
                    setMessage(error.message)
                }
            }


            })
        }else{
            
            setMessage("You have entered wrong values.")

        }
   
    }
     
     useEffect(() => {
        setPetId(petDetails.id)
        setChipNo(petDetails.chip_no)
        setPetName(petDetails.pet_name)
        setBreed(petDetails.breed)
    },[])   // ovde mora ,[] 

    return ( 
        <div className="page-pet-delete">
            <h2 className="h2-pet-delete">WARNING: This operation cannot be undone!</h2>
            <h3>If you want to continue, retype pet's ID, name, breed and chip number:</h3>
            {message && <h3>{message}</h3>}
            <ul className="ul-pet-delete">
                <li>{petId}</li>
                <li>{petName}</li>
                <li>{breed}</li>
                <li>{chipNo}</li>
            </ul>
        <form action="submit" onSubmit={handleSubmit} className="form-pet-delete">
            <input type="text" placeholder="Confirm Pet ID: " id="inputPetId"/>
            <input type="text" placeholder="Confirm Pet Name: " id="inputPetName"/>
            <input type="text" placeholder="Confirm Pet Breed: " id="inputPetBreed"/>
            <input type="text" placeholder="Confirm Chip Number: " id="inputChipNo"/>
            <button type="submit" id="btn-submit">Submit</button>
            <button type="submit" id="btn-cancel">Cancel</button>
        </form>
        </div>
     );
}
 
export default DeletePet;