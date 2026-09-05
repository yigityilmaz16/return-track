import ProductCard from './ProductCard.jsx'

function ProductList({ products, onReturnToggle }) {
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
                />
            ))}
        </ul>
    )
}


export default ProductList