const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'curriculum.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const ids = data.map(c => c.id);
const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);

if (duplicates.length > 0) {
    console.log('Duplicates found:', duplicates);
} else {
    console.log('No duplicates found.');
}
