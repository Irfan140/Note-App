import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useApi } from "../../lib/api";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const api = useApi();
  const router = useRouter();
  const { signOut } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const loadNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data as Note[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const onLogout = async () => {
    setLogoutLoading(true);
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Top Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "700" }}>Your Notes</Text>

        <TouchableOpacity
          onPress={onLogout}
          style={{
            backgroundColor: "#ef4444",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {logoutLoading ? "..." : "Logout"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notes Loading */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/note/${item.id}`} asChild>
              <TouchableOpacity
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 12,
                  marginBottom: 12,
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {item.title}
                </Text>
                <Text numberOfLines={2} style={{ color: "#555" }}>
                  {item.content}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}

      {/* Add Button */}
      <Link href="/note/create" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#2563eb",
            padding: 16,
            borderRadius: 12,
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "#fff",
              fontWeight: "600",
            }}
          >
            + Add Note
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
