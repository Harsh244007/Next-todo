import dynamic from "next/dynamic";

const HomeComponent = dynamic(()=>import("./Home"))
export default HomeComponent