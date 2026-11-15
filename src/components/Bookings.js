import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Bookings() {
    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    
    // 1. Get data passed via Router
    const receivedData = location.state?.attachedData;

    // 2. Fetch data from Supabase (Fallback table view)
    useEffect(() => {
        const fetchBookings = async () => {
            const { data } = await supabase.from('bookings').select('*');
            if (data) setBookings(data);
        };
        fetchBookings();
    }, []);

    if (!receivedData) {
        // If user navigates directly to /bookings without submitting form
        return (
            <div className="container mt-4">
                <h2>ERROR! No data is passed on.</h2>
                <p>Please go to the <a href="/">Home</a> page and submit a booking.</p>
            </div>
        );
    }

    return (
        <div className="container mt-4" style={{ minHeight: '60vh' }}>
            <div className="bg-light p-4 rounded border">
                {/* Header */}
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h1>Repair Booking</h1>
                    <div className="text-end">
                        <p className="mb-0">Amount Due: <br /> 
                            <span style={{fontSize: '24px', fontWeight: 'bold'}}>
                                ${(receivedData.sharedBond + (receivedData.sharedWarranty ? 0 : 85)).toFixed(2)}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div className="row">
                    <div className="col-md-6">
                        <h4>Customer Details:</h4>
                        <p>Customer type: {receivedData.sharedCustomerType ? "customer" : "business"}</p>
                        <p>Title: {receivedData.customerDetails.title}</p>
                        <p>First name: {receivedData.customerDetails.firstname}</p>
                        <p>Last name: {receivedData.customerDetails.lastname}</p>
                    </div>
                    <div className="col-md-6">
                        <h4>Repair Job:</h4>
                        <p>Job number: xxxx</p>
                        <p>Invoice Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <hr />
                <h4>Courtesy Loan Device Details:</h4>
                <p>Bond: ${receivedData.sharedBond.toFixed(2)}</p>
                
                <hr />
                <div className="d-flex justify-content-between">
                    <div>
                        <strong>PHONE FIX SERVICES</strong><br/>
                        Address: 501 Gloucester Street<br/>
                        Taradale, Napier 4112
                    </div>
                    <div className="text-end">
                        <strong>Contact Us:</strong><br/>
                        Phone: 06 974 8000
                    </div>
                </div>
            </div>

            {/* Database Table View (From previous lab) */}
            <hr className="mt-5" />
            <h3>All Database Bookings</h3>
            <div className="row">
                {bookings.map(b => (
                    <div key={b.id} className="col-md-4 mb-2">
                        <div className="border p-2 bg-warning rounded">
                            <p>{b.title}: {b.first_name} {b.last_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bookings;