export const renderPrice = (
  price: number | { small?: number; medium?: number; large?: number }
) => {
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }
  let priceString = "";
  if (price.small) {
    priceString += `Small: $${price.small.toFixed(2)}`;
  }
  if (price.medium) {
    priceString += ` Medium: $${price.medium.toFixed(2)}`;
  }
  if (price.large) {
    priceString += ` Large: $${price.large.toFixed(2)}`;
  }
  return priceString;
};
