import { useEffect, useState } from "react";
import OwnerCard from "./OwnerCard";


const OwnerList = (prop) => {
    const[ownersArray,setOwnersArray]=useState([])
   

    useEffect(()=>{
        console.log("recived prop")
        console.log(prop)
        console.log(Array.isArray(prop))
        let array1=Object.entries(prop)
        console.log(array1)
        let array2=array1[0][1]
        console.log(array2)
        setOwnersArray(array2)
    
        


    })

    return ( 
        
        
        <div className="ownerList">

          {ownersArray && ownersArray.map((owner)=>{
            return(
                <div key={owner.id}>
                    <OwnerCard prop={owner}/>
                </div>

            )
          })}  
          
        </div>
        
     );
}
 
export default OwnerList;