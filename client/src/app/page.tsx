import Image from "next/image";
import Link from "next/link";

export default function Home() {
  

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Kithcen Spurs Dashboard</h1>
      <Link href="/dashboard">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
      >
        Go to Dashboard
      </button>
      </Link>
    </main>
  );
}
