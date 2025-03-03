# Sitemap Generator Library

## 📌 Overview

`sitemap-generator-lib` is a simple and efficient Node.js library for generating XML sitemaps. It supports JSON and CSV as data sources and allows flexible configuration.

---

## 📦 Installation

Install the package via npm:

```sh
npm install sitemap-generator-lib
```

---

## 🚀 Usage

### 📥 Importing the Library

```js
const SitemapGenerator = require("sitemap-generator-lib");
```

### 🛠 Basic Example

```js
const SitemapGenerator = require("sitemap-generator-lib");

const config = {
	baseUrl: "https://example.com",
	storage: "json", // Supports "json" or "csv"
	sitemapPath: "./sitemaps",
	dataFile: "./data.json", // or "./data.csv"
};

const generator = new SitemapGenerator(config);
generator.generateSitemap();
```

---

## ⚙️ Configuration Options

| Option        | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| `baseUrl`     | String | The base URL for the sitemap links               |
| `storage`     | String | Storage type (`json` or `csv`)                   |
| `sitemapPath` | String | Directory where the sitemap will be saved        |
| `dataFile`    | String | Path to the JSON or CSV file containing URL data |

---

## 📂 Data File Format

### 📜 JSON Format (`data.json`)

```json
[
	{
		"url": "/page-1",
		"lastmod": "2024-02-29",
		"changefreq": "daily",
		"priority": "0.8"
	},
	{
		"url": "/page-2",
		"lastmod": "2024-02-28",
		"changefreq": "weekly",
		"priority": "0.6"
	}
]
```

### 📄 CSV Format (`data.csv`)

```
url,lastmod,changefreq,priority
/page-1,2024-02-29,daily,0.8
/page-2,2024-02-28,weekly,0.6
```

---

## 📜 Output (Generated `sitemap.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page-1</loc>
    <lastmod>2024-02-29</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/page-2</loc>
    <lastmod>2024-02-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by [Parth Sharma](https://getparth.com)
