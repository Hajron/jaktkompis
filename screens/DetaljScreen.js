import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { farger, rom, tekst, radius } from '../theme/theme';

// Props. Samme prinsipp som MedlemKort.
function InfoRad({ etikett, verdi }) {
  return (
    <View style={styles.rad}>
      <Text style={styles.etikett}>{etikett}</Text>
      <Text style={styles.verdi}>{verdi}</Text>
    </View>
  );
}

export default function DetaljScreen({ route }) {
    // Leser medlemmet som ble sendt med i navigasjonen.
  const { medlem } = route.params;
  const [kvittert, setKvittert] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topp}>
        <Text style={styles.navn}>{medlem.navn}</Text>
        <View style={styles.merke}>
          <Text style={styles.merkeTekst}>{medlem.status}</Text>
        </View>
      </View>

      <View style={styles.kort}>
        <InfoRad etikett="Rolle" verdi={medlem.rolle} />
        <InfoRad etikett="Jaktform" verdi={medlem.jaktform} />
        <InfoRad etikett="Område" verdi={medlem.omrade} />
        <InfoRad etikett="Sist sett" verdi={medlem.sistSett} />
        <InfoRad etikett="Telefon" verdi={medlem.telefon} />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.knapp,
          kvittert && styles.knappAktiv,
          pressed && styles.knappTrykket,
        ]}
        onPress={() => setKvittert(!kvittert)}
      >
        <Text style={[styles.knappTekst, kvittert && styles.knappTekstAktiv]}>
          {kvittert ? 'Kontakt bekreftet' : 'Bekreft kontakt'}
        </Text>
      </Pressable>

      <Text style={styles.hjelpetekst}>
        Bekreft når du har hatt kontakt med jegeren i felt.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: farger.bakgrunn,
  },
  topp: {
    padding: rom.m,
    paddingTop: rom.l,
  },
  navn: {
    ...tekst.tittel,
    color: farger.tekst,
  },
  merke: {
    alignSelf: 'flex-start',
    marginTop: rom.s,
    paddingHorizontal: rom.s,
    paddingVertical: rom.xs,
    backgroundColor: farger.aksentSvak,
    borderRadius: radius.s,
  },
  merkeTekst: {
    ...tekst.smatekst,
    color: farger.aksent,
    fontWeight: '600',
  },
  kort: {
    marginHorizontal: rom.m,
    backgroundColor: farger.flate,
    borderWidth: 1,
    borderColor: farger.linje,
    borderRadius: radius.m,
    paddingHorizontal: rom.m,
  },
  rad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rom.m,
    borderBottomWidth: 1,
    borderBottomColor: farger.linje,
  },
  etikett: {
    ...tekst.brodtekst,
    color: farger.tekstSvak,
  },
  verdi: {
    ...tekst.brodtekst,
    color: farger.tekst,
    fontWeight: '600',
  },
  knapp: {
    margin: rom.m,
    paddingVertical: rom.m,
    alignItems: 'center',
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: farger.aksent,
  },
  knappAktiv: {
    backgroundColor: farger.aksent,
  },
  knappTrykket: {
    opacity: 0.7,
  },
  knappTekst: {
    ...tekst.brodtekst,
    fontWeight: '600',
    color: farger.aksent,
  },
  knappTekstAktiv: {
    color: farger.flate,
  },
  hjelpetekst: {
    ...tekst.smatekst,
    color: farger.tekstSvak,
    paddingHorizontal: rom.m,
    paddingBottom: rom.xl,
  },
});