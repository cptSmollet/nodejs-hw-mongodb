import { SORT_ORDER } from '../constants/index.js';

function parseSortBy(value) {
  if (typeof value !== 'string') {
    return '_id'; 
  }

  const allowedKeys = ['name'];
  return allowedKeys.includes(value) ? value : '_id'; 
}

function parseSortOrder(value) {
  if (typeof value !== 'string') {
    return SORT_ORDER.ASC; 
  }

  return [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(value) ? value : SORT_ORDER.ASC;
}
export function parseSortParams(query) {
  const { sortBy, sortOrder } = query;
  return {
    sortBy: parseSortBy(sortBy),
    sortOrder: parseSortOrder(sortOrder),
  };
}
