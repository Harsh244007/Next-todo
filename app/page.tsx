"use client"
import { RootState } from '@/types/commonTypes'
import { useSelector } from 'react-redux'
import { useRouter } from "next/navigation";

export default function Home() {
  const {token} = useSelector((state:RootState)=>state.store)
  const router = useRouter()
  if(!token) router.push("login") 
  else router.push("tasks")
  return <p>Loading</p>
}
