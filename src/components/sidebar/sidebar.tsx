import { FC } from 'react';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

interface ISidebarLink {
  path: string;
  title: string;
}

const sidebarLinks: ISidebarLink[] = [{ path: 'users', title: 'Пользователи' }];

export const Sidebar: FC = (): JSX.Element => {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.links}>
        {sidebarLinks.map((sidebarLink: ISidebarLink): JSX.Element => {
          return (
            <li key={sidebarLink.path} className={styles.link}>
              <div className={styles.icon}></div>
              <p className={styles.title}>{sidebarLink.title}</p>
              <Link to={sidebarLink.path} />
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
