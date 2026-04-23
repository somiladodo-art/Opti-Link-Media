const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace green-based styling with monochrome styling
content = content.replace(/bg-green text-ink/g, 'bg-opti-black text-opti-white');
content = content.replace(/text-green/g, 'text-opti-black');
content = content.replace(/bg-green\/10/g, 'bg-opti-black/5');
content = content.replace(/bg-green\/20/g, 'bg-opti-black/10');
content = content.replace(/bg-green/g, 'bg-opti-black text-opti-white');
content = content.replace(/border-green/g, 'border-opti-black/20');
content = content.replace(/hover:bg-green-h/g, 'hover:bg-opti-black/80');
content = content.replace(/hover:bg-green/g, 'hover:bg-opti-black hover:text-opti-white');
content = content.replace(/hover:text-green-800/g, 'hover:text-opti-gray');
content = content.replace(/hover:border-green\/30/g, 'hover:border-opti-black/30');
content = content.replace(/hover:border-green\/50/g, 'hover:border-opti-black/50');
content = content.replace(/hover:shadow-green\/20/g, 'hover:shadow-opti-black/20');
content = content.replace(/hover:shadow-green\/30/g, 'hover:shadow-opti-black/30');
content = content.replace(/shadow-\[0_4px_20px_-4px_rgba\(200,240,96,0\.3\)\]/g, 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]');
content = content.replace(/shadow-\[0_10px_30px_-10px_rgba\(200,240,96,0\.6\)\]/g, 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]');
content = content.replace(/text-ink text-opti-white/g, 'text-opti-white');

// Fix cream colors
content = content.replace(/bg-cream2/g, 'bg-opti-lightgray');
content = content.replace(/bg-cream/g, 'bg-opti-white');
content = content.replace(/border-cream3/g, 'border-opti-black/10');

// Fix text-ink and text-gray
content = content.replace(/text-ink/g, 'text-opti-black');
content = content.replace(/text-gray-lt/g, 'text-opti-gray');
content = content.replace(/text-gray/g, 'text-opti-gray');

// Fix borders and bdr
content = content.replace(/border-bdr-d/g, 'border-opti-black/10');
content = content.replace(/border-bdr/g, 'border-opti-black/5');

fs.writeFileSync('src/App.tsx', content);
