import React, { useState , useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import MaterialDatatable from "material-datatable";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const [items, setItems] = useState([]);
  
  const onSubmit = data =>{
    console.log(data);
    
    axios.post('http://localhost:8000/persona', data) 
    .then(res=>{
      console.log(res)
      cargar();

    })

  }
    
  const cargar = () =>{

    axios.get('http://localhost:8000/personas')
    .then(res=>{
      setItems(res.data.personas);
      console.log("Todas las personas")
      console.log(res.data.personas)
    })
  }

  useEffect(()=>{
    cargar();
  },[])

  console.log(errors);

  const columns = [
    {   
        name: 'Nombre', 
        field: 'nombre',
        options: {
            width: 30,
        },
    },
    {
        name: 'Apellido', 
        field: 'apellido',
        options: {
          width: 30,
      },
    },
];

const options = {
    filterType: 'checkbox',
};
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="nombre" name="nombre" ref={register({required: true})} />
      <input type="text" placeholder="apellido" name="apellido" ref={register({required: true})} />
      <input type="submit" />
    
      <div style={{ maxWidth: '90%' }}>
          <MaterialDatatable
          title={"PERSONAS"}
          data={items}
          columns={columns}
          options={options}
        />
      </div>
    
    </form>
    
  );

}
