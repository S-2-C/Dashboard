  // Function to format the date to Mexican timezone
export const formatDateToMexicanTimezone = (timestamp: any) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Mexico_City',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleString('es-MX', options);
  };


export function timeDifference(time1: Date, time2: Date) {
    const date1 = new Date(time1);
    const date2 = new Date(time2);
  
    // Calculate the difference in milliseconds
    //@ts-ignore
    const differenceInMilliseconds = Math.abs(date2 - date1);
  
    // Calculate days, hours, minutes, and seconds
    const minutes = Math.ceil(
      (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    console.log("minutes", minutes);
  
    return minutes;
  }
