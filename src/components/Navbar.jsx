import {Link} from 'react-router-dom'


function Navbar() {
    return (
        <nav className="navbar">
            <h1>Return Track</h1>
            <ul className="nav-links">
                <li><Link to="/">Ana Sayfa</Link></li>
                <li><Link to="/about">Hakkımızda</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar