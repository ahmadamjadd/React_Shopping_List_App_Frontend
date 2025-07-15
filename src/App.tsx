import React, { useEffect, useState } from "react";
import { shoppingListApi, type Item } from "./api/shoppingListApi";
import { AddItemForm } from "./components/AddItemForm";
import { ShoppingList } from "./components/ShoppingList";

export const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");

  const fetchItems = () => {
    shoppingListApi.getItems().then((result) =>
      result.isOk()
        ? setItems(result.unwrap())
        : setError(result.error.message)
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = (name: string) => {
    shoppingListApi.addItem(name).then((result) =>
      result.isOk()
        ? fetchItems()
        : setError(result.error.message)
    );
  };

  const handleDeleteItem = (id: number) => {
    shoppingListApi.deleteItem(id).then((result) =>
      result.isOk()
        ? fetchItems()
        : setError(result.error.message)
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
          🛒 Shopping List
        </h1>
        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}
        <AddItemForm onAdd={handleAddItem} />
        <div className="mt-6">
          <ShoppingList items={items} onDelete={handleDeleteItem} />
        </div>
      </div>
    </div>
  );
  
};
