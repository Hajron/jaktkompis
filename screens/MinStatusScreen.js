import { View, Text, StyleSheet } from 'react-native';

export default function MinStatusScreen() {
  return (
    <View style={styles.container}>
      <Text>Min status</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});