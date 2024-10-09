// sortUtils.js

/**
 * Function to get a comparator function based on the field and sort direction.
 * @param {string} field - The field to sort by.
 * @param {string} direction - The sort direction, either 'asc' or 'desc'.
 * @returns {function} - Comparator function for sorting.
 */
export const getComparator = (field, direction) => {
 
    return (a, b) => {
      if(field==="default"){
        field="createdOn";
        direction = "asc"; 
      }
      const valueA = a[field];
      const valueB = b[field];
  
      // Convert values to appropriate types if necessary
      const typeA = typeof valueA;
      const typeB = typeof valueB;
  
      if (typeA === 'string' && typeB === 'string') {
        // Handle string sorting
        if (direction === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (typeA === 'number' && typeB === 'number') {
        // Handle numeric sorting
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (field === 'createdOn' || field === 'updatedOn') {
        // Handle date sorting
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
  
      // Default comparison if types are not handled above
      return 0;
    };
  };
  