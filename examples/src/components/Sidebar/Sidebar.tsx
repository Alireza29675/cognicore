import styles from './Sidebar.module.css';

interface IProps {
  pages: IPageModule[];
}

function Sidebar({ pages }: IProps) {
  return (
    <aside className={styles.Sidebar}>
      <header className={styles.header}>
        <img className={styles.logo} src="/images/gptkit-logo.png" alt="GPTKit" />
        <div>
          <h1 className={styles.title}>GPTKit</h1>
          <span className={styles.chip}>dev</span>
        </div>
      </header>
      <ul>
        {pages.map(({ metadata }) => (
          <li key={metadata.route}>
            <a href={metadata.route}>{metadata.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
