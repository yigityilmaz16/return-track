import { useEffect, useState } from 'react'
import initialProducts from '../data/products.js'
import ProductContext from './ProductContext.js'
const API = 'http://localhost:3000/products'

function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products')
    if (!storedProducts) {
      return initialProducts
    }
    try{
      const parsedProducts = JSON.parse(storedProducts)
      if (Array.isArray(parsedProducts)) {
       return parsedProducts
      }else{
        return initialProducts
      }}catch(error){
        console.error('Error parsing products from localStorage:', error)
        return initialProducts
      }
    
    }
)

  useEffect(() =>{
    async function fetchProducts() {
      try{
        const response= await fetch(API)
        if(!response.ok){
          throw new Error('Hatalı')
        }
        const data= await response.json();
        if(Array.isArray(data)){
          setProducts(data)
        }else{
          throw new Error('Hata')
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchProducts()
  },[])

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  function updateProduct(id, updatedProduct) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updatedProduct,
              returnPeriodDays: Number(updatedProduct.returnPeriodDays),
            }
          : product,
      ),
    )
  }

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

 async function addProduct(newProduct) {
    try{
      const response= await fetch(API,{
        method: "POST",
        headers: {
                "Content-Type": "application/json"
            },
         body: JSON.stringify(newProduct) 
      })
      if(!response.ok){
        throw new Error('hata var')
      }
      const data = await response.json()
      setProducts((currentProducts) => [data, ...currentProducts])
    }catch(error){
      console.log(error)
    }

  }

  const contextValue = {
    products,
    addProduct,
    deleteProduct,
    toggleReturnStatus,
    updateProduct,
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
