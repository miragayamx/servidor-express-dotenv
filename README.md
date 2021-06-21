# ANÁLISIS COMPLETO DE PERFORMANCE

>> Consigna:

Ejercicio 1:

Armar un endpoint (por ejemplo /info) que devuelva el archivo generado por artillery.
Si no existe, devolver el comando de artillery necesario para generarlo.


if(fileExtist("testDeCarga.txt")) {
    res.sendFile("archivoGenerado.txt");
} else{
    res.status(200).json({ message: "Debe correr el siguiente comando para generar el archivo: 
        artillery quick --count 10 -n 50 "http://localhost:5000/getAllUsers" > testDeCarga.txt
    "})
}

Ejercicos 2 y 3 son capturas de pantalla de la terminal habiendo corrido las librerias (opcional);