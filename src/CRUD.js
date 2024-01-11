import React, { Fragment,useState, useEffect, useMemo } from 'react'
import Table from 'react-bootstrap/Table';

import { Button } from 'react-bootstrap';

const CRUD = () => {
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
            age: 26,
            isActive: 1,   
        },
    ],[]);
   
     const [data, setData] = useState([]);

     useEffect(()=>{
         setData(empdata);
        },[empdata]);
   
        
  return (
    <div>
 
     <Fragment>
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>IsActive</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length ? 
            data.map((item, index) =>{
                return (

        <tr key={index}>
          <td>{index +1}</td>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.isActive}</td>
        </tr>
                )
            }) 
            :
            'Loading.....'
        }
       
      </tbody>
    </Table>
     </Fragment>
    </div>
  )
}

export default CRUD
