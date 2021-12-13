const CartObject = (id, title, type) => {
  return {
    id: id,
    title: title,
    type: type,
    timeAdded: Date.now(),
  };
};
export default CartObject;
