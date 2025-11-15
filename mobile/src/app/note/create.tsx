import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
    <View style={{ flex: 1, justifyContent: "center", padding: 25 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 25 }}>
        Create Note
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
        onPress={onCreate}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#1e4fcf" : "#2563eb",
          padding: 15,
          borderRadius: 10,
          marginTop: 15,
          opacity: loading ? 0.8 : 1,
        }}
      >
        {loading ? (
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
            Save
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
