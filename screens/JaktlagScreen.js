import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import MedlemKort from '../components/MedlemKort';
import { farger, rom, tekst } from '../theme/theme';

// Databasen bruker snake_case, appen bruker camelCase.
function tilAppFormat(rad) {
  return {
    id: rad.id,
    navn: rad.navn,
    rolle: rad.rolle,
    jaktform: rad.jaktform,
    omrade: rad.omrade,
    status: rad.status,
    sistSett: rad.sist_sett,
    telefon: rad.telefon,
  };
}

export default function JaktlagScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [medlemmer, setMedlemmer] = useState([]);
  const [laster, setLaster] = useState(true);
  const [oppdaterer, setOppdaterer] = useState(false);
  const [feil, setFeil] = useState('');

  async function hentMedlemmer() {
    setFeil('');

    const { data, error } = await supabase
      .from('medlemmer')
      .select('*')
      .order('navn');

    if (error) {
      setFeil('Kunne ikke hente jaktlaget.');
    } else {
      setMedlemmer(data.map(tilAppFormat));
    }

    setLaster(false);
  }

  // KRAV: datahenting med useEffect nar skjermen apnes
  useEffect(() => {
    hentMedlemmer();
  }, []);

  async function oppdater() {
    setOppdaterer(true);
    await hentMedlemmer();
    setOppdaterer(false);
  }

  const antallUte = medlemmer.filter((m) => m.status !== 'Pause').length;

  if (laster) {
    return (
      <View style={[styles.container, styles.midtstilt]}>
        <ActivityIndicator size="large" color={farger.aksent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.tittel}>Jaktlaget</Text>
        <Text style={styles.undertittel}>
          {antallUte} av {medlemmer.length} er ute i terrenget
        </Text>
      </View>

      {feil ? (
        <View style={styles.feilBoks}>
          <Text style={styles.feilTekst}>{feil}</Text>
        </View>
      ) : null}

      <FlatList
        data={medlemmer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedlemKort
            medlem={item}
            onTrykk={() => navigation.navigate('Detalj', { medlem: item })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={oppdaterer}
            onRefresh={oppdater}
            tintColor={farger.aksent}
          />
        }
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
  midtstilt: {
    justifyContent: 'center',
    alignItems: 'center',
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
  feilBoks: {
    marginHorizontal: rom.m,
    marginBottom: rom.s,
    padding: rom.m,
    backgroundColor: '#F8E8E0',
    borderRadius: 4,
  },
  feilTekst: {
    ...tekst.smatekst,
    color: farger.varsel,
  },
  tom: {
    ...tekst.brodtekst,
    color: farger.tekstSvak,
    padding: rom.m,
  },
});