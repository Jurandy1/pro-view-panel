import { useEffect, useState } from "react";
import { User, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const useFirebase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Autenticação anônima
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    if (!auth.currentUser) {
      signInAnonymously(auth).catch((error) => {
        console.error("Erro ao autenticar:", error);
        setLoading(false);
      });
    }

    return () => unsubscribe();
  }, []);

  return { user, loading, auth, db };
};

// Hook para usar uma coleção específica
export const useFirestoreCollection = <T extends { id: string }>(
  collectionPath: string,
  enabled: boolean = true
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    try {
      const colRef = collection(db, collectionPath);
      const q = query(colRef);

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(items);
          setLoading(false);
        },
        (err) => {
          console.error(`Erro ao carregar ${collectionPath}:`, err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error(`Erro ao configurar listener para ${collectionPath}:`, err);
      setError(err as Error);
      setLoading(false);
    }
  }, [collectionPath, enabled]);

  return { data, loading, error };
};
