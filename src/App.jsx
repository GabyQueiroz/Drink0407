import { useMemo, useState } from 'react'
import {
  Award,
  Bot,
  ChevronRight,
  Flame,
  GlassWater,
  Heart,
  IceCreamBowl,
  Leaf,
  Martini,
  Search,
  Sparkles,
  Sprout,
  Wine,
} from 'lucide-react'
import './App.css'

const drinks = [
  {
    id: 'limao',
    name: 'Caipirinha de limao',
    fruit: 'Limao taiti',
    vibe: 'Classica, azedinha e muito refrescante',
    profile: ['citrica', 'leve', 'tradicional'],
    sweetness: 'Baixa',
    intensity: 3,
    bestFor: 'Quem quer abrir o dia com a pedida brasileira essencial.',
    ingredients: ['limao taiti macerado', 'acucar', 'gelo quebrado', 'cachaca ou vodka'],
    garnish: 'Roda fina de limao e borda perfumada com a casca.',
    color: '#48a84c',
    photo:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Caipirinha%20with%20lime.jpg?width=1200',
    credit: 'rawpixel.com / Wikimedia Commons',
  },
  {
    id: 'maracuja',
    name: 'Caipirinha de maracuja',
    fruit: 'Maracuja',
    vibe: 'Tropical, perfumada e doce na medida',
    profile: ['tropical', 'doce', 'aromatica'],
    sweetness: 'Media',
    intensity: 2,
    bestFor: 'Quem gosta de fruta marcante e textura com sementes.',
    ingredients: ['polpa de maracuja', 'acucar', 'gelo', 'cachaca ou vodka'],
    garnish: 'Meia casca de maracuja como bowl natural.',
    color: '#f2a900',
    photo:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Passion%20fruits%20-%20whole%20and%20halved.jpg?width=1200',
    credit: 'Muhammad Mahdi Karim / Wikimedia Commons',
  },
  {
    id: 'tres-limoes',
    name: 'Caipirinha 3 limoes',
    fruit: 'Siciliano, cravo e taiti',
    vibe: 'Complexa, elegante e super aromatica',
    profile: ['citrica', 'intensa', 'especial'],
    sweetness: 'Baixa',
    intensity: 4,
    bestFor: 'Quem quer algo diferente sem sair do universo citrico.',
    ingredients: ['limao siciliano', 'limao cravo', 'limao taiti', 'acucar', 'gelo', 'cachaca ou vodka'],
    garnish: 'Mix de zests para levantar o perfume antes do primeiro gole.',
    color: '#d7d947',
    photo:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Caipirinha%20picture.jpg?width=1200',
    credit: 'Ralf Roletschek / Wikimedia Commons',
  },
  {
    id: 'mexerica',
    name: 'Caipirinha de mexerica',
    fruit: 'Mexerica',
    vibe: 'Solar, suculenta e levemente adocicada',
    profile: ['doce', 'frutada', 'leve'],
    sweetness: 'Media',
    intensity: 2,
    bestFor: 'Quem prefere um drink macio, cheiroso e facil de amar.',
    ingredients: ['gomos de mexerica', 'toque de limao', 'acucar', 'gelo', 'cachaca ou vodka'],
    garnish: 'Gomo fresco e folha de hortela.',
    color: '#f08a24',
    photo:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Caipirinha%20de%20tangerina%20com%20pimenta%20dedo-de-mo%C3%A7a%20%288468213287%29.jpg?width=1200',
    credit: 'Silveira Neto / Wikimedia Commons',
  },
]

const preferenceOptions = [
  { id: 'refrescante', label: 'Refrescante', profiles: ['leve', 'citrica'] },
  { id: 'doce', label: 'Mais doce', profiles: ['doce', 'frutada'] },
  { id: 'diferente', label: 'Diferente', profiles: ['especial', 'intensa'] },
  { id: 'tropical', label: 'Tropical', profiles: ['tropical', 'aromatica'] },
]

const baseOptions = [
  { id: 'cachaca', label: 'Cachaca', note: 'mais brasileira, vegetal e cheia de personalidade' },
  { id: 'vodka', label: 'Vodka', note: 'mais neutra, limpa e facil para todos os paladares' },
]

function pickRecommendation(preference, base, mood) {
  const scores = drinks.map((drink) => {
    const selected = preferenceOptions.find((item) => item.id === preference)
    const matchScore = selected.profiles.filter((profile) => drink.profile.includes(profile)).length * 3
    const moodScore =
      mood === 'leve' ? Math.max(0, 4 - drink.intensity) : mood === 'marcante' ? drink.intensity : 2

    return {
      drink,
      score: matchScore + moodScore + (base === 'cachaca' && drink.id === 'limao' ? 1 : 0),
    }
  })

  return scores.sort((a, b) => b.score - a.score)[0].drink
}

function App() {
  const [activeBase, setActiveBase] = useState('todas')
  const [preference, setPreference] = useState('refrescante')
  const [base, setBase] = useState('cachaca')
  const [mood, setMood] = useState('leve')
  const [favorite, setFavorite] = useState('mexerica')
  const [query, setQuery] = useState('')

  const recommendation = useMemo(
    () => pickRecommendation(preference, base, mood),
    [preference, base, mood],
  )

  const filteredDrinks = drinks.filter((drink) => {
    const matchesQuery = `${drink.name} ${drink.fruit} ${drink.vibe}`
      .toLowerCase()
      .includes(query.toLowerCase())
    return matchesQuery
  })

  const menuBaseLabel =
    activeBase === 'todas' ? 'cachaca ou vodka' : activeBase === 'cachaca' ? 'cachaca' : 'vodka'

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#menu" aria-label="Caipirinha Days">
          <span className="brand-mark">
            <Martini size={20} aria-hidden="true" />
          </span>
          <span>Caipirinha Days</span>
        </a>
        <nav aria-label="Navegacao principal">
          <a href="#menu">Drinks</a>
          <a href="#ia">IA</a>
          <a href="#bar">Bar</a>
        </nav>
      </header>

      <section className="hero-section" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Cardapio digital interativo</p>
          <h1 id="page-title">Caipirinha Days</h1>
          <p className="hero-text">
            Quatro sabores de caipirinha, duas bases para escolher e um assistente que entende o
            clima do seu brinde.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#ia">
              <Bot size={18} aria-hidden="true" />
              Quero uma indicacao
            </a>
            <a className="secondary-action" href="#menu">
              Ver cardapio
              <ChevronRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-photo">
          <img src={drinks[0].photo} alt="Caipirinha de limao com gelo e fatias de limao" />
          <div className="hero-badge">
            <Award size={18} aria-hidden="true" />
            Feitas com cachaca ou vodka
          </div>
        </div>
      </section>

      <section className="quick-panel" aria-label="Destaques do cardapio">
        <div>
          <GlassWater size={20} aria-hidden="true" />
          <strong>4 sabores</strong>
          <span>limao, maracuja, 3 limoes e mexerica</span>
        </div>
        <div>
          <Wine size={20} aria-hidden="true" />
          <strong>2 bases</strong>
          <span>cachaca ou vodka em qualquer drink</span>
        </div>
        <div>
          <Sparkles size={20} aria-hidden="true" />
          <strong>IA da indecisao</strong>
          <span>recomendacao por humor e paladar</span>
        </div>
      </section>

      <section className="assistant-section" id="ia" aria-labelledby="assistant-title">
        <div className="section-heading">
          <p className="eyebrow">Para quem ainda nao sabe</p>
          <h2 id="assistant-title">IA do copo perfeito</h2>
          <p>
            Escolha o tipo de vontade, a base e a intensidade. A recomendacao aparece na hora com a
            melhor combinacao.
          </p>
        </div>

        <div className="assistant-grid">
          <div className="selector-area">
            <div className="control-group">
              <span>O que voce quer sentir?</span>
              <div className="chip-row">
                {preferenceOptions.map((option) => (
                  <button
                    className={preference === option.id ? 'chip active' : 'chip'}
                    key={option.id}
                    type="button"
                    onClick={() => setPreference(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <span>Base do drink</span>
              <div className="segmented">
                {baseOptions.map((option) => (
                  <button
                    className={base === option.id ? 'segment active' : 'segment'}
                    key={option.id}
                    type="button"
                    onClick={() => setBase(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <small>{baseOptions.find((option) => option.id === base).note}</small>
            </div>

            <div className="control-group">
              <span>Intensidade</span>
              <div className="range-picks" role="group" aria-label="Intensidade do drink">
                <button
                  type="button"
                  className={mood === 'leve' ? 'mood active' : 'mood'}
                  onClick={() => setMood('leve')}
                >
                  Leve
                </button>
                <button
                  type="button"
                  className={mood === 'equilibrado' ? 'mood active' : 'mood'}
                  onClick={() => setMood('equilibrado')}
                >
                  Equilibrado
                </button>
                <button
                  type="button"
                  className={mood === 'marcante' ? 'mood active' : 'mood'}
                  onClick={() => setMood('marcante')}
                >
                  Marcante
                </button>
              </div>
            </div>
          </div>

          <article className="recommendation" style={{ '--drink-color': recommendation.color }}>
            <div className="rec-image">
              <img src={recommendation.photo} alt={recommendation.name} />
            </div>
            <div className="rec-copy">
              <span className="ai-label">
                <Bot size={16} aria-hidden="true" />
                Indicacao da IA
              </span>
              <h3>{recommendation.name}</h3>
              <p>
                Peca com {base === 'cachaca' ? 'cachaca' : 'vodka'}: {recommendation.bestFor}
              </p>
              <button type="button" onClick={() => setFavorite(recommendation.id)}>
                <Heart size={17} aria-hidden="true" />
                Marcar como favorita
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="menu-section" id="menu" aria-labelledby="menu-title">
        <div className="section-heading">
          <p className="eyebrow">Menu principal</p>
          <h2 id="menu-title">Escolha seu sabor</h2>
          <p>Cada drink pode ser feito com cachaca ou vodka, mantendo fruta fresca, gelo e acucar.</p>
        </div>

        <div className="toolbar" aria-label="Ferramentas do cardapio">
          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Buscar drink</span>
            <input
              type="search"
              placeholder="Buscar por sabor"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="base-filter" aria-label="Filtro de base">
            <button
              type="button"
              className={activeBase === 'todas' ? 'active' : ''}
              onClick={() => setActiveBase('todas')}
            >
              Todas
            </button>
            <button
              type="button"
              className={activeBase === 'cachaca' ? 'active' : ''}
              onClick={() => setActiveBase('cachaca')}
            >
              Cachaca
            </button>
            <button
              type="button"
              className={activeBase === 'vodka' ? 'active' : ''}
              onClick={() => setActiveBase('vodka')}
            >
              Vodka
            </button>
          </div>
        </div>

        <p className="menu-mode">
          Mostrando o cardapio no modo <strong>{menuBaseLabel}</strong>.
        </p>

        <div className="drink-grid">
          {filteredDrinks.map((drink) => (
            <article className="drink-card" key={drink.id} style={{ '--drink-color': drink.color }}>
              <button
                className={favorite === drink.id ? 'favorite active' : 'favorite'}
                type="button"
                aria-label={`Favoritar ${drink.name}`}
                onClick={() => setFavorite(drink.id)}
              >
                <Heart size={18} aria-hidden="true" />
              </button>
              <img src={drink.photo} alt={drink.name} />
              <div className="drink-content">
                <span className="fruit-tag">{drink.fruit}</span>
                <h3>{drink.name}</h3>
                <p>{drink.vibe}</p>
                <div className="meta-row">
                  <span>
                    <IceCreamBowl size={16} aria-hidden="true" />
                    Docura {drink.sweetness}
                  </span>
                  <span>
                    <Flame size={16} aria-hidden="true" />
                    Forca {drink.intensity}/5
                  </span>
                </div>
                <div className="ingredients">
                  <strong>Vai no copo</strong>
                  <ul>
                    {drink.ingredients.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <p className="base-note">
                  Base indicada agora: <strong>{menuBaseLabel}</strong>
                </p>
                <p className="garnish">
                  <Leaf size={16} aria-hidden="true" />
                  {drink.garnish}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bar-section" id="bar" aria-labelledby="bar-title">
        <div className="section-heading">
          <p className="eyebrow">Ideias extras</p>
          <h2 id="bar-title">Monte o pedido perfeito</h2>
        </div>
        <div className="bar-grid">
          <div>
            <Sprout size={22} aria-hidden="true" />
            <h3>Assinatura da casa</h3>
            <p>Finalize qualquer caipirinha com hortela batida na palma para um aroma fresco.</p>
          </div>
          <div>
            <GlassWater size={22} aria-hidden="true" />
            <h3>Combo degustacao</h3>
            <p>Sirva mini copos dos quatro sabores para grupos que querem provar tudo.</p>
          </div>
          <div>
            <Martini size={22} aria-hidden="true" />
            <h3>Versao sem pressa</h3>
            <p>Use gelo grande quando quiser um drink mais longo, menos diluido e mais bonito.</p>
          </div>
        </div>
      </section>

      <footer>
        <span>Caipirinha Days</span>
        <span>
          Fotos via Wikimedia Commons: {drinks.map((drink) => drink.credit).join(' | ')}
        </span>
      </footer>
    </main>
  )
}

export default App
