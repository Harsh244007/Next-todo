import dynamic from "next/dynamic";

const ProfileComponent = dynamic(()=>import("./Profile"))
export default ProfileComponent