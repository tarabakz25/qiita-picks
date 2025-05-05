import { IconSymbol } from '@/components/ui/IconSymbol';
import { FlatList, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { QiitaArticle } from '../services/qiitaApi';

interface ArticleListProps {
  articles: QiitaArticle[];
  isLoading: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function ArticleList({ 
  articles, 
  isLoading, 
  onRefresh, 
  refreshing = false 
}: ArticleListProps) {
  
  // 記事をタップした時の処理
  const handleArticlePress = (url: string) => {
    Linking.openURL(url);
  };

  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  if (isLoading && articles.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>記事を読み込み中...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable 
          style={styles.articleItem}
          onPress={() => handleArticlePress(item.url)}
        >
          <View style={styles.articleHeader}>
            <Image 
              source={{ uri: item.user.profile_image_url }} 
              style={styles.authorImage} 
            />
            <Text style={styles.authorName}>{item.user.name || item.user.id}</Text>
            <Text style={styles.publishDate}>{formatDate(item.created_at)}</Text>
          </View>
          
          <Text style={styles.articleTitle}>{item.title}</Text>
          
          <View style={styles.articleFooter}>
            <View style={styles.tagContainer}>
              {item.tags.slice(0, 3).map((tag) => (
                <View key={tag.name} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.name}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.statsContainer}>
              <IconSymbol name="heart" size={16} color="#999" />
              <Text style={styles.likesCount}>{item.likes_count}</Text>
            </View>
          </View>
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContainer}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  articleItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  articleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  publishDate: {
    fontSize: 12,
    color: '#666',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 22,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 8,
  },
}); 