import './One.css';  // ייבוא קובץ ה-CSS
import { fromSToCoint, timeSince } from './function';
const One = (props) => {
  let t = "₪";
  if (props.coin.type === "D")
    t = '$'

  // שולח לפונקציה שמחשבת את זמן ביצוע התרומה את תאריך התרומה
  const timeBefore = timeSince(props.donation.date);

  // מציג את התרומה
  return (
    <div className="donation-item">
      <h1>{props.donation.name}</h1>
      <h1>{props.donation.dedication}</h1>
      <h1>{`${Math.floor(fromSToCoint(props.donation.sum, props.coin.dollarRate, props.coin.type))}${t}`}</h1>
      <h1>{timeBefore}</h1>
    </div>
  );
};

export default One;