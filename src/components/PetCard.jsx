import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom"
import { usePetDetails } from "../contexts/PetDetailsContext";
import { useJwt } from "../contexts/JwtContext";
import "../styles/PetDetails.scss"

const PetCard = (prop) => {
    const [petData, setPetData] = useState()
    const { jwt } = useJwt()
    const [message, setMessage] = useState()
    const { petDetails, changePetDetails } = usePetDetails()

    const navigate = useNavigate()

    const handleButtonEditClick = (e) => {
        e.preventDefault()
        console.log("button edit owner clicked...")
        console.log("pet id")
        console.log(petDetails.id)
        changePetDetails(prop.prop) // neophodno da bi se dobio id prilikom klika na Update

        navigate('/pet/update') // id se saopstava preko PetDetailsContext.
    }

    useEffect(() => {
        setPetData(prop.prop)   // neophodno za prikaz 
        changePetDetails(prop.prop) // neophodno da bi se dobio id prilikom klika na Update
    }, [])
    return (
        <div className="pet-card">


            <div>


                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Pet Details</th>
                        </tr>

                    </thead>

                    <tbody className="tableBody">
                        <tr><td className="left-side">Pet ID: </td><td className="right-side">{petData && petData.id}</td></tr>
                        <tr><td className="left-side">Breed: </td><td className="right-side">{petData && petData.breed} </td></tr>
                        <tr><td className="left-side">Name: </td><td className="right-side">{petData && petData.pet_name}</td></tr>
                        <tr><td className="left-side">Chip: </td><td className="right-side">{petData && petData.chip_no}</td></tr>
                        <tr><td className="left-side">Owner: </td><td className="right-side">{petData && petData.owner}</td></tr>

                    </tbody>
                </table>
                <button type="button" id="btnEditPet" onClick={handleButtonEditClick}>Update</button>
            </div>
        </div>
    );
}

export default PetCard;