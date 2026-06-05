require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../Model/categoryModel');
const Menu = require('../Model/menuModel');

const categoriesToSeed = [
  { name: 'Veg', description: 'Delicious, purely vegetarian dishes.' },
  { name: 'Non-Veg', description: 'Succulent chicken, fish, and meat specialties.' },
  { name: 'Starters', description: 'Aromatic and crispy quick bites to start your meal.' },
  { name: 'Juices', description: 'Freshly squeezed fruits and refreshing blends.' },
  { name: 'Ice Creams', description: 'Rich, creamy gelatos, sorbets, and classic desserts.' },
  { name: 'Beverages', description: 'Hot and cold brewed drinks, teas, and mocktails.' }
];

const menuItemsToSeed = [
  // Veg
  {
    name: 'Truffle Mushroom Risotto',
    categoryName: 'Veg',
    type: 'Veg',
    price: 450,
    description: 'Creamy Arborio rice slow-cooked with fresh wild mushrooms, white truffle oil, and shaved parmesan.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600',
    baseGrams: 350,
    rating: 4.8
  },
  {
    name: 'Paneer Butter Masala',
    categoryName: 'Veg',
    type: 'Veg',
    price: 320,
    description: 'Tender cottage cheese cubes simmered in a rich, buttery tomato gravy with aromatic spices.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600',
    baseGrams: 400,
    rating: 4.7
  },
  {
    name: 'Classic Dal Makhani',
    categoryName: 'Veg',
    type: 'Veg',
    price: 280,
    description: 'Black lentils slow-cooked overnight with fresh cream, butter, and traditional spices.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    baseGrams: 400,
    rating: 4.6
  },
  // Non-Veg
  {
    name: 'Premium Butter Chicken',
    categoryName: 'Non-Veg',
    type: 'Non-Veg',
    price: 380,
    description: 'Smoked tandoori chicken cooked in a velvety tomato, cream, and butter sauce.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
    baseGrams: 400,
    rating: 4.9
  },
  {
    name: 'Garlic Herb Grilled Salmon',
    categoryName: 'Non-Veg',
    type: 'Non-Veg',
    price: 550,
    description: 'Atlantic salmon fillet grilled with fresh garlic, herbs, and lemon-butter sauce.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600',
    baseGrams: 300,
    rating: 4.8
  },
  {
    name: 'Aromatic Chicken Biryani',
    categoryName: 'Non-Veg',
    type: 'Non-Veg',
    price: 340,
    description: 'Basmati rice cooked in layers with marinated chicken, saffron, and freshly ground spices.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
    baseGrams: 500,
    rating: 4.7
  },
  // Starters
  {
    name: 'Crispy Veg Spring Rolls',
    categoryName: 'Starters',
    type: 'Veg',
    price: 180,
    description: 'Golden fried rolls stuffed with shredded cabbage, carrots, and glass noodles, served with sweet chili dip.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
    baseGrams: 200,
    rating: 4.4
  },
  {
    name: 'Honey Garlic Wings',
    categoryName: 'Starters',
    type: 'Non-Veg',
    price: 240,
    description: 'Crispy fried wings tossed in a sweet and sticky honey garlic glaze.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600',
    baseGrams: 250,
    rating: 4.5
  },
  {
    name: 'Tandoori Paneer Tikka',
    categoryName: 'Starters',
    type: 'Veg',
    price: 260,
    description: 'Paneer blocks, peppers, and onions marinated in yogurt spices, skewered and baked in a clay oven.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600',
    baseGrams: 300,
    rating: 4.6
  },
  // Juices
  {
    name: 'Fresh Orange Juice',
    categoryName: 'Juices',
    type: 'Veg',
    price: 120,
    description: '100% pure juice freshly squeezed from sun-ripened Valencia oranges.',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600',
    baseGrams: 300,
    rating: 4.5
  },
  {
    name: 'Alphonso Mango Smoothie',
    categoryName: 'Juices',
    type: 'Veg',
    price: 150,
    description: 'Rich blend of ripe Alphonso mangoes, creamy Greek yogurt, and a touch of honey.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600',
    baseGrams: 350,
    rating: 4.7
  },
  {
    name: 'Watermelon Mint Cooler',
    categoryName: 'Juices',
    type: 'Veg',
    price: 130,
    description: 'Hydrating watermelon juice blended with fresh mint leaves and a squeeze of lime.',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600',
    baseGrams: 300,
    rating: 4.6
  },
  // Ice Creams
  {
    name: 'Belgian Chocolate Gelato',
    categoryName: 'Ice Creams',
    type: 'Veg',
    price: 160,
    description: 'Decadent dark chocolate gelato crafted with single-origin Belgian chocolate chips.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600',
    baseGrams: 150,
    rating: 4.9
  },
  {
    name: 'Madagascar Vanilla Bean',
    categoryName: 'Ice Creams',
    type: 'Veg',
    price: 140,
    description: 'Classic creamy ice cream flavored with scraped seeds of Madagascar vanilla beans.',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600',
    baseGrams: 150,
    rating: 4.5
  },
  {
    name: 'Mango Sorbet',
    categoryName: 'Ice Creams',
    type: 'Veg',
    price: 150,
    description: 'Dairy-free, fat-free, refreshing sorbet prepared from pure Alphonso mango pulp.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600',
    baseGrams: 150,
    rating: 4.8
  },
  // Beverages
  {
    name: 'Masala Chai',
    categoryName: 'Beverages',
    type: 'Veg',
    price: 60,
    description: 'Freshly brewed milk tea simmered with ginger, crushed green cardamom, cloves, and cinnamon.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600',
    baseGrams: 150,
    rating: 4.8
  },
  {
    name: 'Iced Latte',
    categoryName: 'Beverages',
    type: 'Veg',
    price: 110,
    description: 'Chilled milk poured over fresh double-shot espresso, served over ice.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600',
    baseGrams: 250,
    rating: 4.5
  },
  {
    name: 'Classic Virgin Mojito',
    categoryName: 'Beverages',
    type: 'Veg',
    price: 130,
    description: 'Muddled fresh mint and lime slices topped with sugar syrup, ice cubes, and sparkling soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600',
    baseGrams: 300,
    rating: 4.6
  }
];

async function seed() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error('MONGO_URI env variable is missing inside .env file.');
    }
    
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected! Cleaning existing menus and categories...');
    
    await Menu.deleteMany({});
    await Category.deleteMany({});
    
    console.log('Inserting categories...');
    const createdCategories = await Category.insertMany(categoriesToSeed);
    console.log(`Successfully seeded ${createdCategories.length} categories.`);
    
    // Map category name to its ID
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });
    
    // Build menu documents with categories
    const menusToInsert = menuItemsToSeed.map(item => {
      const categoryId = categoryMap[item.categoryName];
      if (!categoryId) {
        throw new Error(`Category "${item.categoryName}" was not successfully created/mapped.`);
      }
      return {
        name: item.name,
        category: categoryId,
        type: item.type,
        price: item.price,
        description: item.description,
        image: item.image,
        baseGrams: item.baseGrams,
        rating: item.rating
      };
    });
    
    console.log('Inserting menu items...');
    const createdMenus = await Menu.insertMany(menusToInsert);
    console.log(`Successfully seeded ${createdMenus.length} menu items!`);
    
    console.log('Database seeding finished successfully! 🎉');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
}

seed();
