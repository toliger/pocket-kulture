import localforage from "localforage";

export const forage = localforage.createInstance({
  name: "pocket-kulture",
  version: 1.0,
  storeName: "pocketstore"
});

forage
  .setDriver([
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE
  ])
  .then(() => {
    console.log(
      "Of the driver options given, localforage is using:" + forage.driver()
    );
  })
  .catch(error => {
    console.error(error);
  });

export default {
  forage
};
