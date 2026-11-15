//Import all dependencies, other Components
import { useState, useEffect } from 'react';

//clean what the user types (same rules as before)
const cleaners = {
    firstName: (v) => v.replace(/[^A-Za-z\s-]/g, ''),
    lastName: (v) => v.replace(/[^A-Za-z\s-]/g, ''),
    postCode: (v) => v.replace(/\D/g, '').slice(0, 4),
    phoneNumber: (v) => v.replace(/[^0-9\s()+-]/g, '')
};

//Function Component
function FormCustomerDetail({ passDataToParent, sendCustomerDetails }) {
    //----------
    //customer type state (booleans, as React expects for "checked")
    const [type, setType] = useState({customer: true, business: false});
    //update customer type
    const updateCustomerType = (event) => {
        if (event.target.value === "customer") {
            passDataToParent(true);
            setType({customer: true, business: false});
        } else {
            passDataToParent(false);
            setType({customer: false, business: true});
        }
    }
    //----------
    //customer details
    const [customerDetails, setCustomerDetails] = useState({
        title: "Mr", firstName: "", lastName: "", street: "", suburb: "",
        city: "", postCode: "", phoneNumber: "", email: ""
    });

    const handleChange = (event) => {
        const { name } = event.target; //Get updated pair-value: "name" and "value"
        let value = event.target.value;
        if (cleaners[name]) {
            value = cleaners[name](value);
            event.target.value = value;
        }
        setCustomerDetails( {...customerDetails, ...{[name]: value} } );
    }

    //useEffect() hook "SYNCHRONIZE" a component with another component
    useEffect( () => {
        //Call-back function
        sendCustomerDetails(customerDetails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerDetails]);

    //Component UI: HTML Rendering
    return(<>
        <h2>Customer Details</h2>
        {/*Customer type*/}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
                <legend className="col-11 float-none w-auto">Customer type *</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Customer</label>
                    <input type="radio" name="customer-type" value="customer"
                        checked={type.customer}
                        onChange={(event) => updateCustomerType(event)} required/>
                </div>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Business</label>
                    <input type="radio" name="customer-type" value="business"
                        checked={type.business}
                        onChange={(event) => updateCustomerType(event)} />
                </div>
            </fieldset>
        </div>

        {/*Details*/}
        <div className="row mt-2">
            <label className="col-12 col-md-12 col-lg-4">Title *</label>
            <select className="col-12 col-md-12 col-lg-7" defaultValue="Mr" name="title"
                onChange={handleChange} required>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
            </select>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">First Name *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" name="firstName"
                pattern="^[A-Za-z\s-]+$" title="Only letters, spaces and hyphens are allowed"
                onChange={handleChange} required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" name="lastName"
                pattern="^[A-Za-z\s-]+$" title="Only letters, spaces and hyphens are allowed"
                onChange={handleChange} required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Street *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" name="street"
                onChange={handleChange} required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Suburb</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" name="suburb"
                onChange={handleChange} />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">City *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" name="city"
                onChange={handleChange} required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Post Code *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" inputMode="numeric" name="postCode"
                pattern="\d{4}" maxLength="4" title="Post code must be exactly 4 numbers"
                onChange={handleChange} required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Phone Number *</label>
            <input className="col-12 col-md-12 col-lg-7" type="tel" name="phoneNumber"
                pattern="^[0-9\s()+-]+$" title="Only numbers, spaces and ( ) + - symbols are allowed"
                onChange={handleChange} required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Email *</label>
            <input className="col-12 col-md-12 col-lg-7" type="email" name="email"
                onChange={handleChange} required/>
        </div>
 </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCustomerDetail;