"use client"
import { RootState } from "@/types/commonTypes"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

const HomeComponent = ()=>{
    const {token} = useSelector((state:RootState)=>state.store)
    const router = useRouter()
    if(!token) router.push("login") 
    else router.push("tasks")
    return <p>Loading</p>
}
export default HomeComponent