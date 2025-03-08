import { useState } from "react";
import "./MyNavBar";
import './Donate.css';
import About from "../About";
import SendIcon from '@mui/icons-material/Send'; // הוספנו את הייבוא של SendIcon
import { Button } from '@mui/material'; // הוספנו את הייבוא של Button מ-MUI

let Donate = (props) => {

    let count = 0;
    let [myErorrs, setMyerorrs] = useState({});
    let [empty, setEmpty] = useState({
        name: "",
        sum: 0,
        dedication: ""
    });
    //בדיקות תקינות

    const validate = () => {
        let err = {};
        if (!empty.sum)
            err.sum = "אנא הקש סכום";
        else if (empty.sum < 0)
            err.sum = "אנא הקש סכום גדול מ-0";
        if (empty.dedication.length > 20)
            err.dedication = "הקדשה ארוכה מידי";
        if (!empty.name)
            err.name = "שדה חובה";

        return err;
    };
    // פונקציה ששולחת לפונקצית הוספת תרומה 

    const save = (e) => {
        e.preventDefault();
        count++;
        console.log(e);
        console.log(empty);
        let result = validate();
        if (Object.keys(result).length === 0) {
            alert("התרומה נקלטה בהצלחה");
            props.onAdd(empty);
        }
        setMyerorrs(result);
    };
    //  הפונקציה בודקת את סוג האינפוט ומעדכנת אותם לאוביקט

    const change = (e) => {
        let { type, value, name } = e.target;
        if (type === "number")
            value = +value;
        let copy = { ...empty };
        copy[name] = value;
        setEmpty(copy);
    };

    return (
        <>
            <div className="form-container">
                <div>
                    <img src="dfff935f-516d-9f57-d367-ed05b8bebc1f.png" alt="תמונה" />
                </div>
                {/* בשליחה של הטופס שולח לפונקציה שמירה */}
                <form className="form-add" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={save}>
                    {/* כל ערך נשמר באיינפוט וברגע שינוי נשלח לפונקציה change */}
                    <label>שם</label>
                    <input name="name" type="text" value={empty.name} onChange={change} />
                    {myErorrs.name && <div style={{ color: "red" }}>
                        {myErorrs.name}</div>}
                    {/* ברגע שיש שגיאה מציג את הודעת שגיאה מתאימה */}
                    <label>סכום</label>
                    <input name="sum" type="number" value={empty.sum} onChange={change} />
                    {myErorrs.sum && <div style={{ color: "red" }}>
                        {myErorrs.sum}</div>}

                    <label>הקדשה</label>
                    <input name="dedication" type="text" value={empty.dedication} onChange={change} />
                    {myErorrs.dedication && <div style={{ color: "red" }}>
                        {myErorrs.dedication}</div>}

                    {/* שדרוג הכפתור להוספת SendIcon */}
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />} // הוספת ה-SendIcon לכפתור
                    >
                        תרום
                    </Button>
                </form>
            </div>
        </>
    );
}

export default Donate;



