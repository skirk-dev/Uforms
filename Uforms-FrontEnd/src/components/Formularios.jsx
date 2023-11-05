import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, ButtonGroup } from 'react-bootstrap';
import './Formularios.css';

const Formularios = () => {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const [nombreCompleto, setNombreCompleto] = useState(
    queryParams.get('nombreCompleto') || 'Nombre Completo'
  );
  const [rol, setRol] = useState(queryParams.get('rol') || 'Rol');

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:4000/username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setNombreCompleto(data.nombreCompleto);
            setRol(data.rol);
          }
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [username]);

  const handleNotificaciones = () => {
    setNotificaciones([
      {
        id: 1,
        titulo: 'Notificación 1',
        descripcion: 'Esta es una notificación',
      },
      {
        id: 2,
        titulo: 'Notificación 2',
        descripcion: 'Esta es otra notificación',
      },
    ]);
  };

  function MultiChoiceButton() {
    const [showOptions, setShowOptions] = useState(false);

    return (
      <div>
        <Button
          onClick={() => setShowOptions(!showOptions)}
        >
          Añadir Respuesta
        </Button>

        {showOptions && (
          <ButtonGroup>
            <Button>Respuesta Abierta</Button>
            <Button>Respuesta Cerrada</Button>
          </ButtonGroup>
        )}
      </div>
    );
  }

  function MultiChoiceButton2() {
    const [showOptions, setShowOptions] = useState(false);

    return (
      <div>
        <Button
          onClick={() => setShowOptions(!showOptions)}
        >
          Añadir Pregunta
        </Button>

        {showOptions && (
          <ButtonGroup>
            <Button>Pregunta Simple</Button>
            <Button>Pregunta Anidada</Button>
          </ButtonGroup>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <img src="/UserBg.png" alt="Usuario" className="user-icon" />
          <div className="user-info">
            <p className="user-name">{nombreCompleto}</p>
            <p className="user-title">{rol}</p>
          </div>
        </div>
        <img src="/Logo2.png" alt="Logo" className="logoIni" />
        <div className="header-right">
          <div className="notification">
            <img src="/notif.png" alt="Notificación" />
            <span className="cantidad-notificaciones">
              {notificaciones.length > 0 ? notificaciones.length : ''}
            </span>
            <button onClick={handleNotificaciones} className="lblNoti">
              Ver notificaciones
            </button>
          </div>
          <Link to="/Ajustes">
            <img src="/set.png" alt="Ajustes" className="ajuste" />
          </Link>
        </div>
      </header>

      <main className="main-content">
        <div className="titulo-formulario">
          <input type="text" placeholder="Titulo Formulario" className="Titulo-Formulario" />
          <input type="text" placeholder="Descripcion Formulario" className="Desc-Formulario" />
        </div>
      </main>

      <section className="uforms">
        <div className="menu-crear">
          <div className="formulario">
            <input type="text" placeholder="Pregunta" className="pregunta" />
            <div className="caja-respuesta">
              <textarea placeholder="Respuesta..." />
            </div>
          </div>
          <div className="menu-respuesta">
            <MultiChoiceButton />
          </div>
          <div className="opcion-seleccion">
            <label>
              <input type="radio" name="opcion" value="opcion1" />
              Opcion Muiltiple
            </label>
          </div>
        </div>
      </section>
      <div className="bottom-section">
        <div className="bottom-options">
          <Link to="/Informacion">
            <img src="/info.png" alt="Información" className="img-info" />
          </Link>
          <Link to="http://localhost:5173/">
            <img src="/exit.png" alt="Salir" />
          </Link>
          <MultiChoiceButton2 className="lblEsta" />
        </div>
        <div className="menu-pregunta">
        </div>
      </div>
    </div>
  );
};

export default Formularios;
