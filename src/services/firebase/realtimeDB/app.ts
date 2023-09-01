import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";

export async function getFromDBOneTime<T>({
  route,
  id,
}: {
  route: string;
  id: string;
}) {
  const dbRef = ref(database);
  const data: { [key: string]: T } = {};
  await get(child(dbRef, `${route}/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) data["user"] = snapshot.val();
    })
    .catch((error) => {});

  if (Object.keys(data).length > 0) return data["user"];
}
export function getFromDB<T>({
  route,
  id,
  item,
}: {
  route: string;
  id?: string;
  item?: string;
}) {
  const fullPath = `${route}/` + (id ? id : "") + (item ? `/${item}` : "");
  const dbRef = ref(database, fullPath);
  const data: { [key: string]: T } = {};
  onValue(
    dbRef,
    (snapshot) => {
      if (snapshot.val()) data["value"] = snapshot.val();
    },
    (error) => {
      console.log({ error });
    }
  );

  if (Object.keys(data).length > 0) return data["value"];
}

export function writeData<T>({
  object,
  table,
  id,
}: {
  object: T;
  table: string;
  id: string;
}) {
  set(ref(database, `${table}/` + id), {
    ...object,
  });
}
