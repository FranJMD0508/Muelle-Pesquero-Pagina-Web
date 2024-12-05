import React, { useState, useEffect } from 'react';
import './dashboard.css'
import Card from './Card';
import Reports from './Reports';
import TopSelling from './TopSelling';
import TopCustomers from './TopCustomers';

function Dashboard() {

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
                    <div className="col-12">
                      <TopSelling />
                    </div>
                    <div className="col-12">
                      <TopCustomers />
                    </div>
                </div>
            </div>
            <div className="col-lg-4"></div>
          </div>
    </section>
  )
}

export default Dashboard