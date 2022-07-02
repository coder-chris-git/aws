/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import {listUserModels} from './src/graphql/queries';
import {createUserModel} from './src/graphql/mutations';
import {onCreateUserModel} from './src/graphql/subscriptions';

const App = () => {
  const [users, setUsers] = useState({data: []});
  const [user, setUser] = useState({data: []});

  useEffect(() => {
    fetchUsers();
  }, [users]);

  useEffect(() => {
    createNewUser();
    const subscription = API.graphql(
      graphqlOperation(onCreateUserModel),
    ).subscribe({
      next: eventData => {
        setUsers({data: [...user, eventData.data.onCreateUserModel]});
      },
    });

    return subscription.unsubscribe();
  }, []);

  const fetchUsers = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUserModels));
      setUsers({data: userData.data.listUserModels.items});
    } catch (error) {
      console.log(error);
    }
  };

  const createNewUser = async e => {
    try {
      const newUser = await Auth.currentUserInfo();
      const {attributes} = await Auth.currentUserInfo();
      await API.graphql(
        graphqlOperation(createUserModel, {
          input: {username: newUser.username, email: attributes.email},
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    await Auth.signOut();
  };
  return (
    <SafeAreaView>
      {/* {user.map(u => (
        <Text>{u.name}</Text>
      ))} */}

      {users.data.map(u => (
        <Text>{u.username}</Text>
      ))}
      <Button title="signout" onPress={signOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default withAuthenticator(App);
