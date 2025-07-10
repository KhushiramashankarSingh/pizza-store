import'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import { useNavigate } from "react-router"; // to switch to another page another route




const Login=()=>{
    const navigate=useNavigate() //initialize useNavigate hook to access all the routes 
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const loginUser=(e)=>{
        e.preventDefault();
        //send a request to your server to log in the user
        const data ={
            email:email,
            password:password
        };
        fetch('http://localhost:8000/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>{
            if(response.ok){
                return response.json();
            }
            else{
                alert('login failed')
            }
        }).then((data)=>{
            if(data.message==='Invalid credentials'){
                alert('Invalid Credential');
                return;
            }
            console.log('login successful:',data);
            localStorage.setItem('token',data.token);   //storing the data
            localStorage.setItem('first_name',data.data);
            //navigate to the home page or dashboard
            navigate('/');  
            //redirect to home page

        }).catch((error)=>{
            console.log("error",error)
            alert('An error occured while logging in')
        })
    }
    return(
        <div className="container">

            <h1>login</h1>
            <hr/>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"/>
                </div>
                <button type="submit" onClick={loginUser} className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
export default Login;