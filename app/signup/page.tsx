import Particles from "@/components/common/particles";
import Header from "@/components/header";
import SignupComponent from "@/components/signup";

export default function Signup() {
  return (
    <>
      <Header />
      <Particles/>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-10 lg:p-20">
        <SignupComponent />
      </main>
    </>
  );
}
