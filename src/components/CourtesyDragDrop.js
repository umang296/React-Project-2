import { useState } from "react";

export default function CourtesyDragDrop() {
    const initialLeft = [
        { id: 1, type: 'phone', name: 'iPhone', bond: 275 },
        { id: 2, type: 'phone', name: 'Samsung Galaxy', bond: 100 },
        { id: 3, type: 'phone', name: 'Nokia', bond: 100 },
        { id: 4, type: 'charger', name: 'iPhone Charger', bond: 30 },
        { id: 5, type: 'charger', name: 'Samsung Charger', bond: 30 },
        { id: 6, type: 'charger', name: 'Nokia Charger', bond: 30 },
        { id: 7, type: 'phone', name: 'Xiaomi', bond: 200 },
        { id: 8, type: 'charger', name: 'Xiaomi Charger', bond: 30 },
        { id: 9, type: 'phone', name: 'OnePlus', bond: 250 },
        { id: 10, type: 'charger', name: 'OnePlus Charger', bond: 30 }
    ];
    const initialRight = [];

    const [leftItems, setLeftItems] = useState(initialLeft);
    const [rightItems, setRightItems] = useState(initialRight);
    const [totalBond, setTotalBond] = useState(0);

    const handleDragStart = (e, item, source) => {
        e.dataTransfer.setData("application/json", JSON.stringify({ item, source }));
    };

    const handleDrop = (e, target) => {
        e.preventDefault();
        const { item, source } = JSON.parse(e.dataTransfer.getData("application/json"));

        if (source === target) return;

        if (source === "left") {
            // Only allow one item per type in the right zone
            const existingItem = rightItems.find((i) => i.type === item.type);
            if (existingItem) {
                alert("You can only select one unit per item.");
                return;
            }
            setLeftItems((prev) => prev.filter((i) => i.id !== item.id));
            setRightItems((prev) => [...prev, item]);
            setTotalBond((prev) => prev + item.bond);
        } else {
            setRightItems((prev) => prev.filter((i) => i.id !== item.id));
            setLeftItems((prev) => [...prev, item]);
            setTotalBond((prev) => prev - item.bond);
        }
    };

    const allowDrop = (e) => {
        e.preventDefault();
    };

    const styles = {
        container: {
            display: "flex",
            gap: "20px",
            padding: "20px",
        },
    };

    return (
        <div>
            <p>You can select a maximum of 1 unit per item</p>
            <p>Total bond: ${totalBond}</p>
            <div style={styles.container}>
                <DropZone
                    title="Available"
                    items={leftItems}
                    zone="left"
                    onDrop={handleDrop}
                    onDragOver={allowDrop}
                    onDragStart={handleDragStart}
                />
                <DropZone
                    title="Selected"
                    items={rightItems}
                    zone="right"
                    onDrop={handleDrop}
                    onDragOver={allowDrop}
                    onDragStart={handleDragStart}
                />
            </div>
        </div>
    );
}

function DropZone({ title, items, zone, onDrop, onDragOver, onDragStart }) {
    const styles = {
        dropZone: {
            flex: 1,
            minHeight: "300px",
            border: "2px dashed #888",
            borderRadius: "8px",
            padding: "16px",
            background: "#f8f9fa",
        },
        item: {
            padding: "10px",
            marginBottom: "8px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "grab",
        }
    };

    return (
        <div style={styles.dropZone} onDrop={(e) => onDrop(e, zone)} onDragOver={onDragOver}>
            <h3>{title}</h3>
            {items.map((item) => (
                <div key={item.id} draggable onDragStart={(e) => onDragStart(e, item, zone)} style={styles.item}>
                    {item.name} - ${item.bond}
                </div>
            ))}
        </div>
    );
}