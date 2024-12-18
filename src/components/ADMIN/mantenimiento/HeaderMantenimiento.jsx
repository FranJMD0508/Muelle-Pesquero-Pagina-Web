import './headerMantenimiento.css'

const Header = ({ setRoute }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Menú de opciones</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" onClick={() => setRoute('Reportes')}>Reportes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => setRoute('Barcos')}>Barcos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header