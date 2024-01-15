import React, { Fragment,useState, useEffect, useMemo } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'bootstrap';


const CRUD = () => {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //For new submit
  const [name, setName] = useState ('');
  const [age, setAge] = useState ('');
  const [isActive, SetIsActive] = useState (0);


//For Update
   const [editId, setEditId] = useState ('');
   const [editName, setEditName] = useState ('');
  const [editAge, setEditAge] = useState ('');
  const [editIsActive, SetEditIsActive] = useState (0);
  //The useMemo is employed to provide the caching of the below block in order to avoid recalculations over amd over...
  
  
   
     const [data, setData] = useState([]); //The data is initially set to an empty array

     //The UseEffect is employed to trigger the SetData function only when the [empdata] dependency changes
     useEffect(()=>{
         getData()
        },[]);//This is the dependency  that triggers the UseEffect

const getData =() => {

   axios.get('https://localhost:7067/api/Employee').then((result) =>{
    setData(result.data)
   }).catch((error)=>{
    console.log(error)
   })

}

     const HandleEdit = (id) =>{
         //alert(id);
         handleShow();
         console.log(name)
     }  
     const HandleDelete = (id) =>{
      //this displays alert upon window confirmation
        if(window.confirm("Are you sure you want to delete this employee") === true){
          
          alert(id)
        }
     }  
      const handleUpdate = ()=>{

      } 
      
      const HandleSave = ()=>{
        const url = 'https://localhost:7067/api/Employee';
        const data =	 {
          
          "name": name,
          "age": age,
          "isActive": isActive
        }

        axios.post(url, data).then((result)=>{
          getData();
          clear();
          toast.success('Employee has been Added');
        })

      }

      const clear = ( ) =>{
        setName ('');
        setAge('');
        SetIsActive(0);
        setEditName('');
        setEditAge('');
        SetEditIsActive(0);
        setEditId('')
      }

      const HandleActiveChange = (e) =>{
             if(e.target.checked){
              SetIsActive(1);
             }
             else{
              SetIsActive(0);
             }
      }
      const HandleActiveEditChange = (e) =>{
             if(e.target.checked){
              SetEditIsActive(1);
             }
             else{
              SetEditIsActive(0);
             }
      }
  return (
    <div>
    {/* Basically Fragment is similar to using <></y> in order to avoid manually adding elements to the DOM */}
     <Fragment> 
     <ToastContainer />
     <Container>
      <br/>
      <Row>
        <Col>
        <input type='text' className='form-control' placeholder='Enter Name' value={name} 
        onChange={(e) => setName(e.target.value)}
        />
        <br />
        </Col>
        <Col>
         <input type='number' className='form-control' placeholder='Enter Age' value={age}
          onChange={(e) => setAge(e.target.value)} />
        <br />
        </Col>
        <Col>
        
        <input type='checkbox' 
       checked = {isActive === 1? true: false} 
       onChange={(e)=> HandleActiveChange(e)} value ={isActive} />&nbsp;
        <label>IsActive</label>
        </Col>
        <Col>
        <button  className='btn btn-primary' onClick={()=>HandleSave()}>submit</button>
        </Col>
      </Row>
      
    </Container>

     <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>IsActive</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>

        {
          
          
          /*The below code is a represantation of the ternary operator which conditionally renders the table body based on whether there is data variable exists and if the length is non-zero. if the data exists data is rendered anf if not "Loading message is displayed" */
         
          data && data.length ? //this is the if-condition

          //mapping data array data to the JSX element 
            data.map((item, index) =>{
                return (

        <tr key={index}>
          <td>{index +1}</td>
           <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.isActive}</td>
          <td colspan = {2}>
            <button className='btn btn-primary' onClick = {()=>HandleEdit(item.id)} >Edit</button> &nbsp;
            <button className='btn btn-danger'  onClick = {()=>HandleDelete(item.id, item.name,index +1)}>Delete</button>
          </td>
        </tr>
                )
            }) 
            :
            'Loading.....'
        }
     
      </tbody>
    </Table>

   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
      <br/>
      <Row>
        <Col>
        <input type='text' className='form-control' placeholder='Enter Name' value={editName} 
        onChange={(e) => setEditName(e.target.value)}
        />
        <br />
        </Col>
        <Col>
         <input type='text' className='form-control' placeholder='Enter Age' value={editAge}
          onChange={(e) => setEditAge(e.target.value)} />
        <br />
        </Col>
        <Col>
        
        <input type='checkbox' 
       checked = {editIsActive === 1? true: false} 
       onChange={(e)=> HandleActiveEditChange(e)} value ={editIsActive} />&nbsp;
        <label>IsActive</label>
        </Col>
        
      </Row>
      
    </Container>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    

    
     </Fragment>
    </div>
  )
}

export default CRUD
