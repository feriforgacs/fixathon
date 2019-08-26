const fs = require('fs');

exports.siteName = `Fixathon Project 1.0.0`;

exports.itemCategories = [
  {
    name: 'Arts & Crafts',
    slug: 'arts-and-crafts',
    icon: '👩‍🎨'
  },
  {
    name: 'Books',
    slug: 'books',
    icon: '📚',
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    icon: '🤖'
  },
  {
    name: 'Fashion & Clothes',
    slug: 'fashion-and-clothes',
    icon: '👚',
  },
  {
    name: 'Garden',
    slug: 'garden',
    icon: '🌳',
  },
  {
    name: 'Home & Household',
    slug: 'home-and-household',
    icon: '🏠',
  },
  {
    name: 'Toys & Games',
    slug: 'toys-and-games',
    icon: '🎲',
  },
  {
    name: 'Outdoors',
    slug: 'outdoors',
    icon: '🚶',
  },
  {
    name: 'Other',
    slug: 'other',
    icon: '📦',
  }
]

exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);
exports.moment = require('moment');