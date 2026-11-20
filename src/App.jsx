import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { HashRouter } from 'react-router-dom';
import { StoreProvider, useStore } from './store.jsx';
import { ToastStack } from './components/ui.jsx';
import Shell from './components/Shell.jsx';
import Login from './views/Login.jsx';

function Root() {
  const { authed } = useStore();
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {authed ? (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Shell />
          </motion.div>
        ) : (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.35 }}>
            <Login />
          </motion.div>
        )}
      </AnimatePresence>
      <ToastStack />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <HashRouter>
          <Root />
        </HashRouter>
      </StoreProvider>
    </MotionConfig>
  );
}
