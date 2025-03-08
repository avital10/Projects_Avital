import { useState } from "react";
import One from "./One";
import './List.css';
import About from "../About";
import Kampain from "./Kampain";

const List = (props) => {
  let arr = props.Donateions;
  const [fillterArr, setFillterArr] = useState(arr);
  const [searchT, setSearchT] = useState("");
  const [dedectionT, setDedicationT] = useState("");

  // הוספת סטייטים עבור תיבות הסימון
  const [isSortOldChecked, setIsSortOldChecked] = useState(false);
  const [isSortNewChecked, setIsSortNewChecked] = useState(false);
  const [isSumChecked, setIsSumChecked] = useState(false);

  // מיון לפי סכום
  const sortSum = () => {
    const arrD = [...fillterArr];
    arrD.sort((a, b) => b.sum - a.sum); // סדר יורד לפי סכום
    setFillterArr(arrD);
  };

  // מיון לפי תאריך חדש
  const sortNew = () => {
    const arrDonation = [...fillterArr];
    arrDonation.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    setFillterArr(arrDonation);
  };

  //מיון לפי תאריך ישן
  const sortOld = () => {
    const arrDonation = [...fillterArr];  // השתמש ב-fillterArr ולא ב-filterarr
    arrDonation.sort((a, b) => {
      const dateA = new Date(a.date);  // ודא ש-a.time קיימת
      const dateB = new Date(b.date);  // ודא ש-b.time קיימת
      return dateA - dateB;
    });
    setFillterArr(arrDonation);
  };

  // סינון לפי שם
  const byName = (e) => {
    e.preventDefault();//מונע שליחה עד לסיום
    const newFilteredArr = arr.filter((item) => //עובר על המערך ומסנן את התרומות שהשם שלהם מתאים לשם שהוזן בחיפוש
      item.name.toLowerCase().includes(searchT.toLowerCase()) //משווה בין השמות ע"י הפיכת השמות ותיבת החיפוש לאותיות קטנות
    );
    setFillterArr(newFilteredArr);
  };

  // סינון לפי הקדשה
  const byDedication = (e) => {
    e.preventDefault();
    const newFilteredArr = arr.filter((item) =>
      item.dedication && item.dedication.toLowerCase().includes(dedectionT.toLowerCase())
    );
    setFillterArr(newFilteredArr);
  };

  // מחיקת הסינונים
  const clearFilter = () => {
    setFillterArr(arr);
    setSearchT("");
    setDedicationT("");
    setIsSortOldChecked(false);
    setIsSortNewChecked(false);
    setIsSumChecked(false);
  };

  // פונקציה שבודקת אם נלחץ הכפתור
  const change = (e) => {
    let { type, value, name } = e.target;
    if (type === "checkbox") {
      value = e.target.checked;
      if (value) {
        // אם תיבת הסימון נבחרה (checked), אז נעדכן רק אותה ונבטל את השאר
        if (name === "sum") {
          setIsSumChecked(true);
          setIsSortOldChecked(false);
          setIsSortNewChecked(false);
          sortSum();
        } else if (name === "sortOld") {
          setIsSortOldChecked(true);
          setIsSumChecked(false);
          setIsSortNewChecked(false);
          sortOld();
        } else if (name === "sortNew") {
          setIsSortNewChecked(true);
          setIsSumChecked(false);
          setIsSortOldChecked(false);
          sortNew();
        }
      } else {
        // אם תיבת הסימון הוסרה (unchecked), נבטל את כל האפשרויות
        if (name === "sum") setIsSumChecked(false);
        if (name === "sortOld") setIsSortOldChecked(false);
        if (name === "sortNew") setIsSortNewChecked(false);
      }
    }
  };

  return (
    <>
      {/* הצגת הקמפיין והאודות */}
      <Kampain
        yaad={500000} donations={props.Donateions}
        imageSrc="PicS.jpg" coin={props.coin}
      />
      <About />
      {/* הצגת אפשריות מיון וסינון */}
      <div className="filters-container">
        <h4>אפשרויות חיפוש:</h4>
        <label>סינון לפי תאריך מהישן לחדש</label>
        <input 
          name="sortOld" 
          type="checkbox" 
          checked={isSortOldChecked} 
          onChange={change} 
        />
        <br />
        <label>סינון לפי תאריך מהחדש לישן</label>
        <input 
          name="sortNew" 
          type="checkbox" 
          checked={isSortNewChecked} 
          onChange={change} 
        />
        <br />
        <label>גובה התרומה</label>
        <input 
          name="sum" 
          type="checkbox" 
          checked={isSumChecked} 
          onChange={change} 
        />
        <br />
        <label htmlFor="">הכנס טקסט לחיפוש לפי שם</label>
        <input 
          type="text" 
          value={searchT} 
          onChange={(e) => setSearchT(e.target.value)} 
        />
        <button onClick={byName}> חיפוש</button>
        <br />
        <label htmlFor="">הכנס טקסט לחיפוש לפי הקדשה</label>
        <input 
          type="text" 
          value={dedectionT} 
          onChange={(e) => setDedicationT(e.target.value)} 
        />
        <button onClick={byDedication}> חיפוש לפי הקדשה</button>
        <button onClick={clearFilter}>נקה סינון</button>
      </div>
      {/* מציג תרוצה בודדת */}
      {/* כאן נשתמש ב-grid-Layout */}
      <div className="donations-list">
        {fillterArr.map((item) => (
          <div className="donation-item" key={item.id}>
            {/* התרומה ואת סוג המטבע שולח כל תרומה בודדת את פרטי */}
            <One donation={item} coin={props.coin} />
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
