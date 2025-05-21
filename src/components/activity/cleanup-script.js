const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'ActivityFeed.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove all instances of the commented helper function
content = content.replace(/\{\/\* Extract follower username from content[\s\S]*?return content\.split\([^;]*;\s*\*\/\}/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned up all commented code instances');
