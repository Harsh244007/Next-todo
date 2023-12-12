"use client";
import { RootState } from "@/types/commonTypes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HomeComponent = () => {
  const { token } = useSelector((state: RootState) => state.store);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      router.push("/tasks");
    }
  }, [token, router]);
  return <p>Loading</p>;
};
export default HomeComponent;
