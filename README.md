# AngularTODOList

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

TODOlist

## Version 

Node v24.11.1
Npm v11.6.2
Angular 21.0.5


## Ejecucion
* instalar paquetes
```bash
    npm install
```

* Configura la URL de la API: Asegúrate de que el backend de Django esté corriendo y que la URL en el servicio de tareas sea correcta (http://localhost:8000/api/tasks/). Si utilizas otra URL, edita la variable base_url en el servicio Tasks:

```javascript
    base_url = 'http://localhost:8000/api/tasks/';
```

* Iniciar el servidor de desarrollo: Una vez que hayas instalado las dependencias y configurado la URL, ejecuta el siguiente comando para iniciar la aplicación:
bash

```bash
    ng serve
```