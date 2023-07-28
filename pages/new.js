import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
export default function New() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    img: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const router = useRouter(); 
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      img: file, // Guardamos el archivo de imagen en el estado del usuario
    });

    // Previsualizar la imagen usando FileReader
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file); // Leer el archivo como una URL de datos (data URL)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/new', user);
      if (response.status === 200) {
        console.log('Form submitted successfully!');
        
      } else {
        // Si el estado HTTP es diferente de 200, hubo un problema en el backend
        console.error('Error submitting form. Status:', response.status);
      }
    } catch (error) {
      // Si ocurre un error al hacer la petición, por ejemplo, problemas de red o servidor inaccesible
      console.error('Error submitting form:', error.message);
    }
  };
  
  return (
    <div>
      <form encType="multipart/form-data">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
        />
        <input type="file" name="img" accept='image/*' onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Previsualización de imagen" className='avatar-img'/>}
        <button type="submit" onClick={handleSubmit}>Guardar</button>
      </form>
    </div>
  );
}
