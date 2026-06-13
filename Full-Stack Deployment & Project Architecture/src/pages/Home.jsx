import { categories, getProductsByCategory } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero__eyebrow">Small-batch goods, slowly made</div>
        <h1>
          Things for the home, <em>grown</em> not manufactured.
        </h1>
        <p>
          Verdant Goods gathers soaps, salves, tableware, and textiles from makers who work in
          small batches — each piece carries the trace of the hands that made it.
        </p>
      </section>

      {categories.map((category) => (
        <section key={category.slug} aria-labelledby={`heading-${category.slug}`}>
          <div className="leaf-divider">
            <span className="leaf-divider__mark" aria-hidden="true">
              {category.mark}
            </span>
            <h2 className="leaf-divider__name" id={`heading-${category.slug}`}>
              {category.name}
            </h2>
            <span className="leaf-divider__line" aria-hidden="true" />
          </div>
          <div className="grid">
            {getProductsByCategory(category.slug)
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}
