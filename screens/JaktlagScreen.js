import { View, FlatList, StyleSheet } from 'react-native';
import { jaktlag } from '../data/jaktlag';
import MedlemKort from '../components/MedlemKort';

export default function JaktlagScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={jaktlag}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedlemKort
            medlem={item}
            onTrykk={() => navigation.navigate('Detalj', { medlem: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});