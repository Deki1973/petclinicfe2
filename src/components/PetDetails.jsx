import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { Navigate, useNavigate, Link } from "react-router-dom"
import {usePetDetails} from "../contexts/PetDetailsContext";
import "../styles/PetDetails.scss"


const PetDetails = (prop) => {
    const {jwt}=useJwt()
    const [message,setMessage]=useState()
    const [petId, setPetId]=useState()
    const [breed, setBreed]=useState()
    const [petName, setPetName]=useState()
    const [chipNo, setChipNo]=useState()
    const [owner,setOwner]=useState()
    
    const navigate = useNavigate()
    const{petDetails,changePetDetails}=usePetDetails()

     const handleButtonEditClick=(e)=>{
        e.preventDefault()
        console.log("button edit owner clicked...")
        console.log("pet id")
        console.log(petId)
        navigate('/pet/update')
     }
     
    useEffect(()=>{
       console.log(prop.item)
       let pet=prop.item[0]
       console.log(pet)
       changePetDetails(pet)
       setPetId(pet.id)
       setBreed(pet.breed)
       setPetName(pet.pet_name)
       setChipNo(pet.chip_no)
       setOwner(pet.owner)
    })

   if(chipNo==null){
      return(
            <>
            <h3>Nothing found for given parameter.</h3>
            </>
        )
    }
    return ( 
        <div className="pet-details">
        

         <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Pet Details</th>
                        </tr>
                        
                    </thead>

                    <tbody className="tableBody">
                        <tr><td className="left-side">Pet ID: </td><td className="right-side">{petId}</td></tr>
                        <tr><td className="left-side">Breed: </td><td className="right-side">{breed} </td></tr>
                        <tr><td className="left-side">Name: </td><td className="right-side">{petName}</td></tr>
                        <tr><td className="left-side">Chip: </td><td className="right-side">{chipNo}</td></tr>
                        <tr><td className="left-side">Owner: </td><td className="right-side">{owner}</td></tr>

                    </tbody>
                </table>
                
            </div>
        <button type="button" id="btnEditPet"onClick={handleButtonEditClick}>Update</button>
        
        </div>
     );
}
 
export default PetDetails;