import React, { useState } from "react";
import { Button, ScrollView, TextInput, View, StyleSheet } from "react-native";
import { db } from "../database/firebase"; // Importa `db` correctamente

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: "",
    autor: "",
    anio: "",
  });

  const handlerChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("Please provide a name");
    } else {
      try {
        await db.collection("user").add({
          name: state.name,
          autor: state.autor,
          anio: state.anio,
        });
        props.navigation.navigate('UsersList');
      } catch (error) {
        console.error("Error saving document: ", error);
        alert("Hubo un error al guardar el usuario");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handlerChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Autor"
          onChangeText={(value) => handlerChangeText("autor", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Anio"
          onChangeText={(value) => handlerChangeText("anio", value)}
        />
      </View>
      <View>
        <Button title="Guardar" onPress={saveNewUser} />
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

export default CreateUserScreen;
