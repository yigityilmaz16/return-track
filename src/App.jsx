import { useState } from 'react'
import ProductCard from './components/ProductCard.jsx'
import initialProducts from './data/products.js'
import './App.css'

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

  return (
    <main>
      <h1>ReturnTrack</h1>
      <p>İade sürenizi kaçırmayın.</p>
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
