import calculateRemainingDays from "../utils/calculateRemainingDays.js";
import './DashboardStats.css';


function DashboardStats({products}) {
    const totalProducts = products.length;
    const returnedProducts = products.filter(product => product.isReturned).length;
    const notReturnedProducts = totalProducts - returnedProducts;
    const remainingReturnPeriodProducts = products.filter(product => !product.isReturned && calculateRemainingDays(product.purchaseDate, product.returnPeriodDays) >= 0).length;
    const expiredReturnPeriodProducts = products.filter(product => !product.isReturned && calculateRemainingDays(product.purchaseDate, product.returnPeriodDays) < 0).length;

    return(
        <section className="DashboardStats">
            <h2>Dashboard Stats</h2>
            <p>Toplam: {totalProducts}</p>
            <p>İade Edilen Ürünler: {returnedProducts}</p>
            <p>İade Edilmemiş Ürünler: {notReturnedProducts}</p>
            <p>İade Süresi Devam Eden Ürünler: {remainingReturnPeriodProducts}</p>
            <p>Süresi Dolan Ürünler: {expiredReturnPeriodProducts}</p>
        </section>
    )
}
    export default DashboardStats;
