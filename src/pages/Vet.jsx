import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { urlLocal, urlDeploy } from "../script/script1.js";
import axios from "axios";
import VetList from "../components/VetList.jsx";
//import VetDetails from "../components/OwnerDetails.jsx";
import { Link } from "react-router-dom"
import VetDetails from "../components/VetDetails.jsx";
import "../styles/Vet.scss"


const Vet = () => {
    const { jwt } = useJwt()
    const [vets, setVets] = useState([])
    const [item, setItem] = useState(null)
    const [vetDetailVisible, setVetDetailVisible] = useState(false)
    const [message, setMessage] = useState()

    const handleSubmit = async (e) => {

        e.preventDefault()
        const submitterId = e.nativeEvent.submitter.id
        console.log(submitterId)

        if (submitterId == 'btnGetAllVets') {
            console.log(submitterId)

            const url = `${urlLocal}/clinic/vet/`



            console.log("get all vets..")
            setItem(null)

            const response = await axios.get(url, {
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                }
            }

            ).then((response) => {
                console.log(response)
                const response_data = response.data
                
                console.log(response_data)
                let isarray = Array.isArray(response_data)
                console.log(isarray)
                let array1 = Object.entries(response_data)
                console.log(array1)
                setVets(response_data)
               


            }).catch((error) => {
                console.log(error)
            })


        }

        if (submitterId == 'btnGetVet') {
            setVets(null)
            console.log("get vet by given attribute value..")
            const vetAttribute = document.getElementById("select1").value
            const vetAttributeValue = document.getElementById("vetAttributeValue").value

            console.log(vetAttribute)
            console.log(vetAttributeValue)
            const url = `${urlLocal}/clinic/vet/?${vetAttribute}=${vetAttributeValue}`
            //const url = `${urlLocal}/clinic/vet?$id='1'`

            console.log(url)
            const response = await axios.get(url, {
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log(response)
                const response_data = response.data
                console.log("response_data")
                console.log(response_data)
                if (response_data.isEmpty==true){
                    window.alert("empty")
                }
                if (response_data==null){
                    window.alert("null")
                }
                if(response_data.length==0){
                    window.alert("empty string")
                    setMessage("Nothing found.")
                }else{
                    setMessage(null)
                }
                console.log("resposn_data[0]")
                console.log(response_data[0])

                setItem(response_data[0])
                console.log(item)


            }).catch((error) => {
                window.alert(error.message)
                console.log(error)
                setMessage(error.message)
               
            })
        }





    }

    useEffect(() => {
        console.log("use effect...")



    })
    return (
        <div className="vet-page" >
            <h3>Search The Employees</h3>
            <form action="submit" onSubmit={handleSubmit} className="form-search-vet">

                <Link to="add" className="linkTo"><button type="button">Add New Vet</button></Link>
                <select id="select1" className="select1">
                    <option value="id">Vet ID: </option>
                    <option value="lname">Last Name: </option>
                    <option value="phone">Phone: </option>
                    <option value="email">Email: </option>
                    <option value="licence_no">Licence: </option>
                </select>
                <input type="text" id="vetAttributeValue"
                    className="vetAttributeValue" placeholder="Enter search parameter value here: "
                    required="true"
                />

                <button type="submit" id="btnGetVet">Get Vet</button>
                <button type="submit" id="btnGetAllVets" formNoValidate>Get All Vets</button>


            </form>
            {message && <h3>{message}</h3>}


            {vets && <VetList prop={vets} />}
            {item && <VetDetails item={item} />}


        </div>
    );
}

export default Vet;