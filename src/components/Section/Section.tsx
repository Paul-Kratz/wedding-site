import styles from "./Section.module.css";

export const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        {title && (
          <h2
            className={styles.title}
            style={{ ...(subtitle && { marginBottom: "1rem" }) }}
          >
            {title}
          </h2>
        )}
        {subtitle && <h5 className={styles.subtitle}>{subtitle}</h5>}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
};
