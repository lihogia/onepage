export default function Footer() {
    const strVersion = `${process.env.tag}_${process.env.version}`;

    return (
      <div className="grid5">
        © 2023. All right reserved. {strVersion} by&nbsp;<a href="mailto:lilogia@gmail.com">lilogia</a>.
      </div>
    );
}