import React,{useEffect, useState} from 'react'


const InteractiveTable = (prop) => {
    const [data, setData]=useState()
    const [array1, setArray1]=useState([])
    //const [sortConfig, setSortConfig]=useState({key:", direction: "})

    /*
    const sortData=(key)=>{
        // Logic to sort data based on key and update 'data' state
    }*/

    const handleOnCLick=(e)=>{
        console.log(e)
    }
    useEffect(()=>{
        console.log("intereactive table data..")
        console.log("prop: ")
        console.log(prop.prop)
        setData(prop.prop)
      
       
    
      

       
    },[prop.prop])
    return ( 
        <>
        <h1>Interactive Table Componenet</h1>
        <table>
            <thead>
                <th>
                    <tr>Interactive Table Component</tr>
                </th>
                </thead>
            <tbody>
                {data && data.map((item)=>{
                    return(
                        <tr>
                            <td id='petId' onClick={e=>{console.log(e.target.innerText)}}>
                            {item.id}
                            </td>
                            <td>{item.pet_name}</td>
                            <td>
                                {item.breed}
                            </td>
                            <td>
                                {item.chip_no}
                            </td>
                            <td>
                                {item.owner}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
     );
}
 
export default InteractiveTable;