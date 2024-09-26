import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.medium,
  },
  headerText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.header,
    fontWeight: theme.fontWeights.bold,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: theme.spacing.medium,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.sectionTitle,
    fontWeight: theme.fontWeights.bold,
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.medium,
    marginLeft: theme.spacing.medium,
  },
  recentlyPlayedContainer: {
    paddingLeft: theme.spacing.medium,
  },
  recentlyPlayedItem: {
    marginRight: theme.spacing.medium,
    width: 120,
  },
  recentlyPlayedImage: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.small,
  },
  recentlyPlayedTitle: {
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.small,
    fontSize: theme.fontSizes.small,
  },
  playlistContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
  },
  playlistItem: {
    width: '48%',
    marginBottom: theme.spacing.medium,
  },
  playlistImage: {
    width: '100%',
    height: 150,
    borderRadius: theme.borderRadius.small,
  },
  playlistTitle: {
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.small,
    fontSize: theme.fontSizes.small,
    fontWeight: theme.fontWeights.bold,
  },
  playlistDescription: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xsmall,
    fontSize: theme.fontSizes.xsmall,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: theme.spacing.small,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xsmall,
    fontSize: theme.fontSizes.xsmall,
  },
  activeTabText: {
    color: theme.colors.active,
  },
});

export default styles;
