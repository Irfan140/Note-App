import { useLocalSearchParams, Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useApi } from "../../lib/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const api = useApi();
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    try {
      const res = await api.get<Note>(`/notes/${id}`);
      setNote(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteNote = async () => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setDeleting(true);
          await api.delete(`/notes/${id}`);
          router.replace("/");
        },
      },
    ]);
  };

  if (loading)
    return (
      <ActivityIndicator size="large" color="#2563eb" style={styles.loading} />
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{note?.title}</Text>

        <Text style={styles.content}>{note?.content}</Text>

        <Link href={`/note/edit?id=${id}`} asChild>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={deleteNote} style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>
            {deleting ? "Deleting..." : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 40,
  },

  safeArea: {
    flex: 1,
    padding: 20,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },

  content: {
    color: "#555",
    marginBottom: 25,
  },

  editBtn: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  editBtnText: {
    color: "#fff",
    textAlign: "center",
  },

  deleteBtn: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
  },

  deleteBtnText: {
    color: "#fff",
    textAlign: "center",
  },
});
