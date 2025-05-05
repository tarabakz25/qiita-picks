import ArticleList from '@/app/components/ArticleList';
import { fetchRecommendedArticles, QiitaArticle } from '@/app/services/qiitaApi';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [articles, setArticles] = useState<QiitaArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 記事を取得する関数
  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const recommendedArticles = await fetchRecommendedArticles(1, 20);
      setArticles(recommendedArticles);
    } catch (error) {
      console.error('記事の取得に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 初回ロード時に記事を取得
  useEffect(() => {
    loadArticles();
  }, []);

  // 引っ張って更新する処理
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadArticles();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>QiitaPicks</Text>
        <Link href="/(settings)" asChild>
          <Pressable style={styles.settingsButton}>
            <IconSymbol name="gearshape" size={24} color="black" />
          </Pressable>
        </Link>
      </View>
      
      <Text style={styles.subtitle}>おすすめ記事</Text>
      
      <View style={styles.articlesContainer}>
        <ArticleList 
          articles={articles} 
          isLoading={isLoading}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  titleContainer: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
  },
  articlesContainer: {
    flex: 1,
  },
});
