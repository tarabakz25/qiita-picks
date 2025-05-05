import { Pressable, StyleSheet, Text, View } from 'react-native';

export type TabItem = {
  key: string;
  title: string;
};

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onChangeTab: (tabKey: string) => void;
}

export default function TabBar({ tabs, activeTab, onChangeTab }: TabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          style={[
            styles.tabItem,
            activeTab === tab.key && styles.activeTabItem
          ]}
          onPress={() => onChangeTab(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}
          >
            {tab.title}
          </Text>
          {activeTab === tab.key && <View style={styles.indicator} />}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    backgroundColor: '#ffffff',
  },
  tabItem: {
    paddingVertical: 16,
    marginRight: 24,
    position: 'relative',
  },
  activeTabItem: {
    // アクティブなタブのスタイル
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    fontWeight: '700',
    color: '#000000',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#55c500', // Qiitaのメインカラー
    borderRadius: 3,
  },
}); 