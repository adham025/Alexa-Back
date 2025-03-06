export function paginate(query) {
    let { page = 1, size = 100 } = query;
  
    page = parseInt(page, 10);
    size = parseInt(size, 10);
  
    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(size) || size <= 0) size = 100;
  
    const limit = size;
    const skip = (page - 1) * limit;
  
    return { page, size, limit, skip };
  }