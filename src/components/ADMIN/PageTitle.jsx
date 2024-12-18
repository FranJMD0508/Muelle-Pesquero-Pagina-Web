import React from 'react'
import './pageTitle.css'

function PageTitle({page}) {
  return (
    <div className="pagetitle">
      <h1>Centro de administración</h1>
      <nav>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <a href='/' className='casita'>
            <i className="bi bi-arrow-clockwise"></i>
            </a>
          </li>
          <li className='breadcrumb-item active'>{page}</li>
        </ol>
      </nav>
    </div>
  )
}

export default PageTitle