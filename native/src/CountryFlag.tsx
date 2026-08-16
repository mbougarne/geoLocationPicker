import { StyleProp, Text, TextStyle } from 'react-native';

import { countryToCodeMap } from '../../src/constants';

type Props = {
  country: string;
  style?: StyleProp<TextStyle>;
};

const getFlag = (country: string) => {
  const code = countryToCodeMap[country]?.toUpperCase();
  if (!code || code.length !== 2) return '🏳️';

  return [...code]
    .map((letter) => String.fromCodePoint(0x1f1e6 + letter.charCodeAt(0) - 65))
    .join('');
};

export function CountryFlag({ country, style }: Props) {
  return <Text style={style}>{getFlag(country)}</Text>;
}
