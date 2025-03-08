import React from 'react';
import MyNavBar from './MyNavBar';
import './kampain.css'
import { fromSToCoint } from "./function"
const Kampain = ({ yaad, donations, imageSrc, coin }) => {
  let t = "₪";
  if (coin.type === "D")
    t = '$'
  // חישוב הסכום הכולל של התרומות
  const totalDonations = donations.reduce((acc, donation) => acc + donation.sum, 0);

  // חישוב מספר התורמים
  const totalDonors = donations.length;

  // חישוב האחוז מתוך היעד
  const donationPercentage = ((totalDonations / yaad) * 100).toFixed(2);

  return (
    // מציג את כל הנתונים ואת יעד הקמפיין ותרומות עד כה משנה משקל לדולר לפי הבחירה 
    <div className="campaign">
      <div className="campaign-image">
        <img src={imageSrc} alt="Campaign" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="campaign-details">
        <h2>יעד הקמפיין: {`${Math.floor(fromSToCoint(yaad, coin.dollarRate, coin.type))}${t}`}</h2>
        <h3>תרומות עד כה: {`${Math.floor(fromSToCoint(totalDonations, coin.dollarRate, coin.type))}${t}`}</h3>
        <h3>התקדמות: {donationPercentage}%</h3>
        {/* פס התקדמות משציג את האחוזים שעברו */}
        <input type="range" min="0" max={yaad} value={totalDonations} step="1"></input>
        <h3>מספר התורמים: {totalDonors}</h3>
      </div>
    </div>
  );
};

export default Kampain;
