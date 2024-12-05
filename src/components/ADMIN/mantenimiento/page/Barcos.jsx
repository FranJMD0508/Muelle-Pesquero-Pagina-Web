import { useEffect, useState } from "react";
import CardMantenimiento from "../CardMantenimiento"
import './barcos.css'

const API = 'https://affd-168-194-111-17.ngrok-free.app/Api/Embarcacion'
const Barcos = () => {
  const [datos, setDatos] = useState([]);

  const getDatos = async () => {
      fetch(API, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then(response => response.json())
      .then(data => {
        setDatos(data.data)
      })
      .catch(e => console.log(e.message));
  };
  useEffect(() => {
    getDatos();
  }, []);
  return (
    <>
      <div className="container my-2">
        <div className="row justify-content-center align-items-center h-100">
          {datos && datos.map((item, index) => {
            return <CardMantenimiento key={index} item={item} />
          })}
        </div>
      </div>
    </>
  )
}

export default Barcos