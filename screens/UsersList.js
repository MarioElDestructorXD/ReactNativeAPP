import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { db } from "../database/firebase";
import { ListItem } from "react-native-elements";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("user").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, autor, anio } = doc.data();
        users.push({
          id: doc.id,
          name,
          autor,
          anio,
        });
      });
      setUsers(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView>
      <Button
        title="Crear"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />

      {users.length > 0 ? (
        users.map((user) => (
          <ListItem key={user.id} bottomDivider onPress={() => {
            props.navigation.navigate('UserDetailScreen', {
                userId: user.id
            })
          }}>
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.autor}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      ) : (
        <View>
          <Text>No hay usuarios disponibles</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default UsersList;
