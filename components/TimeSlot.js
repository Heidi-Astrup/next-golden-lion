export default function TimeSlot({ times }) {
  function clicked() {
    setActive(!active);
  }
  return (
    <div>
      <h3
        onClick={clicked}
        className={` text-[28px] font-heading leading-none mt-4 border-4 border-[#E5A702] ${
          active ? "bg-[#E5A702] text-black" : "bg-[#6f6f6f] text-[#6f6f6f]"
        }`}
      >
        {times}
      </h3>
    </div>
  );
}
