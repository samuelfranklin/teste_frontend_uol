import customerData from '../mocks';

(function init() {
  let db = null;
  const dbName = 'uol_db';
  const DBOpenReq = indexedDB.open(dbName);

  function makeTransaction(storeName, mode) {
    const transaction = db.transaction(storeName, mode);
    return transaction;
  }

  function buildList() {
    const tx = makeTransaction('customers', 'readonly');

    const store = tx.objectStore('customers');
    const getReq = store.getAll();

    getReq.onsuccess = (event) => event.target.result;

    getReq.onerror = (event) => {
      console.error(event.error);
    };
  }

  function populateDatabase() {
    const tx = makeTransaction('customers', 'readwrite');
    const store = tx.objectStore('customers');

    customerData.forEach((customer) => {
      const request = store.add(customer);
      request.onsuccess = (event) => event.target.result;
    });
  }

  DBOpenReq.onerror = (error) => console.error(error);
  DBOpenReq.onsuccess = (event) => {
    db = event.target.result;
    console.log(db);

    populateDatabase();
    buildList();
  };
  DBOpenReq.onupgradeneeded = (event) => {
    db = event.target.result;

    const objectStore = db.createObjectStore('customers', {
      autoIncrement: true,
    });

    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('phone', 'phone', { unique: true });
    objectStore.createIndex('status', 'status', { unique: false });
    objectStore.createIndex('ssn', 'ssn', { unique: true });
  };
}());
