import React, { Fragment,useState, useEffect, useMemo } from 'react'
import Table from 'react-bootstrap/Table';



const CRUD = () => {
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
            age: 26,
            isActive: 0,   
        },
    ],[]);
   
     const [data, setData] = useState([]); //The data is initially set to an empty array

     //The UseEffect is employed to trigger the SetData function only when the [empdata] dependency changes
     useEffect(()=>{
         setData(empdata); //this sets data to the value of the empdata mock API
        },[empdata]);//This is the dependency  that triggers the UseEffect
   
        
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
