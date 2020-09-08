# Metadata Scraper with caching

Scraping of OG(open graph) parameters from any webpage & if they are not set then it'll fetch relevant details such as title, description, images etc.

Caching is implemented using Redis & every URL's details can be cached for 12 hours by default(limit can be increased).

## Installation

Clone the repository & use node package manager [npm](https://www.npmjs.com/package/node) to run the following command in project's directory to install the dependencies:

```bash
npm install
```

## Usage

To run the project do following things:

  a)First configure Redis according to your system(i.e port & password).

  b)Then run :

```bash
npm start
```

## Test Scripts

Test script are included in the project directory, to run execute :

```bash
npm test
```
