import { useEffect, useState } from "react";
import { useOwnerDetails } from "../contexts/OwnerDetailsContext";
import { usePetDetails } from "../contexts/PetDetailsContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";
import { urlLocal, urlDeploy } from "../script/script1";
import PetDetails from "../components/PetDetails";
import "../styles/UpdatePet.scss"


const UpdatePet = () => {
    let { id } = useParams()

    const { jwt } = useJwt()
    const { ownerDetails, changeOwnerDetails } = useOwnerDetails()
    const { petDetails, changePetDetails } = usePetDetails()

    const [petId, setPetId] = useState()
    const [petName, setPetName] = useState()
    const [breed, setBreed] = useState()
    const [chipNo, setChipNo] = useState()
    const [owner, setOwner] = useState()

    const [petOldName, setPetOldName] = useState()
    const [petOldChipNo, setPetOldChipNo] = useState()
    const [petOldBreed, setPetOldBreed] = useState()
    const [petOldOwner, setPetOldOwner] = useState()

    const navigate = useNavigate()

    //
    const [message, setMessage]=useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)

        const submitterId = e.nativeEvent.submitter.id
        console.log(submitterId)

        const updatedPet = {
            "id": petDetails.id,
            "pet_name": petName,
            "breed": breed,
            "chip_no": chipNo,
            "owner": owner
        }

        if (submitterId == 'btnSave') {
            console.log('btnSave')
            //const url = `${urlLocal}/clinic/pet/${petDetails.id}`
            const url = `${urlLocal}/clinic/pet/${petDetails.id}`

            const response = await axios.put(
                url,
                updatedPet, {
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                }
            }
            ).then((response) => {
                console.log(response)
                if (response.status==200){
                    setMessage("Pet data updated sucessfuly.")
                }
            }).catch((error) => {
                console.log(error)
                setMessage(null)
                window.alert(error)
               
            })


        }
        if (submitterId == 'btnCancel') {
            console.log('btnCancel')
            navigate("/pet/")
        }
        if (submitterId === 'btnDelete') {
            console.log('btnDelete')
            navigate("/pet/delete")
        }

    }

    useEffect(() => {
        setPetId(petDetails.id)
        setPetName(petDetails.pet_name)
        setBreed(petDetails.breed)
        setChipNo(petDetails.chip_no)
        setOwner(petDetails.owner)

    }, [])// ovde mora ,[] inace text boxovi nece hteti da ti primaju inupute.
    useEffect(() => {
        setPetOldName(petDetails.pet_name)
        setPetOldBreed(petDetails.breed)
        setPetOldChipNo(petDetails.chip_no)
        setPetOldOwner(petDetails.owner)
    }, [])// izvrsi samo jednom
    return (
        < div className="page-update-pet">

        {message && <h4 className="message">{message}</h4>}


            <form action="submit" onSubmit={handleSubmit} className="form-update-pet">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Update Pet Details</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td className="left-side">Pet ID: </td>
                            <td className="right-side">{petId}</td>
                        </tr>
                        <tr>
                            <td className="left-side">
                                <label>Breed: </label>
                            </td>
                            <td className="right-side"><input type="text" placeholder="Breed " value={breed} onChange={e => {
                                console.log(e.target.value)
                                setBreed(e.target.value)
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="left-side">
                                <label>Name: </label>
                            </td>
                            <td className="right-side">
                                <input type="text" placeholder="Name " value={petName} onChange={e => {
                                    setPetName(e.target.value)
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td className="left-side">
                                <label>Chip No:</label>
                            </td>
                            <td className="right-side">
                                <input type="text" placeholder="Chip No. " value={chipNo} onChange={e => {
                                    setChipNo(e.target.value)
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td className="left-side">
                                <label>Owner ID: </label>
                            </td>
                            <td className="right-side">
                                <input type="text" placeholder="Owner ID " value={owner} onChange={e => {
                                    setOwner(e.target.value)
                                }} />
                            </td>

                        </tr>

                    </tbody>
                </table>
               
                <div className="buttons-update-pet">
                    <button type="submit" id="btnSave">Save</button>
                    <button type="submit" id="btnCancel">Back</button>
                    <button type="submit" id="btnDelete">Delete</button>

                </div>


            </form>


        </div>
    );
}

export default UpdatePet;