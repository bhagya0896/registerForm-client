import React, { useState,useEffect} from "react";
import {Multiselect} from  'multiselect-react-dropdown'

//react-bootstarp
import { Button,Container,Form,Row, Col, Card, InputGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import UsersList from './userslist.js'
import '../App.css';

import axios from 'axios';

// Adding User Component

export default function AddUser() {

    const options = [
        {state: 'Chennai' , id:1 },
        {state: 'Bangalore' , id:2 },
        {state: 'Ahmedabad' , id:3 },
        {state: 'Hyderabad' , id:4 },
        {state: 'Noida' ,id:5 },
        {state: 'Mumbai' , id:6 },
        
    ]

  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [preflocation, setPreflocation] = useState(options);
  const [profilepic, setProfilepic] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const[message,setMessage] = useState("");

  const [users,setUsers] = useState([]);
  const [edituser,setedituser] = useState([])
  const[button,setButton] = useState(false);
  
 //update User

 const updateUser= (_id,fullname,mobile,jobtype,preflocation,profilepic,email,dob) =>
 {
   console.log("updated")
     const updatedUser =
     {
     
       fullname : fullname,
       mobile:mobile,
       jobtype:jobtype,
       preflocation:preflocation,
       email:email,
       dob:dob
 
     }

     console.log(updatedUser)
     const newUsers= users.map((user)=>
    user._id === _id ? {_id,fullname,mobile,jobtype,preflocation,email,dob }:user
     );
     axios.put(`http://localhost:8080/user/update/${_id}`,{updatedUser}, {
     headers: {
       "Content-Type": "application/json",
     },
   })
   .then((response)=>response.data)
   .catch((err)=>console.log(err))
   .then((data)=>setUsers(data));
   setedituser("")
   setButton(false);
   console.log(button)
  }

  useEffect(()=>
  {
    if(edituser)
    {
      setFullname(edituser.fullname);
      setMobile(edituser.mobile);
      setJobtype(edituser.jobtype);
      setEmail(edituser.email);
      setDob(edituser.dob);
    }else{
      
      setFullname("");
      setMobile("");
      setJobtype("");
      setProfilepic("")
      setEmail("");
      setDob("");
    }

  },[setFullname,setMobile,setJobtype,setEmail,setDob,edituser])


  // get Users
 const fetchUsers=()=>{
        return axios
        .get(`http://localhost:8080/users`,{
            headers:{
                "Content-Type": "application/json",
            }
        })
        .then((res)=>res.data)
       
    }

    const handleUsers = ()=>{
        fetchUsers().then((data)=>{
            console.log(data)
            setUsers(data)
            console.log("Users:::",data)
        })
      }

  useEffect(()=>{
    handleUsers();
  },[])

  const handleClose=()=>{
    setFullname(""); setMobile(""); 
    setJobtype("");setPreflocation(options);
    setProfilepic("");setEmail("");setDob("");
    setMessage("");
  
    
}
// adding users

  const handleAddUsers=(e)=>{

        setMessage("");
        e.preventDefault();
       if(!edituser){
        const formData = new FormData();

        formData.append("fullname",fullname);
        formData.append("mobile",mobile);
        formData.append("jobtype",jobtype);
        formData.append("preflocation",preflocation);
        formData.append("profilepic",profilepic);
        formData.append("email",email);
        formData.append("dob",dob);
      
        return axios
        .post(`http://localhost:8080/user/register`,formData)
        .then((res)=>
        {
            let data = res.data;
            console.log(data);
           setMessage(data.message);
            handleUsers();
            handleClose();

        

        }) .catch((error)=>(error.response.data));
      
       }
          
       
      else
      {
        updateUser(edituser._id,fullname,mobile,jobtype,preflocation,profilepic,email,dob)
      }
     
    }
       
    
  return (
    <Container fluid="md" className="my-5">
    <Row>
    <Col xs={12} md={3}></Col>

      <Col xs={12} md={6} >
        <Card>
          <Card.Header style={{backgroundColor:"black",height:"50px"}}className="text-center p-3"> <h6 className="text-style" style={{fontSize:"18px",color:"white",textTransform:"uppercase"}}>Register Form</h6></Card.Header>
          
          <Card.Body>
            <Card.Text>
            <Form onSubmit={handleAddUsers}  encType="multipart/form-data">
            <Row>
                    <Col xs={12} md={6}>
                    <Form.Group controlId="formBasicFullname">
                <Form.Label className="text-style" htmlFor="fullname" style={{fontSize:"12px"}}>Full Name</Form.Label>
                <InputGroup>
                <InputGroup.Text><i class="fa fa-user" aria-hidden="true"></i></InputGroup.Text>
                <Form.Control 
                   type="text" 
                   id="fullname"
                   name="fullname"
                   style={{fontSize:"10px"}} 
                   onChange={(e) => setFullname(e.target.value)}
                   value={fullname}
                   style={{fontSize:"12px"}}
                   required="required" />
                </InputGroup>
           

                </Form.Group>

                <Form.Group controlId="formBasicMobile">
                <Form.Label className="text-style" htmlFor="mobile" style={{fontSize:"12px"}}>Mobile</Form.Label>
                <InputGroup>
                <InputGroup.Text><i class="fa fa-phone" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control 
                   type="tel" 
                   style={{fontSize:"10px"}} 
                   id="mobile" 
                   name="mobile" 
                   onChange={(e) => setMobile(e.target.value)}
                   value={mobile}
                   style={{fontSize:"12px"}}
                   required="required" />
                   
                </InputGroup>
                

                </Form.Group>
              
                <Form.Group controlId="formBasicJobtype">
                <Form.Label className="text-style" htmlFor="jobtype" style={{fontSize:"12px"}}>Job Type</Form.Label>
                <InputGroup>
                <InputGroup.Text><i class="fa fa-briefcase" aria-hidden="true"></i></InputGroup.Text>
                <Form.Control 
                   as="select"
                   className=" mr-sm-3 text-muted"
                   id="jobtype"
                   name="jobtype"
                   value={jobtype}
                   onChange={(e) => setJobtype(e.target.value)}
                   style={{ fontSize: "12px" }}
                  >
                   <option >Choose...</option>
                   <option selected value="fulltime">Full Time</option>
                   <option value="parttime">Part Time</option>
                   <option value="Consultant">Consultant</option>
                   </Form.Control>
                </InputGroup>
                   
                </Form.Group>

                <Form.Group controlId="formBasicPreflocation">
                <Form.Label className="text-style" htmlFor="preflocation" style={{fontSize:"12px"}}>Preferred Location</Form.Label>
                  
                <Multiselect
                  options={preflocation}
                  className="text-style"
                  style={{height:"30px"}}
                  displayValue="state"
                  onChange={(e) => setPreflocation(e.target.value)}/>
           
                </Form.Group>

                </Col>

                <Col xs={12} md={6}>

                <Form.Group controlId="formBasicProfilepic">
                <Form.Label className="text-style" htmlFor="profilepic" style={{fontSize:"12px",paddingRight:"20px"}}>Profile Pic</Form.Label>
                
                <Form.Control 
                   type="file"
                   style={{fontSize:"12px",height:"30px"}} 
                   filename="profilepic"
                   onChange={(e) => setProfilepic(e.target.files[0])}
                />
            

                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label className="text-style"  htmlFor="email" style={{fontSize:"12px"}}>Email Address</Form.Label>
                <InputGroup>
                <InputGroup.Text><i class="fa fa-envelope" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control 
                   type="email" 
                   name="email"
                   id="email"
                   style={{fontSize:"12px"}} 
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
                   required="required" />
                   </InputGroup>

                </Form.Group>

                <Form.Group controlId="formBasicDob">
                <Form.Label className="text-style" style={{fontSize:"12px"}}>Date Of Birth</Form.Label>
                <InputGroup>
                <InputGroup.Text><i class="fa fa-calendar-o" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control 
                   type="date" 
                   name="dob"
                   id="dob"
                   style={{fontSize:"12px"}} 
                   onChange={(e) => setDob(e.target.value)}
                   value={dob}
                   required="required" />
                   </InputGroup>

                </Form.Group>
                    </Col>
                </Row>
                <br>
                </br>
                {button == true ? <Button variant="warning" type="submit"  block size="sm" className="text-style">
                 Update
                  </Button>
                : <Button variant="danger" type="submit"  block size="sm" className="text-style">
                Add
                </Button>
               } 
                <br></br>
               
               
                  <div className="text-style">
                  <p style={{ color: "green",textAlign:"center" }}>{message}</p>
                
                  </div>
                  
              </Form>
              
             
             
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={3}></Col>
    </Row>
    <UsersList users={users} setUsers={setUsers} setedituser={setedituser} edituser={edituser} setButton={setButton}/>
  </Container>

     
  
  );
}