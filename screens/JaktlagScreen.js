import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jaktlag } from '../data/jaktlag';
import MedlemKort from '../components/MedlemKort';
import { farger, rom, tekst } from '../theme/theme';

export default function JaktlagScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const antallUte = jaktlag.filter((m) => m.status !== 'Pause').length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.tittel}>Jaktlaget</Text>
        <Text style={styles.undertittel}>
          {antallUte} av {jaktlag.length} er ute i terrenget
        </Text>
      </View>

      <FlatList
        data={jaktlag}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedlemKort
            medlem={item}
            onTrykk={() => navigation.navigate('Detalj', { medlem: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.tom}>Ingen i laget er registrert ennå.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: farger.bakgrunn,
  },
  header: {
    paddingHorizontal: rom.m,
    paddingTop: rom.l,
    paddingBottom: rom.m,
  },
  tittel: {
    ...tekst.tittel,
    color: farger.tekst,
  },
  undertittel: {
    ...tekst.brodtekst,
    color: farger.tekstSvak,
    marginTop: rom.xs,
  },
  tom: {
    ...tekst.brodtekst,
    color: farger.tekstSvak,
    padding: rom.m,
  },
});