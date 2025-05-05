import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

// アプリのバージョン情報
const APP_VERSION = '1.0.0';

// プライバシーポリシーのURL
const PRIVACY_POLICY_URL = 'https://example.com/privacy-policy';

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQiitaConnected, setIsQiitaConnected] = useState(false);

  // 戻るボタンの処理
  const handleBack = () => {
    router.back();
  };

  // Qiita連携の処理
  const handleQiitaConnect = () => {
    // Qiita連携画面へ遷移
    router.push('/(settings)/qiita-connect');
  };

  // 閲覧履歴を表示する処理
  const handleViewHistory = () => {
    // 閲覧履歴画面へ遷移
    router.push('/(settings)/history');
  };

  // テーマ切り替えの処理
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // ここでアプリ全体のテーマを切り替える処理を実装
  };

  // プライバシーポリシーを表示する処理
  const handlePrivacyPolicy = () => {
    router.push('/(settings)/privacy-policy');
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>設定</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 設定項目リスト */}
      <ScrollView style={styles.scrollView}>
        {/* アカウント設定セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アカウント</Text>
          
          <Pressable 
            style={styles.settingItem} 
            onPress={handleQiitaConnect}
          >
            <View style={styles.settingItemLeft}>
              <IconSymbol name="link" size={20} color="#55c500" />
              <Text style={styles.settingItemText}>Qiita連携</Text>
            </View>
            <View style={styles.settingItemRight}>
              <Text style={[
                styles.statusText, 
                isQiitaConnected ? styles.connectedText : styles.disconnectedText
              ]}>
                {isQiitaConnected ? '連携済み' : '未連携'}
              </Text>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </View>
          </Pressable>
        </View>

        {/* コンテンツセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>コンテンツ</Text>
          
          <Pressable 
            style={styles.settingItem} 
            onPress={handleViewHistory}
          >
            <View style={styles.settingItemLeft}>
              <IconSymbol name="clock" size={20} color="#666" />
              <Text style={styles.settingItemText}>閲覧履歴</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#999" />
          </Pressable>
        </View>

        {/* 表示設定セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>表示設定</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <IconSymbol name="moon" size={20} color="#666" />
              <Text style={styles.settingItemText}>ダークモード</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: "#dddddd", true: "#55c500" }}
              thumbColor={"#ffffff"}
            />
          </View>
        </View>

        {/* その他セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>その他</Text>
          
          <Pressable 
            style={styles.settingItem} 
            onPress={handlePrivacyPolicy}
          >
            <View style={styles.settingItemLeft}>
              <IconSymbol name="lock" size={20} color="#666" />
              <Text style={styles.settingItemText}>プライバシーポリシー</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#999" />
          </Pressable>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <IconSymbol name="info.circle" size={20} color="#666" />
              <Text style={styles.settingItemText}>バージョン</Text>
            </View>
            <Text style={styles.versionText}>{APP_VERSION}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginLeft: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  statusText: {
    fontSize: 14,
    marginRight: 8,
  },
  connectedText: {
    color: '#55c500',
  },
  disconnectedText: {
    color: '#999',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});
