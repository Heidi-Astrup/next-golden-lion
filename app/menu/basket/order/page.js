import OrderMessage from "@/components/OrderMessage";

export default function Order() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex justify-between">
      <main className="max-w-[600px] text-center">
        <h1 className="text-[#E5A702] font-heading text-5xl mb-8">
          Order status;
        </h1>
        <OrderMessage status="done" />
      </main>
    </div>
  );
}
