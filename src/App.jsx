import { useState } from 'react'
import ProductCard from './components/ProductCard.jsx'
import initialProducts from './data/products.js'
import './App.css'
import ProductForm from './components/ProductForm.jsx'

function App() {
  const [products, setProducts] = useState(initialProducts)

  function returnEventHandler(id) {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id === id) {
          return { ...product, isReturned: !product.isReturned }
        }

        return product
      }),
    )
  }
  function addProduct(newProduct) {
    const newProductWithId = { 
      ...newProduct,
      id: Date.now(),
      isReturned: false,
    }
    newProductWithId.returnPeriodDays = Number(newProductWithId.returnPeriodDays)
   setProducts((currentProducts) => [newProductWithId, ...currentProducts])
  }

  return (
    <main>
      <h1>ReturnTrack</h1>
      <p>İade sürenizi kaçırmayın.</p>
      <ProductForm onAddProduct={addProduct} />
      <ul className="ProductList">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onReturnToggle={returnEventHandler}
          />
        ))}
      </ul>
    </main>
  )
}

export default App
