"use client";

export default function Form({ action }) {
  return (
    // Form uses Server Action passed as prop
    <form action={action}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        aria-label="name"
        placeholder="Write your name..."
        className="bg-amber-950"
      />
      <label htmlFor="phone">Phone number</label>
      <input
        type="number"
        name="phone"
        id="phone"
        aria-label="phone"
        placeholder="Your phone number..."
        className="bg-amber-950"
      />

      <div className="bg-[#E5A702] p-4 rounded-lg">
        <button>ORDER BEVERAGES</button>
      </div>
    </form>
  );
}
