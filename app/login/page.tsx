import Header from "@/components/header";
import LoginComponent from "@/components/login";

export default function Login() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-20">
        <LoginComponent />
      </main>
    </>
  );
}
