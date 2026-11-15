import { useState } from 'react';
import FormCustomerDetail from './home/FormCustomerDetail';
import FormRepairDetail from './home/FormRepairDetail';
import FormCourtesyPhone from './home/FormCourtesyPhone';
import FormCost from './home/FormCost';
import FormButtons from './home/FormButtons';
import { useNavigate } from "react-router-dom";
import { supabase } from './supabaseClient';

function Home() {
    const [sharedBond, setSharedBond] = useState(0); 
    const [sharedWarranty, setSharedWarranty] = useState(false); 
    const [sharedCustomerType, setSharedCustomerType] = useState(true); 
    const [customerDetails, setCustomerDetails] = useState({ title: "Mr", firstname: "", lastname: "" }); 
    
    const [formKey, setFormKey] = useState(0);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const attachedData = {
                sharedBond,
                sharedWarranty,
                sharedCustomerType,
                customerDetails,
            };

            // Save to database (from previous lab)
            const dbData = {
                customertype: sharedCustomerType ? 'customer' : 'business',
                title: customerDetails.title,
                first_name: customerDetails.firstname,
                last_name: customerDetails.lastname,
                bond: sharedBond,
                service: sharedWarranty ? 0 : 85,
            };
            const { error } = await supabase.from('bookings').insert([dbData]);
            if (error) console.error("DB save error:", error);

            // Pass data via React Router (Project 2-5)
            navigate("/bookings", { state: { attachedData } });
        } catch (error) {
            console.error(error);
            alert('ERROR!!!');
        }
    };

    const handleReset = () => {
        setSharedBond(0);
        setSharedWarranty(false);
        setSharedCustomerType(true);
        setCustomerDetails({ title: "Mr", firstname: "", lastname: "" });
        setFormKey(prev => prev + 1);
    };

    return(<>
        <form key={formKey} className="row" style={{minHeight: '60vh'}} onSubmit={onSubmit} onReset={handleReset}>
            <div className="col-12 col-lg-4 p-4 m-0" style={{minHeight:'30vh', backgroundColor:'#FCF3CF'}}>
                <FormCustomerDetail passDataToParent={setSharedCustomerType} sendCustomerDetails={setCustomerDetails} />
            </div>
            <div className="col-12 col-lg-4 p-4 m-0" style={{minHeight:'30vh', backgroundColor:'#D5F5E3'}}>
                <FormRepairDetail passDataToParent={setSharedWarranty} />
            </div>
            <div className="col-12 col-lg-4 p-0 m-0">
                <div className="p-4" style={{minHeight:'30vh', backgroundColor:'#2874A6'}}>
                    <FormCourtesyPhone passDataToParent={setSharedBond} />
                </div>
                <div className="p-4" style={{minHeight:'20vh', backgroundColor:'#EDBB99'}}>
                    <FormCost sharedPropBond={sharedBond} sharedPropWarranty={sharedWarranty} sharedPropCustomerType={sharedCustomerType} />
                </div>
            </div>
            <div className="p-4 text-center" style={{minHeight:'10vh', backgroundColor:'#EDBB99'}}>
                <FormButtons />
            </div>
        </form>
 </>);
}
export default Home;