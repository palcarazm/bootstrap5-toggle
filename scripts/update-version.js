// scripts/update-package-version.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
const version = pkg.version;

// Update README
const template = fs.readFileSync(path.join(rootDir, "README.template.md"), "utf8");
const updatedReadme = template.replaceAll("#version#", version);
fs.writeFileSync(path.join(rootDir, "README.md"), updatedReadme);
console.log(`README.md updated to version ${version}`);

// Update docs/package.json
const docsPkgPath = path.join(rootDir, "docs", "package.json");
const docsPkg = JSON.parse(fs.readFileSync(docsPkgPath, "utf8"));
docsPkg.dependencies = docsPkg.dependencies || {};
docsPkg.dependencies["bootstrap5-toggle"] = version;
fs.writeFileSync(docsPkgPath, JSON.stringify(docsPkg, null, 2) + "\n");
console.log(`docs/package.json dependency updated to ${version}`);