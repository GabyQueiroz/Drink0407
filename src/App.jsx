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
    method: [
      'Corte o limão em pedaços e tire a parte branca do meio.',
      'Macere com açúcar direto no copo, sem esmagar demais a casca.',
      'Complete com bastante gelo e finalize com cachaça ou vodka.',
      'Misture bem e sirva na hora.',
    ],
    color: '#48a84c',
    photo:
      'https://receitasbaratas.com.br/wp-content/uploads/2025/01/Receita-de-Caipirinha-de-Limao-no-Liquidificador.jpg',
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
    method: [
      'Coloque a polpa de maracujá no copo com açúcar.',
      'Misture de leve para soltar o perfume da fruta.',
      'Adicione gelo até completar o copo.',
      'Finalize com cachaça ou vodka e mexa antes de servir.',
    ],
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
    method: [
      'Use pedaços pequenos dos três limões, sem excesso da parte branca.',
      'Macere com açúcar para misturar acidez e aroma.',
      'Coloque bastante gelo para equilibrar a intensidade.',
      'Complete com cachaça ou vodka e mexa bem.',
    ],
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
    method: [
      'Coloque os gomos de mexerica no copo com um toque de limão.',
      'Macere com açúcar até soltar bastante suco.',
      'Adicione gelo e complete com cachaça ou vodka.',
      'Mexa bem para deixar a bebida perfumada e uniforme.',
    ],
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

const aiModes = [
  { id: 'leve', label: 'Quero leve', hint: 'mais fácil de beber' },
  { id: 'equilibrado', label: 'Quero equilibrado', hint: 'meio termo certeiro' },
  { id: 'marcante', label: 'Quero marcante', hint: 'mais presença no copo' },
]

const aiFocusOptions = [
  { id: 'festa', label: 'Opções da festa', hint: 'analisa tudo que tem no bar' },
  { id: 'curiosidade', label: 'Curiosidade', hint: 'traz dica e detalhe do sabor' },
  { id: 'preparo', label: 'Como fazer', hint: 'prioriza dica de preparo' },
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

function buildPossibilities(preference, mood, focus) {
  const selected = preferenceOptions.find((item) => item.id === preference)
  const variants = drinks.flatMap((drink) =>
    ['cachaca', 'vodka'].map((variantBase) => {
      const profileScore = selected.profiles.filter((profile) => drink.profile.includes(profile)).length * 4
      const moodScore =
        mood === 'leve' ? Math.max(0, 5 - drink.intensity) : mood === 'marcante' ? drink.intensity + 1 : 3
      const focusScore =
        focus === 'curiosidade' && drink.id === 'tres-limoes'
          ? 3
          : focus === 'preparo' && drink.id === 'limao'
            ? 2
            : focus === 'festa'
              ? 1
              : 0
      const baseScore = variantBase === 'vodka' && drink.intensity <= 2 ? 1 : variantBase === 'cachaca' ? 1 : 0
      const score = profileScore + moodScore + focusScore + baseScore

      return {
        id: `${drink.id}-${variantBase}`,
        drink,
        base: variantBase === 'cachaca' ? 'cachaça' : 'vodka',
        score,
        reason:
          variantBase === 'cachaca'
            ? 'fica mais brasileiro e com mais presença'
            : 'fica mais suave e fácil de beber',
        tip:
          focus === 'preparo'
            ? drink.method[1]
            : focus === 'curiosidade'
              ? `${drink.shortName} combina com quem quer ${drink.vibe.toLowerCase()}`
              : `Boa pedida para pedir no bar com ${variantBase === 'cachaca' ? 'cachaça' : 'vodka'}.`,
      }
    }),
  )

  return variants.sort((a, b) => b.score - a.score).slice(0, 5)
}

function App() {
  const [activeBase, setActiveBase] = useState('todas')
  const [preference, setPreference] = useState('refrescante')
  const [base, setBase] = useState('cachaca')
  const [mood, setMood] = useState('leve')
  const [aiFocus, setAiFocus] = useState('festa')
  const [favorite, setFavorite] = useState('mexerica')
  const [savedSuggestion, setSavedSuggestion] = useState('')
  const [query, setQuery] = useState('')

  const recommendation = useMemo(
    () => pickRecommendation(preference, base, mood),
    [preference, base, mood],
  )

  const selectedPreference = preferenceOptions.find((option) => option.id === preference)
  const selectedMode = aiModes.find((option) => option.id === mood)
  const selectedFocus = aiFocusOptions.find((option) => option.id === aiFocus)
  const baseLabel = base === 'cachaca' ? 'cachaça' : 'vodka'
  const possibilities = useMemo(
    () => buildPossibilities(preference, mood, aiFocus),
    [preference, mood, aiFocus],
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
          <a href="#ia">IA</a>
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
              IA recomenda
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
          <strong>IA da festa</strong>
          <span>sugere o drink e mostra como fazer</span>
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
          <p className="eyebrow">IA da festa</p>
          <h2 id="assistant-title">Descubra seu drink</h2>
          <p>A IA cruza seu paladar, sua base preferida e a intensidade para sugerir um drink e o preparo.</p>
        </div>

        <div className="assistant-grid">
          <div className="selector-area">
            <div className="ai-status">
              <Bot size={20} aria-hidden="true" />
              <div>
                <strong>Analisando seu paladar</strong>
                <span>{selectedPreference.label} + {baseLabel} + {selectedMode.hint} + {selectedFocus.label}</span>
              </div>
            </div>

            <div className="control-group">
              <span>1. Qual é sua vontade?</span>
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
              <span>2. Escolha a base</span>
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
              <span>3. Como você quer o drink?</span>
              <div className="ai-mode-grid" role="group" aria-label="Estilo do drink">
                {aiModes.map((option) => (
                  <button
                    type="button"
                    className={mood === option.id ? 'mood active' : 'mood'}
                    onClick={() => setMood(option.id)}
                    key={option.id}
                  >
                    <strong>{option.label}</strong>
                    <small>{option.hint}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <span>4. O que a IA deve olhar?</span>
              <div className="ai-mode-grid" role="group" aria-label="Tipo de análise da IA">
                {aiFocusOptions.map((option) => (
                  <button
                    type="button"
                    className={aiFocus === option.id ? 'mood active' : 'mood'}
                    onClick={() => setAiFocus(option.id)}
                    key={option.id}
                  >
                    <strong>{option.label}</strong>
                    <small>{option.hint}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <article className="recommendation ai-result" style={{ '--drink-color': recommendation.color }}>
            <div className="rec-image">
              <img src={recommendation.photo} alt={recommendation.name} />
            </div>
            <div className="rec-copy">
              <span className="ai-label">
                <Sparkles size={16} aria-hidden="true" />
                Recomendação da IA
              </span>
              <h3>{recommendation.name}</h3>
              <p>
                Minha sugestão: peça com <strong>{baseLabel}</strong>. Esse drink {recommendation.bestFor}
              </p>

              <div className="ai-reason">
                <strong>Por que combina?</strong>
                <span>
                  Você escolheu um perfil {selectedPreference.label.toLowerCase()}, {selectedMode.hint} e pediu uma análise de {selectedFocus.label.toLowerCase()}.
                </span>
              </div>

              <div className="ai-options">
                <strong>Outras possibilidades analisadas</strong>
                {possibilities.map((option, index) => (
                  <button
                    type="button"
                    className="ai-option"
                    key={option.id}
                    onClick={() => {
                      setFavorite(option.drink.id)
                      setSavedSuggestion(`${option.drink.name} com ${option.base}`)
                    }}
                  >
                    <span>{index + 1}</span>
                    <div>
                      <strong>{option.drink.name} com {option.base}</strong>
                      <small>{option.reason}. {option.tip}</small>
                    </div>
                  </button>
                ))}
              </div>

              <div className="recipe-box">
                <strong>Como fazer</strong>
                <ol>
                  {recommendation.method.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              {savedSuggestion && (
                <p className="saved-suggestion">
                  Sugestão salva: <strong>{savedSuggestion}</strong>
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  setFavorite(recommendation.id)
                  setSavedSuggestion(`${recommendation.name} com ${baseLabel}`)
                }}
              >
                <Heart size={17} aria-hidden="true" />
                Gostei dessa sugestão
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
