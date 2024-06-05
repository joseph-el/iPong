export function formatJoinDate(dateString: string): string {
    // Parse the input date string to a Date object
    const date = new Date(dateString);
    
    // Extract the year and month from the date object
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth(); 
    

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    // Get the month name
    const monthName = monthNames[month];
    
    // Return the formatted string
    return `Joined ${monthName} ${year}`;
  }