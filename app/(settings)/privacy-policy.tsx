import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  // 戻るボタンの処理
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>プライバシーポリシー</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* プライバシーポリシーの内容 */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.updateDate}>最終更新日: 2023年9月1日</Text>
        
        <Text style={styles.sectionTitle}>1. はじめに</Text>
        <Text style={styles.paragraph}>
          QiitaPicksアプリ（以下「本アプリ」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
          本プライバシーポリシーでは、本アプリがどのような情報を収集し、どのように使用するかについて説明します。
          本アプリを使用することにより、ユーザーは本プライバシーポリシーに同意したものとみなされます。
        </Text>
        
        <Text style={styles.sectionTitle}>2. 収集する情報</Text>
        <Text style={styles.paragraph}>
          本アプリでは、以下の情報を収集することがあります：
        </Text>
        <Text style={styles.listItem}>• アカウント情報：Qiitaアカウントと連携する場合、Qiitaのユーザー名やプロフィール情報</Text>
        <Text style={styles.listItem}>• 利用状況：閲覧した記事の履歴、検索履歴</Text>
        <Text style={styles.listItem}>• デバイス情報：デバイスの種類、OSバージョン、アプリバージョン</Text>
        
        <Text style={styles.sectionTitle}>3. 情報の使用目的</Text>
        <Text style={styles.paragraph}>
          収集した情報は以下の目的で使用されます：
        </Text>
        <Text style={styles.listItem}>• サービスの提供と改善</Text>
        <Text style={styles.listItem}>• ユーザー体験のパーソナライズ</Text>
        <Text style={styles.listItem}>• アプリのパフォーマンス分析と改善</Text>
        
        <Text style={styles.sectionTitle}>4. 情報の共有</Text>
        <Text style={styles.paragraph}>
          本アプリは、法律で義務付けられている場合や、ユーザーの同意がある場合を除いて、
          第三者とユーザーの個人情報を共有することはありません。
        </Text>
        
        <Text style={styles.sectionTitle}>5. データの保護</Text>
        <Text style={styles.paragraph}>
          本アプリは、ユーザーの個人情報を保護するために適切なセキュリティ対策を講じています。
          ただし、インターネット上での送信や電子ストレージの方法は100%安全ではないため、
          絶対的な安全性は保証できません。
        </Text>
        
        <Text style={styles.sectionTitle}>6. お子様のプライバシー</Text>
        <Text style={styles.paragraph}>
          本アプリは13歳未満の子供からの個人情報の収集を意図していません。
          13歳未満のお子様が個人情報を提供していることが判明した場合、
          直ちにその情報を削除するための措置を講じます。
        </Text>
        
        <Text style={styles.sectionTitle}>7. プライバシーポリシーの変更</Text>
        <Text style={styles.paragraph}>
          本プライバシーポリシーは随時更新される場合があります。
          変更があった場合は、本アプリ内で通知するか、または本ページを更新します。
          定期的に本ページをご確認いただくことをお勧めします。
        </Text>
        
        <Text style={styles.sectionTitle}>8. お問い合わせ</Text>
        <Text style={styles.paragraph}>
          本プライバシーポリシーに関するご質問やご不明点がございましたら、
          以下のメールアドレスまでお問い合わせください：
        </Text>
        <Text style={styles.contactEmail}>example@qiitapicks.com</Text>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  updateDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginLeft: 16,
    marginBottom: 8,
  },
  contactEmail: {
    fontSize: 16,
    color: '#55c500',
    marginTop: 8,
    textAlign: 'center',
  },
}); 