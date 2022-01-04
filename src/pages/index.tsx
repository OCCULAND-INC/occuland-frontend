import styles from '~/styles/Home.module.css';

function Home() {
  return (
    <div className={styles.container} css={{ background: 'red' }}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default Home;
