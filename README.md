# Estilos de Programación

## 1. Hooks
Los **hooks** son una característica importante de React que permite usar el estado y otras características de React en componentes funcionales sin tener que escribir clases. En Next.js, también puedes usar hooks para mantener el estado y la lógica del componente.

### /pages/login

```javascript
const [credentials, setCredentials] = useState({
  username: '',
  password: '',
});

const handleChange = (e) => {
  setCredentials({
    ...credentials,
    [e.target.name]: e.target.value,
  });
};
```
### 2. Composición de Componentes
Next.js promueve la composición de **componentes**, lo que permite construir componentes más complejos a partir de componentes más pequeños y **reutilizables**.

### /Componentes/Layout.js
```javascript
return (
  <div>
    {/*...*/}
    <div>
      <div>Username: {username}</div>
    </div>
    <Verify {/*Como vemos esta etiqueta <Verify /> es un componente reutilizable */} 
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      onConfirm={logout}
      text={"Estas seguro de cerrar sesion?"}
    />
    {/*...*/}
  </div>
);
```
### /Componentes/Verify.js
Componente que genera una ventana modal para verificar la desicion de un usuario
```javascript
return (
    {/*...*/}
      <div className="modal-header">
        <h5 className="modal-title">{text}</h5>
        <button type="button" className="close" onClick={onRequestClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onConfirm}>
          Sí
        </button>
        <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
          No
        </button>
      </div>
    {/*...*/}
);
```
### 3.Fetching Data on the Client Side
En este enfoque, se realiza la solicitud a la API directamente desde el cliente (el navegador) utilizando JavaScript, generalmente con la ayuda de la función fetch() o 
mediante librerías como **axios**.
Este estilo se puede implementar dentro de componentes de función utilizando el hook useEffect para realizar la llamada a la API y **actualizar** el **estado** del 
componente con los datos recibidos

### /Componentes/Layout.js
```javascript
const [username, setUsername] = useState(0);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const res = await axios.get("/api/profile");
    setUsername(res.data.username);
  };
```
### 4. Gestión de Sesiones con Cookies y JWT o "Session Management with Cookies and JWT" en inglés.
4.1 Uso de Cookies: El código utiliza la librería cookie para acceder a las cookies enviadas en la solicitud (req.cookies) y también para crear una cookie de logout al establecerla en la respuesta (res.setHeader("Set-Cookie", serialized)). Las cookies se utilizan para almacenar el token de autenticación y para eliminar la cookie al cerrar la sesión.
4.2 Uso de JWT (JSON Web Tokens): Se utiliza la función verify de la librería jsonwebtoken para verificar la validez del token de autenticación almacenado en la cookie MyTokenName. Si el token es válido, se procede a eliminar la cookie y cerrar la sesión.
4.3 Gestión de Sesiones: La función es responsable de gestionar la sesión del usuario. Si el token de autenticación no está presente o no es válido, se responde con un error (401 - Unauthorized) indicando que no se encuentra un token válido o que el usuario no está autenticado.

### /pages/api/services/login.js
Generar Token (iniciar sesion)
```javascript
if(username == userValidate.username && password == userValidate.password){
  const token = jwt.sign(
    {
      exp: expirationTime,
      id: userValidate.id,
      username: userValidate.username,
      userType: userValidate.userType,
    },
    "secret"
  );
    const serialized = serialize("MyTokenName", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expirationTime, // tiempo del token
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json({ message: "Login successfully", userType: userValidate.userType  });
}
```
Finalizar Token (cerrar sesion)
```javascript
    verify(MyTokenName, "secret");
    const serialized = serialize("MyTokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json("Logout Succesfully");
```
### 5. Clases y Métodos Estáticos
En este estilo, se utiliza una clase para encapsular funcionalidades relacionadas en métodos estáticos que pueden ser invocados sin necesidad de crear una instancia de la clase.
Uso de Clases: La clase UserRepository encapsula métodos relacionados con el acceso a la base de datos, en este caso, obtener usuarios.
### /Data/Repositorio/UserRepository.js
```javascript
import axios from 'axios';
class UserRepository {
    static async getUsers(user) {
        try {
            const response = await axios.post('/api/services/login',user);
            return response;
        } catch (error) {
            console.error('Error al obtener usuarios desde la base de datos:', error);
            throw error;
        }
    }
    // Otras operaciones de acceso a la base de datos utilizando Axios
}
export default UserRepository;
```


