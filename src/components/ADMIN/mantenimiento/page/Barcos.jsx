import CardMantenimiento from "../CardMantenimiento"

const Barcos = () => {
  return (
    <>
      <div className="container my-2">
        <h1 className="lead fs-1">Barcos</h1>
        <div className="row justify-content-center align-items-center h-100">
          <CardMantenimiento />
        </div>
      </div>
    </>
  )
}

export default Barcos