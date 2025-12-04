const OrderMessage = ({ status }) => {
  if (status === "done") {
    return <h1>Færdig</h1>;
  }
  if (status === "canceled") {
    return <h1>Orderen kan ikke laves og er blevet annuleret</h1>;
  }
  return <h1>Orderen er i gang med at blive lavet</h1>;
};

export default OrderMessage;
