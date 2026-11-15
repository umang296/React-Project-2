import { useEffect } from 'react';

//Function Component
function FormCost(props) {
    //bond only applies to "customer" type, service fee only when out of warranty
    let bond = props.sharedPropCustomerType ? props.sharedPropBond : 0;
    let service = props.sharedPropWarranty ? 0 : 85;
    let total = bond + service;
    let gst = Math.round(total * 0.15 * 100) / 100;
    let totalGst = Math.round((total + gst) * 100) / 100;

    //Call-back function: send cost details up to "Home"
    useEffect(() => {
        props.sendCostDetails({ bond, service, total, gst, totalGst });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bond, service, total, gst, totalGst]);

    return(<>
        <h2>Cost</h2>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" value={bond.toFixed(2)} readOnly />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" value={service.toFixed(2)} readOnly />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" value={total.toFixed(2)} readOnly />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">GST ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" value={gst.toFixed(2)} readOnly />
        </div>
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total (+GST) ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" value={totalGst.toFixed(2)} readOnly />
        </div>
 </>);
}
export default FormCost;