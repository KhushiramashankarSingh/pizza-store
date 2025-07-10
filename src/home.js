import { useContext } from "react";
import LocationContext from "./locationcontext";

function Home(){
    //ye jo value hai provider se hi milti hai ni likhe to error dega ya undefined dega
    const{location,updateLocation}=useContext(LocationContext);
    return(

        <div>
            <h1>home will appear here</h1>
            <p>location:{location}</p>
            {/* <button onClick={()=>updateLocation("New York")}>change Location</button> */}

            <select onChange={(e)=>updateLocation(e.target.value)}>
                <option value="Bangalore">Bangalore</option>
                <option value="pune">pune</option>
                <option value="new york">new york</option>
                <option value="london">london</option>
            </select>
        </div>
        
    )
}
export default Home;