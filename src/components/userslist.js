import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import axios from 'axios';

import {Container,Row,Col,Button} from 'react-bootstrap';

const navStyle = {fontFamily:'poppins',
fontWeight: 'bold',
fontSize:'15px',
color:'rgb(207, 23, 23)',

}

const UsersList = ({users,setUsers,setedituser,edituser,setButton}) =>
{
 //delete Todo
 const handleDelete = ({_id}) =>
 {

     axios.delete(`http://localhost:8080/user/delete/${_id}`, {
  
     headers: {
       "Content-Type": "application/json",

     },
   }).then((response)=>response.data)
   .then((data) => setUsers(data))
   .catch((err)=>console.log(err));
 }

 //edit Todo
 const handleEdit= ({_id}) =>
 {
     console.log("edituser")
     const mapped = users.find((usr)=>
     {
       return usr._id === _id;
     });
    // console.log(mapped);
     setedituser(mapped); 
     console.log(edituser) 
     setButton(true)
 }
 
      return(
  <Container >
    <Row className="  my-3">
   <Col xs={12} md={12}>
   {users.length !== 0 ?
                 <div>
                     <div className="table-responsive ">
                        <table className="table table-hover table-striped " >
                            <thead className="thead-dark">
                              <tr>
                                <th >Name</th>
                                <th >Email</th>
                                <th >Mobile</th>
                                <th >DOB(yyyy-mm-dd)</th>
                                <th> Job Type</th>
                                <th>Action</th>
                                <th> </th>
                              </tr>
                            </thead>
                            <tbody>
                              {users?.map((user, index) => (
                                <tr key={index}>
                                  <td>{user.fullname} </td>
                                  <td>{user.email} </td>
                                  <td>{user.mobile}</td>
                                  <td>{user.dob}</td>
                                  <td>{ user.jobtype} </td>
                                  <td>
                                       <Button variant="success" style={{fontSize:"12px"}}className=" text-style float-left m-1" onClick={()=>handleEdit(user)}><i className="fa fa-pencil fa-lg" aria-hidden="true" style={{color:"white"}}> </i> </Button>
                                       <Button variant="danger" style={{fontSize:"12px"}}className=" text-style float-right  m-1"  onClick={()=>handleDelete(user)}><i className="fa fa-trash fa-lg" aria-hidden="true" style={{color:"white"}}> </i> </Button>
                                       </td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      
                      </div>
                  
                :<p className="text-style">"No user(s) available !!"</p> }
   </Col>
    
    </Row>
  </Container>
      
      )
 }
export default UsersList;