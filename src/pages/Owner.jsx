import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { urlLocal, urlDeploy } from "../script/script1.js";
import axios from "axios";
import OwnerList from "../components/OwnerList.jsx";
import OwnerDetails from "../components/OwnerDetails.jsx";
import { Link } from "react-router-dom"
import '../styles/Owner.scss'
import MessageBox from "../components/MessageBox.jsx";
import '../styles/MessageBox.scss'




const Owner = () => {

    const { jwt } = useJwt()
    const [owners, setOwners] = useState([])
    const [item, setItem] = useState(null)
    const [ownerDetailVisible, setOwnerDetailVisible] = useState(false)
    const [message, setMessage]=useState()



    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e.nativeEvent.submitter.id)
        const submitterId = e.nativeEvent.submitter.id

        if (submitterId == "btnGetAll") {
            const authorization = jwt
            const content_type = 'application/json'
            console.log(authorization)
            console.log(content_type)
            const response = await axios(`${urlLocal}/clinic/owner/`, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json',
                }
            }).catch(error=>{
                window.alert(error)
                setMessage(error)
            })
            console.log(response)
            const response_data = await response.data
            console.log(response_data)
            let isarray = Array.isArray(response_data)
            console.log(isarray)
            let array1 = Object.entries(response_data)
            console.log(array1)
            setOwners(response_data)
            console.log(response_data)
            setItem(null)
            
            setMessage(`Records found: ${array1.length}`)
            


            response_data.forEach(element => {
                console.log(element["city"])
            });

        }

        if (submitterId == 'btnGetOwner') {


            const ownerAttribute = document.getElementById("select1").value
            const ownerAttributeValue = document.getElementById("ownerAttributeValue").value
            console.log(ownerAttribute)
            console.log(ownerAttributeValue)

            var url = "";

            //url=`${urlLocal}/clinic/owner/?${ownerAttribute}=${ownerAttributeValue}`
            //window.log(url)
            
            if (ownerAttribute === "id") {
                window.alert(ownerAttributeValue)       
                url = `${urlLocal}/clinic/owner/?id=${ownerAttributeValue}`
                //url = `${urlLocal}/clinic/owner/2`
            }
            if (ownerAttribute == "email" || ownerAttribute == "fname" || ownerAttribute == "lname") {
                url = `${urlLocal}/clinic/owner/?${ownerAttribute}=${ownerAttributeValue}`
            }
            if (ownerAttribute == "phone") {
                url = `${urlLocal}/clinic/owner/?phone=%2B` + ownerAttributeValue.slice(1)
            }
            

            //const url=`${urlDeploy}/clinic/owner?phone=+123456789991`
            //const url=`${urlDeploy}/clinic/owner?email=konidek37@gmail.com`

            console.log(url)
            const response = await axios(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {

                console.log("response: ")
                console.log(response)
                console.log("respnse data:")
                console.log(response.data)
                console.log("respnse status:")
                console.log(response.status)
                const data = response.data;
                
                setItem(data);
                setOwnerDetailVisible(true)
                setOwners(null)
                
                setMessage(`Records found: ${response.data.length}`)
                
                

            }).catch((error) => {
                
                window.alert(error)
                setMessage(error.message)

            })

        }



    }



    useEffect(() => {
        console.log("use effect...")
    })
    return (
        <div className="page-owner">
            <h3>Search Pet Owners:</h3>
            {message && <MessageBox prop={message}/>}
            

            <form action="submit" onSubmit={handleSubmit} className="ownerForm">
                <Link to="add" className="linkTo" id="lnkAddNewOwner"><button type="button" id="btnAddNewOwner">Add New Owner</button></Link>
                
                <select id="select1" className="select1">
                    <option value="id">Owner ID: </option>
                    <option value="fname">First Name: </option>
                    <option value="lname">Last Name: </option>
                    <option value="phone">Phone: </option>
                    <option value="email">Email: </option>
                </select>
                <input type="text" id="ownerAttributeValue"
                    className="ownerAttributeValue" placeholder="Enter search parameter value here: "
                    required={true} />
                <button type="submit" id="btnGetOwner">Get Owner</button> <button type="submit" id="btnGetAll" formNoValidate>Get all</button>

            </form>



            {owners && <OwnerList prop={owners} />}

            {item && <OwnerDetails item={item} />}
        </div>
    );
}

export default Owner;