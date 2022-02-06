import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // async function handleSignInAnonymously() {
  //   const { user } = await auth().signInAnonymously();
  // }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Uhuuu', 'Conta criada com sucesso!'))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Atenção!', 'Email já cadastrado.')
        }
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Atenção!', 'Email inválido.')
        }
        if (error.code === 'auth/weak-password') {
          return Alert.alert('Atenção!', 'A senha deve ter no mínimo 6 caracteres.')
        }
      })
  }

  function handleSignIngWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {

      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Atenção', 'Usuário não encontrado!')
        }
        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Atenção', 'Senha inválida!')
        }
      })
  }

  function handleForgotPassword() {
    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert('Anteção', 'Enviamos um email para redefinir sua senha.'))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignIngWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}