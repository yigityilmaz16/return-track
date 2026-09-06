import {Link} from 'react-router-dom'


function NotFoundPage() {
    return (
        <div className="not-found-page">
            <h1>404 - Sayfa Bulunamadı</h1>
            <p>Üzgünüz, aradığınız sayfa mevcut değil.</p>
            <Link to="/">Ana Sayfaya Dön</Link>
        </div>
    )
}

export default NotFoundPage