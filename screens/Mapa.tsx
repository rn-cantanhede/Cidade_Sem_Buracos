import { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { ref, set, push, onValue } from "firebase/database";
import { db } from "../config/firebaseConfig";
import { styles } from '../styles/MapaScreen.style';
import * as Location from 'expo-location';
import { NavigationProp } from '@react-navigation/native';

// Definição das propriedades esperadas pelo componente
type Props = {
  navigation: NavigationProp<any>;
};

function MapaScreen({ navigation }: Props) {
  // Armazena a localização do usuário
  const [localizacao, setLocalizacao] = useState<Location.LocationObject | null>(null);
  
  // Referência para o mapa, permitindo manipulação da câmera
  const mapRef = useRef<MapView>(null);
  
  // Armazena a coordenada do local selecionado no mapa
  const [selectedCoordinate, setSelectedCoordinate] = useState<{ latitude: number; longitude: number } | null>(null);
  
  // Armazena o endereço da coordenada selecionada
  const [endereco, setEndereco] = useState<string | null>(null);
  
  // Armazena a lista de buracos obtidos do banco de dados
  const [buracos, setBuracos] = useState<{ id: string; latitude: number; longitude: number; descricao?: string; dataFormatada?: string }[]>([]);
  
  // Indica se a localização está sendo carregada
  const [isLoading, setIsLoading] = useState(true);
  
  // Indica se o endereço está sendo buscado
  const [isFetchingAddress, setIsFetchingAddress] = useState(false); 

  // Função para formatar a data para um formato mais comum
  const formatarData = (timestamp: number) => {
    const data = new Date(timestamp);
    return data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }); 
  };

  // Função para obter o endereço e verificar se está em uma rua
  const getAddressFromCoordinates = async (coordinate: { latitude: number; longitude: number }) => {
    try {
      setIsFetchingAddress(true); // Indica que a busca do endereço começou
      const results = await Location.reverseGeocodeAsync(coordinate);
      if (results.length === 0) {
        setEndereco("Endereço não disponível");
        return null;
      }
      
      const result = results[0];
      const ehRua = result?.street !== null; // Verifica se há nome de rua
      if (!ehRua) {
        Alert.alert("Erro", "Só é possível adicionar buracos em vias públicas.");
        return null;
      }
      
      const formattedAddress = `${result.street}, ${result.subregion}, ${result.region}`;
      setEndereco(formattedAddress);
      return formattedAddress;
    } catch (error) {
      console.error("Erro ao obter endereço:", error);
      setEndereco("Erro ao obter endereço");
      return null;
    } finally {
      setIsFetchingAddress(false); // Finaliza a busca do endereço
    }
  };

  // Função chamada quando o usuário clica no mapa
  const handlePressMap = async (e: MapPressEvent) => {
    const { coordinate } = e.nativeEvent;
    setSelectedCoordinate(coordinate);

    const enderecoObtido = await getAddressFromCoordinates(coordinate);
    if (!enderecoObtido) return; // Cancela se não for uma rua

    const timestamp = Date.now(); // Obtém o timestamp atual
    const dataFormatada = formatarData(timestamp); // Converte para um formato mais comum

    // Exibe um alerta para confirmar a adição do buraco
    Alert.alert(
      "Confirmar Adição",
      `Deseja adicionar um buraco na localização: ${enderecoObtido}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Adicionar",
          onPress: () => {
            const newBuracoRef = push(ref(db, "buracos"));
            set(newBuracoRef, {
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              endereco: enderecoObtido,
              timestamp: timestamp, // Salva o timestamp original em milissegundos
              dataFormatada: dataFormatada, // Salva a data formatada para facilitar a exibição
            });
          },
        },
      ]
    );
  };

  // Solicita permissão para acessar a localização do usuário
  async function requestLocationPermissions() {
    setIsLoading(true);
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await Location.getCurrentPositionAsync();
      setLocalizacao(currentPosition);
    }
    setIsLoading(false);
  }

  //  Obtém a localização do usuário ao iniciar o aplicativo
  useEffect(() => {
    requestLocationPermissions();
  }, []);

  // Acompanha a posição do usuário em tempo real
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;
    (async () => {
      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 1 },
        (response) => {
          setLocalizacao(response);
          if (mapRef.current) {
            mapRef.current.animateCamera({ center: response.coords });
          }
        }
      );
    })();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // Obtém a lista de buracos cadastrados no Firebase
  useEffect(() => {
    const buracosRef = ref(db, "buracos");
    onValue(buracosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const buracosArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setBuracos(buracosArray);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : localizacao && localizacao.coords ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onPress={handlePressMap}
          showsUserLocation={true} // Exibe a localização do usuário no mapa
          showsMyLocationButton={true} // Adiciona um botão para centralizar a localização
          mapType="satellite" // Define o tipo do mapa para visão de satélite
        >
          {/* Marcador para o local selecionado pelo usuário */}
          {selectedCoordinate && (
            <Marker coordinate={selectedCoordinate} 
            title="Buraco" 
            description={endereco || "Endereço não disponível"} />
          )}
          {/* Exibe todos os buracos cadastrados no Firebase */}
          {buracos.map((buraco) => (
            <Marker key={buraco.id} coordinate={{ 
              latitude: buraco.latitude, 
              longitude: buraco.longitude }} 
              title="Buraco" description={buraco.dataFormatada} />
          ))}
        </MapView>
      ) : (
        <Text>Localização não disponível</Text>
      )}

      {isFetchingAddress && <ActivityIndicator size="small" color="#ff0000" />} 
      {/* Exibe o endereço do local selecionado, caso exista */}
      {endereco && (
        <View style={styles.enderecoContainer}>
          <Text style={styles.enderecoText}>{endereco}</Text>
        </View>
      )}
    </View>
  );
}

export default MapaScreen;