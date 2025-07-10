import { useState,useEffect,useContext } from "react";
import LocationContext from "./locationcontext";


const Myevents=()=>{
    const{location,updateLocation}=useContext(LocationContext)
    const [eventTypes,setEventTypes]=useState(['Sports','Music'])
    const[eventType ,setEventType]=useState('Sports');
    const[eventName ,setEventName]=useState('Cricket Match');
    const[eventDesc ,setEventDesc]=useState('Test');
    const handleEventTypeChange=(e)=>{
        setEventType(e.target.value)
    }
    const handleEventNameChange=(e)=>{
        setEventName(e.target.value)
    }
    const handleEventDescChange=(e)=>{
        setEventDesc(e.target.value)
    }
    useEffect(()=>{
        console.log('trrigered  useEffect',[])
    })  //componentDidMount  equivalent

    
    return(
        <div className="container">
            <h1>My Events</h1>
            location:{location}
            <hr/>
            <div className="row">
                <div className="col-md-5">
                    <form>
                        <div className="form-group">
                            <label>Event Types</label>
                            <select className="form-control" value={eventType} onChange={(e)=>handleEventTypeChange(e)}>
                                {eventTypes.map((value,index)=>(<option key={index} value={value}> {value} </option>))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Event Name</label>
                            <input type="text" className="form-control" value={eventName} onChange={(e)=>handleEventNameChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Event Desc</label>
                            <input type="text" className="form-control" onChange={(e)=>handleEventDescChange(e)}/>
                        </div>
                    <button type="submit" className="form-control" value={eventDesc} onChange={(e)=>handleEventTypeChange}/>
                        
                    </form>

                </div>
                <div className="col-md-7">
                    <p>type:{eventType}</p>
                    <p>Name:{eventName}</p>
                    <p>Desc:{eventDesc}</p>
                </div>


            </div>
            <p>List of all events will be displayed here</p>
            <input type="button" value="change event type"/>
        </div>
        )
}
export default Myevents;


//eventType(variable) ,setEventType(method)=use('abc')
//eventType=abc    initial value
//[]dependencies list 