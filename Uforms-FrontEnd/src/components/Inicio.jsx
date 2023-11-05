import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './Inicio.css';


const Home = () => {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const [nombreCompleto, setNombreCompleto] = useState(queryParams.get('nombreCompleto') || 'Nombre Completo');
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
        <img src='/Logo2.png' alt='Logo' className='logoIni' />
        <div className="header-right">
          <div className="notification">
            <img src="/notif.png" alt="Notificación" />
            <span className="cantidad-notificaciones">
              {notificaciones.length > 0 ? notificaciones.length : ''}
            </span>
            <button onClick={handleNotificaciones} className='lblNoti'>
              Ver notificaciones
            </button>
          </div>
          <Link to="/Ajustes">
            <img src="/set.png" alt="Ajustes" className='ajuste'/>
          </Link>
        </div>
      </header>

      <main className="main-content">
        <div className="search-container">
          <img src="/search.png" alt="Buscar" className="search-icon" />
          <input type="text" placeholder="Buscar" className="search-input" />
        </div>
      </main>

      <section className="uforms">
        <div className="listado-formularios">
          <div className="formulario">
            <h3>Formulario 1</h3>
            <p>
              Este es el formulario 1. Es un formulario visible para los estudiantes y está activado para recibir respuestas.
            </p>
            <div className="estado">
              Visible | Activado
            </div>
          </div>
          <div className="formulario">
            <h3>Formulario 2</h3>
            <p>
              Este es el formulario 2. Es un formulario invisible para los estudiantes y está desactivado para recibir respuestas.
            </p>
            <div className="estado">
              Invisible | Desactivado
            </div>
          </div>
          <div className="formulario">
            <h3>Formulario 3</h3>
            <p>
              Este es el formulario 3. Es un formulario visible para los estudiantes y está desactivado para recibir respuestas.
            </p>
            <div className="estado">
              Visible | Desactivado
            </div>
          </div>
          <Button as={Link} to="/Formularios" className="boton-crear-formulario">
            Crear Formulario
          </Button>
        </div>
      </section>

      <div className="bottom-section">
        <div className="bottom-options">
          <Link to="/Informacion">
            <img src="/info.png" alt="Información" className='img-info' />
          </Link>
          <Link to="http://localhost:5173/">
            <img src="/exit.png" alt="Salir" />
          </Link>
          <p className='lblEsta'>Estadísticas</p>
          <Link to="/Estadisticas">
            <img src="/estadistica.png" alt="Estadísticas" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
