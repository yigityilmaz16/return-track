import { useEffect, useState } from 'react'
import initialProducts from '../data/products.js'
import ProductContext from './ProductContext.js'

function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products')

    try {
      return storedProducts ? JSON.parse(storedProducts) : initialProducts
    } catch (error) {
      console.error('Error parsing products from localStorage:', error)
      return initialProducts
    }
  })

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  function toggleReturnStatus(id) {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id === id) {
          return { ...product, isReturned: !product.isReturned }
        }

        return product
      }),
    )
  }

  function deleteProduct(id) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    )
  }

  function addProduct(newProduct) {
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      returnPeriodDays: Number(newProduct.returnPeriodDays),
      isReturned: false,
    }

    setProducts((currentProducts) => [productToAdd, ...currentProducts])
  }

  const contextValue = {
    products,
    addProduct,
    deleteProduct,
    toggleReturnStatus,
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
