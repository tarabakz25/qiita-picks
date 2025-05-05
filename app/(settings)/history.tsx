import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

// ダミーの閲覧履歴データ
const DUMMY_HISTORY = [
  { 
    id: '1',
    title: 'React Nativeでのパフォーマンス最適化テクニック10選',
    url: 'https://qiita.com/example/item1',
    author: 'テストユーザー1',
    viewedAt: new Date(Date.now() - 1000 * 60 * 30), // 30分前
  },
  { 
    id: '2',
    title: 'TypeScriptの高度な型活用方法',
    url: 'https://qiita.com/example/item2',
    author: 'テストユーザー2',
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
  },
  { 
    id: '3',
    title: 'Next.jsとExpoの連携方法',
    url: 'https://qiita.com/example/item3',
    author: 'テストユーザー3',
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
  },
  { 
    id: '4',
    title: 'JavaScriptの非同期処理パターン',
    url: 'https://qiita.com/example/item4',
    author: 'テストユーザー4',
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3日前
  },
];

export default function HistoryScreen() {
  const router = useRouter();
  const [historyItems, setHistoryItems] = useState(DUMMY_HISTORY);

  // 戻るボタンの処理
  const handleBack = () => {
    router.back();
  };

  // 記事を開く処理
  const handleOpenArticle = (url: string) => {
    Linking.openURL(url);
  };

  // 閲覧時間をフォーマットする
  const formatViewTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}分前`;
    } else if (diffHours < 24) {
      return `${diffHours}時間前`;
    } else {
      return `${diffDays}日前`;
    }
  };

  // 履歴を削除する処理
  const handleClearHistory = () => {
    // 本来はローカルストレージやDBからクリアする処理
    setHistoryItems([]);
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>閲覧履歴</Text>
        <Pressable onPress={handleClearHistory} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>クリア</Text>
        </Pressable>
      </View>

      {/* 閲覧履歴リスト */}
      {historyItems.length > 0 ? (
        <FlatList
          data={historyItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.historyItem}
              onPress={() => handleOpenArticle(item.url)}
            >
              <View style={styles.historyItemContent}>
                <Text style={styles.historyItemTitle}>{item.title}</Text>
                <Text style={styles.historyItemAuthor}>{item.author}</Text>
                <Text style={styles.historyItemTime}>{formatViewTime(item.viewedAt)}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <IconSymbol name="clock" size={48} color="#ccc" />
          <Text style={styles.emptyText}>閲覧履歴はありません</Text>
        </View>
      )}
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
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#55c500',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  historyItemContent: {
    flex: 1,
    marginRight: 16,
  },
  historyItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  historyItemAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historyItemTime: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
}); 