"use client"
import { getCategory } from '../api';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"

interface CategoriesList {
  idCategory: string;
  strCategory: string;
}

interface CategoriesDescription {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}
interface Area{
  strArea:string
}
export default function Home() {
  const [listCategories, setListCategories] = useState<CategoriesList[]>([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [dataCategory, setDataCategory] = useState<CategoriesDescription[]>([]);
  const [area, setArea] = useState<Area[]>([])
  const [selectArea, setSelectArea] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchListCategories = async () => {
      try {
        const dataCategories = await getCategory();
        setListCategories(dataCategories.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchListCategories();
  }, []);

  useEffect(() => {
    if (selectCategory) {
      const fetchCategoriesSelect = async () => {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectCategory}`);
          const data = await res.json();
          setDataCategory(data.meals || []);

        } catch (error) {
          console.error('Error fetching category details:', error);
        }
      };
      fetchCategoriesSelect();
    }
  }, [selectCategory]);
  
  useEffect(() => {
    const fetchByArea = async ()=>{
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
          const data = await res.json();
          //console.log(data)
          setArea(data.meals || []);
          //console.log(area)
      } catch (error) {
        console.log(error)
      }
    }
    fetchByArea()
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  const handleChangeArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectArea(e.target.value);
    if(selectArea){
      router.push(`/${selectArea}`)
    }

  };

  return (
      <>
      <header className='min-h-80 bg-neutral-900 flex flex-col justify-center items-center content-center'>
        <div>
          <p className='text-3xl text-slate-50'>Restaurancy</p>
        </div>

   <div>
    <form>
      <select value = {selectArea} onChange={handleChangeArea} >

        <option value=""> Select by Area </option>
        {
          
          area.map((item, index)=>{
            return(
              <option key={index} value={item.strArea}>{item.strArea}</option>
            )
          })
        }
      </select>
    </form>

      <form>
        <select
          onChange={handleChange}
          value={selectCategory}
          >
          <option value="">Select a category</option>
          {listCategories.map((item) => (
            <option key={item.idCategory} value={item.strCategory}>
              {item.strCategory}
            </option>
          ))}
        </select>
      </form>
      </div>
    </header>

    <main>
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        {dataCategory.map((item) => (
          <article key={item.idMeal}>
            <Image 
            className='w-full object-cover '
              src={item.strMealThumb} 
              alt={item.strMeal} 
              width={300}
              height={300}
            />
            <p>{item.strMeal}</p>
            <p>rating <span>⭐</span>{item.idMeal.slice(-2)}</p>

            <div className='p-2 rounded-md bg-red-600 text-center mx-auto max-w-72 my-2'>
            <Link href ={`/receta/${item.idMeal}`} className='text-slate-50'> Informacion</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
    </>
  );
}
