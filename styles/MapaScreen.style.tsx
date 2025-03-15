import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Estilização do contêiner principal da tela
    container: {
      flex: 1, // Ocupa todo o espaço disponível
      backgroundColor: '#fff', // Define o fundo como branco
      alignItems: 'center', // Centraliza os itens horizontalmente
      justifyContent: 'center', // Centraliza os itens verticalmente
    },

    // Estilização do mapa
    map: {
      width: '100%', // O mapa ocupa toda a largura da tela
      height: '100%', // O mapa ocupa toda a altura da tela
    },

    // Estilização do ícone do marcador (caso seja usado um ícone personalizado)
    markerIcon: {
      width: 40, // Define a largura do ícone
      height: 40, // Define a altura do ícone
      resizeMode: 'contain', // Mantém a proporção original do ícone ao ajustá-lo
    },

    // Contêiner do endereço exibido na tela
    enderecoContainer: {
      position: 'absolute', // Posicionamento absoluto sobre o mapa
      bottom: 20, // Distância da parte inferior da tela
      left: 20, // Distância da lateral esquerda
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo preto com transparência
      padding: 10, // Espaçamento interno para melhor visualização do texto
      borderRadius: 5, // Bordas arredondadas
    },

    // Estilização do texto do endereço
    enderecoText: {
      color: 'white', // Cor do texto branca para contraste com o fundo escuro
      fontSize: 14, // Tamanho da fonte
    }
  });
