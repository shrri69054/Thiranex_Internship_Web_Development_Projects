import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="card">
      <div className="card__image">
        <ProductImage color={product.color} name={product.name} />
      </div>
      <h3 className="card__name">{product.name}</h3>
      <p className="card__blurb">{product.blurb}</p>
      <span className="card__price">${product.price}</span>
    </Link>
  )
}
