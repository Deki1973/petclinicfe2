import { useEffect, useState } from "react";
import VetCard from "./VetCard";

const VetList = (prop) => {
    const [vetsArray, setVetsArray]=useState([])

    useEffect(()=>{
      
        console.log("recived prop")
        console.log(prop)
        console.log(Array.isArray(prop))
        let array1=Object.entries(prop)
        console.log(array1)
        let array2=array1[0][1]
        console.log(array2)
        setVetsArray(array2)
    })


    return ( 
        <div className="vet-list">
        
        {vetsArray && vetsArray.map((vet)=>{
            return(
                <div key={vet.id}>
                    <VetCard prop={vet}/>
                </div>
            )

        })}
        </div>
     );
}
 
export default VetList;