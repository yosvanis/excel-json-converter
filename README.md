# Excel a JSON Converter

Este proyecto permite convertir archivos Excel en varios archivos JSON, agrupando los datos por la cabecera de las columnas de la 8 a la 18. Cada grupo de datos se escribe en un archivo JSON separado.

## Requisitos

- Node.js instalado en tu sistema.
- Paquete `xlsx` instalado. Puedes instalarlo con el siguiente comando:

```bash
npm install xlsx
```

## Uso

1. Asegúrate de tener los archivos Excel que deseas convertir en el directorio `assets`.
2. Ejecuta el script con Node.js:

```bash
node .\excel_json.js
```

Esto generará varios archivos JSON en el directorio `output`, uno por cada grupo de datos identificado por la cabecera de las columnas de la 8 a la 18 en los archivos Excel.

## Código

El script principal es `excel_json.js`. Aquí tienes una descripción general de su funcionamiento:

1. Importa las bibliotecas necesarias: `xlsx` para leer archivos Excel, `fs` para interactuar con el sistema de archivos, y `path` para trabajar con rutas de archivos.
2. Define una función `excelAJson` que toma como argumento el nombre de un archivo Excel.
3. Dentro de esta función, se lee el archivo Excel, se convierte la hoja de Excel en un array de arrays, y se crea un objeto para almacenar los JSONs agrupados por la cabecera de las columnas de la 8 a la 18.
4. Se itera sobre cada fila del array de datos, y para cada columna de la 7 a la 29, se crea un objeto JSON si hay datos en la columna actual.
5. Se asignan clave:valor para las columnas de la 1 a la 7 y para la columna actual.
6. Se agrupan los JSONs por la cabecera de las columnas de la 8 a la 18, eliminando la última clave:valor del objeto JSON antes de agregarlo al arreglo.
7. Se asegura que el directorio `output` exista, creándolo si no existe.
8. Se escriben cada grupo de JSONs en un archivo separado dentro del directorio `output`.

## Ejemplo de ejecución

Para ejecutar el programa, simplemente ejecuta el siguiente comando en la terminal:

```bash
node .\excel_json.js
```

Esto procesará los archivos Excel en el directorio `assets` y generará los archivos JSON correspondientes en el directorio `output`.
