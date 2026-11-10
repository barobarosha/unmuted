import SectionLead from '../parts/SectionLead.jsx'
import { useScrollScene } from '../hooks/useScrollScene.js'
import { tariffs } from '../data/credits.js'
import { useLang } from '../i18n/LangContext.jsx'
import { ui } from '../i18n/ui.js'

/**
 * «04 / Тарифы» — в каркасе секции Milestones: три колонки-строки
 * с тонкими разделителями и архивной врезкой справа.
 * Единственный тёмный блок страницы (класс darkband).
 */
export default function Credits({ chapter }) {
  const sceneRef = useScrollScene()
  const { t } = useLang()

  return (
    <section className="sectionband scene creditsscene darkband" id={chapter.id} ref={sceneRef}>
      <div className="shell sceneholder">
        <SectionLead {...chapter} />

        <div className="creditsboard" data-scene-layer="1">
          <div className="creditcols tariffcols">
            {tariffs.map((tariff, index) => (
              <div className={`creditcol tariffcol${tariff.featured ? ' featured' : ''}`} key={tariff.id}>
                <h3>
                  <span className="tariffno numeral">{String(index + 1).padStart(2, '0')}</span>
                  {t(tariff.name)}
                </h3>
                <p className="tariffprice numeral">
                  {tariff.price}
                  <span className="tariffper">{t(tariff.per)}</span>
                </p>
                <ul>
                  {tariff.features.map((feature) => (
                    <li className="creditline" key={t(feature)}>
                      <span className="creditwhat">{t(feature)}</span>
                    </li>
                  ))}
                </ul>
                <a className="tariffcta" href="#contact">
                  <span>Оформить подписку</span>
                  <span className="ctaline" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>

          <aside className="creditaside" data-scene-layer="2">
            <figure className="figure">
              <img
                src="assets/images/portrait-hands-01.webp"
                alt={t(ui.credits.asideAlt)}
                width="800"
                height="1040"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="asidecaption overline">МАСКОТ · ЗАПИСЬ 04</figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  )
}
