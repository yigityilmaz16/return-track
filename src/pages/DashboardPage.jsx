import { useState } from 'react'
import '../App.css'
import ProductForm from '../components/ProductForm.jsx'
import ProductList from '../components/ProductList.jsx'
import calculateRemainingDays from '../utils/calculateRemainingDays.js'
import useProducts from '../hooks/useProducts.js'
import DashboardStats from '../components/DashboardStats.jsx'

function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const { products, addProduct, toggleReturnStatus, deleteProduct } = useProducts()
  const [searchTerm, setSearchTerm] = useState("")
  

  const filteredProducts = products.filter((product) => {
    const remainingDays = calculateRemainingDays(
      product.purchaseDate,
      product.returnPeriodDays,
    )
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) || product.store.toLowerCase().includes(searchTerm.trim().toLowerCase())
    if (!matchesSearch) {
      return false
    }
   
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
      <DashboardStats products={products} />
      <label htmlFor="search">Ürün Ara:</label>
      <input type="text" id="search" placeholder="Ürün Ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <ProductForm sendProductOnForm={addProduct} />
      <label htmlFor="filter">Filtrele:</label>
      <select id="filter" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
        <option value="all">Tüm Ürünler</option>
        <option value="active">Aktif Ürünler</option>
        <option value="returned">İade Edilenler</option>
        <option value="expired">Süresi Dolanlar</option>
      </select>
      <ProductList products={filteredProducts} onReturnToggle={toggleReturnStatus} onDeleteProduct={deleteProduct} />
    </main>
  )
}

export default DashboardPage