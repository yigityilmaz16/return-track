import initialProducts from "./data/products.js"; 

function App() {
  return(
    <main>
      <h1>ReturnTrack</h1>
      <p>İade sürenizi kaçırmayın.</p>
      <ul className="ProductList">
      {initialProducts.map((product) => (
        <li key={product.id} className="Product">
          
            <h2>{product.name}</h2>
            <p>Mağaza: {product.store}</p>
            <p>Satın Alma Tarihi: {product.purchaseDate}</p>
            <p>İade Süresi (gün): {product.returnPeriodDays}</p>
            <p>Durum: {product.isReturned ? "İade Edildi" : "Aktif"}</p>
          </li>
  
      ))}  
      </ul>
    </main>
  )
}

export default App;