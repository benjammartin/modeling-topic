import styles from './layout.module.css';

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return <section className={styles.layout}>{props.children}</section>;
};

const SidebarComponent: React.FC<{ children: React.ReactNode }> = (props) => {
  return <aside className={styles.sidebar}>{props.children}</aside>;
};

const MainComponent: React.FC<{ children: React.ReactNode }> = (props) => {
  return <main className={styles.body}>{props.children}</main>;
};

const Root = Layout;
const Sidebar = SidebarComponent;
const Main = MainComponent;

export { Root, Sidebar, Main, SidebarComponent, MainComponent };
