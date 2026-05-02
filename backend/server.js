const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const routes = require('./routes');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let mongoServer;

const initialProducts = [
  {
    name: 'The Obsidian Trench',
    price: 1850,
    description: 'Impeccably tailored from water-resistant silk gabardine, this trench coat is the epitome of modern elegance. Finished with hand-stitched detailing and bespoke horn buttons.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
    category: 'Outerwear',
    stock: 12
  },
  {
    name: 'Champagne Silk Slip',
    price: 890,
    description: 'Cut on the bias for a flawless drape, this heavy silk charmeuse dress falls effortlessly to a midi length. Delicate spaghetti straps and a scooped back complete the look.',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=1000',
    category: 'Dresses',
    stock: 5
  },
  {
    name: 'Aurelia Signature Tote',
    price: 2400,
    description: 'Crafted from supple Italian full-grain leather, featuring our signature champagne gold hardware and micro-suede interior lining.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000',
    category: 'Accessories',
    stock: 3
  },
  {
    name: 'Cashmere Turtleneck',
    price: 650,
    description: 'A winter essential crafted from 100% Mongolian cashmere. Features an oversized ribbed collar and dropped shoulders for an effortless silhouette.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000',
    category: 'Knitwear',
    stock: 20
  },
  {
    name: 'Gold Plissé Skirt',
    price: 1200,
    description: 'A striking midi skirt featuring micro-pleats that catch the light with every movement. Finished with a discreet side zip and silk lining.',
    image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80&w=1000',
    category: 'Skirts',
    stock: 8
  },
  {
    name: 'Minimalist Stiletto',
    price: 750,
    description: 'A study in architectural restraint. Black patent leather paired with a sculptural 90mm champagne gold heel.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000',
    category: 'Footwear',
    stock: 15
  }
];

const seedDatabase = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log('Seeding database with initial products...');
    await Product.insertMany(initialProducts);
    console.log('Database seeded successfully.');
  }
};

const startServer = async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
    console.log(`Connected to in-memory MongoDB at ${uri}`);

    await seedDatabase();

    app.use('/api', routes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop();
  }
  process.exit(0);
});
