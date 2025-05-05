import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { View, Text, Pressable } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>QiitaPicks</Text>
      <Link href="/(settings)" asChild>
        <Pressable style={styles.settingsButton}>
          <IconSymbol name="gearshape" size={24} color="black" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    marginRight: 40,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
