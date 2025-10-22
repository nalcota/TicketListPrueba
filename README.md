Utilize docker para subir diferentes aplicaciones pero no pude con angular.

Dejo el script de la base de datos. 

CREATE TABLE Usuarios (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Username TEXT NOT NULL,
    Password TEXT NOT NULL
);


CREATE TABLE Tickets (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Titulo TEXT NOT NULL,
    Descripcion TEXT NOT NULL,
    Prioridad TEXT NOT NULL DEFAULT 'Baja',
    Estado TEXT NOT NULL DEFAULT 'Nuevo',
    FechaCreacion TEXT NOT NULL,
    UsuarioAsignado TEXT NOT NULL
);

INSERT INTO Usuarios (Username, Password)
VALUES ('admin', '123456');

INSERT INTO Tickets (Titulo, Descripcion, Prioridad, Estado, UsuarioAsignado, FechaCreacion)
VALUES ('Prueba', 'Ticket de prueba', 'Alta', 'Nuevo', 'admin', '2025-10-21');

--------------------------------------------------------------------------------------------
Flujo de usuario
ng serve --port 4400

Usuario abre http://localhost:4400.

Es redirigido a auth/login.

Ingresa usuario y contraseña → se obtiene token JWT.

Frontend almacena token y llama a /api/tickets enviando JWT en el header.

Backend valida JWT → si es correcto, devuelve la lista de tickets.
