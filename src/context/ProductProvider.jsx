import { useEffect, useState } from 'react'
import ProductContext from './ProductContext.js'
const API = 'http://localhost:3000/products'

function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

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

 async function updateProduct(id, updatedProduct) {
    try{
      const response = await fetch(`${API}/${id}`,{
        method: "PATCH",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(updatedProduct)
    })
      if(!response.ok){
        throw new Error('hatalı')
      }
      const data = await response.json()
      setProducts((currentProducts) =>
    currentProducts.map((currentProduct) =>
    currentProduct.id === id ? data : currentProduct
   )
  )
    }catch(error){
      console.log(error)
    }
  }

 async function toggleReturnStatus(id) {
   const product= products.find((product) => product.id === id)
    if(!product){
      return;
    }
   const toggleIsReturned= !product.isReturned
   try{
    const response = await fetch(`${API}/${id}/return-status`,{
      method: "PATCH",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ isReturned: toggleIsReturned })
    })
    if(!response.ok){
      throw new Error('Hata')
    }
    const data = await response.json()
   setProducts((currentProducts) =>
    currentProducts.map((currentProduct) =>
    currentProduct.id === id ? data : currentProduct
   )
  )

   }catch(error){
    console.log(error)
   }

  }

 async function deleteProduct(id) {
  try{
    const response = await fetch(`${API}/${id}`,{
      method : "DELETE"
    })
    if(!response.ok){
      throw new Error('Hatalı')
    }
     setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    )
  }catch(error){
    console.log(error)
  }
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
