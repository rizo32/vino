module.exports = {
  printWidth: 80, // Maximum line length
  tabWidth: 4, // Number of spaces per indentation level
  useTabs: false, // Use spaces instead of tabs for indentation
  semi: true, // Add a semicolon at the end of every statement
  singleQuote: false, // Use double quotes instead of single quotes
  jsxSingleQuote: false, // Use double quotes instead of single quotes in JSX
  trailingComma: 'es5', // Add trailing commas where possible (other options: 'none', 'all')
  bracketSpacing: true, // Print spaces between brackets in object literals
  jsxBracketSameLine: false, // Put the closing bracket of a multi-line JSX element on a new line
  arrowParens: 'always', // Include parentheses around a sole arrow function parameter (other option: 'avoid')
  proseWrap: 'preserve', // Do not wrap prose (other options: 'always', 'never')
  endOfLine: 'auto', // Maintain existing line endings (other options: 'lf', 'crlf', 'cr')
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
        tabWidth: 4, // Custom tab width for JSON files
      },
    },
  ],
};
