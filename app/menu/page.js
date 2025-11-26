import BeverageCard from "@/components/BeverageCard";
import Link from "next/link";

export default async function Menu() {
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/beverages.json`;
  const response = await fetch(url);
  const dataObject = await response.json();

  const beverages = Object.keys(dataObject).map((key) => ({
    id: key,
    ...dataObject[key],
  })); // Convert object to array
  console.log(beverages);
  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex items-center justify-center">
      <main className="text-center max-w-[600px]">
        <h1 className="text-[32px] font-semibold mb-4 tracking-tight text-[#ffffff]">
          Menu
        </h1>
        <p className="text-base text-gray-400 mb-8 leading-relaxed">
          Cards with drinks here. 1 Cards with drinks here. Cards with drinks
          here. Cards with drinks here. Cards with drinks here. Cards with
          drinks here.2 Cards with drinks here. Cards with drinks here. Cards
          with drinks here. Cards with drinks here. Cards with drinks here.
          Cards with drinks here. Cards with drinks here. Cards with drinks
          here. Cards with drinks here. Cards with drinks here. Cards with
          drinks here. Cards with drinks here. Cards with drinks here.
        </p>
        <div className="flex flex-wrap gap-6 max-w-[600px] justify-center">
          {beverages.map((beverages) => (
            <BeverageCard key={beverages.id} beverages={beverages} />
          ))}
        </div>
      </main>
    </div>
  );
}
