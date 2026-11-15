import { useState, useEffect } from 'react';

//data — matches assignment brief exactly
const courtesyList = [
    {id: 1, type: 'phone', name: 'iphone 10', bond: 275},
    {id: 2, type: 'phone', name: 'iphone 14', bond: 300},
    {id: 3, type: 'phone', name: 'iphone 16', bond: 500},
    {id: 4, type: 'phone', name: 'samsung galaxy', bond: 200},
    {id: 5, type: 'phone', name: 'nokia', bond: 150},
    {id: 6, type: 'phone', name: 'xiaomi', bond: 100},
    {id: 7, type: 'charger', name: 'iphone charger', bond: 45},
    {id: 8, type: 'charger', name: 'samsung charger', bond: 30},
    {id: 9, type: 'charger', name: 'nokia charger', bond: 25},
    {id: 10, type: 'charger', name: 'xiaomi charger', bond: 25},
];

function FormCourtesyPhone({ passDataToParent, sendCourtesyDetails }) {
    //state: ids of the borrowed items
    const [borrowedItems, setBorrowedItems] = useState([]);

    //methods and functions
    const addItem = (id) => {
        if (id === 'none') return;
        id = Number(id);
        if (!borrowedItems.includes(id)) {
            setBorrowedItems([...borrowedItems, id]);
        }
    }
    const removeItem = (id) => {
        if (id === 'none') return;
        id = Number(id);
        setBorrowedItems(borrowedItems.filter(itemId => itemId !== id));
    }

    //Call-back functions: send total bond and item names up to "Home"
    useEffect(() => {
        const items = borrowedItems.map(id => courtesyList.find(i => i.id === id));
        const totalBond = items.reduce((sum, item) => sum + item.bond, 0);
        passDataToParent(totalBond);
        sendCourtesyDetails({ courtesyItems: items.map(item => item.name).join(', ') });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [borrowedItems]);

    //Component UI: HTML Rendering
    return(<>
        <h2>Courtesy Phone</h2>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Item Type </label>
            <select className="col-12 col-md-12 col-lg-7" id="courtesyItemSelect" defaultValue="none">
                <option value="none">None</option>
                <optgroup label="Phones">
                    {courtesyList.filter(i => i.type === 'phone').map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </optgroup>
                <optgroup label="Chargers">
                    {courtesyList.filter(i => i.type === 'charger').map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </optgroup>
            </select>
        </div>
        <div className="row mt-2 ms-3">
            <button type="button" className="btn btn-light me-3"
                onClick={() => addItem(document.getElementById('courtesyItemSelect').value)}>Add</button>
            <button type="button" className="btn btn-light"
                onClick={() => removeItem(document.getElementById('courtesyItemSelect').value)}>Remove</button>
        </div>
        <h4 className='ms-4 mt-3'>Borrow items</h4>
        <div className="row mt-2 ms-3 me-3 bg-white">
            <table className="table table-bordered">
                <thead>
                    <tr><th>Item</th><th>Cost</th></tr>
                </thead>
                <tbody>
                    {borrowedItems.map(id => {
                        const item = courtesyList.find(i => i.id === id);
                        return (
                            <tr key={id}>
                                <td>{item.name}</td>
                                <td>${item.bond.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
 </>);
}
export default FormCourtesyPhone;