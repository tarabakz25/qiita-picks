import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

// ダミーのQiitaユーザー情報
const DUMMY_USER = {
  id: 'qiita_user',
  name: 'Qiitaユーザー',
  profile_image_url: 'https://secure.gravatar.com/avatar/default?d=retro&size=100',
  description: 'テスト用のQiitaユーザーアカウントです。',
  items_count: 42,
  followers_count: 123,
};

export default function QiitaConnectScreen() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(DUMMY_USER);

  // 戻るボタンの処理
  const handleBack = () => {
    router.back();
  };

  // Qiita連携の処理
  const handleConnect = () => {
    // 実際のアプリでは、OAuthフローを開始する処理
    // 今回はダミー実装としてトグルするだけ
    if (isConnected) {
      Alert.alert(
        '連携解除の確認',
        'Qiitaアカウントとの連携を解除しますか？',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '解除する',
            style: 'destructive',
            onPress: () => {
              setIsConnected(false);
            },
          },
        ]
      );
    } else {
      // 連携処理（実際にはOAuth認証フロー）
      // ダミー実装
      setTimeout(() => {
        setIsConnected(true);
      }, 1000);
    }
  };

  // Qiitaプロフィールを開く
  const openQiitaProfile = () => {
    if (isConnected) {
      Linking.openURL(`https://qiita.com/${user.id}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Qiita連携</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Qiita連携の内容 */}
      <View style={styles.content}>
        <Text style={styles.description}>
          Qiitaアカウントと連携すると、あなたの投稿や関心のある記事をアプリ内で確認できるようになります。
        </Text>

        {isConnected ? (
          <View style={styles.userInfoContainer}>
            <Pressable onPress={openQiitaProfile} style={styles.userHeader}>
              <Image 
                source={{ uri: user.profile_image_url }} 
                style={styles.userImage} 
              />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userId}>@{user.id}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </Pressable>
            
            <Text style={styles.userDescription}>{user.description}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.items_count}</Text>
                <Text style={styles.statLabel}>投稿記事</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.followers_count}</Text>
                <Text style={styles.statLabel}>フォロワー</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.notConnectedText}>
            現在Qiitaアカウントと連携されていません。
          </Text>
        )}

        <Pressable 
          style={[
            styles.connectButton,
            isConnected ? styles.disconnectButton : null
          ]} 
          onPress={handleConnect}
        >
          <Text style={styles.connectButtonText}>
            {isConnected ? 'Qiita連携を解除' : 'Qiitaと連携する'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 24,
    marginTop: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  userInfoContainer: {
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 12,
    padding: 16,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userId: {
    fontSize: 14,
    color: '#666',
  },
  userDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#55c500',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  notConnectedText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: '#55c500',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'stretch',
  },
  disconnectButton: {
    backgroundColor: '#ff6b6b',
  },
  connectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 