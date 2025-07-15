/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SystemBars } from 'react-native-edge-to-edge';

import NavContainer from './navigation';

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <SystemBars style="auto" />
        <NavContainer />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
