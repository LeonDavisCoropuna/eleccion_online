# Estilos de Programación

## 1. Hooks
Los **hooks** son una característica importante de React que permite usar el estado y otras características de React en componentes funcionales sin tener que escribir clases. En Next.js, también puedes usar hooks para mantener el estado y la lógica del componente.

### /login

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
    <h1>Header</h1>
    <Head>
      <title>{pagina}</title>
    </Head>
    <div>
      <div>Username: {username}</div>
    </div>
    <Verify {/*Como vemos esta etiqueta <Verify /> es un componente reutilizable */} 
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      onConfirm={logout}
      text={"Estas seguro de cerrar sesion?"}
    />
    <button onClick={() => {
      setIsOpen(true);
    }}>Logout</button>
    {children}
    <h1>Footer</h1>
  </div>
);
/Componentes/Verify.js
jsx
Copy code
return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirmación"
    ariaHideApp={false}
    className="modal-dialog"
  >
    <div className="modal-content container ">
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
    </div>
  </Modal>
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
