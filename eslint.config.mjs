import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable common TypeScript-specific lint rules
      "@typescript-eslint/no-explicit-any": "off",         // allow `any`
      "@typescript-eslint/no-unused-vars": "off",          // allow unused vars
      "@typescript-eslint/explicit-module-boundary-types": "off", // allow implicit return types
      "@typescript-eslint/no-var-requires": "off",         // allow require()
      "@typescript-eslint/ban-ts-comment": "off",          // allow @ts-ignore and similar
      "@typescript-eslint/ban-types": "off",               // allow things like `Function` or `{}` types
      "@typescript-eslint/no-non-null-assertion": "off",   
    },
  },
];

export default eslintConfig;
