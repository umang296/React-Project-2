//IMPORT
//COMPONENT FUNCTION
function Footer() {
    //States

    //Data
    let footerStyle = {
        minHeight: '10vh',
        fontSize: '1.2em',
        color : 'white',
        backgroundColor: '#2C3E50',
        /**Centralize vertically and horizontally content  */
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        border: '1px solid black'
    };

    //Functions and methods

    //UI render
    return (
        <>
            <footer style={footerStyle}>
                <p className="text-center">Created by Umang Maharjan @2026</p>
            </footer>
        </>
    );

}

//EXPORT
export default Footer;