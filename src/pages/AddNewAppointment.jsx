import { use, useEffect, useState } from "react";
import { useAppointmentDetails } from "../contexts/AppointmentDetailsContext";
import { Navigate, UNSAFE_shouldHydrateRouteLoader, useNavigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";
import { urlLocal, urlDeploy } from "../script/script1";
import { useLocation } from "react-router-dom";
import InteractiveTable from "../components/InteractiveTable";
import "../styles/AddNewAppointment.scss"


const AddNewAppointment = () => {
    const { jwt } = useJwt()
    const location = useLocation()
    const data = location.state

    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [petId, setPetId] = useState()
    const [pets, setPets] = useState([])
    //const [array, setArray] = useState(["abc", "def", "gih", "jkl", "mnnj"])
    const [selectedPetId, setSelectedPetId]=useState()
    const [description, setDescription]=useState()
    const [vets, setVets]=useState([])
    const [selectedVetId, setSelectedVetId]=useState()
    
    //
    const [ownerId, setOwnerId]=useState()

    //
    const [message, setMessage]=useState()
    
    
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        // todo: hendluj izuzetak za constraint
        let pet_id_local=selectedPetId
        let owner_id_local
        try{
            owner_id_local=location.state.ownerDetails.id
        }catch(error){
            owner_id_local=ownerId
        }
        //
        if(selectedVetId==undefined){
            setSelectedVetId("1")
        }
        
        const newAppointment={
            "id":"1980-01-01-01-01",
            "description":description,
            "completed":0,
            "price":0.00,
            "pet_id":pet_id_local,
            //"pet_id":"9",
            "vet_id":selectedVetId,
            //"vet_id":"1",
            // I ovde nastaje problem:
            // ako je pristupljeno stranici sa OwnerCard radi bez problema.
            // Ali ako se pristupi stranici sa Appointment, baca gresku da je
            // location.state.ownerDetails.id NULL.
            //"owner_id":location.state.ownerDetails.id,
            //"owner_id":"22",
            "owner_id":owner_id_local,
            "scheduled_date":date,
            "scheduled_time":time
        }
       

        // dummy data:
        /*
        const newAppointment={
            "id":"1980-01-01-01-01",
            "description":"desc. 1",
            "completed":0,
            "price":50.00,
            "pet_id":"1",
            "vet_id":"1",
            "owner_id":"1",
            "scheduled_date":"2026-04-02",
            "scheduled_time":"10:00"
        }
            */
        console.log(newAppointment)
        const url=`${urlLocal}/clinic/appt/`
        const response=await axios(url,{
            method:"POST",
            mode:"cors",
            headers:{
                'Authorization':jwt,
                'Content-Type':'application/json'
            },
            data:newAppointment
        }).then((response)=>{
            console.log(response)
            if (response.status==201){
                window.alert("Appointment scheduled.")
            }
        }).catch((error)=>{
            console.log(error)
            window.alert(error)
        })
    }

    const handleSubmitPet = async (e) => {

        // pronalazemo pet sa zadatim id-jem i otkrivamo ko je njen vlasnik:
        e.preventDefault()
        console.log(e)
        const url = `${urlLocal}/clinic/pet/${petId}`
        const response = await axios.get(url, {
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
           
            console.log(response.data)
            console.log("response.data.owner:   ")
            console.log(response.data.id)
            console.log(response.data.owner)
            
            
            setSelectedPetId(petId)
            setOwnerId(response.data.owner)
            setMessage("Pet ID: "+petId+". Owner ID: "+response.data.owner+".")
            window.alert("The Owner ID: "+response.data.owner)
          
            


          
           

            try{
            if (response.data.owner != location.state.ownerDetails.id) {
                console.log("ZIVOTINJA NE PRIPADA DATOM VLASNIKU.")
            } else {
                console.log("VLASNICKA")
                console.log(typeof(response.data.owner))
                //setOwnerId(response.data.owner.toString())
                console.log(response.data)
            }
        }catch(error){
            
            console.log("OOps! Somethin went wrong.")
            console.log(error)
            
            if(error.message=="Cannot read properties of null (reading 'ownerDetails')"){
                console.log("Ide se preko Appointment stranice.")
            }else{
                window.alert(error.message)
            }
            
            
        }
        
        }).catch((error) => {
           
            window.alert(error)
            console.log(error)
            console.log(error.message)
            if (error.status==404){
                window.alert("There is no such resource.")
            }else{
                window.alert(error)
            }
            
        })
    }

    const searchPet = async (e) => {
        e.preventDefault()
        console.log(e)
        console.log("searching pet")
    }

    const handleBtnDisplayPetsClick = (e) => {
        console.log(e)
        console.log(pets)
    }
    const getPets = async () => {
        
        try{
            const urlPets = `${urlLocal}/clinic/pet/search/?owner=${data.ownerDetails.id}`
        
        const response = await axios.get(urlPets, {
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            console.log("getting pets of the given owner...")
            console.log(response)
            console.log(response.data)
            setPets(response.data)
        }).catch((error) => {
            console.log(error)
        })

        }catch(error){
            console.log(error)
        }


        
    }
    const getVets = async () => {
        const url=`${urlLocal}/clinic/vet/`
        const response=await axios.get(url,{
            headers:{
                  'Authorization': jwt,
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            console.log(response)
            console.log(response.data)
            setVets(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {
        console.log("use effect add new appointment..")
        console.log(data)
        if (data!=null){
            console.log(data.ownerDetails.pets_count)
        }
        
        getPets()
        getVets()
        console.log(pets)
        

    }, [])

    return (<>
        <h1>Create New Appointment Page</h1>
        <h3>Creating a new appointment {data!=null ? data.ownerDetails.first_name:""} {data ? data.ownerDetails.last_name:""}</h3>
        
        {message && <h4 className="message">{message}</h4>}
        <form action="submit" onSubmit={handleSubmit} className="form-new-appointment">

 

            <div className="div-1">
<input type="date" id="inputDate" placeholder="Date: " onChange={e => {
                console.log(e.nativeEvent.target.value)
                setDate(e.nativeEvent.target.value)
                console.log("selected date: ")
                console.log(date)
            }} />
            <input type="time" id="inputTime" placeholder="Time:" onChange={e => {
                console.log(e.target.value)
                setTime(e.target.value)
                console.log(time)
            }} />
            <select name="vets" id="vets" onChange={e=>{
                console.log(e.nativeEvent.target.value)
                setSelectedVetId(e.nativeEvent.target.value)
                
            }}>
                <option value="select a vet">Select a vet:</option>
                {vets && vets.map((item)=>{
                    return(
                        
                        <option value={item.id}>{item.first_name} {item.last_name}</option>
                        
                    )
                })}

                
            
            </select>
             <button type="submit" id="btnSave">Save</button>
            </div>
            <div className="div-2">

            
            
            <textarea id="textAreaDescription" rows={10} cols={40} onChange={e=>{
                console.log(e.nativeEvent.target.value)
                setDescription(e.nativeEvent.target.value)
            }}/>
            
            </div>
           

           
            

        </form>
        {pets.length==0 &&  <form action="submit" onSubmit={handleSubmitPet}>
            <input type="text" id="inputPetId" placeholder="Enter Pet ID: " onChange={e => {
                
                setPetId(e.nativeEvent.target.value)
                
            }} />
            
            
            <button type="submit" id="btnFindPet">Find Pet And Its Owner</button>
        </form>}

       
      
        <div>
            <table>
                <thead>

                </thead>
                <tbody>

                    {pets && pets.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td className="td-table-owners-pets-index" onClick={e => { 
                                    console.log(e.nativeEvent.target.innerText)
                                    setSelectedPetId(e.nativeEvent.target.innerText)
                                     }}>{item.id}</td>
                                <td>{item.pet_name}</td>
                                <td>{item.breed}</td>
                                <td onClick={e => { console.log(e.nativeEvent.target.innerText) }}>{item.chip_no}</td>

                            </tr>
                        )
                    })}

                </tbody>
            </table>


        </div>
        <div>
            <button type="button" id="btnDisplayPets" onClick={handleBtnDisplayPetsClick}>display owner's pets</button>

        </div>
    </>);
}

export default AddNewAppointment;