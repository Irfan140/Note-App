import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useApi } from "../../lib/api";
import { useRouter } from "expo-router";

export default function CreateNote() {
  const router = useRouter();
  const api = useApi();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    await api.post("/notes", { title, content });
    setLoading(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Note</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Content"
        multiline
        value={content}
        onChangeText={setContent}
        style={styles.textArea}
      />

      <TouchableOpacity
        onPress={onCreate}
        disabled={loading}
        style={[styles.saveBtn, loading && styles.saveBtnLoading]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveBtnText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    height: 130,
    backgroundColor: "#f9fafb",
    textAlignVertical: "top",
  },

  saveBtn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },

  saveBtnLoading: {
    backgroundColor: "#1e4fcf",
    opacity: 0.8,
  },

  saveBtnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
