import Link from "next/link";

export default function OrderedPopUp({ togglePopUp, beverages }) {
  // Denne funktion lukker popuppen, når du klikker på overlayet
  const handleOverlayClick = () => {
    togglePopup();
  };

  // Denne forhindrer klik inde i popupen i at boble videre ud til overlayet
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  return (
    <div onClick={handleOverlayClick}>
      <div
        onClick={stopPropagation}
        className="bg-[#FFF5D6] w-2/3 p-6 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <h2 className="text-black text-2xl font-heading leading-6.5 mb-4">
          {beverages} have been added to basket
        </h2>
        <div className="flex justify-between gap-4">
          <button
            onClick={togglePopUp}
            className="bg-[#E5A702] w-4/4 p-2 rounded-[10px]"
          >
            SHOP VIDERE
          </button>
          <Link
            href={"basket"}
            className="bg-[#E5A702] w-4/4 p-2 rounded-[10px] text-center"
          >
            ORDER NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
