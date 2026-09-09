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
  const [sortBy, setSortBy] = useState("default") 
 
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

   const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "remainingDaysAsc") {
      const remainingDaysA = calculateRemainingDays(a.purchaseDate, a.returnPeriodDays)
      const remainingDaysB = calculateRemainingDays(b.purchaseDate, b.returnPeriodDays)
      return remainingDaysA - remainingDaysB
    } else if (sortBy === "purchaseDateDesc") {
      return new Date(b.purchaseDate) - new Date(a.purchaseDate)
    } else if (sortBy === "nameAsc") {
      return a.name.localeCompare(b.name)
    }
    return 0
  })

  function resetViewOptions(){
    setSearchTerm("")
    setSelectedFilter('all')
    setSortBy("default")
  }


  let emptyMessage = "Filtreyle eşleşen bir ürün yok."

   if(products.length === 0){
    emptyMessage = "Henüz ürün eklenmedi"
   }

   let hasActiveOptions =false
   if(searchTerm || selectedFilter !== 'all' || sortBy !== "default"){
    hasActiveOptions= true
   }

  return (
     <main>
      <h1>ReturnTrack</h1>
      <p>İade sürenizi kaçırmayın.</p>
      <DashboardStats products={products} />
      <label htmlFor="sort">Sırala:</label>
      <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Varsayılan</option>
        <option value="remainingDaysAsc">İade Süresi En Az Kalan</option>
        <option value="purchaseDateDesc">En Yeni Satın Alınan</option>
        <option value="nameAsc">İsme Göre A-Z</option>
      </select>
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
      <button type="button" name="resetButton" disabled={!hasActiveOptions} onClick={resetViewOptions}>Filtreleri Temizle</button>
      <ProductList products={sortedProducts} onReturnToggle={toggleReturnStatus} onDeleteProduct={deleteProduct} emptyMessage={emptyMessage} />
    </main>
  )
}

export default DashboardPage