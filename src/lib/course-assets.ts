const database = "rs-research-desk-course-assets";

const openDatabase = () => new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open(database, 1);
  request.onupgradeneeded = () => request.result.createObjectStore("assets");
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export async function saveCourseAsset(id: string, file: File) { const db = await openDatabase(); return new Promise<void>((resolve, reject) => { const request = db.transaction("assets", "readwrite").objectStore("assets").put(file, id); request.onsuccess = () => resolve(); request.onerror = () => reject(request.error); }); }
export async function getCourseAsset(id: string) { const db = await openDatabase(); return new Promise<Blob | undefined>((resolve, reject) => { const request = db.transaction("assets").objectStore("assets").get(id); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); }); }
export async function removeCourseAsset(id: string) { const db = await openDatabase(); return new Promise<void>((resolve, reject) => { const request = db.transaction("assets", "readwrite").objectStore("assets").delete(id); request.onsuccess = () => resolve(); request.onerror = () => reject(request.error); }); }
