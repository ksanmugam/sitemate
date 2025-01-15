/**
 * Function to format query with advanced search rules
 * @param searchQuery - The input query string to format
 * @returns The formatted query string with applied advanced search rules
 */
export const applyAdvancedSearchRules = (searchQuery: string): string => {
  let formattedQuery = searchQuery;

  // Handle exact match (wrap in quotes and encode content)
  formattedQuery = formattedQuery.replace(
    /"([^"]+)"/g,
    (_, p1) => `"${encodeURIComponent(p1)}"`
  );

  // Handle words that must appear (prefixed with + symbol)
  formattedQuery = formattedQuery.replace(
    /\+([^\s]+)/g,
    (_, p1) => `+${encodeURIComponent(p1)}`
  );

  // Handle words that must not appear (prefixed with - symbol)
  formattedQuery = formattedQuery.replace(
    /\-([^\s]+)/g,
    (_, p1) => `-${encodeURIComponent(p1)}`
  );

  // Encode logical operators (AND, OR, NOT) to URL-safe format
  formattedQuery = formattedQuery.replace(/\b(AND|OR|NOT)\b/g, (match) =>
    encodeURIComponent(match.toUpperCase())
  );

  // Encode parentheses for grouping
  formattedQuery = formattedQuery.replace(/\(/g, "%28").replace(/\)/g, "%29");

  return formattedQuery;
};
