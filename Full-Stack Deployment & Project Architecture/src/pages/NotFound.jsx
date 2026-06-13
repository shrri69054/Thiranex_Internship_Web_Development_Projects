import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1>Not here.</h1>
      <p>This shelf is empty — the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn" style={{ marginTop: '24px' }}>
        Back to shop
      </Link>
    </div>
  )
}
