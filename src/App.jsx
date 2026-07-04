import { useMemo, useState } from 'react'
import {
  Bot,
  Flame,
  GlassWater,
  Heart,
  IceCreamBowl,
  Leaf,
  Martini,
  Search,
  Sparkles,
  Wine,
} from 'lucide-react'
import './App.css'

const drinks = [
  {
    id: 'limao',
    name: 'Caipirinha de limão',
    shortName: 'Limão',
    fruit: 'Limão taiti',
    vibe: 'Clássica, azedinha e muito refrescante.',
    profile: ['cítrica', 'leve', 'tradicional'],
    sweetness: 'Baixa',
    intensity: 3,
    bestFor: 'é a escolha mais clássica, refrescante e fácil de agradar.',
    ingredients: ['limão taiti macerado', 'açúcar', 'gelo', 'cachaça ou vodka'],
    garnish: 'Finalizada com fatia de limão.',
    color: '#48a84c',
    photo:
      'https://static.wixstatic.com/media/294104_9b28e351eeff4e92b00d3d2f27a99291~mv2.jpg/v1/fill/w_970,h_647,al_c,q_85/294104_9b28e351eeff4e92b00d3d2f27a99291~mv2.jpg',
  },
  {
    id: 'maracuja',
    name: 'Caipirinha de maracujá',
    shortName: 'Maracujá',
    fruit: 'Maracujá',
    vibe: 'Tropical, perfumada e doce na medida.',
    profile: ['tropical', 'doce', 'aromática'],
    sweetness: 'Média',
    intensity: 2,
    bestFor: 'é uma opção tropical, aromática e mais suave no paladar.',
    ingredients: ['polpa de maracujá', 'açúcar', 'gelo', 'cachaça ou vodka'],
    garnish: 'Servida com polpa e sementes de maracujá.',
    color: '#f2a900',
    photo: 'https://img.cdndsgni.com/preview/10024207.jpg',
  },
  {
    id: 'tres-limoes',
    name: 'Caipirinha 3 limões',
    shortName: '3 Limões',
    fruit: 'Siciliano, cravo e taiti',
    vibe: 'Cítrica, aromática e mais marcante.',
    profile: ['cítrica', 'intensa', 'especial'],
    sweetness: 'Baixa',
    intensity: 4,
    bestFor: 'é para quem quer uma caipirinha diferente, cítrica e com mais personalidade.',
    ingredients: ['limão siciliano', 'limão cravo', 'limão taiti', 'açúcar', 'gelo', 'cachaça ou vodka'],
    garnish: 'Finalizada com cascas dos limões para mais aroma.',
    color: '#d7d947',
    photo: 'https://doseextraoficial.com.br/wp-content/uploads/2023/06/Caipirinha-de-tres-limoes.jpg',
  },
  {
    id: 'mexerica',
    name: 'Caipirinha de mexerica',
    shortName: 'Mexerica',
    fruit: 'Mexerica',
    vibe: 'Frutada, suculenta e levemente adocicada.',
    profile: ['doce', 'frutada', 'leve'],
    sweetness: 'Média',
    intensity: 2,
    bestFor: 'é macia, cheirosa e ótima para quem prefere um drink frutado.',
    ingredients: ['gomos de mexerica', 'toque de limão', 'açúcar', 'gelo', 'cachaça ou vodka'],
    garnish: 'Finalizada com gomo fresco de mexerica.',
    color: '#f08a24',
    photo: 'https://receitacerta.blog.br/wp-content/uploads/2025/09/Capirinha-de-Tangerina-768x512.webp',
  },
]

const preferenceOptions = [
  { id: 'refrescante', label: 'Refrescante', profiles: ['leve', 'cítrica'] },
  { id: 'doce', label: 'Mais doce', profiles: ['doce', 'frutada'] },
  { id: 'diferente', label: 'Diferente', profiles: ['especial', 'intensa'] },
  { id: 'tropical', label: 'Tropical', profiles: ['tropical', 'aromática'] },
]

const baseOptions = [
  { id: 'cachaca', label: 'Cachaça', note: 'mais brasileira, intensa e cheia de personalidade' },
  { id: 'vodka', label: 'Vodka', note: 'mais neutra, suave e fácil de beber' },
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

  const filteredDrinks = drinks.filter((drink) =>
    `${drink.name} ${drink.fruit} ${drink.vibe}`.toLowerCase().includes(query.toLowerCase()),
  )

  const menuBaseLabel =
    activeBase === 'todas' ? 'cachaça ou vodka' : activeBase === 'cachaca' ? 'cachaça' : 'vodka'

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#menu" aria-label="Caipirinha Days">
          <span className="brand-mark">
            <Martini size={20} aria-hidden="true" />
          </span>
          <span>Caipirinha Days</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#menu">Opções</a>
          <a href="#ia">Me ajude</a>
        </nav>
      </header>

      <section className="hero-section" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Escolha sua caipirinha</p>
          <h1 id="page-title">Caipirinha Days</h1>
          <p className="hero-text">
            Veja os sabores da festa e escolha sua base: todas podem ser feitas com cachaça ou vodka.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#menu">
              <GlassWater size={18} aria-hidden="true" />
              Ver opções
            </a>
            <a className="secondary-action" href="#ia">
              <Bot size={18} aria-hidden="true" />
              Me ajude a escolher
            </a>
          </div>
        </div>

        <div className="hero-menu" aria-label="Sabores disponíveis">
          {drinks.map((drink) => (
            <a className="hero-drink" href={`#${drink.id}`} key={drink.id}>
              <img src={drink.photo} alt={drink.name} />
              <span>{drink.shortName}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="quick-panel" aria-label="Resumo das opções">
        <div>
          <GlassWater size={20} aria-hidden="true" />
          <strong>4 sabores</strong>
          <span>limão, maracujá, 3 limões e mexerica</span>
        </div>
        <div>
          <Wine size={20} aria-hidden="true" />
          <strong>2 bases</strong>
          <span>cachaça ou vodka em qualquer opção</span>
        </div>
        <div>
          <Sparkles size={20} aria-hidden="true" />
          <strong>Não sabe qual pedir?</strong>
          <span>responda rapidinho e receba uma sugestão</span>
        </div>
      </section>

      <section className="menu-section" id="menu" aria-labelledby="menu-title">
        <div className="section-heading">
          <p className="eyebrow">Opções da festa</p>
          <h2 id="menu-title">Escolha seu sabor</h2>
          <p>Clique no coração para marcar sua preferida. Depois é só pedir no bar.</p>
        </div>

        <div className="toolbar" aria-label="Ferramentas do cardápio">
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
          <div className="base-filter" aria-label="Escolha de base">
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
              Cachaça
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
          Pedido com <strong>{menuBaseLabel}</strong>.
        </p>

        <div className="drink-grid">
          {filteredDrinks.map((drink) => (
            <article
              className="drink-card"
              id={drink.id}
              key={drink.id}
              style={{ '--drink-color': drink.color }}
            >
              <button
                className={favorite === drink.id ? 'favorite active' : 'favorite'}
                type="button"
                aria-label={`Favoritar ${drink.name}`}
                onClick={() => setFavorite(drink.id)}
              >
                <Heart size={18} aria-hidden="true" />
              </button>
              <div className="drink-photo">
                <img src={drink.photo} alt={drink.name} />
                <div className="photo-title">
                  <span>{drink.shortName}</span>
                  <strong>{drink.name}</strong>
                </div>
              </div>
              <div className="drink-content">
                <span className="fruit-tag">{drink.fruit}</span>
                <h3>{drink.name}</h3>
                <p>{drink.vibe}</p>
                <div className="meta-row">
                  <span>
                    <IceCreamBowl size={16} aria-hidden="true" />
                    Doçura {drink.sweetness}
                  </span>
                  <span>
                    <Flame size={16} aria-hidden="true" />
                    Força {drink.intensity}/5
                  </span>
                </div>
                <div className="ingredients">
                  <strong>O que vai</strong>
                  <ul>
                    {drink.ingredients.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <p className="base-note">
                  Pode pedir com <strong>{menuBaseLabel}</strong>.
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

      <section className="assistant-section" id="ia" aria-labelledby="assistant-title">
        <div className="section-heading">
          <p className="eyebrow">Está em dúvida?</p>
          <h2 id="assistant-title">Eu te ajudo a escolher</h2>
          <p>Responda três coisas rápidas e veja qual caipirinha combina com você agora.</p>
        </div>

        <div className="assistant-grid">
          <div className="selector-area">
            <div className="control-group">
              <span>O que você quer?</span>
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
                Sugestão
              </span>
              <h3>{recommendation.name}</h3>
              <p>
                Peça com {base === 'cachaca' ? 'cachaça' : 'vodka'}: {recommendation.bestFor}
              </p>
              <button type="button" onClick={() => setFavorite(recommendation.id)}>
                <Heart size={17} aria-hidden="true" />
                Gostei dessa
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
