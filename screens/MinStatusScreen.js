import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { farger, rom, tekst, radius } from '../theme/theme';

const statuser = ['På post', 'I bevegelse', 'Pause'];

export default function MinStatusScreen() {
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState('På post');
  const [omrade, setOmrade] = useState('');
  const [notat, setNotat] = useState('');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + rom.l }}
    >
      <View style={styles.seksjon}>
        <Text style={styles.tittel}>Min status</Text>
        <Text style={styles.undertittel}>
          Dette ser resten av laget når de åpner appen.
        </Text>
      </View>

      <View style={styles.seksjon}>
        <Text style={styles.etikett}>Status</Text>
        <View style={styles.knapperad}>
          {statuser.map((s) => (
            <Pressable
              key={s}
              style={[styles.valg, status === s && styles.valgAktiv]}
              onPress={() => setStatus(s)}
            >
              <Text
                style={[styles.valgTekst, status === s && styles.valgTekstAktiv]}
              >
                {s}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.seksjon}>
        <Text style={styles.etikett}>Område</Text>
        <TextInput
          style={styles.felt}
          value={omrade}
          onChangeText={setOmrade}
          placeholder="For eksempel Storhaugen"
          placeholderTextColor={farger.tekstSvak}
        />
      </View>

      <View style={styles.seksjon}>
        <Text style={styles.etikett}>Notat til laget</Text>
        <TextInput
          style={[styles.felt, styles.feltStort]}
          value={notat}
          onChangeText={setNotat}
          placeholder="Kort melding"
          placeholderTextColor={farger.tekstSvak}
          multiline
        />
      </View>

      <View style={styles.oppsummering}>
        <Text style={styles.oppsummeringEtikett}>Slik vises du nå</Text>
        <Text style={styles.oppsummeringTekst}>
          {status}
          {omrade ? ` · ${omrade}` : ''}
        </Text>
        {notat ? <Text style={styles.notatTekst}>«{notat}»</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: farger.bakgrunn,
  },
  seksjon: {
    paddingHorizontal: rom.m,
    marginBottom: rom.l,
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
  etikett: {
    ...tekst.smatekst,
    color: farger.tekstSvak,
    marginBottom: rom.s,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  knapperad: {
    flexDirection: 'row',
  },
  valg: {
    flex: 1,
    paddingVertical: rom.s + 2,
    marginRight: rom.s,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: farger.linje,
    borderRadius: radius.s,
    backgroundColor: farger.flate,
  },
  valgAktiv: {
    borderColor: farger.aksent,
    backgroundColor: farger.aksent,
  },
  valgTekst: {
    ...tekst.smatekst,
    color: farger.tekst,
  },
  valgTekstAktiv: {
    color: farger.flate,
    fontWeight: '600',
  },
  felt: {
    ...tekst.brodtekst,
    color: farger.tekst,
    backgroundColor: farger.flate,
    borderWidth: 1,
    borderColor: farger.linje,
    borderRadius: radius.s,
    padding: rom.m,
  },
  feltStort: {
    height: 100,
    textAlignVertical: 'top',
  },
  oppsummering: {
    marginHorizontal: rom.m,
    marginBottom: rom.xl,
    padding: rom.m,
    backgroundColor: farger.aksentSvak,
    borderRadius: radius.m,
  },
  oppsummeringEtikett: {
    ...tekst.smatekst,
    color: farger.tekstSvak,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  oppsummeringTekst: {
    ...tekst.overskrift,
    color: farger.aksent,
    marginTop: rom.xs,
  },
  notatTekst: {
    ...tekst.brodtekst,
    color: farger.tekst,
    marginTop: rom.s,
  },
});