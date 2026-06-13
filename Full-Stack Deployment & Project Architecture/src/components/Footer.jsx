export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span>© {new Date().getFullYear()} Verdant Goods. Small-batch, slow-made.</span>
        <span>Built with React + Vite</span>
      </div>
    </footer>
  )
}
