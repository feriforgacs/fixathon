const fs = require('fs');

exports.siteName = `Re-Product`;
exports.siteTitle = 'An open market where you can trade with your unused stuff without involving real money.';
exports.siteDescription = 'Trash for you? Could be a treasure for someone else. The goal of this tool is to generate less trash. A Fixathon project';
exports.siteImage = 'https://letsreproduct.com/images/icons/share-image.png';

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

exports.dump = (obj) => JSON.stringify(obj, null, 2);