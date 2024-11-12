function parseContactType(contactType) {
    if (typeof contactType !== 'string') return;
  
    const validContactTypes = ['work', 'home', 'personal'];
    return validContactTypes.includes(contactType) ? contactType : undefined;
  }
  function parseIsFavourite(isFavourite) {
    if (typeof isFavourite !== 'string') return;
  
    return isFavourite === 'true' ? 'true' : isFavourite === 'false' ? 'false' : undefined;
  }
  export function parseFilterParams(query) {
    const { contactType, isFavourite } = query;
  
    return {
      contactType: parseContactType(contactType),
      isFavourite: parseIsFavourite(isFavourite),
    };
  }
  