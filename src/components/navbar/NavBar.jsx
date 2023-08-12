import './navbar.styles.css';
import ForLargeScreen from './navSubComp/forLargeScreen';
import ForSmallScreen from './navSubComp/forSmallScreen';
import React, { useState, useEffect } from "react";


function NavBar() {
    const [size, setSize] = useState({ width: 771 });

    // This function updates the state thus re-render components
    const resizeHanlder = () => {
        const width = window.innerWidth;

        setSize({
            width: width,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", resizeHanlder);
        return () => {
            window.removeEventListener("resize", resizeHanlder);
        }
    }, []);

    if (window.innerWidth > 770) {
        return (
            <div>
                {!size || size.width > 770 ? <ForLargeScreen /> : <ForSmallScreen />}
            </div>
        )
    }
    else {
        return <ForSmallScreen />
    }


}

export default NavBar;