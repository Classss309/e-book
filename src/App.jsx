import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { CheckCircle, Users, BookOpen, Target, Gift, GraduationCap, ArrowRight, Eye, HelpCircle, Rocket, Heart, Shield, Mail, Star, Clock, Zap } from 'lucide-react'
import './App.css'

// Importar as imagens dos assets
import ebookMockup from './assets/images/ebook_mockup.png'
import linguagemSimplesIcon from './assets/icons/linguagem_simples.png'
import codigoRapidoIcon from './assets/icons/codigo_rapido.png'
import exerciciosPraticosIcon from './assets/icons/exercicios_praticos.png'
import bonusChecklistIcon from './assets/icons/bonus_checklist.png'
import estudantesIcon from './assets/icons/estudantes.png'
import migracaoTiIcon from './assets/icons/migracao_ti.png'
import nuncaProgramouIcon from './assets/icons/nunca_programou.png'
import curiososIcon from './assets/icons/curiosos.png'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })
  const [visibleSections, setVisibleSections] = useState(new Set())
  
  const heroRef = useRef(null)
  const productRef = useRef(null)
  const benefitsRef = useRef(null)
  const audienceRef = useRef(null)
  const offerRef = useRef(null)

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = [heroRef, productRef, benefitsRef, audienceRef, offerRef]
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCTAClick = () => {
    // Adicionar analytics ou redirecionamento aqui
    window.open('https://pay.kiwify.com.br/hSNB4tV', '_blank')
  }

  const AnimatedCounter = ({ value, suffix = '' }) => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      const timer = setTimeout(() => {
        if (count < value) {
          setCount(count + 1)
        }
      }, 50)
      return () => clearTimeout(timer)
    }, [count, value])
    
    return <span>{count}{suffix}</span>
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
      >
        {/* Background with parallax effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,255,255,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,0,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,100,255,0.1),transparent_50%)]"></div>
        </div>
        
        <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6 flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-transparent leading-tight animate-pulse">
            Aprenda Programação do Zero e Escreva Seu Primeiro Código Ainda Hoje
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Um guia simples, direto e essencial para qualquer iniciante que deseja entrar na programação.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-cyan-500/30">
              <Clock className="h-5 w-5 text-cyan-400" />
              <span className="text-sm">Resultados em poucas horas</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-green-500/30">
              <Zap className="h-5 w-5 text-green-400" />
              <span className="text-sm">Método comprovado</span>
            </div>
          </div>
          
          <Button 
            onClick={() => scrollToSection('oferta')}
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 pulse-neon-animation"
          >
            Quero meu Guia Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Product Section */}
      <section 
        ref={productRef}
        id="product"
        className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`text-center md:text-left transition-all duration-1000 ${visibleSections.has('product') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <img 
                src={ebookMockup} 
                alt="Mockup do E-book O Guia Essencial do Desenvolvedor Iniciante" 
                className="w-full max-w-md mx-auto md:mx-0 drop-shadow-2xl hover:scale-105 transition-transform duration-300 float-animation"
              />
            </div>
            
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${visibleSections.has('product') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
                O Produto
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                <strong className="text-white">O Guia Essencial do Desenvolvedor Iniciante</strong> é um passo a passo prático para quem nunca programou antes. Em poucas páginas você entende os conceitos básicos, instala as ferramentas necessárias e já escreve seu primeiro código em Python.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">                  
                  </div>
                  <div className="text-sm text-gray-300">13 Páginas de conteúdo</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/30 hover:border-green-400 transition-colors">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    <value value = '10'/>
                  </div>
                  <div className="text-sm text-gray-300">5 Exercícios práticos</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-cyan-500/30">
                  <BookOpen className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm">Guia Prático</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-green-500/30">
                  <Rocket className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Resultados Rápidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        id="benefits"
        className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-400 transition-all duration-1000 ${visibleSections.has('benefits') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Por que este guia é diferente?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { icon: linguagemSimplesIcon, title: 'Linguagem Simples', desc: 'Linguagem simples e acessível, sem enrolação.', color: 'cyan', delay: 0 },
              { icon: codigoRapidoIcon, title: 'Código Rápido', desc: 'Você vai do zero ao primeiro código em poucas horas.', color: 'green', delay: 200 },
              { icon: exerciciosPraticosIcon, title: 'Exercícios Práticos', desc: 'Inclui exercícios práticos e exemplos prontos.', color: 'cyan', delay: 400 },
              { icon: bonusChecklistIcon, title: 'Bônus Incluído', desc: 'Bônus: checklist de estudos para sua evolução.', color: 'green', delay: 600 }
            ].map((benefit, index) => (
              <div 
                key={index}
                className={`text-center group hover:scale-105 transition-all duration-500 ${visibleSections.has('benefits') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${benefit.delay}ms` }}
              >
                <div className={`w-20 h-20 mx-auto mb-4 p-4 bg-gray-800/50 rounded-full border border-${benefit.color}-500/30 group-hover:border-${benefit.color}-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-${benefit.color}-500/25`}>
                  <img src={benefit.icon} alt={benefit.title} className="w-full h-full object-contain" />
                </div>
                <h3 className={`text-lg font-semibold text-${benefit.color}-400 mb-2`}>{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section 
        ref={audienceRef}
        id="audience"
        className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-400 transition-all duration-1000 ${visibleSections.has('audience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Para quem é?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { icon: estudantesIcon, title: 'Estudantes Iniciantes', desc: 'Perfeito para quem está começando os estudos em programação.', color: 'cyan', delay: 0 },
              { icon: migracaoTiIcon, title: 'Migração para TI', desc: 'Pessoas que querem migrar para a área de tecnologia.', color: 'green', delay: 200 },
              { icon: nuncaProgramouIcon, title: 'Nunca Programou', desc: 'Quem nunca programou e acha complicado.', color: 'cyan', delay: 400 },
              { icon: curiososIcon, title: 'Curiosos', desc: 'Curiosos que querem aprender algo novo.', color: 'green', delay: 600 }
            ].map((audience, index) => (
              <div 
                key={index}
                className={`text-center group hover:scale-105 transition-all duration-500 ${visibleSections.has('audience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${audience.delay}ms` }}
              >
                <div className={`w-20 h-20 mx-auto mb-4 p-4 bg-gray-800/50 rounded-full border border-${audience.color}-500/30 group-hover:border-${audience.color}-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-${audience.color}-500/25`}>
                  <img src={audience.icon} alt={audience.title} className="w-full h-full object-contain" />
                </div>
                <h3 className={`text-lg font-semibold text-${audience.color}-400 mb-2`}>{audience.title}</h3>
                <p className="text-gray-300 text-sm">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section 
        ref={offerRef}
        id="oferta" 
        className="py-20 px-4 bg-gradient-to-br from-cyan-900/20 via-gray-900 to-green-900/20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className={`bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 md:p-12 shadow-2xl transition-all duration-1000 ${visibleSections.has('oferta') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
              Oferta Especial
            </h2>
            
            {/* Countdown Timer */}
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-semibold">Oferta expira em:</span>
              </div>
              <div className="flex justify-center space-x-4 text-2xl font-bold">
                <div className="text-center">
                  <div className="text-red-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">HORAS</div>
                </div>
                <div className="text-red-400">:</div>
                <div className="text-center">
                  <div className="text-red-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">MIN</div>
                </div>
                <div className="text-red-400">:</div>
                <div className="text-center">
                  <div className="text-red-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">SEG</div>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Enquanto cursos de programação custam <span className="line-through text-red-400">R$ 200 a R$ 500</span>, você pode começar sua jornada com este guia por apenas:
            </p>
            
            <div className="mb-8">
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2 animate-pulse">
                R$ 19,90
              </div>
              <p className="text-green-400 font-semibold text-lg">
                💰 Economia de mais de R$ 180!
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-sm font-semibold">Pagamento Seguro</div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <Mail className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-sm font-semibold">Entrega Imediata</div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <Gift className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-sm font-semibold">Bônus Incluído</div>
              </div>
            </div>
            
            <Button 
              onClick={handleCTAClick}
              className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 pulse-neon-animation"
            >
              Garantir meu Guia Agora
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            
            <p className="text-xs text-gray-400 mt-4">
              * Acesso imediato após confirmação do pagamento
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Shield className="h-12 w-12 text-green-400 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-green-400">
              Compra 100% Segura
            </h2>
          </div>
          
          <p className="text-xl text-gray-300 mb-8">
            Compra 100% segura via Kiwify. Receba o guia imediatamente no seu e-mail após o pagamento.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-6 py-3 rounded-full border border-green-500/30 hover:border-green-400 transition-colors">
              <Shield className="h-5 w-5 text-green-400" />
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-6 py-3 rounded-full border border-cyan-500/30 hover:border-cyan-400 transition-colors">
              <Mail className="h-5 w-5 text-cyan-400" />
              <span>Entrega Imediata</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-6 py-3 rounded-full border border-green-500/30 hover:border-green-400 transition-colors">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>Satisfação Garantida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Está pronto para escrever seu primeiro código?
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            Não perca mais tempo. Comece sua jornada na programação hoje mesmo!
          </p>
          
          <Button 
            onClick={handleCTAClick}
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold text-2xl px-16 py-8 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 pulse-neon-animation"
          >
            ➡️ Quero começar minha jornada na programação
          </Button>
          
          <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Acesso imediato</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Suporte incluído</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Bônus grátis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 mb-4">
            © 2024 O Guia Essencial do Desenvolvedor Iniciante. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
