import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MyNavBar from './MyNavBar';
import { Route, Routes } from 'react-router-dom';
import Donate from './Donate';
import List from './List';
import Kampain from './Kampain';
import About from '../About';
//Date פונקציה ששולפת מהלוקאלסטוראז וממחירה את התאריכים לסוג  

function getFromLocalstoar() {

  let result = localStorage.getItem('donations');
  if (!result)
    // אם ריק מציג ערך ברירת מחדל
    return [
      { name: "avital", sum: 500, dedication: "ברכה והצלחה", id: 1, date: new Date(2024, 10, 5) },
      { name: "chani", sum: 400, dedication: "ברכה", id: 2, date: new Date(2024, 10, 9) }
    ]
  //המרה לסוג מחרוזת
  const x = JSON.parse(result)
  return x.map(item => ({ ...item, date: new Date(item.date) }))
}
function App() {
  const [Donateions, setDonateions] = useState(getFromLocalstoar);
  const [Coints, setCoints] = useState({ type: "S", dollarRate: 3.5 });
// קורה בעת טעינת הדף
  useEffect(() => {
    // קריאה לשרת המציג את שער הדולר לפי השער הנוכחי
    fetch("https://v6.exchangerate-api.com/v6/a0f992642b0926e11ac28ff0/latest/USD")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(data.conversion_rates.ILS);
        setCoints({ ...Coints, dollarRate: data.conversion_rates.ILS });
      })
      .catch(err => console.log(err));
  }, []); // [Coints] תוספת למנוע אינפיניטי לופ של useEffect

  const AddType = (type) => {
    setCoints({ ...Coints, type: type })
  }
  // donate של saveפונקציה להוספת תרומה חדשה מזמנים אותה ב
  const addToDonate = (Donate) => {
    Donate.id = Donateions[Donateions.length - 1].id + 1;
    Donate.date = new Date();
    if (Coints.type == "D") {
      Donate.sum = Donate.sum * (Coints.dollarRate);
    }
    let copy = [...Donateions, Donate];
    setDonateions(copy);
    localStorage.setItem('donations', JSON.stringify(copy));  // שמירה של המערך החדש ב-localStorage
    console.log(copy);
  };

  return (
    <>
      <MyNavBar AddType={AddType} />


      {/* שולחים בלתרום את פונקצית הוספת תרומה */}
      <Routes>
        <Route path="/toDonate" element={<Donate onAdd={addToDonate} />} />
        {/* מציג כברירת מחדל את הדף של התרומות ושלוח את מערך התרומות ואת סוג המטבע  */}
        <Route path="/" element={<List Donateions={Donateions} setArr={setDonateions} coin={Coints} />} />
      </Routes>
    </>
  );
}

export default App;
