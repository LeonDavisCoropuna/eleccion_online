This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Arqutectura por capas
### Capa de Presentación:
```
- pages/: En Next.js, las páginas se encuentran dentro de esta carpeta. Aquí se colocan las páginas específicas del sitio web, por ejemplo, index.js, votacion.js, resultado.js, etc.
- components/: Aquí se colocan los componentes reutilizables de React que se utilizan para construir las páginas.
```
### Capa de Aplicación:
```
- pages/api/: Se crea API routes dentro de esta carpeta. Aquí es donde se implementarías la lógica de la API para manejar las solicitudes de los clientes y comunicarse con la capa de dominio o servicios.
```
### Capa de Dominio:
```
- domain/: En esta carpeta, se colocan los modelos de dominio y la lógica de negocio. Por ejemplo, clases o funciones que representan entidades y reglas de negocio.
- domain/models: Se ingresan los especificos específicas del sitio web (Peson.js, Elector.js, etc.)
- domain/services: Se ingresa los servicios relacionados con la entidad
```
### Capa de Infraestructura:
```
- data/: Aquí coloca la implementación concreta de la lógica de infraestructura, como la conexión a la base de datos, llamadas a servicios externos, almacenamiento en caché, etc.
- services/: En esta carpeta, colocarías los servicios y utilidades que son específicos de la infraestructura, como servicios de autenticación, servicios de almacenamiento en la nube, etc.
- config/: Aquí colocarías la configuración de la aplicación, como variables de entorno, configuración de la base de datos, etc.
```
## Trabajo encargado:

![Casos de uso](https://github.com/LeonDavisCoropuna/Final-Ing-Software-I/edit/main/public/UseCaseDiagram1.png)

## Estilos de programación


## 1. CandidateRepository (data/repository/CandidateRepository.js)
### Estilo de Programación: (Arrays)
Este fragmento de código hace uso de arrays para procesar y organizar datos obtenidos de una base de datos. A través de la función map, se itera sobre los resultados obtenidos y se construyen objetos Candidate con sus respectivas propiedades. Estos objetos se almacenan en un nuevo array listCandidate, facilitando la manipulación y presentación de los datos. El enfoque en el uso de arrays permite una estructura ordenada y eficiente para la gestión de los registros de candidatos, contribuyendo a la legibilidad y mantenibilidad del código.
    
```javascript
import {pool} from "@/ldavis/data/config/db";
import Candidate from "@/ldavis/domain/models/Candidate";
class CandidateRepository {
    static async getCandidate() {
        try{
            const [result] = await pool.query("CALL obtener_candidatos_por_partido();");
            const listCandidate = [];
            result[0].map(e=>{
                const newCandidate = new Candidate(e.id,e.name,e.lastName,e.username,e.cargo,e.nombre_partido);
                listCandidate.push(newCandidate);
            })
            return listCandidate;
        }
        catch (error){
            return error;
        }
    }
}

export default CandidateRepository;
```

## 2. ElectorRepository (data/repository/ElectorRepository.js)
### Estilo de Programación (Quarantine)
El estilo Quarantine se utiliza en el código del repositorio ElectorRepository para describir la separación y aislamiento intencional de las operaciones de base de datos. Este enfoque garantiza que las interacciones con la base de datos estén confinadas en una ubicación específica y se gestionen de manera aislada del resto del sistema. Al aislar estas operaciones en su propia clase, se mejora la organización y mantenibilidad del código, al tiempo que se reduce el riesgo de que las interacciones con la base de datos afecten inadvertidamente otras partes del sistema. Este enfoque se alinea con las prácticas de diseño que buscan limitar el impacto de los cambios y errores potenciales en las interacciones con bases de datos, lo que contribuye a un código más ordenado y robusto en la gestión de datos.

```javascript
import { pool } from "@/ldavis/data/config/db";
import Candidate from "@/ldavis/domain/models/Candidate";
import PoliticalParty from "@/ldavis/domain/models/PoliticalParty";
import { responseEncoding } from "axios";

class ElectorRepository {
    static async saveVote(vote) {
        try {
            const [find] = await pool.query("SELECT * FROM votos WHERE id_elector = ?", vote._idElector);
            if (find.length > 0) {
                return {status: 401};
            }
            const resp = await pool.query("INSERT INTO votos VALUES (?,?,?);", [vote._idElector, vote._idPoliticalParty, vote._date]);
            return {status: 200};
        } catch (err) {
            return {status: 500};
            //throw new Error("Error en la base de datos"); // o cualquier otro mensaje de error
        }
    }

    static async getPoliticalParty() {
        try {
            const [result] = await pool.query("SELECT * FROM partido_politico;");
            const listPoliticalParty = [];
            result.map(e => {
                const newPoliticalParty = new PoliticalParty(e.id, e.partido);
                listPoliticalParty.push(newPoliticalParty);
            });
            return listPoliticalParty;
        } catch (err) {
            return err;
        }
    }
}

export default ElectorRepository;

```
## 3. CandidateRepository (data/repository/CandidateRepository.js)
### Estilo de Programación: (Holywood)
El patrón de diseño Hollywood es empleado en el código para la gestión de personas (PersonRepository) en el contexto de autenticación. En este enfoque, el componente de alto nivel (PersonRepository) toma el control y llama a los componentes de bajo nivel (Electror y Admin) según sea necesario. Esto evita la dependencia directa de los componentes de bajo nivel en los de alto nivel, promoviendo una estructura más organizada y desacoplada. El componente de alto nivel orquesta la creación de instancias de Electror y Admin basándose en los resultados de la consulta a la base de datos. Al separar la lógica de control de las decisiones sobre la creación de objetos, se mejora la modularidad y facilita futuras expansiones o cambios en la lógica. Este enfoque se asemeja a cómo en Hollywood los actores son llamados por el director para desempeñar sus roles, evitando así que los actores tomen decisiones sobre cuándo o cómo son requeridos en la producción.

```javascript
import {pool} from "@/ldavis/data/config/db";
import Elector from "@/ldavis/domain/models/Elector";
import Admin from "@/ldavis/domain/models/Admin";

class PersonRepository {
    static async getPerson(username, password) {
        try {
            const [result] = await pool.query(
                "SELECT * FROM persona WHERE username = ? AND password = ?",
                [username, password]
            );

            let person;
            if (result.length > 0) {
                const [admin] = await pool.query("SELECT * FROM administrador WHERE id = ?", result[0].id);
                if (admin.length === 0) {
                    person = new Elector(result[0].id, result[0].name, result[0].lastName, result[0].username, "ldavis@unsa.edu.pe");
                } else {
                    person = new Admin(result[0].id, result[0].name, result[0].lastName, result[0].username, "Gerente de Sistemas");
                }
                return {status: 200, person};
            } else {
                return {status: 401};
            }
        } catch (error) {
            return error;
        }
    }
}

export default PersonRepository;

```
## 4 Code-golf

En este código se está utilizando el estilo de programación code-golf, se utilizan tan pocas líneas como sean posibles sin modificar la funcionalidad del código.

```bash
import Person from "@/ldavis/domain/models/Person";
class Admin extends Person {
	constructor(id, name, lastName, username, job) {
    	super(id, name, lastName, username, job);
    	this.job = job;
	}
	// También podemos agregar getters y setters específicos para el atributo "email" si es necesario
	get job() {
    	return this._job;
	}
	set job(value) {
    	this._job = value;
	}
}
export default Admin;
```

## Convenciones de programación aplicados:
## Prácticas Codificación legible

### Comment Rules
Código con Comentarios que facilita la lectura y comprension del código

```javascript
// Función para manejar una solicitud de voto
export default async function handleVote(req, res) {
  const vote = req.body; // Datos del voto desde el cuerpo de la solicitud

  try {
    // Intentamos enviar el voto al servicio VoteElector para su procesamiento
    const result = await VoteElector.sendVote(vote);

    // Verificamos el estado de la respuesta para dar la respuesta adecuada
    if (result.status === 200) {
      return res.status(200).json({ message: "Voto correcto" });
    } else if (result.status === 401) {
      return res.status(401).json({ message: "Usuario ya votó" });
    }

    // Si no se cumplieron las condiciones anteriores, respondemos con un error 500
    return res.status(500).json({ message: "Ocurrió un error" });
  } catch (err) {
    // Si ocurre algún error durante el proceso, lo capturamos y respondemos con un error 500
    res.status(500).json({ error: err }); 
  }
}
```
### Limit Line Length y Uso de Identación

Límite de caracteres por línea y uso de sangría en el código (domains/models/Person.j)

```javascript
class Person {
    constructor(id, name, lastName, username) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
    }
    // Setters
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set lastName(value) {
        this._lastName = value;
    }
    set username(value) {
        this._username = value;
    }

```
### Names Rules

se utilizo el tipo de nomenclatura camelCase (domains/models/Person.j)

```javascript
class ResultVote {
    constructor(id, politicalParty, president, numVotes) {
        this._id = id;
        this._politicalParty = politicalParty;
        this._president = president;
        this._numVotes = numVotes;
    }
```
### Separation of Code and Data
El código realiza operaciones en la base de datos y crea instancias de objetos PoliticalParty, lo que muestra una separación de lógica de negocio y datos, separa la lógica de datos de recibir y enviar datos.

### Object-Oriented vs. Procedural 
El código utiliza programación orientada a objetos al crear instancias de la clase PoliticalParty y manipular los resultados obtenidos de la base de datos.

```javascript
import { pool } from "@/ldavis/data/config/db";
import Candidate from "@/ldavis/domain/models/Candidate";
import PoliticalParty from "@/ldavis/domain/models/PoliticalParty";
import { responseEncoding } from "axios";

class ElectorRepository {
    static async saveVote(vote) {
        try {
            const [find] = await pool.query("SELECT * FROM votos WHERE id_elector = ?", vote._idElector);
            if (find.length > 0) {
                return {status: 401};
            }
            const resp = await pool.query("INSERT INTO votos VALUES (?,?,?);", [vote._idElector, vote._idPoliticalParty, vote._date]);
            return {status: 200};
        } catch (err) {
            return {status: 500};
            //throw new Error("Error en la base de datos"); // o cualquier otro mensaje de error
        }
    }

    static async getPoliticalParty() {
        try {
            const [result] = await pool.query("SELECT * FROM partido_politico;");
            const listPoliticalParty = [];
            result.map(e => {
                const newPoliticalParty = new PoliticalParty(e.id, e.partido);
                listPoliticalParty.push(newPoliticalParty);
            });
            return listPoliticalParty;
        } catch (err) {
            return err;
        }
    }
}

export default ElectorRepository;
```
## Principios SOLID
### 1. Single Responsibility Principle (SRP)

La clase VoteElector contiene dos funciones bien definidas y especializadas. La primera función, sendVote(vote), se encarga de enviar un voto utilizando el servicio ElectorService para su almacenamiento y maneja los posibles errores relacionados con esta operación. La segunda función, getPoliticalParty(), se encarga de obtener los partidos políticos utilizando el mismo servicio y maneja la lógica de consulta y los errores que puedan surgir. Ambas funciones cumplen con el principio de Single Responsibility (SRP) al tener una única responsabilidad y realizar una tarea específica.

```javascript
class VoteElector {
  // Función para enviar un voto
  static async sendVote(vote) {
    try {
      // Llamada al servicio ElectorService para guardar el voto
      return await ElectorService.saveVote(vote);
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al servicio
    }
  }

  // Función para obtener los partidos políticos
  static async getPoliticalParty() {
    try {
      // Llamada al servicio ElectorService para obtener los partidos políticos
      return await ElectorService.getPoliticalParty();
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al servicio
    }
  }
}

```
### 2. Open/Closed Principle (OCP)
“Deberías ser capaz de extender el comportamiento de una clase, sin modificarla”. En otras palabras: las clases que usas deberían estar abiertas para poder extenderse y cerradas para modificarse.

El constructor de la clase ElectorService se utiliza para recibir un parámetro llamado repository, que representa el repositorio de datos utilizado para interactuar con el almacenamiento. Al asignar este parámetro a la propiedad this.repository, la clase puede acceder al repositorio y realizar operaciones dentro de sus métodos, lo que la hace flexible para trabajar con diferentes tipos de repositorios sin modificar su código interno. 

```javascript
import ElectorRepository from "../../data/repository/ElectorRepository"; // Ruta relativa para ElectorRepository
import Vote from "../../domain/models/Vote"; // Ruta relativa para Vote model

class ElectorService {
  // Constructor de la clase ElectorService.
  // El constructor se ejecuta al crear una instancia de ElectorService.
  // Recibe un parámetro "repository" que representa el repositorio de datos a utilizar.
  constructor(repository) {
    // Asigna el repositorio recibido como parámetro a la propiedad "repository".
    this.repository = repository;
  }

  // Función para guardar un voto.
  // Recibe el voto a guardar como parámetro.
  async saveVote(vote) {
    // Creamos una instancia del modelo Vote con los datos recibidos.
    const instanceVote = new Vote(vote.idElector, vote.idPoliticalParty, vote.date);

    try {
      // Llamada al repositorio ElectorRepository para guardar el voto.
      // Utiliza el repositorio asignado en el constructor para realizar la operación.
      return await this.repository.saveVote(instanceVote);
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al repositorio.
    }
  }

  // Función para obtener los partidos políticos.
  async getPoliticalParty() {
    try {
      // Llamada al repositorio ElectorRepository para obtener los partidos políticos.
      // Utiliza el repositorio asignado en el constructor para realizar la operación.
      return await this.repository.getPoliticalParty();
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al repositorio.
    }
  }
}

export default ElectorService;
```
### 3. Interface Segregation Principle (ISP)

Este principio establece que los clientes no deberían verse forzados a depender de interfaces que no usan.

```bash
class Person {
	constructor(id, name, lastName, username) {
    	this.id = id;
    	this.name = name;
    	this.lastName = lastName;
    	this.username = username;
	}
```
toda persona se construye con estos 4 atributos.

```bash
import Person from "@/ldavis/domain/models/Person";

class Candidate extends Person{
	constructor(id, name, lastName, username, job , politicalParty) {
    	super(id, name, lastName, username, job);
    	this.job = job;
    	this.politicalParty = politicalParty;
	}
```
pero no toda persona tiene estos 2 atributos, por lo cual no se ve forzado a implementar atributos que algunos personas no darán uso.

### 4. Principio de Inversión de Dependencia (DIP - Dependency Inversion Principle):
El componente Layout hace uso de la inyección de dependencias para obtener los datos de perfil del usuario. En lugar de tener una dependencia directa de axios y realizar la llamada HTTP directamente en el componente, se pasa una función (getProfile) que maneja la llamada HTTP como una dependencia. Esto permite que el componente sea más flexible y reutilizable, y facilita la prueba a través de la inyección de dependencias.

components/Layout.js
```javascript

const getProfile = async () => {
	const res = await axios.get("/api/profile");
	setUsername(res.data.username);
  };
```

