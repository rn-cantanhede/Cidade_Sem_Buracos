import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // Estilização do contêiner principal da tela
    container: {
        flex: 1, // Ocupa todo o espaço disponível
        backgroundColor: '#fff', // Define o fundo como branco
        padding: 20, // Adiciona espaçamento interno
        justifyContent: 'center', // Centraliza os itens verticalmente
        alignItems: 'center', // Centraliza os itens horizontalmente
    },

    // Estilização do título principal
    title: {
        fontSize: 24, // Tamanho grande para destaque
        fontWeight: 'bold', // Texto em negrito
        textAlign: 'center', // Centraliza o texto
        marginBottom: 10, // Espaçamento inferior
    },

    // Estilização do subtítulo
    subtitle: {
        fontSize: 18, // Tamanho intermediário
        fontWeight: 'bold', // Texto em negrito
        marginTop: 20, // Espaçamento superior
    },

    // Estilização da descrição/texto informativo
    description: {
        fontSize: 16, // Tamanho do texto legível
        textAlign: 'center', // Centraliza o texto
        marginBottom: 20, // Espaçamento inferior
    },

    // Estilização de um passo/instrução
    step: {
        fontSize: 14, // Texto um pouco menor para detalhes
        marginBottom: 5, // Espaçamento inferior entre os passos
    },

    // Estilização do botão para acessar o GitHub
    githubButton: {
        flexDirection: 'row', // Organiza os itens horizontalmente
        alignItems: 'center', // Alinha os itens no centro
        backgroundColor: '#333', // Cor de fundo escura (GitHub)
        padding: 10, // Espaçamento interno
        borderRadius: 5, // Bordas arredondadas
        marginTop: 20, // Espaçamento superior
    },

    // Estilização do texto dentro do botão do GitHub
    githubText: {
        color: 'white', // Cor branca para contraste
        fontSize: 16, // Tamanho legível
        marginLeft: 10, // Espaçamento entre ícone e texto
    },
});
