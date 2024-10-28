import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

export default {
	title: pkg.name,
	description: pkg.description,
	language: "en",
	boxWidth: 50,
};
