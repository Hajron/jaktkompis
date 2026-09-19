import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const statuser = ['På post', 'I bevegelse', 'Pause'];

export default function MinStatusScreen() {
  const [status, setStatus] = useState('På post');
  const [omrade, setOmrade] = useState('');
  const [notat, setNotat] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.tittel}>Min status</Text>

      <Text style={styles.etikett}>Velg status</Text>
      <View style={styles.knapperad}>
        {statuser.map((s) => (
          <Pressable
            key={s}
            style={[styles.valg, status === s && styles.valgAktiv]}
            onPress={() => setStatus(s)}
          >
            <Text style={styles.valgTekst}>{s}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.etikett}>Område</Text>
      <TextInput
        style={styles.felt}
        value={omrade}
        onChangeText={setOmrade}
        placeholder="For eksempel Storhaugen"
      />

      <Text style={styles.etikett}>Notat til laget</Text>
      <TextInput
        style={[styles.felt, styles.feltStort]}
        value={notat}
        onChangeText={setNotat}
        placeholder="Kort melding"
        multiline
      />

      <View style={styles.oppsummering}>
        <Text style={styles.oppsummeringTekst}>
          Du er registrert som «{status}»
          {omrade ? ` ved ${omrade}` : ''}.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tittel: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  etikett: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 16,
  },
  knapperad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valg: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
  valgAktiv: {
    borderColor: '#333',
    borderWidth: 2,
  },
  valgTekst: {
    fontSize: 14,
  },
  felt: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    fontSize: 15,
  },
  feltStort: {
    height: 90,
    textAlignVertical: 'top',
  },
  oppsummering: {
    marginTop: 24,
    padding: 14,
    backgroundColor: '#f2f2f2',
  },
  oppsummeringTekst: {
    fontSize: 15,
  },
});