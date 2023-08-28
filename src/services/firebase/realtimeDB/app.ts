import { getDatabase, onValue, ref, set } from "firebase/database";
import "../firebaseConfig";
import { getAuth } from "firebase/auth";
const database = getDatabase();
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
  const starCountRef = ref(database, fullPath);
  const data: { [key: string]: T } = {};
  const currentUser = getAuth();
  if (currentUser.currentUser?.uid === id)
    onValue(
      starCountRef,
      (snapshot) => {
        if (snapshot.exists()) {
          data["value"] = snapshot.val();
        }
      },
      (error) => {}
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
