import { getPages } from '@/utils/dynamicLoader';
import Sidebar from '../Sidebar';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {
  const [examplePages, setExamplePages] = useState<IPageModule[]>([]);
  const [activePage, setActivePage] = useState<IPageModule | null>(null);

  useEffect(() => {
    const setHash = () => {
      const hash = window.location.hash;
      const page = examplePages.find((page) => page.metadata.route === hash.slice(1));
      setActivePage(page || null);
    }
    setHash();
    window.addEventListener('hashchange', setHash);
    return () => window.removeEventListener('hashchange', setHash);
  }, [examplePages]);

  useEffect(() => {
    getPages().then((pages) => setExamplePages(pages));
  }, [])

  return (
    <div className={styles.App}>
      <Sidebar pages={examplePages} active={activePage} />
      <div className={styles.Content}>
        {activePage && <activePage.component />}
      </div>
    </div>
  );
}

export default App;
