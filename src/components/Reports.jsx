import React, { useState } from 'react';
import ChartFilter from './ChartFilter'
import ReportCharts from './ReportCharts';

function Reports() {
    const [filter, setFilter] = useState('Todo');
    const handleFilterChange = filter => {
        setFilter(filter);
    };

  return (
   <div className="card">
    <ChartFilter filterChange={handleFilterChange} />
    <div className="card-body">
        <h5 className="card-title">
            Reportes <span>/ {filter}</span>
        </h5>
        <ReportCharts filter={filter}/>
    </div>
   </div>
  )
}

export default Reports