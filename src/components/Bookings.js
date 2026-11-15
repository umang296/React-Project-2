import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from './include/supabaseClient';

const money = (n) => `$${Number(n ?? 0).toFixed(2)}`;

function Bookings() {
    const location = useLocation();
    const [bookings, setBookings] = useState([]);

    // 1. Data passed from Home via the Router
    const receivedData = location.state?.attachedData;

    // 2. All bookings from Supabase (database table view)
    useEffect(() => {
        const fetchBookings = async () => {
            const { data } = await supabase.from('bookings').select('*');
            if (data) setBookings(data);
        };
        fetchBookings();
    }, []);

    if (!receivedData) {
        return (
            <div className="container mt-4">
                <h2>ERROR! No data is passed on.</h2>
                <p>Please go to the <Link to="/">Home</Link> page and submit a booking.</p>
            </div>
        );
    }

    const {
        customerDetails = {},
        repairDetails = {},
        courtesyDetails = {},
        costDetails = {},
        sharedCustomerType,
        sharedWarranty,
        jobNumber,
    } = receivedData;

    return (
        <div className="container mt-4" style={{ minHeight: '60vh' }}>
            <div className="bg-light p-4 rounded border">
                {/* Header */}
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h1>Repair Booking</h1>
                    <div className="text-end">
                        <p className="mb-0">Amount Due: <br />
                            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {money(costDetails.totalGst)}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Customer + job details */}
                <div className="row">
                    <div className="col-md-6">
                        <h4>Customer Details:</h4>
                        <p>Customer type: {sharedCustomerType ? "customer" : "business"}</p>
                        <p>Title: {customerDetails.title}</p>
                        <p>First name: {customerDetails.firstName}</p>
                        <p>Last name: {customerDetails.lastName}</p>
                    </div>
                    <div className="col-md-6">
                        <h4>Repair Job:</h4>
                        <p>Job number: {jobNumber}</p>
                        <p>Invoice Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Repair details */}
                <hr />
                <h4>Repair Details:</h4>
                <div className="row">
                    <div className="col-md-6">
                        <p>Purchase date: {repairDetails.purchaseDate}</p>
                        <p>Repair date: {repairDetails.repairDate}</p>
                        <p>Under warranty: {sharedWarranty ? "Yes" : "No"}</p>
                        <p>IMEI number: {repairDetails.imeiNumber}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Make: {repairDetails.make}</p>
                        <p>Model number: {repairDetails.modelNumber || "-"}</p>
                        <p>Fault category: {repairDetails.faultCategory}</p>
                        <p>Description: {repairDetails.description}</p>
                    </div>
                </div>

                {/* Courtesy loan items */}
                <hr />
                <h4>Courtesy Loan Device Details:</h4>
                <table className="table table-bordered bg-white" style={{ width: '60%' }}>
                    <thead>
                        <tr><th>Item(s)</th><th>Bond</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{courtesyDetails.courtesyItems || "None"}</td>
                            <td>{money(costDetails.bond)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Totals */}
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <h4>TOTALS:</h4>
                        <p className="mb-1">Bond: {money(costDetails.bond)}</p>
                        <p className="mb-1">Service fee: {money(costDetails.service)}</p>
                        <p className="mb-1">Total: {money(costDetails.total)}</p>
                        <p className="mb-1">GST: {money(costDetails.gst)}</p>
                        <p className="fw-bold">Total (+GST): {money(costDetails.totalGst)}</p>
                    </div>
                </div>

                {/* Footer */}
                <hr />
                <div className="d-flex justify-content-between">
                    <div>
                        <strong>PHONE FIX SERVICES</strong><br />
                        Address: 501 Gloucester Street<br />
                        Taradale, Napier 4112
                    </div>
                    <div className="text-end">
                        <strong>Contact Us:</strong><br />
                        Phone: 06 974 8000
                    </div>
                </div>
            </div>

            {/* Database table view */}
            <hr className="mt-5" />
            <h3>All Database Bookings</h3>
            <div className="row">
                {bookings.map(b => (
                    <div key={b.id} className="col-md-4 mb-2">
                        <div className="border p-2 bg-warning rounded">
                            <p className="mb-0">{b.title}: {b.first_name} {b.last_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bookings;