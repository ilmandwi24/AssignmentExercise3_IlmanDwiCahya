export const priceHelper = (plan) => {
  let price = 0;

  switch (plan) {
    case 'arcade':
      price = 9;
      return price;
    case 'advanced':
      price = 12;
      return price;
    case 'pro':
      price = 15;
      return price;
  }
};
