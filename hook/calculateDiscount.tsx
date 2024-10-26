const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice > 0 && discountedPrice >= 0) {
    const discountAmount = originalPrice - discountedPrice;
    const calculatedDiscountPercentage = (discountAmount / originalPrice) * 100;
    return Math.round(calculatedDiscountPercentage);
  } else {
    return 0;
  }
};

export default calculateDiscount;