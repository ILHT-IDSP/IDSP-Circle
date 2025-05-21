const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'ActivityFeed.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add helper function at the beginning of the component
if (!content.includes('const extractFollowerUsername = (content: string)')) {
  content = content.replace(
    'export default function ActivityFeed() {',
    'export default function ActivityFeed() {\n\t// Helper function to extract follower username from content\n\tconst extractFollowerUsername = (content: string) => {\n\t\t// Extract the name/username that appears before " started following" or " accepted"\n\t\treturn content.split(" started following")[0].split(" accepted")[0];\n\t};'
  );
}

// Replace all occurrences of activity.user.username with the extract function
content = content.replace(
  /href={\`\/\${activity\.user\.username}\`}/g, 
  'href={`/${extractFollowerUsername(activity.content)}`}'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('File updated successfully');
