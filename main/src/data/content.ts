
export interface CoffeeOrigin {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string; // Max 2 words
  price: number;
  priceUnit: string; // e.g., "USD / kg" or "IDR / kg"
  isBestSeller?: boolean;
}

export interface CoffeeType {
  id: string;
  name: string;
  description: string;
  origins: CoffeeOrigin[];
}

export const coffeeData: CoffeeType[] = [
  {
    id: 'arabica',
    name: 'Arabica',
    description: 'Arabica coffee is known for its aromatic and complex flavor profile, often with notes of fruit, flowers, chocolate, nuts, or caramel. It has a higher acidity and lower caffeine content compared to Robusta.',
    origins: [
      { id: 'mandheling', name: 'Mandheling (Sumatra)', description: 'Rich, earthy, and full-bodied with low acidity and notes of chocolate and spice. Sourced from the highlands of Sumatra, Mandheling coffee is renowned for its smooth, heavy body and complex flavor profile. It often exhibits earthy notes, hints of dark chocolate, and a touch of spice, making it a favorite among those who appreciate a bold and satisfying cup.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'sumatra beans', price: 15, priceUnit: 'USD / kg' },
      { id: 'gayo', name: 'Gayo (Aceh, Sumatra)', description: 'Smooth, clean cup with medium body, bright acidity, and complex fruity and floral notes. From the Gayo highlands in Aceh, this coffee is celebrated for its clean taste and vibrant acidity. It delights the palate with a balanced medium body and an intricate dance of fruity and floral aromas, offering a truly sophisticated coffee experience.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'gayo beans', price: 18, priceUnit: 'USD / kg' },
      { id: 'toraja', name: 'Toraja (Sulawesi)', description: 'Deep, rich flavor with a full body, low acidity, and notes of dark chocolate and ripe fruit. Cultivated in the mountainous regions of Tana Toraja, Sulawesi, this coffee boasts a deep, rich flavor profile. Its full body and low acidity are complemented by distinct notes of dark chocolate and sweet ripe fruit, creating a luxurious and memorable brew.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'toraja beans', price: 17, priceUnit: 'USD / kg' },
      { id: 'arjuno', name: 'Arjuno (Java)', description: 'Classic Indonesian coffee with a heavy body, syrupy mouthfeel, and often spicy or nutty notes. Grown on the slopes of Mount Arjuno in Java, this coffee is a quintessential example of Indonesian excellence. It features a heavy body, a satisfyingly syrupy mouthfeel, and is often characterized by warm spicy or nutty undertones.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'java beans', price: 16, priceUnit: 'USD / kg', isBestSeller: true },
    ],
  },
  {
    id: 'robusta',
    name: 'Robusta',
    description: 'Robusta coffee has a stronger, bolder, and more bitter flavor, often described as rubbery or chocolatey. It has a higher caffeine content and lower acidity than Arabica, producing a rich crema.',
    origins: [
      { id: 'arjuno-robusta', name: 'Arjuno Robusta (Green Series)', description: 'Typically has a clean cup, good body, and a classic bitter Robusta profile, perfect for strong espresso. Sourced from Java, our Arjuno Robusta Green Series offers a consistently clean cup with a substantial body. Its hallmark is the classic, invigorating bitterness that Robusta lovers seek, making it an excellent base for powerful espresso shots.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'robusta java', price: 10, priceUnit: 'USD / kg' },
      { id: 'arjuno-robusta-roasted', name: 'Arjuno Robusta (Roasted Series)', description: 'Expertly roasted to enhance its bold flavors, this Robusta offers a rich, intense experience. Our Roasted Series of Arjuno Robusta takes the inherent boldness of these Javanese beans and elevates it through expert roasting. The result is a rich, intense coffee experience with a satisfyingly bitter kick and a full body.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'robusta java', price: 12, priceUnit: 'USD / kg' },
    ],
  },
  {
    id: 'liberica',
    name: 'Liberica',
    description: 'Liberica coffee is a less common species with a unique flavor profile that can be smoky, woody, floral, or fruity. It has large, irregular-shaped beans and a distinct aroma.',
    origins: [
      { id: 'borneo-liberica', name: 'Borneo Liberica', description: 'Offers a unique taste often with smoky, woody notes and a bold aroma, a rare and exotic choice. Hailing from the island of Borneo, Liberica coffee is a rare find. It presents a truly unique taste adventure, often characterized by intriguing smoky and woody notes, a bold, captivating aroma, and a lingering finish.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'liberica borneo', price: 20, priceUnit: 'USD / kg' },
      { id: 'jambi-liberica', name: 'Jambi Liberica (Sumatra)', description: 'Known for its distinct fruity and sometimes jackfruit-like notes, providing a truly unique cup. This Sumatran Liberica from Jambi is prized for its distinctive flavor profile. Expect an array of fruity notes, sometimes reminiscent of jackfruit, along with a unique aromatic complexity that sets it apart from more common coffee varieties.', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'liberica jambi', price: 22, priceUnit: 'USD / kg' },
    ],
  },
];

export interface StoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string; // Max 2 words
}

export const storyEvents: StoryEvent[] = [
  { id: '1', year: '2023', title: 'The Seed of an Idea', description: 'Our founder, Era Prima S, envisioned a company that would share Indonesia\'s finest coffees with the world.', imageUrl: '/images/journey/seed-of-an-idea.jpeg', imageHint: 'coffee idea' },
  { id: '2', year: '2024', title: 'First Export', description: 'Bertera Niaga Global made its first international shipment, marking a significant milestone.', imageUrl: '/images/journey/first-export.jpeg', imageHint: 'shipping coffee' },
  { id: '3', year: '2025', title: 'Cultivating Excellence & Partnerships', description: 'We enhanced our own farm capabilities and strengthened partnerships with select local growers, focusing on superior quality and sustainable agroforestry from seed to cup.', imageUrl: '/images/journey/expanding-horizons.jpeg', imageHint: 'farmers group' },
  { id: '4', year: '2025', title: 'Commitment to Quality', description: 'Implemented advanced quality control measures, reinforcing our "Beyond Expectations" promise.', imageUrl: '/images/journey/commitment-to-quality.jpeg', imageHint: 'quality lab' },
];


export interface ProductDetails extends CoffeeOrigin {
  coffeeTypeName: string;
  coffeeTypeDescription: string;
}

export function getProductDetails(id: string): ProductDetails | undefined {
  for (const coffeeType of coffeeData) {
    const foundOrigin = coffeeType.origins.find(origin => origin.id === id);
    if (foundOrigin) {
      return {
        ...foundOrigin,
        coffeeTypeName: coffeeType.name,
        coffeeTypeDescription: coffeeType.description,
      };
    }
  }
  return undefined;
}

export function getAllCoffeeOrigins(): ProductDetails[] {
  return coffeeData.flatMap(type =>
    type.origins.map(origin => ({
      ...origin,
      coffeeTypeName: type.name,
      coffeeTypeDescription: type.description,
    }))
  );
}

// Blog Data
export interface BlogPostPreview {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string; // Max 2 words
  date: string; // e.g., "October 26, 2024"
  author: string;
}

export interface BlogPostFull extends BlogPostPreview {
  content: string; // Can be simple text, or Markdown for richer content
  ogImage?: string; // Optional: specific Open Graph image for this post
}

const blogPostsData: BlogPostFull[] = [
  {
    id: '1',
    title: 'The Art of Brewing the Perfect Arabica',
    slug: 'brewing-perfect-arabica',
    excerpt: 'Discover the secrets to unlocking the rich flavors and aromatic complexities of Arabica coffee. From bean selection to brewing techniques, we cover it all.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'coffee brewing',
    date: 'October 26, 2024',
    author: 'Era Prima S, Coffee Enthusiast',
    content: '<p>Arabica coffee, renowned for its delicate flavor and aromatic richness, offers a truly sublime coffee experience. But brewing the perfect cup requires attention to detail and an understanding of the bean\'s unique characteristics.</p><p><strong>Choosing Your Beans:</strong> Start with high-quality, freshly roasted Arabica beans. Look for information about the origin, processing method, and roast date. Single-origin beans can offer distinct flavor profiles, while blends can provide a more balanced cup.</p><p><strong>Grind Size Matters:</strong> The grind size is crucial and depends on your brewing method. A coarser grind is suitable for French press, while a finer grind is needed for espresso. Burr grinders are preferred over blade grinders for a consistent grind.</p><p><strong>Water Temperature and Quality:</strong> Use filtered water for the best taste. The ideal water temperature for brewing Arabica is typically between 195-205°F (90-96°C). Water that is too hot can scorch the grounds, while water that is too cool will result in under-extraction.</p><p><strong>Brewing Methods:</strong></p><ul><li><strong>Pour Over:</strong> Offers a clean, bright cup, highlighting the nuanced flavors. Requires patience and precision.</li><li><strong>French Press:</strong> Results in a full-bodied coffee with more oils and sediment.</li><li><strong>Aeropress:</strong> Versatile and quick, allowing for experimentation with different recipes.</li></ul><p>Experiment with these tips, and you\'ll be well on your way to brewing the perfect cup of Arabica coffee that tantalizes your taste buds and invigorates your senses. Happy brewing!</p>',
    ogImage: 'https://placehold.co/1200x630.png',
  },
  {
    id: '2',
    title: 'Sustainable Coffee Farming: Our Commitment to the Future',
    slug: 'sustainable-coffee-farming',
    excerpt: 'Learn about Bertera Niaga Global\'s dedication to sustainable coffee farming practices, supporting both the environment and local communities.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'coffee farm',
    date: 'October 20, 2024',
    author: 'Bobby Ishak, Sustainability Lead',
    content: '<p>At Bertera Niaga Global, sustainability is not just a buzzword; it\'s a core principle that guides our operations from farm to cup. We believe that ethical sourcing and environmental stewardship are essential for the future of coffee and the well-being of the communities that cultivate it.</p><p><strong>Environmental Practices:</strong> We partner with farmers who employ eco-friendly techniques such as shade-grown coffee, water conservation, and organic farming methods. These practices help maintain biodiversity, protect soil health, and reduce our carbon footprint.</p><p><strong>Fair Partnerships:</strong> We are committed to fair trade principles, ensuring that farmers receive equitable prices for their hard work. This empowers local communities, improves livelihoods, and fosters long-term relationships built on trust and mutual respect.</p><p><strong>Community Development:</strong> Beyond fair prices, we invest in projects that support community development in coffee-growing regions. This includes initiatives focused on education, healthcare, and infrastructure improvements.</p><p>Our journey towards a more sustainable coffee industry is ongoing. We continuously seek innovative ways to minimize our environmental impact and maximize our positive social contributions. By choosing Bertera Niaga Global, you are not only enjoying premium Indonesian coffee but also supporting a more sustainable and equitable future for all.</p>',
    ogImage: 'https://placehold.co/1200x630.png',
  },
  {
    id: '3',
    title: 'Exploring the Unique Notes of Liberica Coffee',
    slug: 'exploring-liberica-notes',
    excerpt: 'Dive into the exotic and rare world of Liberica coffee. Known for its distinctive smoky, woody, and sometimes fruity notes, it\'s a true adventure for the palate.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'liberica beans',
    date: 'October 15, 2024',
    author: 'Gilbert Yoshua, Coffee Connoisseur',
    content: '<p>Liberica coffee, a less common but increasingly sought-after species, offers a flavor profile unlike any other. Its large, asymmetrical beans and bold aroma hint at the unique tasting experience that awaits.</p><p><strong>A Distinct Flavor Journey:</strong> The taste of Liberica can be quite polarizing but is often described as having a unique combination of smoky, woody, and nutty notes. Some varieties also exhibit surprising fruity or floral undertones, sometimes even a jackfruit-like essence, particularly in beans from regions like Jambi in Sumatra.</p><p><strong>Rarity and Cultivation:</strong> Liberica makes up a small percentage of global coffee production. It is known for its resilience and ability to grow in specific climates where other coffee species might not thrive. Its distinct characteristics make it a prized find for coffee aficionados looking for something truly different.</p><p><strong>Brewing Liberica:</strong> Due to its bold and sometimes intense flavor, brewing Liberica can be an experiment. Medium roasts are often preferred to balance its inherent characteristics. Methods like pour-over or Aeropress can help highlight its unique notes, while a French press might emphasize its body.</p><p>If you\'re looking to expand your coffee horizons, seeking out Liberica is a worthwhile endeavor. Its unconventional profile offers a memorable cup that stands apart from the more common Arabica and Robusta experiences.</p>',
    ogImage: 'https://placehold.co/1200x630.png',
  },
];

export function getAllBlogPostPreviews(): BlogPostPreview[] {
  return blogPostsData.map(({ id, title, slug, excerpt, imageUrl, imageHint, date, author }) => ({
    id, title, slug, excerpt, imageUrl, imageHint, date, author,
  }));
}

export function getBlogPostBySlug(slug: string): BlogPostFull | undefined {
  return blogPostsData.find(post => post.slug === slug);
}

// Testimonial Data
export interface Testimonial {
  id: string;
  clientName: string;
  clientCompany?: string;
  clientTitle?: string;
  testimonialText: string;
  clientImageUrl?: string;
  clientImageHint?: string; // Max 2 words
}

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    clientName: 'Ahmad Mustain Marzuki',
    clientCompany: 'torticoffee',
    clientTitle: 'Owner',
    testimonialText: "Bertera Niaga Global consistently delivers high-quality coffee beans. Their commitment to agroforestry and direct farmer relationships is commendable. Working with them has been a pleasure and has elevated the quality of coffee we offer to our customers.",
    clientImageUrl: 'https://placehold.co/100x100.png',
    clientImageHint: 'person headshot'
  },
  {
    id: '2',
    clientName: 'Dimas Ilham',
    clientCompany: 'titik tumbuh',
    clientTitle: 'Owner',
    testimonialText: "The 'forest friends' approach of Bertera Niaga Global truly resonates with us. The quality of their Arabica, especially the Arjuno, is exceptional. Our customers love the unique flavors and the story behind the beans. Highly recommended!",
    clientImageUrl: 'https://placehold.co/100x100.png',
    clientImageHint: 'professional man'
  },
  {
    id: '3',
    clientName: 'Achmad Romli',
    clientCompany: 'Double Dose Coffee',
    clientTitle: 'Owner',
    testimonialText: "We've been sourcing Robusta from Bertera Niaga Global for our espresso blends, and the consistency and quality are top-notch. Their team is professional, responsive, and their dedication to sustainable practices is a huge plus.",
    clientImageUrl: 'https://placehold.co/100x100.png',
    clientImageHint: 'smiling person'
  },
];

export function getAllTestimonials(): Testimonial[] {
  return testimonialsData;
}

    