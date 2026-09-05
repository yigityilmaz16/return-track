import { useState } from 'react'
import initialProducts from './data/products.js'
import './App.css'
import ProductForm from './components/ProductForm.jsx'
import ProductList from './components/ProductList.jsx'
import calculateRemainingDays from './utils/calculateRemainingDays.js'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [selectedFilter, setSelectedFilter] = useState('all')

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
  
  const filteredProducts = products.filter((product) => {
    const remainingDays = calculateRemainingDays(
      product.purchaseDate,
      product.returnPeriodDays,
    )
    if (selectedFilter === 'active') {
      return !product.isReturned && remainingDays >= 0
    } else if (selectedFilter === 'returned') {
      return product.isReturned
    } else if (selectedFilter === 'expired') {
      return !product.isReturned && remainingDays < 0
    }
    return true
  })

  return (
    <main>
      <h1>ReturnTrack</h1>
      <p>İade sürenizi kaçırmayın.</p>
      <ProductForm onAddProduct={addProduct} />
      <label htmlFor="filter">Filtrele:</label>
      <select id="filter" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
        <option value="all">Tüm Ürünler</option>
        <option value="active">Aktif Ürünler</option>
        <option value="returned">İade Edilenler</option>
        <option value="expired">Süresi Dolanlar</option>
      </select>
      <ProductList products={filteredProducts} onReturnToggle={returnEventHandler} />
    </main>
  )
}

export default App
