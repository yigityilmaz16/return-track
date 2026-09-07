import {Link, useNavigate, useParams} from 'react-router-dom'
import useProducts from '../hooks/useProducts.js'
import ProductForm from '../components/ProductForm.jsx'

function ProductEditPage() {
    const { productid } = useParams();
    const navigate = useNavigate();
    const {products, updateProduct} = useProducts();

    const productToEdit = products.find(product => String(product.id) === String(productid));

    if (!productToEdit) {
        return (
            <div>
                <h2>Ürün bulunamadı</h2>
                <Link to="/">Ana Sayfaya Dön</Link>
            </div>
        )
    }
    return(
        <>
        <ProductForm initialFormData={productToEdit} sendProductOnForm={(updatedProduct) => {
            updateProduct(productToEdit.id, updatedProduct);
            navigate('/products/' + productToEdit.id);
        }} submitButtonText="Ürünü Güncelle" />
        <Link to={`/products/${productToEdit.id}`} >Düzenlemekten Vazgeç </Link>
        </>
    )



}

export default ProductEditPage