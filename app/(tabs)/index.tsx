import ArticleList from '@/app/components/ArticleList';
import TabBar, { TabItem } from '@/app/components/TabBar';
import {
  fetchRecommendedArticles,
  fetchTimelineArticles,
  fetchTrendingArticles,
  QiitaArticle
} from '@/app/services/qiitaApi';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// タブの定義
const TABS: TabItem[] = [
  { key: 'recommended', title: 'おすすめ' },
  { key: 'trending', title: 'トレンド' },
  { key: 'timeline', title: 'タイムライン' },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  // 各タブの記事データ
  const [recommendedArticles, setRecommendedArticles] = useState<QiitaArticle[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<QiitaArticle[]>([]);
  const [timelineArticles, setTimelineArticles] = useState<QiitaArticle[]>([]);

  // 現在表示中の記事を取得
  const getCurrentArticles = useCallback(() => {
    switch (activeTab) {
      case 'recommended':
        return recommendedArticles;
      case 'trending':
        return trendingArticles;
      case 'timeline':
        return timelineArticles;
      default:
        return recommendedArticles;
    }
  }, [activeTab, recommendedArticles, trendingArticles, timelineArticles]);

  // おすすめ記事を読み込む
  const loadRecommendedArticles = useCallback(async () => {
    try {
      const articles = await fetchRecommendedArticles(1, 20);
      setRecommendedArticles(articles);
    } catch (error) {
      console.error('おすすめ記事の取得に失敗しました:', error);
    }
  }, []);

  // トレンド記事を読み込む
  const loadTrendingArticles = useCallback(async () => {
    try {
      const articles = await fetchTrendingArticles(1, 20);
      setTrendingArticles(articles);
    } catch (error) {
      console.error('トレンド記事の取得に失敗しました:', error);
    }
  }, []);

  // タイムライン記事を読み込む
  const loadTimelineArticles = useCallback(async () => {
    try {
      const articles = await fetchTimelineArticles(1, 20);
      setTimelineArticles(articles);
    } catch (error) {
      console.error('タイムライン記事の取得に失敗しました:', error);
    }
  }, []);

  // アクティブなタブの記事を読み込む
  const loadActiveTabArticles = useCallback(async () => {
    setIsLoading(true);
    
    switch (activeTab) {
      case 'recommended':
        if (recommendedArticles.length === 0) {
          await loadRecommendedArticles();
        }
        break;
      case 'trending':
        if (trendingArticles.length === 0) {
          await loadTrendingArticles();
        }
        break;
      case 'timeline':
        if (timelineArticles.length === 0) {
          await loadTimelineArticles();
        }
        break;
    }
    
    setIsLoading(false);
  }, [
    activeTab, 
    recommendedArticles.length, 
    trendingArticles.length, 
    timelineArticles.length,
    loadRecommendedArticles,
    loadTrendingArticles,
    loadTimelineArticles
  ]);

  // タブ切り替え時の処理
  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
  }, []);

  // 初回ロード時に記事を取得
  useEffect(() => {
    loadActiveTabArticles();
  }, [activeTab, loadActiveTabArticles]);

  // 引っ張って更新する処理
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    
    switch (activeTab) {
      case 'recommended':
        await loadRecommendedArticles();
        break;
      case 'trending':
        await loadTrendingArticles();
        break;
      case 'timeline':
        await loadTimelineArticles();
        break;
    }
    
    setRefreshing(false);
  }, [
    activeTab, 
    loadRecommendedArticles, 
    loadTrendingArticles, 
    loadTimelineArticles
  ]);

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
      
      <TabBar 
        tabs={TABS} 
        activeTab={activeTab} 
        onChangeTab={handleTabChange} 
      />
      
      <View style={styles.articlesContainer}>
        <ArticleList 
          articles={getCurrentArticles()} 
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
  articlesContainer: {
    flex: 1,
  },
});
