 async function getCategory() {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

  
  async function getByCountry() {
    const res = await fetch('www.themealdb.com/api/json/v1/1/filter.php?a=Canadian')

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

  export { getCategory, getByCountry }