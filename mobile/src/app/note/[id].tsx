import { useLocalSearchParams, Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useApi } from "../../lib/api";

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
      <ActivityIndicator
        size="large"
        color="#2563eb"
        style={{ marginTop: 40 }}
      />
    );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 10 }}>
        {note?.title}
      </Text>

      <Text style={{ color: "#555", marginBottom: 25 }}>{note?.content}</Text>

      <Link href={`/note/edit?id=${id}`} asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#2563eb",
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Edit</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={deleteNote}
        style={{
          backgroundColor: "red",
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          {deleting ? "Deleting..." : "Delete"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
