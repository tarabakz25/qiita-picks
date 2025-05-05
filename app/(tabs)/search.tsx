import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function SearchScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '検索' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">検索画面</ThemedText>
        <ThemedText style={styles.description}>
          ここに検索機能を実装します。
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
  },
});
