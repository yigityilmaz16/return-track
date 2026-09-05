import ProductCard from './ProductCard.jsx'

function ProductList({ products, onReturnToggle, onDeleteProduct }) {
    if (products.length === 0) {
        return <p>Henüz ürün eklenmedi.</p>
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