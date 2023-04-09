import { getPages } from '@/utils/dynamicLoader';
import Sidebar from '../Sidebar';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {
  const [examplePages, setExamplePages] = useState<IPageModule[]>([]);

  useEffect(() => {
    getPages().then((pages) => setExamplePages(pages));
  }, [])

  return (
    <div className={styles.App}>
      <Sidebar pages={examplePages} />
    </div>
  );
}

export default App;
