"use client"
import { useRouter } from "next/navigation"
const BtnBack = () => {
    const router = useRouter()
  return (
    <button onClick={()=>router.back()}> <span>🔙</span>Volver</button>
  )
}

export default BtnBack