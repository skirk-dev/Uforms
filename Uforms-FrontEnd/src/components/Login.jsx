import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setStartTyping(true);
    }, 1000);

    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);

  const [startTyping, setStartTyping] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:4000/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Check the user's role and redirect accordingly
        if (data.rol === 'Administrador') {
          navigate(`/Home?username=${data.username}&rol=${data.rol}&nombreCompleto=${data.nombreCompleto}`);
        } else if (data.rol === 'Estudiante') {
          navigate(`/Estudiante?username=${data.username}&rol=${data.rol}&nombreCompleto=${data.nombreCompleto}`);
        } else {
          alert('Invalid role');
        }
      } else {
        alert(data.message);
      }
    } else {
      alert('Error in the POST request to the server.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Unexpected error on the client side.');
  }
};


  const title = "BIENVENIDO";
  const titleLetters = title.split("").map((letter, index) => (
    <span key={index} className="letter">
      {letter}
    </span>
  ));

  return (
    <div className='login'>
      <div className='left-section'>
        <h1 className='titulo'>{titleLetters}</h1>
        <img src='/Logo2.png' alt='Logo' className='logo' />
      </div>
      <div className='right-section'>
        <div className='image-user'>
          <img src='/UserBg.png' alt='user' className='user' />
        </div>
        <div className='form-container'>
          <Form onSubmit={handleSubmit}>
            <div className='form-group'>
              <Form.Group controlId="username">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" class="bn29">
                Iniciar sesión
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
