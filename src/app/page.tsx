"use client";
import { getCategory } from '../api';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";

interface CategoriesList {
  idCategory: string;
  strCategory: string;
}

interface CategoriesDescription {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Area {
  strArea: string;
}

export default function Home() {
  const [listCategories, setListCategories] = useState<CategoriesList[]>([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [dataCategory, setDataCategory] = useState<CategoriesDescription[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectArea, setSelectArea] = useState('');
  const router = useRouter();

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
    const fetchByArea = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await res.json();
        setAreas(data.meals || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchByArea();
  }, []);

  useEffect(() => {
    if (selectArea) {
      router.push(`/${selectArea}`);
    }
  }, [selectArea, router]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  const handleChangeArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectArea(e.target.value);
  };

  return (
    <>
      <header className='min-h-80 bg-neutral-900 flex flex-col justify-center items-center content-center'>
        <div>
          <p className='text-3xl text-slate-50 font-bold py-4'>Restaurancy</p>
        </div>

        <div className='flex items-center justify-around pt-12 gap-x-10'>
          <form>
            <select 
              className='block w-full px-4 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
              value={selectArea} 
              onChange={handleChangeArea}
            >
              <option value="">Select by Area</option>
              {areas.map((item, index) => (
                <option key={index} value={item.strArea}>{item.strArea}</option>
              ))}
            </select>
          </form>

          <form>
            <select
              className='block w-full px-4 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500'
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

      <main className='pt-10'>
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
          {dataCategory.map((item) => (
            <article key={item.idMeal}>
              <Image 
                className='w-full object-cover rounded-md'
                src={item.strMealThumb} 
                alt={item.strMeal} 
                width={300}
                height={300}
                loading="lazy" 
              />
              <div className='py-2'>
                <p>{item.strMeal}</p>
                <p><span>⭐</span>{item.idMeal.slice(-2)}</p>
              </div>
              <div className='p-2 rounded-md bg-red-600 text-center mx-auto max-w-72 my-2'>
                <Link href={`/receta/${item.idMeal}`} className='text-slate-50'>Informacion</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
