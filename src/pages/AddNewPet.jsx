import { useEffect, useState } from "react"
import { useJwt } from "../contexts/JwtContext"
import axios from "axios"
import { Navigate, useNavigate, Link } from "react-router-dom"
import { urlLocal, urlDeploy } from "../script/script1"
import MessageBar from "../components/MessageBar"
import "../styles/AddNewPet.scss"



const AddNewPet = () => {

    const { jwt } = useJwt()
    const [petId, setPetId] = useState()
    const [petName, setPetName] = useState()
    const [breed, setBreed] = useState()
    const [chipNo, setChipNo] = useState()
    const [owner, setOwner] = useState()
    const [newPetData, setNewPetData] = useState()
    const [message, setMessage] = useState()
    const [givenPetId, setGivenPetId]=useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)

        const submitterId = e.nativeEvent.submitter.id

        if (submitterId == 'btnCancel') {
            window.alert("todo: go to pet page")
        }
        if (submitterId == 'btnSave') {
            window.alert('save new pet')
        }

        const newPet = {
            "id": petId,
            "pet_name": petName,
            "breed": breed,
            "chip_no": chipNo,
            "owner": owner
        }
        //const url=`${urlLocal}/clinic/pet/`
        const url = `${urlLocal}/clinic/pet/`
        const response = await axios.post(url,
            newPet, {
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json'
            }
        }
        ).then((response) => {
            console.log(response)
            setNewPetData(response.data)
            setMessage(`A new pet successfully added.`)
            setGivenPetId(response.data.id)

        }).catch((error) => {
            console.log(error)
            setMessage(`Oops! Somethin' went wrong: ${error}`)
        })

    }

    useEffect(() => {
        console.log("use effect...")
    }, [])




    return (


        <div className="page-add-new-pet">

            <form action="submit" onSubmit={handleSubmit} className="form-add-new-pet">
                {message && <h2>{message}</h2>}
                <table>
                    <thead>
                        <tr>
                            <th colSpan="1">Add New Pet</th>
                        </tr>
                    </thead>
                    <tbody>



                        <tr>
                            <td>
                                <input type="text" placeholder="Pet ID (Automatically added)" id="inputPetId" readOnly value={givenPetId} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="Pet Name " id="inputPetName" onChange={e => {
                                    setPetName(e.target.value)
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="Breed " id="inputBreed" onChange={e => {
                                    setBreed(e.target.value)
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="Chip No. " id="inputChipNo" onChange={e => {
                                    setChipNo(e.target.value)
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="Owner ID " id="inputOwnerId" onChange={e => {
                                    setOwner(e.target.value)
                                }} />
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="form-buttons">
                    <button type="submit" id="btnSave">Save</button>
                    <button type="submit" id="btnCancel">Back</button>
                </div>


            </form>

            

        </div>

    );
}

export default AddNewPet;