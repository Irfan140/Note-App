import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useApi } from "../../lib/api";

export default function EditNote() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const api = useApi();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    const res = await api.get(`/notes/${id}`);
    setTitle(res.data.title);
    setContent(res.data.content);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSave = async () => {
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    await api.put(`/notes/${id}`, { title, content });
    setSaving(false);
    router.back();
  };

  if (loading)
    return (
      <ActivityIndicator size="large" color="#2563eb" style={styles.loading} />
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Note</Text>

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
        onPress={onSave}
        disabled={saving}
        style={[styles.saveBtn, saving && styles.saveBtnLoading]}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveBtnText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 50,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
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
