import calculateRemainingDays from '../utils/calculateRemainingDays.js'
import {Link} from 'react-router-dom'

function ProductCard({ product, onReturnToggle, onDeleteProduct }) {
  const remainingDays = calculateRemainingDays(
    product.purchaseDate,
    product.returnPeriodDays,
  )

  let returnStatus

  if (product.isReturned) {
    returnStatus = 'İade Edildi'
  } else if (remainingDays > 0) {
    returnStatus = `${remainingDays} gün kaldı`
  } else if (remainingDays === 0) {
    returnStatus = 'Bugün son gün'
  } else {
    returnStatus = 'İade Süresi doldu'
  }

  return (
    <li className="Product">
      <h2>{product.name}</h2>
      <p>Mağaza: {product.store}</p>
      <p>Satın Alma Tarihi: {product.purchaseDate}</p>
      <p>İade Süresi (gün): {product.returnPeriodDays}</p>
      <p>Durum: {returnStatus}</p>
      <button type="button" onClick={() => onReturnToggle(product.id)}>
        {product.isReturned
          ? 'İade Durumunu Geri Al'
          : 'İade Edildi Olarak İşaretle'}
      </button>
      <button type="button" onClick={() => onDeleteProduct(product.id)}>
        Ürünü Sil
      </button>
      <Link to={`/products/${product.id}`}>Detayları Görüntüle</Link>
    </li>
  )
}

export default ProductCard
