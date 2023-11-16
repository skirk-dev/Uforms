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
  const [formularios, setFormularios] = useState([]);

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

  useEffect(() => {
    // Realizar la solicitud al servidor para obtener los formularios
    fetch('http://localhost:4000/formularios')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFormularios(data.formularios);
        } else {
          console.error('Error al obtener los formularios:', data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []); // El segundo argumento [] significa que se ejecutará solo una vez al montar el componente

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
    {formularios.map((formulario) => (
      <div className="formulario" key={formulario.ID}>
        <h3>{formulario.Titulo}</h3>
        <p>{formulario.Descripcion}</p>
        <div className="estado">
          {formulario.Estado === 'Visible' ? 'Visible' : 'Invisible'} |{' '}
          {formulario.Activado ? 'Activado' : 'Desactivado'}
        </div>
      </div>
    ))}
    <Button as={Link} to={'/formularios'} className="boton-crear-formulario">
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
