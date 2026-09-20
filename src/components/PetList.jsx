import { useEffect, useState } from "react";
import PetCard from "./PetCard";

const PetList = (prop) => {
    const [petsArray, setPetsArray]=useState([])

    useEffect(()=>{
        console.log("prop..")
        console.log(prop)
        console.log(Array.isArray(prop))
        let array1=Object.entries(prop)
        let array2=array1[0][1]
        console.log("array2..")
        console.log(array2)
        setPetsArray(array2)
    })
    return ( 
        <>
     
        <div>
            {petsArray && petsArray.map((pet)=>{
                return(
                    <div key={pet.id}>
                        <PetCard prop={pet}/>
                    </div>

                )
            })}
        </div>
        </>
     );
}
 
export default PetList;