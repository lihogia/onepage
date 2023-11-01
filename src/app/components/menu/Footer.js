import styles from './footer.module.css';

export default function Footer({isEdit}) {
    const footerClassName = (isEdit) ? `${styles.footer} ${styles.edit}` : styles.footer;
    return (
    <>
        <footer className={styles.footer}>
          © 2023 <a href='mailto:lilogia@gmail.com'>lilogia</a>. All right reserved.
        </footer>
    </>
    );
}