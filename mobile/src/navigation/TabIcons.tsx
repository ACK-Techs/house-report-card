import Svg, { Path } from 'react-native-svg';

import type { MainTabParamList } from './types';

interface IconProps {
  color: string;
  size?: number;
}

/** Sekme çubuğu ikonları — prototipteki Material yol verileri. */
const paths: Record<keyof MainTabParamList, string> = {
  HomeTab: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  SearchTab:
    'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z',
  CompareTab:
    'M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm-5 16V5h5v14H5zm14-16h-5v2h5v14h-5v2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
  SavedTab: 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z',
  ProfileTab:
    'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
};

export function TabIcon({
  route,
  color,
  size = 21,
}: IconProps & { route: keyof MainTabParamList }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={paths[route]} fill={color} />
    </Svg>
  );
}
