import ProductCard from './ProductCard.jsx'
import './ProductList.css'


function ProductList({ products, onReturnToggle, onDeleteProduct, emptyMessage }) {
    if (products.length === 0) {
        return <p>{emptyMessage}</p>
    }
    return (
        <ul className="ProductList">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onReturnToggle={onReturnToggle}
                    onDeleteProduct={onDeleteProduct}
                />
            ))}
        </ul>
    )
}


export default ProductList
