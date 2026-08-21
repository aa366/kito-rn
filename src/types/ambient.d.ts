declare module 'expo-router' {
  export const router: any;
}

declare module 'react' {
  export function useRef<T>(initialValue: T): { current: T };
  export function useState<T>(initialValue: T): [T, (value: T) => void];
}

declare module 'react-native' {
  export const Image: any;
  export const Text: any;
  export const TouchableOpacity: any;
  export const View: any;
}

declare module 'react-native-safe-area-context' {
  export const SafeAreaView: any;
}

declare module 'react-native-swiper' {
  class Swiper {
    scrollBy(index: number): void;
    [key: string]: any;
  }
  export = Swiper;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
