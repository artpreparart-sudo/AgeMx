// IndexedDB helpers for offline persistence
import type { Salon, City, State } from './types';
const DB_NAME = 'ageMx-db';
const DB_VERSION = 1;
const STORE_SALONES = 'salones';
const STORE_CITIES = 'cities';
const STORE_STATES = 'states';

type StoreName3 = typeof STORE_SALONES | typeof STORE_CITIES | typeof STORE_STATES;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_SALONES)) {
        db.createObjectStore(STORE_SALONES);
      }
      if (!db.objectStoreNames.contains(STORE_CITIES)) {
        db.createObjectStore(STORE_CITIES);
      }
      if (!db.objectStoreNames.contains(STORE_STATES)) {
        db.createObjectStore(STORE_STATES);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readStore<T>(store: StoreName3): Promise<T | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const tx = db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get('all');
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

function writeStore<T>(store: StoreName3, value: T): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).put(value, 'all');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    } catch (err) {
      reject(err);
    }
  });
}

export function loadSalones() {
  return readStore<Salon[]>(STORE_SALONES);
}

export function loadCities() {
  return readStore<City[]>(STORE_CITIES);
}

export function saveSalones(salones: Salon[]) {
  return writeStore(STORE_SALONES, salones);
}

export function saveCities(cities: City[]) {
  return writeStore(STORE_CITIES, cities);
}

export function loadStates() {
  return readStore<State[]>(STORE_STATES);
}

export function saveStates(states: State[]) {
  return writeStore(STORE_STATES, states);
}