"use client";

export default function BeverageCard({ beverages, name }) {
  function done() {
    alert("drink done");
  }

  function cancel() {
    alert("order canceled");
  }

  return (
    <div className="text-left text-[#FFF5D6] w-40 h-auto border-2 border-[#E5A702] rounded-xl p-4 flex flex-col gap-4 justify-between">
      <h3 className="text-[28px] font-heading leading-none mt-4">
        {beverages.name}
      </h3>
      <p className="font-body text-[20px]">For {name}</p>
      <div className="flex flex-col gap-4">
        <button
          onClick={done}
          className="bg-[#E5A702] w-4/4 p-2 rounded-[10px] text-black text-1xl"
        >
          DONE
        </button>
        <button
          onClick={cancel}
          className="bg-black w-4/4 p-2 border-2 border-[#E5A702] rounded-[10px] text-[#E5A702] text-1xl"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
