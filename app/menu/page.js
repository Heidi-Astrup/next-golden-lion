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

  // Filter by tag
  const draughtBeverages = beverages.filter((b) => b.tag === "draught");
  const bottledBeverages = beverages.filter((b) => b.tag === "bottled");
  const rumBeverages = beverages.filter((b) => b.tag === "rum");
  const whiskeyBeverages = beverages.filter((b) => b.tag === "whisky");

  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex justify-between">
      <main className="max-w-[600px]">
        <h1 className="text-[32px] text-center font-semibold mb-4 tracking-tight text-[#ffffff]">
          Menu
        </h1>
        <h3 className="font-heading mt-10 text-[#FFF5D6] text-5xl">Draught</h3>
        <div className="flex flex-wrap gap-4 max-w-[600px] justify-between">
          {draughtBeverages.map((beverages) => (
            <BeverageCard key={beverages.id} beverages={beverages} />
          ))}
        </div>
        <h3 className="font-heading mt-10 text-[#FFF5D6] text-5xl">Bottled</h3>
        <div className="flex flex-wrap gap-4 max-w-[600px] justify-between">
          {bottledBeverages.map((beverages) => (
            <BeverageCard key={beverages.id} beverages={beverages} />
          ))}
        </div>
        <h3 className="font-heading mt-10 text-[#FFF5D6] text-5xl">Whisky</h3>
        <div className="flex flex-wrap gap-4 max-w-[600px] justify-between">
          {whiskeyBeverages.map((beverages) => (
            <BeverageCard key={beverages.id} beverages={beverages} />
          ))}
        </div>
        <h3 className="font-heading mt-10 text-[#FFF5D6] text-5xl">Rum</h3>
        <div className="flex flex-wrap gap-4 max-w-[600px] justify-between">
          {rumBeverages.map((beverages) => (
            <BeverageCard key={beverages.id} beverages={beverages} />
          ))}
        </div>
      </main>
    </div>
  );
}
