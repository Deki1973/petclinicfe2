import { useEffect, useState } from "react";

const MessageBar = (prop) => {
    const [message, setMessage]=useState()
    const [id,setId]=useState()
    const [name,setName]=useState()
    const [breed,setBreed]=useState()
    const [owner,setOwner]=useState()

    useEffect(()=>{
        console.log("this is a MessageBar use effect.")
        console.log(prop)
        console.log(prop.prop)
        setId(prop.prop.id)
        setName(prop.prop.pet_name)
        setBreed(prop.prop.breed)
        setOwner(prop.prop.owner)
    })
    return ( 
        <>
        <h3>Message Box</h3>
        <div>
            <ul>
                <li>{name}</li>
                <li>{id}</li>
                <li>{breed}</li>
                <li>{owner}</li>
            </ul>
          
          
        </div>
        </>
     );
}
 
export default MessageBar;