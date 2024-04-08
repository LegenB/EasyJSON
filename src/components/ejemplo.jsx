import React, { useState } from 'react';

export const Ejemplo = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
    ]);
    const [newItemName, setNewItemName] = useState('');

    const addItem = () => {
        const newItem = {
            id: items.length + 1,
            name: newItemName
        };
        setItems([...items, newItem]);
        setNewItemName('');
    };

    const updateItem = (id, newName) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, name: newName } : item
        );
        setItems(updatedItems);
    };

    const deleteItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    return (
        <>
            <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => updateItem(item.id, `Updated ${item.name}`)}>Update</button>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="New item name"
            />
            <button onClick={addItem}>Add Item</button>
        </>
    );
};