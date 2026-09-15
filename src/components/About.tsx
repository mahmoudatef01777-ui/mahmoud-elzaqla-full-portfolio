import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/i18n/LanguageProvider';
import { about } from '@/content';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  return (
    <section id="about" className="container-page py-14 md:py-24">
      <motion.p
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-[46rem] text-2xl font-semibold leading-[1.45] text-ink md:text-[2.125rem] md:leading-[1.4]"
      >
        {t(about.statement)}{' '}
        <span className="text-orange-ink">{t(about.highlight)}</span>
      </motion.p>
    </section>
  );
}
