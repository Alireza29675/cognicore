import styles from './Intro.module.css';

function Intro() {
  return (
    <div className={styles.Intro}>
      <div className={styles.wrapper}>
        <p className={styles.message}>Put your <a href="https://platform.openai.com/account/api-keys">OpenAI API Key</a> to check the examples</p>
        <input className={styles.input} type="text" placeholder='sk-...' />
      </div>
    </div>
  );
}

export default Intro;
