const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const mdDir = './markdowns'; // Put your 9 .md files here
const outDir = './dist';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const files = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));

// Basic HTML Template with Telegram WebApp Script
const template = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${title}</title>
    <!-- Telegram WebApp SDK -->
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 20px; line-height: 1.6; color: var(--tg-theme-text-color, #000); background-color: var(--tg-theme-bg-color, #fff); }
        a { color: var(--tg-theme-link-color, #007aff); }
    </style>
</head>
<body>
    <a href="index.html">← Back to Index</a>
    ${content}
    <script>
        // Tell Telegram the app is ready and expand to full height
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    </script>
</body>
</html>`;

files.forEach(file => {
    const mdContent = fs.readFileSync(path.join(mdDir, file), 'utf8');
    const htmlContent = marked(mdContent);
    const fileName = file.replace('.md', '.html');
    const title = file.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    fs.writeFileSync(path.join(outDir, fileName), template(title, htmlContent));
});
console.log('✅ HTML files generated in /dist');
