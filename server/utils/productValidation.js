export function normalizeProductInput(product){
    const {name,store, purchaseDate, returnPeriodDays} = product;
    const cleanName = typeof name === 'string' ? name.trim() : ''
    const cleanStore = typeof store === 'string' ? store.trim() : ''
    const cleanReturnPeriodDays = Number(returnPeriodDays)
      

    return {name: cleanName,
            store: cleanStore,
            purchaseDate,
            returnPeriodDays: cleanReturnPeriodDays
    }
}

export function isValidProductInput(newProduct){
    const {name,store, purchaseDate, returnPeriodDays} = newProduct;
     if(!store || !name || !purchaseDate || returnPeriodDays <= 0 || !Number.isFinite(returnPeriodDays)){
      return false
    }
    return true
}
