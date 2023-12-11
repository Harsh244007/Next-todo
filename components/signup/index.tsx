import dynamic from "next/dynamic";

const RegisterComponent = dynamic(()=>import("./Signup"))
export default RegisterComponent