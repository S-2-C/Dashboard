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


  export const getSentimentColor = (ms: number) => {
    if (ms > 3) {
        return {color: '#0043DE', text: 'Very good', icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26"><g fill="none"><defs><mask id="pepiconsPencilThumbsUpCircleFilled0"><path fill="#fff" d="M0 0h26v26H0z"/><g fill="#000"><path fill-rule="evenodd" d="M8.7 11.503H6.2v5.5h2.5zm-2.5-1a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1zm6.544-4.673c.3.05.501.333.451.632l-.223 1.342a5.12 5.12 0 0 1-2.21 3.418l-.61-.914a4.022 4.022 0 0 0 1.736-2.685l.224-1.342a.55.55 0 0 1 .632-.451" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.416 6.164a.733.733 0 0 0-1.23.34l-1.065-.266c.345-1.38 2.065-1.857 3.071-.85l.047.046a.55.55 0 1 1-.777.777z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.992 9.65a.55.55 0 0 1-.4-.665l.163-.653c.062-.246.089-.5.08-.753l-.015-.451a1.481 1.481 0 0 0-.378-.939l.817-.733c.405.45.638 1.029.659 1.634l.015.451a3.82 3.82 0 0 1-.112 1.058l-.163.652a.55.55 0 0 1-.666.4" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.85 9.118a.55.55 0 0 1 .55-.55h1.647a.55.55 0 0 1 0 1.099H15.4a.55.55 0 0 1-.55-.55" clip-rule="evenodd"/><path fill-rule="evenodd" d="M18.94 10.837a2.117 2.117 0 0 0-1.893-1.17V8.569c1.218 0 2.332.688 2.876 1.777l.362.723a.55.55 0 0 1-.983.491z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M19.05 17.32a.55.55 0 0 1-.32-.707l.594-1.568a4.832 4.832 0 0 0-.04-3.524l1.019-.412a5.93 5.93 0 0 1 .049 4.325l-.594 1.568a.55.55 0 0 1-.708.319" clip-rule="evenodd"/><path fill-rule="evenodd" d="M16.098 17.926a2.122 2.122 0 0 0 2.385-.93l.293-.477a.55.55 0 1 1 .936.576l-.293.477a3.22 3.22 0 0 1-3.62 1.411z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.918 17.249a.55.55 0 0 1 .646-.431l5.493 1.098a.55.55 0 0 1-.216 1.077l-5.492-1.098a.55.55 0 0 1-.43-.646" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.46 10.216a.55.55 0 0 1 .55.55v6.59a.55.55 0 1 1-1.098 0v-6.59a.55.55 0 0 1 .549-.55" clip-rule="evenodd"/><path d="M8.45 15.504a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/></g></mask></defs><circle cx="13" cy="13" r="13" fill="#289f5b" mask="url(#pepiconsPencilThumbsUpCircleFilled0)"/></g></svg>}; // Green to Blue
    } else if ( ms > 1) {
        return {color: '#089439', text: 'Good', icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26"><g fill="none"><defs><mask id="pepiconsPencilThumbsUpCircleFilled0"><path fill="#fff" d="M0 0h26v26H0z"/><g fill="#000"><path fill-rule="evenodd" d="M8.7 11.503H6.2v5.5h2.5zm-2.5-1a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1zm6.544-4.673c.3.05.501.333.451.632l-.223 1.342a5.12 5.12 0 0 1-2.21 3.418l-.61-.914a4.022 4.022 0 0 0 1.736-2.685l.224-1.342a.55.55 0 0 1 .632-.451" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.416 6.164a.733.733 0 0 0-1.23.34l-1.065-.266c.345-1.38 2.065-1.857 3.071-.85l.047.046a.55.55 0 1 1-.777.777z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.992 9.65a.55.55 0 0 1-.4-.665l.163-.653c.062-.246.089-.5.08-.753l-.015-.451a1.481 1.481 0 0 0-.378-.939l.817-.733c.405.45.638 1.029.659 1.634l.015.451a3.82 3.82 0 0 1-.112 1.058l-.163.652a.55.55 0 0 1-.666.4" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.85 9.118a.55.55 0 0 1 .55-.55h1.647a.55.55 0 0 1 0 1.099H15.4a.55.55 0 0 1-.55-.55" clip-rule="evenodd"/><path fill-rule="evenodd" d="M18.94 10.837a2.117 2.117 0 0 0-1.893-1.17V8.569c1.218 0 2.332.688 2.876 1.777l.362.723a.55.55 0 0 1-.983.491z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M19.05 17.32a.55.55 0 0 1-.32-.707l.594-1.568a4.832 4.832 0 0 0-.04-3.524l1.019-.412a5.93 5.93 0 0 1 .049 4.325l-.594 1.568a.55.55 0 0 1-.708.319" clip-rule="evenodd"/><path fill-rule="evenodd" d="M16.098 17.926a2.122 2.122 0 0 0 2.385-.93l.293-.477a.55.55 0 1 1 .936.576l-.293.477a3.22 3.22 0 0 1-3.62 1.411z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.918 17.249a.55.55 0 0 1 .646-.431l5.493 1.098a.55.55 0 0 1-.216 1.077l-5.492-1.098a.55.55 0 0 1-.43-.646" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.46 10.216a.55.55 0 0 1 .55.55v6.59a.55.55 0 1 1-1.098 0v-6.59a.55.55 0 0 1 .549-.55" clip-rule="evenodd"/><path d="M8.45 15.504a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/></g></mask></defs><circle cx="13" cy="13" r="13" fill="#b2ce50" mask="url(#pepiconsPencilThumbsUpCircleFilled0)"/></g></svg>}; // Blue to Yellow
    } else if (ms > 0) {
        return {color: '#A4A4A4', text: 'Neutral', icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26"><g fill="none"><defs><mask id="pepiconsPencilThumbsUpCircleFilled0"><path fill="#fff" d="M0 0h26v26H0z"/><g fill="#000"><path fill-rule="evenodd" d="M8.7 11.503H6.2v5.5h2.5zm-2.5-1a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1zm6.544-4.673c.3.05.501.333.451.632l-.223 1.342a5.12 5.12 0 0 1-2.21 3.418l-.61-.914a4.022 4.022 0 0 0 1.736-2.685l.224-1.342a.55.55 0 0 1 .632-.451" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.416 6.164a.733.733 0 0 0-1.23.34l-1.065-.266c.345-1.38 2.065-1.857 3.071-.85l.047.046a.55.55 0 1 1-.777.777z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.992 9.65a.55.55 0 0 1-.4-.665l.163-.653c.062-.246.089-.5.08-.753l-.015-.451a1.481 1.481 0 0 0-.378-.939l.817-.733c.405.45.638 1.029.659 1.634l.015.451a3.82 3.82 0 0 1-.112 1.058l-.163.652a.55.55 0 0 1-.666.4" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.85 9.118a.55.55 0 0 1 .55-.55h1.647a.55.55 0 0 1 0 1.099H15.4a.55.55 0 0 1-.55-.55" clip-rule="evenodd"/><path fill-rule="evenodd" d="M18.94 10.837a2.117 2.117 0 0 0-1.893-1.17V8.569c1.218 0 2.332.688 2.876 1.777l.362.723a.55.55 0 0 1-.983.491z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M19.05 17.32a.55.55 0 0 1-.32-.707l.594-1.568a4.832 4.832 0 0 0-.04-3.524l1.019-.412a5.93 5.93 0 0 1 .049 4.325l-.594 1.568a.55.55 0 0 1-.708.319" clip-rule="evenodd"/><path fill-rule="evenodd" d="M16.098 17.926a2.122 2.122 0 0 0 2.385-.93l.293-.477a.55.55 0 1 1 .936.576l-.293.477a3.22 3.22 0 0 1-3.62 1.411z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.918 17.249a.55.55 0 0 1 .646-.431l5.493 1.098a.55.55 0 0 1-.216 1.077l-5.492-1.098a.55.55 0 0 1-.43-.646" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.46 10.216a.55.55 0 0 1 .55.55v6.59a.55.55 0 1 1-1.098 0v-6.59a.55.55 0 0 1 .549-.55" clip-rule="evenodd"/><path d="M8.45 15.504a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/></g></mask></defs><circle cx="13" cy="13" r="13" fill="#dbb80a" mask="url(#pepiconsPencilThumbsUpCircleFilled0)"/></g></svg>}; // Blue to Yellow
    }else if (ms > -1) {
        return {color: '#DD7878', text: 'Bad', icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26"><g fill="none"><defs><mask id="pepiconsPencilThumbsDownCircleFilled0"><path fill="#fff" d="M0 0h26v26H0z"/><g fill="#000"><path fill-rule="evenodd" d="M17.1 13.081h2.5v-5.5h-2.5zm2.5 1a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1h-2.5a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1zm-6.544 4.674a.55.55 0 0 1-.451-.632l.223-1.342a5.12 5.12 0 0 1 2.21-3.419l.61.914a4.021 4.021 0 0 0-1.736 2.686l-.224 1.342a.55.55 0 0 1-.632.451" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.384 18.42a.733.733 0 0 0 1.23-.34l1.065.266c-.345 1.381-2.065 1.858-3.071.851l-.047-.046a.55.55 0 1 1 .777-.777z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.808 14.934a.55.55 0 0 1 .4.666l-.163.653c-.062.246-.089.5-.08.753l.015.451c.012.348.146.68.378.939l-.817.733a2.58 2.58 0 0 1-.658-1.634l-.016-.451a3.821 3.821 0 0 1 .112-1.058l.163-.652a.55.55 0 0 1 .666-.4" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.95 15.467a.55.55 0 0 1-.55.55H8.753a.55.55 0 1 1 0-1.1H10.4a.55.55 0 0 1 .55.55" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.86 13.748a2.117 2.117 0 0 0 1.893 1.17v1.098a3.215 3.215 0 0 1-2.876-1.777l-.362-.723a.55.55 0 1 1 .983-.491z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.75 7.264a.55.55 0 0 1 .32.708L6.475 9.54a4.832 4.832 0 0 0 .04 3.524l-1.019.412a5.93 5.93 0 0 1-.049-4.325l.594-1.568a.55.55 0 0 1 .708-.319" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.702 6.659a2.122 2.122 0 0 0-2.385.93l-.293.477a.55.55 0 1 1-.936-.576l.293-.477a3.22 3.22 0 0 1 3.62-1.411z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.882 7.336a.55.55 0 0 1-.646.431L9.743 6.67a.55.55 0 1 1 .216-1.077L15.45 6.69a.55.55 0 0 1 .43.646" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.34 14.369a.55.55 0 0 1-.55-.55V7.23a.55.55 0 1 1 1.098 0v6.59a.55.55 0 0 1-.549.55" clip-rule="evenodd"/><path d="M17.35 9.081a1 1 0 1 1 2 0a1 1 0 0 1-2 0"/></g></mask></defs><circle cx="13" cy="13" r="13" fill="#db840a" mask="url(#pepiconsPencilThumbsDownCircleFilled0)"/></g></svg>}; // Yellow to Red
    } else {
        return {color: '#C31F08', text: 'Very bad', icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26"><g fill="none"><defs><mask id="pepiconsPencilThumbsDownCircleFilled0"><path fill="#fff" d="M0 0h26v26H0z"/><g fill="#000"><path fill-rule="evenodd" d="M17.1 13.081h2.5v-5.5h-2.5zm2.5 1a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1h-2.5a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1zm-6.544 4.674a.55.55 0 0 1-.451-.632l.223-1.342a5.12 5.12 0 0 1 2.21-3.419l.61.914a4.021 4.021 0 0 0-1.736 2.686l-.224 1.342a.55.55 0 0 1-.632.451" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.384 18.42a.733.733 0 0 0 1.23-.34l1.065.266c-.345 1.381-2.065 1.858-3.071.851l-.047-.046a.55.55 0 1 1 .777-.777z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.808 14.934a.55.55 0 0 1 .4.666l-.163.653c-.062.246-.089.5-.08.753l.015.451c.012.348.146.68.378.939l-.817.733a2.58 2.58 0 0 1-.658-1.634l-.016-.451a3.821 3.821 0 0 1 .112-1.058l.163-.652a.55.55 0 0 1 .666-.4" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.95 15.467a.55.55 0 0 1-.55.55H8.753a.55.55 0 1 1 0-1.1H10.4a.55.55 0 0 1 .55.55" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.86 13.748a2.117 2.117 0 0 0 1.893 1.17v1.098a3.215 3.215 0 0 1-2.876-1.777l-.362-.723a.55.55 0 1 1 .983-.491z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.75 7.264a.55.55 0 0 1 .32.708L6.475 9.54a4.832 4.832 0 0 0 .04 3.524l-1.019.412a5.93 5.93 0 0 1-.049-4.325l.594-1.568a.55.55 0 0 1 .708-.319" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.702 6.659a2.122 2.122 0 0 0-2.385.93l-.293.477a.55.55 0 1 1-.936-.576l.293-.477a3.22 3.22 0 0 1 3.62-1.411z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.882 7.336a.55.55 0 0 1-.646.431L9.743 6.67a.55.55 0 1 1 .216-1.077L15.45 6.69a.55.55 0 0 1 .43.646" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.34 14.369a.55.55 0 0 1-.55-.55V7.23a.55.55 0 1 1 1.098 0v6.59a.55.55 0 0 1-.549.55" clip-rule="evenodd"/><path d="M17.35 9.081a1 1 0 1 1 2 0a1 1 0 0 1-2 0"/></g></mask></defs><circle cx="13" cy="13" r="13" fill="#db0a0a" mask="url(#pepiconsPencilThumbsDownCircleFilled0)"/></g></svg>}; // Red
    }
  };



export const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const hex = (color: string) => {
    color = color.replace(/^#/, '');
    if (color.length === 3) {
      color = color.split('').map(char => char + char).join('');
    }
    return color;
  };

  const hex1 = hex(color1);
  const hex2 = hex(color2);

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  const rgb = (r << 16) + (g << 8) + b;
  return `#${rgb.toString(16).padStart(6, '0')}`;
};
