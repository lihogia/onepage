import styles from './footer.module.css';

export default function Footer() {
    const strVersion = `${process.env.productname}_${process.env.tag}_${process.env.version}`;

    return (
    <>
        <footer className={styles.footer}>
          © 2023. {strVersion}. Any feedback, please send to&nbsp;<a href='mailto:lilogia@gmail.com'>lilogia</a>. All right reserved.
        </footer>
    </>
    );
}