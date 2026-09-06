import {useParams, Link} from 'react-router-dom'
import useProducts from '../hooks/useProducts.js'

function ProductDetailPage() {
    const { productid } = useParams();
    const { products } = useProducts();
   const product = products.find(product => String(product.id) === String(productid));
    if (!product) {
        return (
            <div>
                <h2>Ürün bulunamadı</h2>
                <Link to="/">Ana Sayfaya Dön</Link>
            </div>
        )
    }
    else{
        return (
            <div>
                <h2>{product.name}</h2>
                <p>Alım Tarihi: {product.purchaseDate}</p>
                <p>İade Süresi: {product.returnPeriodDays} gün</p>
                <p>Mağaza: {product.store}</p>
                <p>İade Durumu: {product.isReturned ? 'İade Edildi' : 'İade Edilmedi'}</p>
                <Link to="/">Ana Sayfaya Dön</Link>
            </div>
        )
    }
}

export default ProductDetailPage