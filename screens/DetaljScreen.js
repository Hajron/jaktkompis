import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function DetaljScreen({ route }) {
  const { medlem } = route.params;
  const [kvittert, setKvittert] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.navn}>{medlem.navn}</Text>

      <View style={styles.rad}>
        <Text style={styles.etikett}>Rolle</Text>
        <Text style={styles.verdi}>{medlem.rolle}</Text>
      </View>

      <View style={styles.rad}>
        <Text style={styles.etikett}>Jaktform</Text>
        <Text style={styles.verdi}>{medlem.jaktform}</Text>
      </View>

      <View style={styles.rad}>
        <Text style={styles.etikett}>Område</Text>
        <Text style={styles.verdi}>{medlem.omrade}</Text>
      </View>

      <View style={styles.rad}>
        <Text style={styles.etikett}>Status</Text>
        <Text style={styles.verdi}>{medlem.status}</Text>
      </View>

      <View style={styles.rad}>
        <Text style={styles.etikett}>Sist sett</Text>
        <Text style={styles.verdi}>{medlem.sistSett}</Text>
      </View>

      <View style={styles.rad}>
        <Text style={styles.etikett}>Telefon</Text>
        <Text style={styles.verdi}>{medlem.telefon}</Text>
      </View>

      <Pressable
        style={styles.knapp}
        onPress={() => setKvittert(!kvittert)}
      >
        <Text style={styles.knappTekst}>
          {kvittert ? 'Kontakt bekreftet' : 'Bekreft kontakt'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  navn: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  rad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  etikett: {
    fontSize: 15,
  },
  verdi: {
    fontSize: 15,
    fontWeight: '600',
  },
  knapp: {
    marginTop: 24,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  knappTekst: {
    fontSize: 16,
    fontWeight: '600',
  },
});