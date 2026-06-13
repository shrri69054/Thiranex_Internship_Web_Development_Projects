export const categories = [
  { slug: 'apothecary', name: 'Apothecary', mark: '01' },
  { slug: 'tableware', name: 'Tableware', mark: '02' },
  { slug: 'textiles', name: 'Textiles', mark: '03' },
  { slug: 'garden', name: 'Garden', mark: '04' },
]

export const products = [
  {
    id: 'p01',
    slug: 'rosemary-mint-soap',
    name: 'Rosemary & Mint Bar Soap',
    category: 'apothecary',
    price: 12,
    blurb: 'Cold-pressed olive oil base, hand-cut and cured for six weeks.',
    description:
      'Our flagship bar blends rosemary leaf and peppermint essential oils into a slow-cured olive oil base. Each bar is hand-cut, leaving a slightly uneven edge that softens with use. Suitable for face and body.',
    details: ['150g bar', 'Cold-process, six-week cure', 'Olive oil, rosemary, peppermint, sea salt'],
    color: '#8FA68E',
  },
  {
    id: 'p02',
    slug: 'calendula-balm',
    name: 'Calendula Salve',
    category: 'apothecary',
    price: 18,
    blurb: 'A pocket tin of infused calendula for dry hands and elbows.',
    description:
      'Calendula petals are slow-infused in sunflower oil for three weeks, then set with beeswax into a balm that melts on contact with skin. Keep it by the sink, in a bag, or on a desk.',
    details: ['30ml tin', 'Calendula-infused sunflower oil, beeswax', 'Unscented'],
    color: '#C16B4A',
  },
  {
    id: 'p03',
    slug: 'cedar-incense',
    name: 'Cedar & Clay Incense',
    category: 'apothecary',
    price: 16,
    blurb: 'Hand-rolled sticks with a slow, woody burn.',
    description:
      'A blend of cedarwood, palo santo shavings, and bound clay, rolled by hand onto bamboo cores. Burns for roughly 35 minutes with a low, even smoke.',
    details: ['20 sticks per box', 'Cedarwood, palo santo, clay binder', 'Approx. 35 min burn time'],
    color: '#2C3B2D',
  },
  {
    id: 'p04',
    slug: 'stoneware-bowl-set',
    name: 'Stoneware Nesting Bowls',
    category: 'tableware',
    price: 64,
    blurb: 'A set of three reactive-glazed bowls that stack into one.',
    description:
      'Thrown in small batches and finished with a reactive glaze that pools slightly differently on every piece. The three sizes nest for storage and cover most everyday needs, from soup to salad.',
    details: ['Set of 3 (14cm, 18cm, 22cm)', 'Stoneware, reactive glaze', 'Dishwasher and microwave safe'],
    color: '#C16B4A',
  },
  {
    id: 'p05',
    slug: 'olive-wood-servers',
    name: 'Olive Wood Serving Set',
    category: 'tableware',
    price: 38,
    blurb: 'A spoon and fork pair carved from reclaimed olive wood.',
    description:
      'Each piece is carved from offcuts of olive wood reclaimed from grove pruning, so grain and color vary piece to piece. Food-safe finish of beeswax and mineral oil.',
    details: ['Spoon + fork, 28cm', 'Reclaimed olive wood', 'Hand wash, oil occasionally'],
    color: '#8FA68E',
  },
  {
    id: 'p06',
    slug: 'linen-table-runner',
    name: 'Washed Linen Runner',
    category: 'textiles',
    price: 42,
    blurb: 'Stonewashed European linen in a muted sage.',
    description:
      'Woven from European flax and stonewashed for a soft, lived-in drape from the first use. Mitred corners, no visible hems on the long edges.',
    details: ['45cm x 200cm', '100% linen, stonewashed', 'Machine wash cold'],
    color: '#8FA68E',
  },
  {
    id: 'p07',
    slug: 'wool-throw',
    name: 'Recycled Wool Throw',
    category: 'textiles',
    price: 89,
    blurb: 'A heavyweight throw woven from reclaimed wool fibers.',
    description:
      'Woven on traditional looms from reclaimed wool fiber, this throw has the heft of a vintage blanket with a softer hand. Whip-stitched edges in a contrasting thread.',
    details: ['130cm x 180cm', 'Recycled wool blend', 'Dry clean recommended'],
    color: '#2C3B2D',
  },
  {
    id: 'p08',
    slug: 'terracotta-planter',
    name: 'Ridged Terracotta Planter',
    category: 'garden',
    price: 28,
    blurb: 'Hand-thrown terracotta with a deep drainage saucer.',
    description:
      'A classic ridged profile thrown on the wheel and left unglazed, so the terracotta will weather and patina outdoors over time. Includes a matching saucer.',
    details: ['18cm diameter, includes saucer', 'Unglazed terracotta', 'Drainage hole included'],
    color: '#C16B4A',
  },
  {
    id: 'p09',
    slug: 'brass-mister',
    name: 'Brass Plant Mister',
    category: 'garden',
    price: 34,
    blurb: 'A solid brass mister that ages into a warm patina.',
    description:
      'Solid brass with a fine mist nozzle, designed for misting ferns and propagations. The brass is untreated and will darken with handling, which we think is part of the appeal.',
    details: ['Capacity: 250ml', 'Solid brass, untreated', 'Fine mist nozzle'],
    color: '#2C3B2D',
  },
]

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug) {
  return products.filter((p) => p.category === categorySlug)
}
