const OrderMessage = ({ status, orderNumber }) => {
  if (status === "done") {
    <div className="min-h-screen pt-20 pb-10 px-5 flex justify-between">
      <main className="max-w-[600px] text-center">
        <h1 className="text-[#E5A702] font-heading text-5xl mb-8">DONE</h1>
        <p className="text-[#FFF5D6] font-heading text-4xl mb-8">
          Your order is ready!
        </p>
        <p className="text-[#FFF5D6] font-body text-2xl mb-4">
          Your number is {orderNumber}
        </p>
        <p className="text-[#FFF5D6] font-body text-2xl mb-12">
          You can now go to the bar to pay and pick it up
        </p>
        <h1 className="text-[#FED85F] font-heading text-7xl">Ready</h1>
      </main>
    </div>;
  }
  if (status === "canceled") {
    return (
      <div className="min-h-screen pt-20 pb-10 px-5 flex justify-between">
        <main className="max-w-[600px] text-center">
          <h1 className="text-[#E5A702] font-heading text-5xl mb-8">
            Canceled
          </h1>
          <p className="text-[#FFF5D6] font-heading text-4xl mb-8">
            The order is canceled, becarse it can not be made today{" "}
          </p>
          <p className="text-[#FFF5D6] font-body text-2xl mb-4">
            Your number is {orderNumber}
          </p>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex justify-between">
      <main className="max-w-[600px] text-center">
        <h1 className="text-[#E5A702] font-heading text-5xl mb-8">
          Yay! your order have been sent to the bar
        </h1>
        <p className="text-[#FFF5D6] font-heading text-4xl mb-8">
          The bartender will make til for you ASAP
        </p>
        <p className="text-[#FFF5D6] font-body text-2xl mb-4">
          Your number is {orderNumber}
        </p>
        <p className="text-[#FFF5D6] font-body text-2xl mb-12">
          When its done tou can pay and pick it up in the bar
        </p>
        <h1 className="text-[#FED85F] font-heading text-7xl">Not ready yet</h1>
      </main>
    </div>
  );
};

export default OrderMessage;
