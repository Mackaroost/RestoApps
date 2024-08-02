
"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import BtnBackCoutry from "./components/BtnBackCoutry";

interface AreaProps{
    params: {
        area: string;
    }
}

interface DataProps{
    strMeal: string;
strMealThumb: string;
idMeal: string;
}

const PageArea = ({params}: AreaProps) => {
    const [dataArea, setDataArea] = useState<DataProps[]>([])
    const {area} = params
    //console.log(area)
    useEffect(() => {
    
        const fetchArea = async()=>{
            try {
                const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
                const res = await data.json()
                setDataArea(res.meals)
                //console.log(dataArea)
            } catch (error) {
                console.log(error)
            }
        }
        fetchArea()

    }, [])
  return (
    <section className="bg-slate-900">
        <div className="pt-11 pr-8">
        <BtnBackCoutry/>
        </div>
        
            <h1 className="text-center text-3xl py-20 font-bold text-slate-50 m-0">Platos de {area}</h1>
    
        <main className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 ">
            {
                dataArea.map((item)=>{
                    return(
                        <article key={item.idMeal} className="flex flex-col justify-center items-center p-4 rounded-md  bg-slate-800">
                        <Image 
                        className="rounded-md"
                        src={item.strMealThumb}
                        width = {300}
                        height={300}
                        loading="eager" 
                        alt={item.strMeal}/>
                        <div>
                        <p className="text-2xl text-center text-slate-50 pt-2 ">{item.strMeal}</p>
                    </div>
                        
                        </article>
                    )
                })
            }
        </main>

    </section>
  )
}

export default PageArea