import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900  bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <h2 className="text-3xl text-white font-bold mb-4">Not Found</h2>
      <p className="text-lg text-gray-200 mb-6">Could not find the requested resource</p>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;