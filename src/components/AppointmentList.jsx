import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import OwnerCard from "./OwnerCard";

const AppointmentList = (prop, prop2, prop3, prop4) => {
    const[appointmentsArray, setAppointmentsArray]=useState([])
    const [isCompleted, setIsCompleted]=useState()
    const [attributue1, setAttribute1]=useState()
    const [attributueVal1, setAttributeVal1]=useState()
    const [isFilterOn, setIsFilterOn]=useState()
   
    

    //console.log(sortedArray)
    let filteredArray
    if (isFilterOn==null){
        filteredArray=appointmentsArray
    }else{
        filteredArray = isFilterOn ? 
        appointmentsArray.filter((appointment)=>appointment.completed==true) : 
        appointmentsArray.filter((appointment)=>appointment.completed==false)
    }
    
    
    useEffect(()=>{
        console.log("recived prop")
        console.log(prop)
        console.log(Array.isArray(prop))
        let array1=Object.entries(prop)
        console.log(array1)
        let array2=array1[0][1]
        console.log(array2)
        setAppointmentsArray(array2)
        console.log("prop2..")
        console.log(prop.prop2)
        
        setIsCompleted(prop.prop2)
        console.log("prop2... isCompelted...")
        console.log(isCompleted)
        console.log("prop3..")
        console.log(prop.prop3)
        console.log("prop4..")
        console.log(prop.prop4)
        setAttribute1(prop.prop3)
        setIsFilterOn(prop.prop3)
        setAttributeVal1(prop.prop4)

        console.log("test array sortin...")
        const testArray1=[
            {id:"1", name:"petar", age:31},
            {id:"2", name:"jovan", age:27},
            {id:"3", name:"dusan", age:35}
        ]
        const sortedTestArray1=[...testArray1].sort((a,b)=>a.age-b.age)
        console.log(sortedTestArray1)

        console.log("test array2 ..")
        const testArray2=array2
        console.log(testArray2)
        console.log("sortin test array2..")
        const sortedTestArray2=[...testArray2].sort((a,b)=>{
            const a1=new Date(a.scheduled_date)
            console.log("a1 ")
            console.log(a1)
            const b1=new Date(b.scheduled_date)
            console.log("b1")
            console.log(b1)
            return b1-a1
        })
            
        console.log("sorted test array 2..")
        console.log(sortedTestArray2)

    })
    
    
    return ( 
        

        <>
        
        <div>
            
            {filteredArray && filteredArray.map((appointment)=>{
                return(
                    <div key={appointment.id}>
                        <AppointmentCard prop={appointment}/>
                    </div>
                )
            })}
        </div>


        </>
     );
}
 
export default AppointmentList;