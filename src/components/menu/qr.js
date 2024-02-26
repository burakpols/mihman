import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import "./qr.css"; // Import the CSS file
import axios from 'axios';

const Qr = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3800/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const allCategories = ["Hepsi", ...new Set(items.map((item) => item.category))];
    setCategories(allCategories);
    setMenuItems(items);
  }, [items]);

  const filterItems = (category) => {
    if (category === "Hepsi") {
      setMenuItems(items);
    } else {
      const newItems = items.filter((item) => item.category === category);
      setMenuItems(newItems);
    }
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Mihman Menü</h2>
          <div className="underline" />
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
};

export default Qr;
