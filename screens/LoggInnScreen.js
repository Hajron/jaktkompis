import { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { farger, rom, tekst, radius } from '../theme/theme';

export default function LoggInnScreen() {
  const [epost, setEpost] = useState('');
  const [passord, setPassord] = useState('');
  const [feil, setFeil] = useState({});
  const [serverFeil, setServerFeil] = useState('');
  const [laster, setLaster] = useState(false);

  // KRAV: validering av brukerinput for kallet sendes
  function validerSkjema() {
    const nyeFeil = {};

    if (!epost.trim()) {
      nyeFeil.epost = 'E-post må fylles ut';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost.trim())) {
      nyeFeil.epost = 'Ugyldig e-postadresse';
    }

    if (!passord) {
      nyeFeil.passord = 'Passord må fylles ut';
    } else if (passord.length < 6) {
      nyeFeil.passord = 'Passordet må være minst 6 tegn';
    }

    setFeil(nyeFeil);
    return Object.keys(nyeFeil).length === 0;
  }

  async function loggInn() {
    if (!validerSkjema()) return;

    setLaster(true);
    setServerFeil('');

    const { error } = await supabase.auth.signInWithPassword({
      email: epost.trim(),
      password: passord,
    });

    if (error) setServerFeil(error.message);
    setLaster(false);
  }

  async function registrer() {
    if (!validerSkjema()) return;

    setLaster(true);
    setServerFeil('');

    const { error } = await supabase.auth.signUp({
      email: epost.trim(),
      password: passord,
    });

    if (error) setServerFeil(error.message);
    setLaster(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innhold}>
        <Text style={styles.tittel}>Jaktkompis</Text>
        <Text style={styles.undertittel}>
          Logg inn for å se jaktlaget ditt.
        </Text>

        <Text style={styles.etikett}>E-post</Text>
        <TextInput
          style={[styles.felt, feil.epost && styles.feltFeil]}
          value={epost}
          onChangeText={setEpost}
          placeholder="navn@eksempel.no"
          placeholderTextColor={farger.tekstSvak}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {feil.epost ? <Text style={styles.feilTekst}>{feil.epost}</Text> : null}

        <Text style={styles.etikett}>Passord</Text>
        <TextInput
          style={[styles.felt, feil.passord && styles.feltFeil]}
          value={passord}
          onChangeText={setPassord}
          placeholder="Minst 6 tegn"
          placeholderTextColor={farger.tekstSvak}
          secureTextEntry
          autoCapitalize="none"
        />
        {feil.passord ? <Text style={styles.feilTekst}>{feil.passord}</Text> : null}

        {serverFeil ? (
          <View style={styles.serverFeilBoks}>
            <Text style={styles.serverFeilTekst}>{serverFeil}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [styles.knapp, pressed && styles.knappTrykket]}
          onPress={loggInn}
          disabled={laster}
        >
          {laster ? (
            <ActivityIndicator color={farger.flate} />
          ) : (
            <Text style={styles.knappTekst}>Logg inn</Text>
          )}
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.knappSekundar, pressed && styles.knappTrykket]}
          onPress={registrer}
          disabled={laster}
        >
          <Text style={styles.knappSekundarTekst}>Registrer ny bruker</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: farger.bakgrunn,
    justifyContent: 'center',
  },
  innhold: {
    padding: rom.l,
  },
  tittel: {
    ...tekst.tittel,
    color: farger.tekst,
  },
  undertittel: {
    ...tekst.brodtekst,
    color: farger.tekstSvak,
    marginTop: rom.xs,
    marginBottom: rom.l,
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
  knappSekundar: {
    marginTop: rom.s,
    paddingVertical: rom.m,
    alignItems: 'center',
  },
  knappSekundarTekst: {
    ...tekst.brodtekst,
    color: farger.aksent,
    fontWeight: '600',
  },
});