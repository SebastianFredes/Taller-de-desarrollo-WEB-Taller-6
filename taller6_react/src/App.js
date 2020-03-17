import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import MaterialDatatable from "material-datatable";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
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
      console.log("Todas las personas")
      console.log(res)
    })
  }

  useEffect(()=>{
    cargar();
  })

  console.log(errors);

  //   TAREA TALLER 6     //
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

const data = [ 




  
  //{nombre: "AHHHHHHHHh", apellido: "Title 1"},
  //{nombre: "Name 2", apellido: "Title 2"},
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
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    
    </form>
    

  );

}
