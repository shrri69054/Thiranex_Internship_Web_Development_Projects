import { useParams, Link } from 'react-router-dom'
import { categories, getProductsByCategory } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import NotFound from './NotFound.jsx'

export default function Category() {
  const { slug } = useParams()
  const category = categories.find((c) => c.slug === slug)

  if (!category) return <NotFound />

  const items = getProductsByCategory(slug)

  return (
    <div className="container">
      <div className="leaf-divider" style={{ marginTop: '48px' }}>
        <span className="leaf-divider__mark" aria-hidden="true">
          {category.mark}
        </span>
        <h1 className="leaf-divider__name">{category.name}</h1>
        <span className="leaf-divider__line" aria-hidden="true" />
      </div>
      <div className="grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <p>
        <Link to="/" className="back-link">
          ← Back to all categories
        </Link>
      </p>
    </div>
  )
}
