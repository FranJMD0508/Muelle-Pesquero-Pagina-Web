import React, { useState, useEffect } from 'react';
import './dashboard.css'
import Card from './Card';
import Reports from './Reports';

function Dashboard() {

  const [cards, setCards] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:5001/api/pescados')
      .then(response => response.json())
      .then(data => {
        setCards(data.data)
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    <Card card={"Ventas"} icon={"bi bi-cart"} />
                    <Card card={"Ganancias"} icon={"bi bi-currency-dollar"} />
                    <Card card={"Clientes"} icon={"bi bi-people-fill"} />
                    <div className="col-12">
                      <Reports />
                    </div>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    </section>
  )
}

export default Dashboard