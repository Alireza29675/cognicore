import styles from './Intro.module.css';

function Intro() {
  return (
    <div className={styles.Intro}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Welcome to GPTKit dev</h2>
        <p className={styles.message}>Start by putting your OpenAI API key here or <a href="https://platform.openai.com/account/api-keys">generate one</a></p>
        <input className={styles.input} type="text" />
      </div>
    </div>
  );
}

export default Intro;
