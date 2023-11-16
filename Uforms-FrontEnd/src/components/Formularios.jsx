import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import './Formularios.css';

const Formularios = () => {
  //const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const [nombreCompleto, setNombreCompleto] = useState(queryParams.get('nombreCompleto') || 'Nombre Completo');
  const [rol, setRol] = useState(queryParams.get('rol') || 'Rol');
  const [tituloFormulario, setTituloFormulario] = useState("");
  const [descripcionFormulario, setDescripcionFormulario] = useState("");
  const [estadoForm, setEstadoForm] = useState("");
  const [idForm, setidForm] = useState("");
  const [pregunta,setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [preguntas, setPreguntas] = useState([]);

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



  const handleCrearFormulario = () => {
    // Validar que los campos necesarios estén llenos
    if (!tituloFormulario || !descripcionFormulario || !estadoForm) {
        // Manejar el caso en que los campos estén vacíos
        console.error('Todos los campos son obligatorios, y al menos una pregunta debe ser agregada');
        return;
    }

    // Enviar datos al servidor para crear el formulario y las preguntas
    fetch('http://localhost:4000/crearformulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: tituloFormulario,
            descripcion: descripcionFormulario,
            estado: estadoForm,
            preguntas: preguntas.map((pregunta) => ({
                textoEnunciado: pregunta.textoEnunciado,
                tipoPregunta: pregunta.tipoPregunta,
            })),
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log('Creado Exitosamente');
            setidForm("");
            setTituloFormulario("");
            setDescripcionFormulario("");
            setEstadoForm("");
            setPregunta("");
            setRespuesta("");
        } else {
            console.error('Error al crear el formulario:', data.message);
        }
    })
    .catch((error) => console.error('Error:', error));
};


const handleEditarFormulario = () => {
  // Validar que los campos necesarios estén llenos
  if (!idForm || !tituloFormulario || !descripcionFormulario || !estadoForm) {
      // Manejar el caso en que los campos estén vacíos
      console.error('Todos los campos son obligatorios');
      return;
  }

  // Enviar datos al servidor para actualizar el formulario
  fetch(`http://localhost:4000/actualizarformulario/${idForm}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          titulo: tituloFormulario,
          descripcion: descripcionFormulario,
          estado: estadoForm,
      }),
  })
      .then((response) => response.json())
      .then((data) => {
          if (data.success) {
              // Redirigir a otra página o realizar alguna acción después de la actualización exitosa
              console.log('Formulario actualizado exitosamente');
              setidForm("");
              setTituloFormulario("");
              setDescripcionFormulario("");
              setEstadoForm("");
          } else {
              console.error('Error al actualizar el formulario:', data.message);
          }
      })
      .catch((error) => console.error('Error:', error));
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
      <div>
      <main className="main-content">
                <div className="titulo-formulario">
                    <input
                        type="text"
                        placeholder="Titulo Formulario"
                        className="Titulo-Formulario"
                        value={tituloFormulario}
                        onChange={(e) => setTituloFormulario(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descripcion Formulario"
                        className="Desc-Formulario"
                        value={descripcionFormulario}
                        onChange={(e) => setDescripcionFormulario(e.target.value)}
                    />
                    <input
                    type="text"
                    placeholder='Estado Formulario'
                    className='Estado-Form'
                    value={estadoForm}
                    onChange={(e) => setEstadoForm(e.target.value)}
                    />
                </div>
            </main>
      <section className="uforms">
        <div className="menu-crear">
          <div className="formulario">
          <input
                        type="text"
                        placeholder="Pregunta"
                        className="Pregunta"
                        value={pregunta}
                        onChange={(e) => setPregunta(e.target.value)}
                    />
            <div className="caja-respuesta">
              <input
                        type="text"
                        placeholder="Respuesta"
                        className="respuesta-caja"
                        value={respuesta}
                        onChange={(e) => setRespuesta(e.target.value)}
                    />
            </div>
          </div>
        </div>
        <div className='bto-crearpregunta'>
                {(
                    <Button className='CrearYPublicar' onClick={handleCrearFormulario}>
                        Crear Formulario
                    </Button>
                )}
            </div>
      </section>
      </div>
      <div>
      <main className="main-content">
                <div className="titulo-formulario">
                <input
                    type="text"
                    placeholder='ID Formulario'
                    className='idForm'
                    value={idForm}
                    onChange={(e) => setidForm(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Titulo Formulario"
                        className="Titulo-Formulario"
                        value={tituloFormulario}
                        onChange={(e) => setTituloFormulario(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descripcion Formulario"
                        className="Desc-Formulario"
                        value={descripcionFormulario}
                        onChange={(e) => setDescripcionFormulario(e.target.value)}
                    />
                    <input
                    type="text"
                    placeholder='Estado Formulario'
                    className='Estado-Form'
                    value={estadoForm}
                    onChange={(e) => setEstadoForm(e.target.value)}
                    />
                </div>
            </main>
      <section className="uforms">
        <div className="menu-crear">
          <div className="formulario">
          <input
                        type="text"
                        placeholder="Pregunta"
                        className="Pregunta"
                        value={pregunta}
                        onChange={(e) => setPregunta(e.target.value)}
                    />
            <div className="caja-respuesta">
              <input
                        type="text"
                        placeholder="Respuesta"
                        className="respuesta-caja"
                        value={respuesta}
                        onChange={(e) => setRespuesta(e.target.value)}
                    />
              </div>
          </div>
        </div>
        <div className='bto-editar'>
                {(
                    <Button className='Editar' onClick={handleEditarFormulario}>
                        Editar Formulario
                    </Button>
                )}
            </div>
      </section>
      </div>
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
