import axios from 'axios';

// Qiita APIのベースURL
const API_BASE_URL = 'https://qiita.com/api/v2';

// 記事のインターフェース
export interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  tags: Array<{ name: string; versions: string[] }>;
  user: {
    id: string;
    name: string;
    profile_image_url: string;
  };
}

/**
 * おすすめ記事（人気記事）を取得する
 * @param page ページ番号（1からスタート）
 * @param perPage 1ページあたりの記事数（最大100）
 * @returns おすすめ記事の配列
 */
export const fetchRecommendedArticles = async (
  page: number = 1,
  perPage: number = 20
): Promise<QiitaArticle[]> => {
  try {
    // 人気記事を取得（いいね数でソート）
    const response = await axios.get(`${API_BASE_URL}/items`, {
      params: {
        page,
        per_page: perPage,
        query: 'stocks:>10',  // 10以上のストック数がある記事
        sort: 'popularity'    // 人気順でソート
      }
    });
    return response.data as QiitaArticle[];
  } catch (error) {
    console.error('Qiita API error:', error);
    return [];
  }
};

/**
 * 特定のタグの記事を取得する
 * @param tag タグ名
 * @param page ページ番号
 * @param perPage 1ページあたりの記事数
 * @returns 指定したタグの記事の配列
 */
export const fetchArticlesByTag = async (
  tag: string,
  page: number = 1,
  perPage: number = 20
): Promise<QiitaArticle[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`, {
      params: {
        page,
        per_page: perPage,
        query: `tag:${tag}`,
        sort: 'popularity'
      }
    });
    return response.data as QiitaArticle[];
  } catch (error) {
    console.error(`Qiita API error for tag ${tag}:`, error);
    return [];
  }
}; 