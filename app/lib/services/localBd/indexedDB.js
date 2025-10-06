'use client'

export const idbDatabaseLocal = async () => {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open('PRICINGDBLOCAL', 1);
        let response = {};

        request.onupgradeneeded = function () {
            const db = request.result;
            if (!db.objectStoreNames.contains('buzon')) {
                const store = db.createObjectStore("buzon", { keyPath: "id", autoIncrement: true });
                const index = store.createIndex("buzonName", "buzonName", { unique: true });

                response.objectStore = store.name;
                response.primaryKey = store.keyPath;
                response.index = index.keyPath;
            }
        };

        request.onsuccess = function () {
            response.status = 200;
            response.contains = request.result
            resolve(JSON.stringify(response));
        };

        request.onerror = function () {
            response.status = 500;
            response.contains = request.error
            reject(JSON.stringify(response));
        };
    });
};


export const insertBuzon = async (containsBuzon) => {

    return new Promise((resolve, reject) => {
        const idbOpen = indexedDB.open('PRICINGDBLOCAL', 1);
        let idbResponse = {};

        idbOpen.onsuccess = function () {
            const db = idbOpen.result;
            const transaction = db.transaction('buzon', 'readwrite');
            const store = transaction.objectStore('buzon');
            const putResponse = store.put({ buzonName: containsBuzon.name, fileName: containsBuzon.file, contenido: containsBuzon.buffer });

            putResponse.onsuccess = function () {
                idbResponse.status = 200;
                idbResponse.contains = putResponse.result;
                resolve(JSON.stringify(idbResponse));
            };

            putResponse.onerror = function () {
                idbResponse.status = 500;
                idbResponse.code = putResponse.error.code;
                idbResponse.contains = putResponse.error.message;
                reject(JSON.stringify(idbResponse));
            };
        };
    });
};


export const queryBuzon = async (buzonReq) => {

    return new Promise((resolve, reject) => {

        const idbOpen = indexedDB.open('PRICINGDBLOCAL', 1);
        let idbResponse = {};

        idbOpen.onsuccess = function () {
            const db = idbOpen.result
            const transaction = db.transaction('buzon', 'readonly');
            const store = transaction.objectStore('buzon');
            const index = store.index('buzonName');
            const getResponse = index.getAll();

            getResponse.onsuccess = function () {
                idbResponse.status = 200;
                idbResponse.contains = getResponse.result;
                resolve(idbResponse);
            };

            getResponse.onerror = function () {
                idbResponse.status = 500;
                idbResponse.contains = getResponse.error;
                reject(idbResponse);
            };
        };
    });
};


export const deleteBuzon = async () => {

    return new Promise((resolve, reject) => {
        const idbOpen = indexedDB.open('PRICINGDBLOCAL', 1);
        let idbResponse = {};

        idbOpen.onsuccess = function () {
            const db = idbOpen.result;
            const transaction = db.transaction('buzon', 'readwrite');
            const store = transaction.objectStore('buzon');
            const putResponse = store.clear();

            putResponse.onsuccess = function () {
                idbResponse.status = 200;
                idbResponse.contains = putResponse.result;
                resolve(JSON.stringify(idbResponse));
            };

            putResponse.onerror = function () {
                idbResponse.status = 500;
                idbResponse.code = putResponse.error.code;
                idbResponse.contains = putResponse.error.message;
                reject(JSON.stringify(idbResponse));
            };
        };
    });
};


export const deleteBD = async () => {

    return new Promise((resolve, reject) => {
        const dbName = 'PRICINGDBLOCAL';
        let idbResponse = {};

        const idbDelete = indexedDB.deleteDatabase(dbName);

        idbDelete.onsuccess = function () {
            idbResponse.status = 200;
            idbResponse.message = `La base de datos "${dbName}" fue eliminada con éxito.`;
            resolve(idbResponse);
        };

        idbDelete.onerror = function (event) {
            idbResponse.status = 500;
            idbResponse.error = event.target.error;
            idbResponse.message = `Error al eliminar la base de datos "${dbName}".`;
            reject(idbResponse);
        };

        idbDelete.onblocked = function () {
            idbResponse.status = 409;
            idbResponse.message = `La eliminación de la base de datos "${dbName}" está bloqueada. Cierra otras conexiones a la base de datos.`;
            reject(idbResponse);
        };
    });
};


export const closeBD = async () => {

    const idbOpen = indexedDB.open('PRICINGDBLOCAL', 1);
    let idbResponse = {};

    idbOpen.onsuccess = function () {
        const db = idbOpen.result;

        db.onversionchange = function () {
            db.close();
            console.log("Cerrando conexiones temporales")
        };

    };
};