import type {
  FlatListProps,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type NativePhoneCountry = {
  name: string;
  code: string;
  mobileCode: string;
};

export type NativeStyles = {
  root?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  tabs?: StyleProp<ViewStyle>;
  tab?: StyleProp<ViewStyle>;
  activeTab?: StyleProp<ViewStyle>;
  tabText?: StyleProp<TextStyle>;
  activeTabText?: StyleProp<TextStyle>;
  trigger?: StyleProp<ViewStyle>;
  triggerText?: StyleProp<TextStyle>;
  dropdown?: StyleProp<ViewStyle>;
  searchInput?: TextInputProps['style'];
  list?: StyleProp<ViewStyle>;
  country?: StyleProp<ViewStyle>;
  countryText?: StyleProp<TextStyle>;
  flag?: StyleProp<TextStyle>;
  selectedCountry?: StyleProp<ViewStyle>;
  selectedCountryText?: StyleProp<TextStyle>;
  selectAll?: StyleProp<ViewStyle>;
  selectAllText?: StyleProp<TextStyle>;
  countryList?: StyleProp<ViewStyle>;
};

export type NativeStyleOverrides = {
  styles?: NativeStyles;
};

export type SelectCountryProps = NativeStyleOverrides & {
  onSelect?: (country: string) => void;
  placeholder?: string;
  textInputProps?: Omit<TextInputProps, 'onChangeText' | 'value'>;
  listProps?: Omit<FlatListProps<string>, 'data' | 'renderItem'>;
};

export type SelectPhoneCodeProps = NativeStyleOverrides & {
  onSelect?: (phoneCode: string) => void;
  placeholder?: string;
  textInputProps?: Omit<TextInputProps, 'onChangeText' | 'value'>;
  listProps?: Omit<FlatListProps<NativePhoneCountry>, 'data' | 'renderItem'>;
};

export type GeoLocationPickerProps = NativeStyleOverrides & {
  onChange?: (selected: Record<string, Set<string>>) => void;
  textInputProps?: Omit<TextInputProps, 'onChangeText' | 'value'>;
};
