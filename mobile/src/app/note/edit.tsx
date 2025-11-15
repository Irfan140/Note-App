import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
      <ActivityIndicator
        size="large"
        color="#2563eb"
        style={{ marginTop: 50 }}
      />
    );

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 25 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 20 }}>
        Edit Note
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
          backgroundColor: "#f9fafb",
        }}
      />

      <TextInput
        placeholder="Content"
        multiline
        value={content}
        onChangeText={setContent}
        style={{
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 10,
          padding: 12,
          height: 130,
          backgroundColor: "#f9fafb",
          textAlignVertical: "top",
        }}
      />

      <TouchableOpacity
        onPress={onSave}
        disabled={saving}
        style={{
          backgroundColor: saving ? "#1e4fcf" : "#2563eb",
          padding: 15,
          borderRadius: 10,
          marginTop: 15,
          opacity: saving ? 0.8 : 1,
        }}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Save Changes
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
