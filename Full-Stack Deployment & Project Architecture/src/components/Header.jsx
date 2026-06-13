import { Link, NavLink } from 'react-router-dom'
import { categories } from '../data/products.js'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="logo">
          <span className="logo__mark" aria-hidden="true" />
          Verdant Goods
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <NavLink
                  to={`/category/${c.slug}`}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {c.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
