const fs = require('fs');

exports.siteName = `Fixathon Project 1.0.0`;

exports.itemCategories = [
  {
    id: 1,
    name: 'First category',
    slug: 'first-category'
  },
  {
    id: 2,
    name: 'Second category',
    slug: 'second-category'
  },
  {
    id: 3,
    name: 'Third category',
    slug: 'third-category'
  }
]

exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);