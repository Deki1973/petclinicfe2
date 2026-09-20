import { useJwt } from "../contexts/JwtContext";
import { useEffect, useState } from "react";
import { urlLocal, urlDeploy } from "../script/script1.js";
import axios from "axios";
import PetList from "../components/PetList.jsx";
import PetDetails from "../components/PetDetails.jsx";
import { Link } from "react-router-dom"
import "../styles/Pet.scss"
import MessageBox from "../components/MessageBox.jsx";
import "../styles/MessageBox.scss"



const Pet = () => {
    const {jwt}=useJwt()
    const [pets, setPets]=useState([])
    const [item,setItem]=useState(null)
    const [petDetailVisible, setPetDetailVisible]=useState(false)
    const [message, setMessage]=useState()


    const handleSubmit=async (e)=>{
        e.preventDefault()
        let submitterId=e.nativeEvent.submitter.id
        console.log(submitterId)

        if (submitterId=='btnGetAll'){



        const authorization=jwt
        const content_type='application/json'
        console.log(authorization)
        console.log(content_type)

        const url=`${urlLocal}/clinic/pet/`
        const response=await axios.get(
            url,{
                headers:{
                    'Authorization': jwt,
                    'Content-Type': 'application/json',
                }
            }

        ).then((response)=>{
            console.log(response)
            const response_data=response.data
            console.log(response_data)
            let isarray=Array.isArray(response_data)
            console.log(isarray)
            let array1=Object.entries(response_data)
            console.log(array1)
            setPets(response_data)
            
            setMessage(`Records found: ${array1.length}`)
            



            response_data.forEach(element => {
            console.log(element["breed"])
            });
        }).catch((error)=>{
            console.log(error)
            window.alert(error)
        })
        }
        
        if (submitterId=='btnGetPet'){

        const petAttribute=document.getElementById("select-pet").value
        const petAttributeValue=document.getElementById("pet-attribute-value").value

        console.log(petAttribute)
        console.log(petAttributeValue)
        
      
      
        let url=`${urlLocal}/clinic/pet/search?${petAttribute}=${petAttributeValue}`
        
        console.log(url)
        const response=await axios(url,{
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': jwt,
                'Content-Type': 'application/json',
            }
        }).then((response)=>{
            console.log(response)
            const response_data=response.data;
            console.log(response_data)
            console.log("response status: ")
            console.log(response.status)
            setItem(response_data)
            let isarray=Array.isArray(response_data)
            console.log(isarray)
            console.log("response_data is array. what is its length?")
            

            let array1=Object.entries(response_data)
            console.log(response_data)
            console.log(array1.length)
            
            
            console.log(array1)
            
            if (array1.length==1){
                setItem(response_data)
                setPets(null)
            }else{
                setItem(null)
                setPets(response_data)
            }
            
            setMessage(`Records found: ${array1.length}`)
            
            
        }).catch((error)=>{
            console.log(error)
            window.alert(error)
            setMessage(error.message)
        })

    }

    }


   

     useEffect(()=>{
        console.log("use effect...")
    })
    
    return ( 
        <div className="pet-page">
        
        <h3>Search Pet Form</h3>
        {message!=null && <MessageBox prop={message}/>}
        <form action="submit" onSubmit={handleSubmit} className="pet-form">
            
            <Link to="add" className="linkTo"><button type="button" id="btn-add-new-pet" >Add New Pet</button></Link>
            <select id="select-pet" className="select-1" >
                <option value="owner">Owner ID:</option>
                <option value="id">Pet ID:</option>
                <option value="chip_no">Chip No.:</option>
                

            </select>
            
            <input type="text" id="pet-attribute-value"
            className="pet-attribute-value" 
            placeholder="Enter search parameter value here: "
            required={true}/>
            <button type="submit" id="btnGetPet">Get Pet</button><button type="submit" id="btnGetAll" formNoValidate>Get All Pets</button>
        </form>
        
        
        {pets && <PetList prop={pets}/>}
        {item && <PetDetails item={item}/>}
        </div>
     );
}
 
export default Pet;