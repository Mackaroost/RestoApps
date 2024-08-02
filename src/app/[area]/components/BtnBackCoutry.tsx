
import React from 'react'
import { useRouter } from 'next/navigation'

const BtnBackCoutry = () => {
    const router  = useRouter()
  return (
    <button className='text-slate-50 p-4' onClick={()=>router.back()}> <span>🔙</span>Volver</button>
  )
}

export default BtnBackCoutry