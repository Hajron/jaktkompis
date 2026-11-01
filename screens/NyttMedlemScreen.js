import { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet,
  ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { farger, rom, tekst, radius } from '../theme/theme';

const jaktformer = ['Post', 'Stykkjakt'];

export default function NyttMedlemScreen({ navigation }) {
  const [navn, setNavn] = useState('');
  const [rolle, setRolle] = useState('');
  const [jaktform, setJaktform] = useState('Post');
  const [omrade, setOmrade] = useState('');
  const [telefon, setTelefon] = useState('');
  const [feil, setFeil] = useState({});
  const [serverFeil, setServerFeil] = useState('');
  const [lagrer, setLagrer] = useState(false);

  // KRAV: validering av brukerinput
  function validerSkjema() {
    const nyeFeil = {};

    if (!navn.trim()) {
      nyeFeil.navn = 'Navn må fylles ut';
    } else if (navn.trim().length < 2) {
      nyeFeil.navn = 'Navnet er for kort';
    }

    if (!rolle.trim()) {
      nyeFeil.rolle = 'Rolle må fylles ut';
    }

    if (!omrade.trim()) {
      nyeFeil.omrade = 'Område må fylles ut';
    }

    if (telefon.trim() && !/^[\d\s+]{8,}$/.test(telefon.trim())) {
      nyeFeil.telefon = 'Ugyldig telefonnummer';
    }

    setFeil(nyeFeil);
    return Object.keys(nyeFeil).length === 0;
  }

  // KRAV: CRUD - oppretter ny rad i Supabase
  async function lagre() {
    if (!validerSkjema()) return;

    setLagrer(true);
    setServerFeil('');

    const klokkeslett = new Date().toTimeString().slice(0, 5);

    const { error } = await supabase.from('medlemmer').insert({
      navn: navn.trim(),
      rolle: rolle.trim(),
      jaktform,
      omrade: omrade.trim(),
      status: jaktform === 'Post' ? 'På post' : 'I bevegelse',
      sist_sett: klokkeslett,
      telefon: telefon.trim() || null,
    });

    setLagrer(false);

    if (error) {
      setServerFeil(error.message);
    } else {
      navigation.goBack();
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.innhold}>
        <Text style={styles.etikett}>Navn</Text>
        <TextInput
          style={[styles.felt, feil.navn && styles.feltFeil]}
          value={navn}
          onChangeText={setNavn}
          placeholder="Ola Nordmann"
          placeholderTextColor={farger.tekstSvak}
        />
        {feil.navn ? <Text style={styles.feilTekst}>{feil.navn}</Text> : null}

        <Text style={styles.etikett}>Rolle</Text>
        <TextInput
          style={[styles.felt, feil.rolle && styles.feltFeil]}
          value={rolle}
          onChangeText={setRolle}
          placeholder="Poststående, hundefører, los"
          placeholderTextColor={farger.tekstSvak}
        />
        {feil.rolle ? <Text style={styles.feilTekst}>{feil.rolle}</Text> : null}

        <Text style={styles.etikett}>Jaktform</Text>
        <View style={styles.knapperad}>
          {jaktformer.map((j) => (
            <Pressable
              key={j}
              style={[styles.valg, jaktform === j && styles.valgAktiv]}
              onPress={() => setJaktform(j)}
            >
              <Text
                style={[styles.valgTekst, jaktform === j && styles.valgTekstAktiv]}
              >
                {j}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.etikett}>Område</Text>
        <TextInput
          style={[styles.felt, feil.omrade && styles.feltFeil]}
          value={omrade}
          onChangeText={setOmrade}
          placeholder="Storhaugen"
          placeholderTextColor={farger.tekstSvak}
        />
        {feil.omrade ? <Text style={styles.feilTekst}>{feil.omrade}</Text> : null}

        <Text style={styles.etikett}>Telefon (valgfritt)</Text>
        <TextInput
          style={[styles.felt, feil.telefon && styles.feltFeil]}
          value={telefon}
          onChangeText={setTelefon}
          placeholder="900 12 345"
          placeholderTextColor={farger.tekstSvak}
          keyboardType="phone-pad"
        />
        {feil.telefon ? <Text style={styles.feilTekst}>{feil.telefon}</Text> : null}

        {serverFeil ? (
          <View style={styles.serverFeilBoks}>
            <Text style={styles.serverFeilTekst}>{serverFeil}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [styles.knapp, pressed && styles.knappTrykket]}
          onPress={lagre}
          disabled={lagrer}
        >
          {lagrer ? (
            <ActivityIndicator color={farger.flate} />
          ) : (
            <Text style={styles.knappTekst}>Legg til i jaktlaget</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: farger.bakgrunn,
  },
  innhold: {
    padding: rom.m,
    paddingBottom: rom.xl,
  },
  etikett: {
    ...tekst.smatekst,
    color: farger.tekstSvak,
    marginBottom: rom.s,
    marginTop: rom.m,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  feltFeil: {
    borderColor: farger.varsel,
  },
  feilTekst: {
    ...tekst.smatekst,
    color: farger.varsel,
    marginTop: rom.xs,
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
  serverFeilBoks: {
    marginTop: rom.m,
    padding: rom.m,
    backgroundColor: '#F8E8E0',
    borderRadius: radius.s,
  },
  serverFeilTekst: {
    ...tekst.smatekst,
    color: farger.varsel,
  },
  knapp: {
    marginTop: rom.l,
    paddingVertical: rom.m,
    alignItems: 'center',
    backgroundColor: farger.aksent,
    borderRadius: radius.m,
    minHeight: 50,
    justifyContent: 'center',
  },
  knappTrykket: {
    opacity: 0.7,
  },
  knappTekst: {
    ...tekst.brodtekst,
    fontWeight: '600',
    color: farger.flate,
  },
});