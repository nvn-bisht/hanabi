import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <button>
        <Link className=" p-4 bg-yellow-50 text-black" href="/home">
          Home
        </Link>
      </button>
    </div>
  );
}
