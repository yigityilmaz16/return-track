import initialProducts from "./data/products.js"; 
import "./App.css";
import calculateRemainingDays from './utils/calculateRemainingDays.js'

function App() {
  
     
  return(
    <main>
      <h1>ReturnTrack</h1>
      <p>İade sürenizi kaçırmayın.</p>
      <ul className="ProductList">
     {initialProducts.map((product) => {
      const remainingDays = calculateRemainingDays(
       product.purchaseDate,
       product.returnPeriodDays,
)
      let returnStatus;
      if (product.isReturned) {
        returnStatus = "İade Edildi";
      }else if(product.isReturned === false && remainingDays > 0){
        returnStatus = `${remainingDays} gün kaldı`;
      }else if(product.isReturned === false && remainingDays === 0){
        returnStatus = "Bugün son gün";
      }else{
        returnStatus = "İade Süresi doldu";
      }

  return (
    <li key={product.id} className="Product">
      <h2>{product.name}</h2>
      <p>Mağaza: {product.store}</p>
      <p>Satın Alma Tarihi: {product.purchaseDate}</p>
      <p>İade Süresi (gün): {product.returnPeriodDays}</p>
      <p>Durum: {returnStatus }</p>
    </li>
  )
})}
      </ul>
    </main>
  )
}

export default App;