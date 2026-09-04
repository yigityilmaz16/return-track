function calculateRemainingDays(purchaseDate, returnPeriodDays) {
    const purchaseDateObj = new Date(purchaseDate);
    const currentDate = new Date();
    const returnDeadline = new Date(purchaseDateObj);
    returnDeadline.setDate(purchaseDateObj.getDate() + returnPeriodDays);
    const remainingTime = returnDeadline - currentDate;
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    return remainingDays;
}

export default calculateRemainingDays;