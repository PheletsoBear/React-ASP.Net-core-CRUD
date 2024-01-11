import React, { Fragment,useState, useEffect, useMemo } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



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
  
  const empdata = useMemo(()=>[
    
        {
          id:1,
          name: 'Pheletso',
          age: 25,
          isActive: 1,   
        },
        {
          id:2,
          name: 'Evans',
          age: 26 ,
          isActive: 1,    
        },
        
        {
          id:3,
          name: 'Thaduku',
          age: 24,
          isActive: 0,   
        },
    ],[]);
   
     const [data, setData] = useState([]); //The data is initially set to an empty array

     //The UseEffect is employed to trigger the SetData function only when the [empdata] dependency changes
     useEffect(()=>{
         setData(empdata); //this sets data to the value of the empdata mock API
        },[empdata]);//This is the dependency  that triggers the UseEffect

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

  return (
    <div>
    {/* Basically Fragment is similar to using <></> in order to avoid manually adding elements to the DOM */}
     <Fragment> 

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
       onChange={(e)=> SetIsActive(e)} value ={isActive} />&nbsp;
        <label>IsActive</label>
        </Col>
        <Col>
        <button  className='btn btn-primary'>submit</button>
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
         <input type='number' className='form-control' placeholder='Enter Age' value={editAge}
          onChange={(e) => setEditAge(e.target.value)} />
        <br />
        </Col>
        <Col>
        
        <input type='checkbox' 
       checked = {editIsActive === 1? true: false} 
       onChange={(e)=> SetEditIsActive(e)} value ={editIsActive} />&nbsp;
        <label>IsActive</label>
        </Col>
        <Col>
        <button  className='btn btn-primary'>submit</button>
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
