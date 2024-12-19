export const calculateCartTotals = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );
  return { totalQuantity, totalPrice };
};
