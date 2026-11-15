import { useEffect, useState } from "react";
import CourtesyDragDrop from './CourtesyDragDrop';
import UploadFile from './UploadFile';

function AdvancedJS() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((json) => {
                setTodos(json);
            })
            .catch((error) => alert("loading error!"));
    }, []);

    return (
        <div className="container mt-4" style={{ minHeight: '60vh' }}>
            <h1>Advanced JS Demos</h1>
            
            <hr />
            <h3>Demo 1: Upload File to Supabase Storage</h3>
            <UploadFile />
            
            <hr />
            <h3>Demo 2: Courtesy Drag and Drop</h3>
            <CourtesyDragDrop />

            <hr />
            <h3>Demo 3: Fetch API (ToDos)</h3>
            <div className="row">
                {todos.slice(0, 10).map((item) => { // Limited to 10 to keep page clean
                    return (
                        <div className="col-md-4 mb-3" key={item.id}>
                            <div className="m-1 p-3 border" 
                                style={item.completed ? { backgroundColor: 'pink' } : { backgroundColor: 'gray', color: 'white' }}>
                                <h5>Task: {item.title}</h5>
                                <p>Id: {item.id}</p>
                                <p>Completed: {String(item.completed)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdvancedJS;