import styles from './Sidebar.module.css';

interface IProps {
  pages: IPageModule[];
}

function Sidebar({ pages }: IProps) {
  return (
    <aside className={styles.Sidebar}>
      <h1>GPTkit </h1>
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
