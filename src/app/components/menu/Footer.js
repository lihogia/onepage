import styles from './footer.module.css';

export default function Footer({isEdit}) {
    const footerClassName = (isEdit) ? `${styles.footer} ${styles.edit}` : styles.footer;
    const strVersion = `${process.env.productname}_${process.env.tag}_${process.env.version}`;

    return (
    <>
        <footer className={footerClassName}>
          © 2023. {strVersion} . Any feedback, please send to <a href='mailto:lilogia@gmail.com'>lilogia</a>. All right reserved.
        </footer>
    </>
    );
}