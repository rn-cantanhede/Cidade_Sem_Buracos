import React from 'react';
import {  View, Text, StyleSheet, Button, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../styles/InicioScreen.styles';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

 function InicioScreen({ navigation }: Props ) {
     return (
        <View style={ styles.container }>
            {/* Explicação do Aplicativo */}
            <Text style={styles.title}>Bem-vindo ao Cidade Sem Buracos</Text>
            <Text style={styles.description}>
                Um aplicativo para mapear e denunciar buracos nas ruas da cidade.
            </Text>


            {/* Como Funciona */}
            <Text style={styles.subtitle}>Como Funciona?</Text>
            <Text style={styles.step}>Passo 1: Veja os buracos já cadastrados no mapa.          </Text>
            <Text style={styles.step}>Passo 2: Toque no mapa para marcar um novo buraco.   </Text>
            <Text style={styles.step}>Passo 3: As informações serão armazenadas e exibidas.</Text>


            {/* Botões */}
            <Text>
              
            </Text>
            <Button title="Ver Mapa" onPress={() => navigation.navigate('Mapa')}/>



            {/* Feedback e Contato */}
            {/* <Text style={styles.subtitle}>Feedback e Contato</Text>
            <Text style={styles.description}>
                Tem sugestões ou encontrou um problema? Entre em contato!
            </Text>
            <Button
                title="Enviar e-mail"
                onPress={() => Linking.openURL("email")}
            /> */}


            {/* Botão GitHub com ícone */}
            {/* <TouchableOpacity
                style={styles.githubButton}
                onPress={() => Linking.openURL('git')}
            >
                <Ionicons name="logo-github" size={24} color="white" />
                <Text style={styles.githubText}>GitHub</Text>
            </TouchableOpacity> */}

        </View>
     );
 }
 export default InicioScreen;