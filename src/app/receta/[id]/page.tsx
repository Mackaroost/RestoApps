"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
interface IdProps {
   params:{
     id:string
   }
 
}

interface CategoriesDescription {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions:string;
  }
const Page = ({params}:IdProps) => {
    const[dataId, setDataId]= useState< CategoriesDescription[]>([])
    const { id } = params;
    //console.log(params)
    useEffect(() => {
    
        const fetchId = async()=>{
            try {
                if(params){
                    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    const res = await data.json()
                    console.log(res.meals)
                    setDataId(res.meals)
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchId()
    }, [])

  return (
    <main className="container mx-auto min-h-screen py-4">
        <p className="text-3xl text-center py-10 font-bol"> Nuestra Recetas </p>
        {
            dataId.map((item)=>{
                return (
                    <article key ={item.idMeal} className="mx-auto flex flex-col justify-center items-center rounded-md shadow-md p-4 pt-4 bg-slate-500 w-2/5">
            <Image 
            className="w-full object-cover rounded-md"
              src={item.strMealThumb} 
              alt={item.strMeal} 
              width={200}
              height={200}
            />
                        
                        <div className="flex-col justify-center items-center py-4">
                            <p className="text-xl font-semibold text-center">{item.strMeal}</p>
                         <p className="text-lg text-justify pt-2">Instucciones: {item.strInstructions}</p>
                        </div>
                    </article>
                )
            })
        }



    </main>
  )
}

export default Page