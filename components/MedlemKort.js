import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function MedlemKort({ medlem, onTrykk }) {
  return (
    <Pressable style={styles.kort} onPress={onTrykk}>
      <View style={styles.rad}>
        <Text style={styles.navn}>{medlem.navn}</Text>
        <Text style={styles.status}>{medlem.status}</Text>
      </View>
      <Text style={styles.detalj}>
        {medlem.rolle} · {medlem.post}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kort: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navn: {
    fontSize: 17,
    fontWeight: '600',
  },
  status: {
    fontSize: 13,
  },
  detalj: {
    fontSize: 14,
    marginTop: 4,
  },
});