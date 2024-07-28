import React from 'react'

interface IdProps {
   params:{
     id:string
   }
 
}
const Page = ({params}:IdProps) => {
    const { id } = params;
    console.log(params)
  return (
    <div>Page con receta</div>
  )
}

export default Page