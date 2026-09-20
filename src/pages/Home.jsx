import { useEffect } from "react";
import { useJwt } from "../contexts/JwtContext";

const Home = () => {
    const {jwt}=useJwt()
    return (  
    <>
    <h1>This is a test homepage.</h1>
    
    </>
    );
}
 
export default Home;