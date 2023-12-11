import Header from "@/components/header";
import SignupComponent from "@/components/signup";

export default function Signup() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-20">
        <SignupComponent />
      </main>
    </>
  );
}
