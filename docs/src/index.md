---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "power"
  text: "Accumulate Steadily"
  tagline: Health first, worry last
  actions:
    - theme: brand
      text: Guide
      link: /guide/待整理
    - theme: alt
      text: Business
      link: /business/test

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elitpafusa
---



```javascript
const markdownTable = `
| name | job  | sex  |
| ---- | ---- | ---- |
| ab   | cd   | ef   |
| gh   | ij   | kl   |
`;

// Split the markdown content by lines
const lines = markdownTable.trim().split('\n');

// Extract the headers
const headers = lines[0].split('|').map(header => header.trim()).filter(header => header);

// Extract the rows
const rows = lines.slice(2).map(line => line.split('|').map(cell => cell.trim()).filter(cell => cell));

// Convert to array of objects
const result = rows.map(row => {
  let obj = {};
  headers.forEach((header, index) => {
    obj[header] = row[index];
  });
  return obj;
});

console.log(result);  // 对象数组
```



