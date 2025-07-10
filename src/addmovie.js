import'bootstrap/dist/css/bootstrap.min.css'
import React from "react";


// here in mounting constructor then render then com.DidMount will get exexcute by default

class Addmovie extends React.Component
{
    constructor(props){
        
       
//to initialize variables and methods
super(props);
this.state={
    mname:'',
    mtype:'',
    mdesc:'',
movielist:[],
isUpdate:false, 
isValidate:false,
message:''

    }
    this.getMovieName=this.getMovieName.bind(this);
    this.getMovietype=this.getMovietype.bind(this);
    this.getMoviedesc=this.getMoviedesc.bind(this);
    this.saveMovie=this.saveMovie.bind(this);
    this.editMovie=this.editMovie.bind(this);
    this.updateMovie=this.updateMovie.bind(this);
    this.getAll=this.getAll.bind(this);
    this.deleteMovie=this.deleteMovie.bind(this);
    this.deleteConfirm=this.deleteConfirm.bind(this);
    this.resetForm=this.resetForm.bind(this);
   
}
getMovieName(e){
    this.setState({mname:e.target.value})};
getMovietype(e){
    this.setState({mtype:e.target.value})};
getMoviedesc(e){
    this.setState({mdesc:e.target.value})};
// this.getMovieName=this.getMovieName.bind(this);
// console.log('constructor')

getAll(){
    fetch('http://localhost:8000/movie/getAllMovies')
    .then((response)=>{
        return response.json();
    }).then((result)=>{
        this.setState({movielist:result})
    }).catch((err)=>{
        console.log(err)
    });
}

editMovie(id){
    //to edit movie
    fetch('http://localhost:8000/movie/'+id)
    .then((response)=>{
        
        return response.json();})
    .then(
       
        (result)=>{
            
        this.setState({
            id:id,
            mname:result[0].name,
            mtype:result[0].type,
            mdesc:result[0].desc,
            isUpdate:true
        });

    }).catch((err)=>{
        console.log(err)
    })

}


updateMovie(){
    var movie={
        "_id":this.state.id,
        "name":this.state.mname,
        "type":this.state.mtype,
        "desc":this.state.mdesc
    }

//connect API call to update movie using fetch API 
fetch('http://localhost:8000/movie/update/'+this.state.id,{
    method:'PUT',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(movie)
}).then((response)=>{
    return response.json();
}).then((result)=>{
    if(result.message==='updated')
       { // { this.setState({isUpdate:false})
        this.resetForm();  //to reset the form
        this.getAll();  //to refresh the movie list}
         }
     else
    alert('error occured while updating movie');
}).catch((err)=>{
    console.log(err)
})
}

deleteMovie(id){
    fetch('http://localhost:8000/movie/delete/'+id,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
       
    }).then((response)=>{
        return response.json();
    }).then((result)=>{
        if(result.message==='deleted')
           { 
            //this.resetId()
            this.getAll();  //to refresh the movie list}
             }
         else
        alert('error occured while updating movie');
    }).catch((err)=>{
        console.log(err)
    })
}
deleteConfirm(id){
    this.setState({
        id:id
    })
    }


resetForm(){
    this.setState({mname:'',mtype:'',mdesc:'',isUpdate:false})
}

saveMovie(){

    //to validate form
    if(this.state.mname===''|| this.state.mtype===''||this.state.mdesc===''){
        this.setState({
            isValidate:false,
            message:'please fill all the feilds'
        });
        return;
    }
var movie={
    "name":this.state.mname,
    "type":this.state.mtype,
    "desc":this.state.mdesc,}

// this.setState({movielist:this.state.movielist.concat(movie)})
console.log(this.state.movielist);
//connect api call to save movie,  you have to provide the server port 
fetch('http://localhost:8000/movie/create',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(movie)
}).then((response)=>{return response.json();})
.then((result)=>{
    if(result.message==="inserted"){
        this.setState({
            isValidate:true,
            message:'movie saved successfully'
        });
             this.resetForm();
            this.getAll(); //to refresh the movie list
    }
        else
            {alert('error occured while saving mode')}
}).catch((err)=>{
    console.log(err);
});

}
 

render(){
    // console.log('render')
    return(
        <div>
            <hr/>
            <h2>Add Movie-{this.props.title}</h2>
            <hr/>
            <form>
                Movie Name:<input type="text" value={this.state.mname} onChange={this.getMovieName} /><br/>
                Movie Type:<input type="text"  value={this.state.mtype} onChange={this.getMovietype}/><br/>
                Movie Desc:<input type="text"  value={this.state.mdesc} onChange={this.getMoviedesc}/><br/>
                {(this.state.isUpdate)?
                 <input type="button" value="update" onClick={this.updateMovie}className='btn-primary'/>
                :
                <input type="button" value="save" onClick={this.saveMovie} className='btn-primary'/>
                }

                {/* <input type="button" value="save" onClick={this.saveMovie} className='btn-primary'/> */}
              <input type="button" value="reset" onClick={this.resetForm} className='btn-secondary'/>
            </form>
            {(this.state.message!=='')?
            <div>
               
                {(!this.state.isValidate) ?
                <div className='alert alert-success'>{this.state.message}</div>
                :
                <div className='alert alert-danger'>{this.state.message}</div>
                }
            </div>
            :''}
            <table className='table table-bordered table-striped'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Desc</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr></thead>
                <tbody>
                   {this.state.movielist.map((item)=>(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.desc}</td>
                        <td><button className='btn btn-primary' onClick={()=>this.editMovie(item._id)}>Edit</button></td>
                        <td><button className='btn btn-danger' data-target="#confirmModal" data-toggle="modal" onClick={()=>this.deleteConfirm(item._id)}>Delete</button></td>
                    </tr>
                   ))}
                </tbody>
            </table>
         
         {/* <h4>   {this.state.mname}</h4>
          <h4>  {this.state.mtype}</h4>
          <h4>  {this.state.mdesc}</h4> */}

          {/* modal code from bootstrap */}
<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
     
      <div class="modal-body">
        Are you sure you want to delete this movie?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">no</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>this.deleteMovie(this.state.id)}>yes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}
componentDidMount(){
    // console.log('component')
    // setTimeout(()=>{
    //     this.setState({mname:"kkk"})
    // },5000)
    
// to load default dta after render
this.getAll(); 
}
}
export default Addmovie