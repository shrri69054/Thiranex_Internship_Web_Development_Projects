import { useParams, Link } from 'react-router-dom'
import { getProductBySlug, categories } from '../data/products.js'
import ProductImage from '../components/ProductImage.jsx'
import NotFound from './NotFound.jsx'

export default function Product() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  if (!product) return <NotFound />

  const category = categories.find((c) => c.slug === product.category)

  return (
    <div className="container">
      <div style={{ marginTop: '32px' }}>
        <Link to={`/category/${product.category}`} className="back-link">
          ← Back to {category.name}
        </Link>
      </div>
      <div className="product-detail">
        <div className="product-detail__image">
          <ProductImage color={product.color} name={product.name} />
        </div>
        <div>
          <div className="product-detail__category">{category.name}</div>
          <h1>{product.name}</h1>
          <div className="product-detail__price">${product.price}</div>
          <p className="product-detail__description">{product.description}</p>
          <ul className="product-detail__details">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div style={{ marginTop: '28px' }}>
            <button className="btn" type="button">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
