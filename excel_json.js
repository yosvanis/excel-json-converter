//  Instalar previamente xlsx  >>>>>>> npm install xlsx <<<<<<<<<
// Importa las bibliotecas necesarias: xlsx para leer archivos Excel, fs para interactuar con el sistema de archivos, y path para trabajar con rutas de archivos.
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Función para convertir Excel a JSON
function excelAJson(archivoExcel) {
 // Leer el archivo Excel
 const workbook = XLSX.readFile(archivoExcel);
 const sheetName = workbook.SheetNames[0];
 const sheet = workbook.Sheets[sheetName];

 // Convertir la hoja de Excel a JSON
 const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

 // Crear un objeto para almacenar los JSONs agrupados por la cabecera de las columnas de la 8 a la 18
 let jsonsAgrupados = {};

 // Obtener las claves de las columnas 1 a 7. Para este caso las claves son 7 y se encuentran en la cabecera de estas columnas.
 const claves = data[0].slice(0, 7);

 // Iterar sobre cada fila
 data.slice(1).forEach(fila => {
    // Iterar sobre cada columna de la 7 a la 29
    for (let i = 7; i < 29; i++) {
      // Si hay datos en la columna actual, crear el JSON
      if (fila[i]) {
        let json = {};
        // Asignar clave:valor para las columnas de la 1 a la 7
        claves.forEach((clave, index) => {
          json[clave] = fila[index];
        });
        // Asignar clave:valor para la columna actual
        json[data[0][i]] = fila[i];

        // Usar el valor de la columna actual como clave para agrupar los JSONs
        const claveGrupo = data[0][i];
        if (!jsonsAgrupados[claveGrupo]) {
          jsonsAgrupados[claveGrupo] = [];
        }
        // Eliminar la última clave:valor del objeto JSON antes de agregarlo al arreglo
        delete json[claveGrupo];
        jsonsAgrupados[claveGrupo].push(json);
      }
    }
 });

 // Asegurarse de que el directorio 'output' exista
 const outputDir = path.join(__dirname, 'output');
 if (!fs.existsSync(outputDir)) {
   fs.mkdirSync(outputDir, { recursive: true });
 }

 // Escribir cada grupo de JSONs en un archivo separado
 Object.keys(jsonsAgrupados).forEach(claveGrupo => {
    const jsonString = JSON.stringify(jsonsAgrupados[claveGrupo], null, 2);
    const outputFile = path.join(outputDir, `${claveGrupo}.json`);
    fs.writeFileSync(outputFile, jsonString);
 });
}

// Llamar a la función y pasar el nombre del archivo Excel
excelAJson('assets/Operaciones.xlsx');
excelAJson('assets/Sujeto.xlsx');

//Para ejecutar programa>>>>>>>> node .\excel_json.js <<<<<<<<<<<