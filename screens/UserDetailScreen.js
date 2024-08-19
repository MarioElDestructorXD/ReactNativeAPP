import { db } from "../database/firebase";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    autor: "",
    anio: "",
  };
  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = db.collection("user").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handlerChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    const dbRef = db.collection("user").doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("UsersList");
  };

  const updateUser = async () => {
    const dbRef = db.collection("user").doc(user.id);
    await dbRef.set({
      name: user.name,
      autor: user.autor,
      anio: user.anio,
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Eliminar", "Estas Seguro?", [
      { text: "Si", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log(false) },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          value={user.name}
          onChangeText={(value) => handlerChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Autor"
          value={user.autor}
          onChangeText={(value) => handlerChangeText("autor", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Anio"
          value={user.anio}
          onChangeText={(value) => handlerChangeText("anio", value)}
        />
      </View>
      <View>
        <Button color="green" title="Actualizar" onPress={() => updateUser()} />
      </View>
      <View>
        <Button
          color="red"
          title="Eliminar"
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default UserDetailScreen;
