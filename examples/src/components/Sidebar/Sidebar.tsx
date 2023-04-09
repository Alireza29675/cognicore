import styles from './Sidebar.module.css';
import cx from 'classnames';

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
      <ul className={styles.pagesList}>
        {pages.map(({ metadata }) => (
          <li key={metadata.route} className={cx(styles.item,
            {
              [styles.active]: window.location.pathname === `/${metadata.route}`,
            }
          )}>
            <a className={styles.link} href={metadata.route}>{metadata.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
