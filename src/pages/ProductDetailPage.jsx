import {useParams, Link, useNavigate} from 'react-router-dom'
import useProducts from '../hooks/useProducts.js'


function ProductDetailPage() {
    const { productid } = useParams();
    const { products, toggleReturnStatus, deleteProduct } = useProducts();
   const product = products.find(product => String(product.id) === String(productid));
   const navigate = useNavigate();
   function handleDeleteProduct(id) {
    deleteProduct(id);
    navigate('/');
  }
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
                <button type="button" onClick={() => toggleReturnStatus(product.id)}>
                    {product.isReturned ? 'İade Durumunu Değiştir (İade Edilmedi)' : 'İade Durumunu Değiştir (İade Edildi)'}
                </button>
                <button type="button" onClick={() => handleDeleteProduct(product.id)}>Ürünü Sil</button>
                <br />
                <Link to="/">Ana Sayfaya Dön</Link>
                <br />
                <Link to={`/products/${product.id}/edit`}>Ürünü Düzenle</Link>
            </div>
        )
    }
}

export default ProductDetailPage