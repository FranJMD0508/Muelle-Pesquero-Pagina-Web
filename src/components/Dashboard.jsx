import React, { useState, useEffect } from 'react';
import './dashboard.css'
import Card from './Card';

function Dashboard() {
  const [pescados, setPescados] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/pescados');
      const result = await response.json();
      console.log(result);
      const data = await result.data;
      setPescados(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    {
                      pescados && pescados.length > 0 &&
                      pescados.map(pescado => <Card key={pescado.id} pescado={pescado}/>)
                    }
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    </section>
  )
}

export default Dashboard