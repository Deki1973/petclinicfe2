import { useEffect, useState } from "react";

const MessageBox = (prop) => {
    const [messageText, setMessageText]=useState()
    useEffect(()=>{
        console.log(prop.prop)
        setMessageText(prop.prop)
    })
    return ( 
        <div className="message-box">
            {messageText && <h5>{messageText}</h5>}
        </div>
     );
}
 
export default MessageBox;