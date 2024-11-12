export function parsePaginationParams(query) {
    const { page, perPage } = query;
    function parseNumber(value, defaultValue) {
      if (typeof value !== 'string') {
        return defaultValue;
      }
  
      const parsedValue = parseInt(value, 10);
      return isNaN(parsedValue) ? defaultValue : parsedValue;
    }
  
    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);
  
    return {
      page: parsedPage,
      perPage: parsedPerPage,
    };
  }
  