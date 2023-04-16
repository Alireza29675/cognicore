import useConfig from '@/hooks/useConfig';
import styles from './Intro.module.css';

function Intro() {
  const { config, modifyConfig } = useConfig();

  return (
    <div className={styles.Intro}>
      <div className={styles.wrapper}>
        <p className={styles.message}>Put your <a href="https://platform.openai.com/account/api-keys">OpenAI API Key</a> to check the examples</p>
        <input className={styles.input} type="text" placeholder='sk-...' value={config.apiKey} onChange={(e) => modifyConfig('apiKey', e.target.value)} />
      </div>
    </div>
  );
}

export default Intro;
