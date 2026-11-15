import { useState, useEffect } from 'react';

function FormRepairDetail({ passDataToParent, sendRepairDetails }) {
    const [warrantyDisabled, setWarrantyDisabled] = useState(true);
    const [warrantyChecked, setWarrantyChecked] = useState(false);

    //repair details
    const [repairDetails, setRepairDetails] = useState({
        purchaseDate: "", repairDate: "", imeiNumber: "", make: "Apple",
        modelNumber: "", faultCategory: "Screen", description: ""
    });

    const handleChange = (event) => {
        const { name } = event.target;
        let value = event.target.value;
        if (name === 'imeiNumber') {
            value = value.replace(/\D/g, '').slice(0, 15);
            event.target.value = value;
        }
        setRepairDetails( {...repairDetails, ...{[name]: value} } );
    }

    //Call-back function: send repairDetails up to "Home"
    useEffect( () => {
        sendRepairDetails(repairDetails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repairDetails]);

    //send warranty (true = under warranty) up to "Home"
    const updateWarranty = (value) => {
        passDataToParent(value);
    }

    const handlePurchaseDateChange = (e) => {
        handleChange(e);
        const value = e.target.value;
        if (!value) return;
        let diffMonths = Math.ceil(Math.abs(new Date() - new Date(value)) / (1000*60*60*24*30));
        const outOfWarranty = diffMonths > 24;
        setWarrantyDisabled(outOfWarranty);
        setWarrantyChecked(!outOfWarranty);
        updateWarranty(!outOfWarranty);
        document.getElementById('repairDate').min = value;
    }

    const handleWarrantyToggle = (e) => {
        setWarrantyChecked(e.target.checked);
        updateWarranty(e.target.checked); //manual override drives the fee too
    }

    return(<>
        <h2>Repair Details</h2>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Purchase Date *</label>
            <input className="col-12 col-md-12 col-lg-7" type="date" id='purchaseDate' name="purchaseDate"
                max={new Date().toISOString().split("T")[0]}
                onChange={handlePurchaseDateChange} required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
            <input className="col-12 col-md-12 col-lg-7" type="date" id='repairDate' name="repairDate"
                min={new Date().toISOString().split("T")[0]}
                onChange={handleChange} required/>
        </div>
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                <legend className="col-11 float-none w-auto">Under Warranty</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                    <input type="checkbox" id='warrantyCheck'
                        disabled={warrantyDisabled} checked={warrantyChecked}
                        onChange={handleWarrantyToggle}/>
                </div>
            </fieldset>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">IMEI Number *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" inputMode="numeric" name="imeiNumber"
                pattern="\d{15}" maxLength="15" title="IMEI must be exactly 15 numbers"
                onChange={handleChange} required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Make *</label>
            <select className="col-12 col-md-12 col-lg-7" defaultValue="Apple" name="make"
                onChange={handleChange} required>
                <option value="Apple">Apple</option><option value="LG">LG</option>
                <option value="Motorola">Motorola</option><option value="Nokia">Nokia</option>
                <option value="Samsung">Samsung</option><option value="Sony">Sony</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Model Number</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" name="modelNumber"
                onChange={handleChange} />
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
            <select className="col-12 col-md-12 col-lg-7" defaultValue="Screen" name="faultCategory"
                onChange={handleChange} required>
                <option value="Battery">Battery</option><option value="Charging">Charging</option>
                <option value="Screen">Screen</option><option value="SD-storage">SD-storage</option>
                <option value="Software">Software</option><option value="Other">Other</option>
            </select>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Description *</label>
            <textarea className="col-12 col-md-12 col-lg-7" rows="4" name="description"
                onChange={handleChange} required></textarea>
        </div>
 </>);
}
export default FormRepairDetail;