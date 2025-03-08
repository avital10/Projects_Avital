//פונקציה מהקבלת את הסכום ואת סוג המטבבע אם היה בשקלים מתיג אם רוצה לראות בדולר ממיר לפי שער הדולר
export function fromSToCoint(sumInShekels, dollarRate, type) {
  if (type == "S")
    return sumInShekels;
  let d = sumInShekels / dollarRate;
  let s = `${d}`
  return s;
}

// פונקציה שמחשבת את זמן ביצוע התרומה
export const timeSince = (dateD) => {
  const now = new Date();
  const minutes = Math.floor((now - dateD) / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(minutes / (60 * 24));

  if (minutes < 60) {
    return `${minutes} דקות `;
  } else if (hours < 24) {
    return `${hours} שעות `;
  } else {
    return `${days} ימים `;
  }
};