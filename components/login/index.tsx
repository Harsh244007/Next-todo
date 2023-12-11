import dynamic from "next/dynamic";

const LoginComponent = dynamic(()=>import("./Login"))
export default LoginComponent