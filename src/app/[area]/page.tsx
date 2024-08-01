
"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
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
                console.log(dataArea)
            } catch (error) {
                console.log(error)
            }
        }
        fetchArea()

    }, [])
  return (
    <section>
        
            <h1>Platos por Localidad</h1>
    
        <main className="container mx-auto">
            {
                dataArea.map((item)=>{
                    return(
                        <article key={item.idMeal}>
                            <div>
                            <p>{item.strMeal}</p>
                        </div>
                        <Image 
                        src={item.strMealThumb}
                        width = {300}
                        height={300}
                        alt={item.strMeal}/>
                        
                        </article>
                    )
                })
            }
        </main>

    </section>
  )
}

export default PageArea