import { View, Text, StyleSheet, Pressable } from 'react-native';
import { farger, rom, tekst, radius } from '../theme/theme';

export default function MedlemKort({ medlem, onTrykk }) {
  const erAktiv = medlem.status !== 'Pause';

  return (
    <Pressable
      style={({ pressed }) => [styles.kort, pressed && styles.kortTrykket]}
      onPress={onTrykk}
    >
      <View style={styles.venstre}>
        <View style={[styles.prikk, !erAktiv && styles.prikkInaktiv]} />
      </View>

      <View style={styles.innhold}>
        <Text style={styles.navn}>{medlem.navn}</Text>
        <Text style={styles.detalj}>
          {medlem.rolle} · {medlem.omrade}
        </Text>
      </View>

      <View style={styles.hoyre}>
        <Text style={styles.status}>{medlem.status}</Text>
        <Text style={styles.tid}>{medlem.sistSett}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kort: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rom.m,
    paddingHorizontal: rom.m,
    backgroundColor: farger.flate,
    borderBottomWidth: 1,
    borderBottomColor: farger.linje,
  },
  kortTrykket: {
    backgroundColor: farger.aksentSvak,
  },
  venstre: {
    marginRight: rom.m,
  },
  prikk: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: farger.aksent,
  },
  prikkInaktiv: {
    backgroundColor: farger.linje,
  },
  innhold: {
    flex: 1,
  },
  navn: {
    ...tekst.overskrift,
    color: farger.tekst,
  },
  detalj: {
    ...tekst.smatekst,
    color: farger.tekstSvak,
    marginTop: 2,
  },
  hoyre: {
    alignItems: 'flex-end',
  },
  status: {
    ...tekst.smatekst,
    color: farger.tekst,
  },
  tid: {
    ...tekst.smatekst,
    color: farger.tekstSvak,
    marginTop: 2,
  },
});