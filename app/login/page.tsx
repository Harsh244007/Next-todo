import Particles from "@/components/common/particles";
import Header from "@/components/header";
import LoginComponent from "@/components/login";

export default function Login() {
  return (
    <>
      <Header />
      <Particles/>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-10 lg:p-20">
        <LoginComponent />
      </main>
    </>
  );
}
