// IMPORT
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

//COMPONENT FUNCTION 
function Header() {
    //States
    const [hovered, setHovered] = useState('');
    const location = useLocation();

    //Data
    const headerStyle = {
        minHeight: '15vh',
        backgroundColor: '#2C3E50',
    };
    const taglineStyle = {
        minHeight: '15vh',
        fontSize: '2em'     
    };

    //Button colours: change these 3 lines to change the colours
    const buttonColour = '#16A085';  //normal
    const hoverColour = '#1ABC9C';   //when the mouse is over it
    const activeColour = '#117A65';  //the page you are currently on

    //Functions and methods
    const buttonStyle = (path) => ({
        textDecoration: 'none',
        outline: 'none',
        backgroundColor: hovered === path ? hoverColour
                        : (location.pathname === path ? activeColour : buttonColour)
    });

    //UI render
    return (
        <>
           <header className ='row' style={headerStyle}>
            <div className = 'col-12 col-lg-8 text-center text-white d-flex justify-content-center align-items-center' 
                                style={taglineStyle}>Phone Fix Booking System</div>
            <div className = 'col-12 col-lg-4'>
                <div className = 'row'>
                    <Link to="/" className = 'col-12 col-md-6 p-0 m-0 border border-dark text-center text-white'
                        style = {buttonStyle('/')}
                        onMouseEnter={() => setHovered('/')} onMouseLeave={() => setHovered('')}>HOME</Link>
                    <Link to="/advancedjs" className = 'col-12 col-md-6 p-0 m-0 border border-dark text-center text-white'
                        style = {buttonStyle('/advancedjs')}
                        onMouseEnter={() => setHovered('/advancedjs')} onMouseLeave={() => setHovered('')}>EXTENSION</Link>
                </div>
            </div>
           </header>
        </>
    );

}


// EXPORT
export default Header;