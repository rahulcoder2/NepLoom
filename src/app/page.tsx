import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <Image
        src="/globe.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
        priority
        className="h-auto w-16 text-black"
      />
    </div>
  );
}
