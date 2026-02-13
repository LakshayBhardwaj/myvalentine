'use client'

import { useState, useEffect, useRef } from 'react'

export default function RoseDayPage() {
  // Valentine Week state
  const [activeDay, setActiveDay] = useState('rose')

  // Propose Day states
  const [proposeStarted, setProposeStarted] = useState(false)
  const [proposeFastTap, setProposeFastTap] = useState(0)
  const [proposeNoJump, setProposeNoJump] = useState(0)
  const [proposeYesClicked, setProposeYesClicked] = useState(false)
  const [ringCatchState, setRingCatchState] = useState('idle') // idle, playing, caught, missed
  const [ringPosition, setRingPosition] = useState({ x: 50, y: -10 })
  const [fingerPosition, setFingerPosition] = useState(50)
  const [ringScore, setRingScore] = useState(0)
  const [ringMisses, setRingMisses] = useState(0)
  const [ringMessage, setRingMessage] = useState('')
  const [proposeNoPos, setProposeNoPos] = useState({ x: 0, y: 0 })
  const ringIntervalRef = useRef(null)
  const lastTapRef = useRef(0)
  const proposeSongRef = useRef(null)

  // Valentine Week Days
  const valentineWeekDays = [
    { id: 'rose', name: 'Rose Day', emoji: '🌹', date: '7 Feb' },
    { id: 'propose', name: 'Propose Day', emoji: '💍', date: '8 Feb' },
    { id: 'chocolate', name: 'Chocolate Day', emoji: '🍫', date: '9 Feb' },
    { id: 'teddy', name: 'Teddy Day', emoji: '🧸', date: '10 Feb' },
    { id: 'promise', name: 'Promise Day', emoji: '🤞', date: '11 Feb' },
    { id: 'hug', name: 'Hug Day', emoji: '🤗', date: '12 Feb' },
    { id: 'kiss', name: 'Kiss Day', emoji: '💋', date: '13 Feb' },
    { id: 'valentine', name: "Valentine's Day", emoji: '💕', date: '14 Feb' }
  ]

  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [hearts, setHearts] = useState([])
  const [confetti, setConfetti] = useState([])
  const [timer, setTimer] = useState(10)
  const [timerStarted, setTimerStarted] = useState(false)
  const countdownRef = useRef(null)

  // Valentine Question states
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [noAttempts, setNoAttempts] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)
  const [noButtonSize, setNoButtonSize] = useState(100)
  const [noButtonText, setNoButtonText] = useState("Nahi! 😤")
  const [showRunawayMessage, setShowRunawayMessage] = useState("")

  // Surprise Gift Form states
  const [queenName, setQueenName] = useState("")
  const [queenAddress, setQueenAddress] = useState("")
  const [nameHint, setNameHint] = useState("")
  const [nameValid, setNameValid] = useState(false)
  const [showKBCMeme, setShowKBCMeme] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState([])
  const [interactionLogs, setInteractionLogs] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [sirenPlayed, setSirenPlayed] = useState(false)
  const [showSoundOverlay, setShowSoundOverlay] = useState(true)
  const audioContextRef = useRef(null)

  // Chocolate Day Quiz states
  const [chocoQuizIndex, setChocoQuizIndex] = useState(0)
  const [chocoQuizAnswered, setChocoQuizAnswered] = useState(false)
  const [chocoQuizCorrect, setChocoQuizCorrect] = useState(false)
  const [chocoQuizScore, setChocoQuizScore] = useState(0)
  const [chocoQuizDone, setChocoQuizDone] = useState(false)
  const [chocoWrongMsg, setChocoWrongMsg] = useState('')
  const [chocoSwipeDir, setChocoSwipeDir] = useState('')
  const chocoTouchStartRef = useRef(null)

  // Valentine Spinner game states
  const [spinnerAngle, setSpinnerAngle] = useState(0)
  const [spinnerSpinning, setSpinnerSpinning] = useState(true)
  const [spinnerStopped, setSpinnerStopped] = useState(false)
  const [spinnerResult, setSpinnerResult] = useState('')
  const spinnerAnimRef = useRef(null)
  const spinnerAngleRef = useRef(0)
  const spinnerSpeedRef = useRef(3)
  const whatsappNumber = "918512022116"

  // ===== TEDDY DAY - WHACK-A-BEAR GAME STATES =====
  const [wabState, setWabState] = useState('intro') // intro, levelIntro, playing, levelComplete, gameOver, victory
  const [wabLevel, setWabLevel] = useState(1)
  const [wabScore, setWabScore] = useState(0)
  const [wabLives, setWabLives] = useState(3)
  const [wabCombo, setWabCombo] = useState(0)
  const [wabMaxCombo, setWabMaxCombo] = useState(0)
  const [wabTimer, setWabTimer] = useState(30)
  const [wabHoles, setWabHoles] = useState(Array(9).fill(null))
  const [wabWhacked, setWabWhacked] = useState(Array(9).fill(false))
  const [wabMessage, setWabMessage] = useState('')
  const [wabPowerUp, setWabPowerUp] = useState(null) // 'freeze' | 'double' | null
  const [wabStats, setWabStats] = useState({ whacks: 0, misses: 0 })
  const [wabHighScore, setWabHighScore] = useState(0)
  const [wabBossHP, setWabBossHP] = useState(0)
  const [wabBossMaxHP, setWabBossMaxHP] = useState(10)
  const [wabShake, setWabShake] = useState(false)
  const [wabComboMsg, setWabComboMsg] = useState('')
  const [wabFrozen, setWabFrozen] = useState(false)
  const [wabDouble, setWabDouble] = useState(false)
  const wabTimerRef = useRef(null)
  const wabSpawnRef = useRef(null)
  const wabLivesRef = useRef(3)
  const wabComboRef = useRef(0)
  const wabFrozenRef = useRef(false)
  const wabActiveRef = useRef(false)
  const wabHolesRef = useRef(Array(9).fill(null))
  const [wabMusicOn, setWabMusicOn] = useState(true)
  const wabMusicIntervalRef = useRef(null)
  const wabMusicBassRef = useRef(null)
  const wabMusicDrumRef = useRef(null)
  const wabMusicActiveRef = useRef(false)

  // ===== PROMISE DAY - PUZZLE HUNGAMA STATES =====
  const [pdView, setPdView] = useState('hub') // hub, unscramble, match, jigsaw, escape
  const [pdDone, setPdDone] = useState({ u: false, m: false, j: false, e: false })
  const [pdHasdi, setPdHasdi] = useState(0)
  // Puzzle 1: Vada Unscramble
  const [pdUIdx, setPdUIdx] = useState(0)
  const [pdUPool, setPdUPool] = useState([]) // {letter, origIdx, used}
  const [pdUAns, setPdUAns] = useState([]) // placed letters
  const [pdUMsg, setPdUMsg] = useState('')
  const [pdUDone, setPdUDone] = useState(false)
  const [pdUShake, setPdUShake] = useState(false)
  // Puzzle 2: Memory Match
  const [pdMCards, setPdMCards] = useState([])
  const [pdMFlip, setPdMFlip] = useState([])
  const [pdMFound, setPdMFound] = useState([])
  const [pdMMsg, setPdMMsg] = useState('')
  const [pdMMoves, setPdMMoves] = useState(0)
  const [pdMDone, setPdMDone] = useState(false)
  const [pdMLock, setPdMLock] = useState(false)
  // Puzzle 3: Jigsaw (Tile Swap)
  const [pdJTiles, setPdJTiles] = useState([])
  const [pdJDone, setPdJDone] = useState(false)
  const [pdJMsg, setPdJMsg] = useState('')
  const [pdJMoves, setPdJMoves] = useState(0)
  const [pdJSel, setPdJSel] = useState(null)
  // Puzzle 4: Escape Room
  const [pdEStep, setPdEStep] = useState(0)
  const [pdEMsg, setPdEMsg] = useState('')
  const [pdEDone, setPdEDone] = useState(false)
  const [pdEShake, setPdEShake] = useState(false)
  const [pdEUnlocked, setPdEUnlocked] = useState([])

  // ===== HUG DAY - LATE NIGHT HUG DA HUNGAMA STATES =====
  const [hugCount, setHugCount] = useState(0)
  const [hugMsg, setHugMsg] = useState('')
  const [hugMilestone, setHugMilestone] = useState(null) // current milestone
  const [hugSqueeze, setHugSqueeze] = useState(false)
  const [hugBlush, setHugBlush] = useState(false)
  const [hugFlip, setHugFlip] = useState(false) // reverse hug mode
  const [hugOverheat, setHugOverheat] = useState(false)
  const [hugKissRain, setHugKissRain] = useState(false)
  const [hugChaos, setHugChaos] = useState(false) // ultimate surrender
  const [hugTractor, setHugTractor] = useState(false)
  const [hugBilli, setHugBilli] = useState(false)
  const [hugFog, setHugFog] = useState(false)
  const [hugMaxed, setHugMaxed] = useState(false)
  const [hugZzz, setHugZzz] = useState([])
  const hugCountRef = useRef(0)

  // ===== VALENTINE'S DAY - SAD GAANA DRAMA STATES =====
  const [vdAct, setVdAct] = useState('act1') // act1, act2, act3, end
  const [vdSadPlaying, setVdSadPlaying] = useState(false)
  const [vdSadnessBandKar, setVdSadnessBandKar] = useState(false)
  const [vdCardIndex, setVdCardIndex] = useState(0)
  const [vdCardFlip, setVdCardFlip] = useState(false)
  const [vdSadAttempts, setVdSadAttempts] = useState(0)
  const [vdSadLocked, setVdSadLocked] = useState(false)
  const [vdHappyMode, setVdHappyMode] = useState(false)
  const [vdFakeTears, setVdFakeTears] = useState(false)
  const [vdRecordScratch, setVdRecordScratch] = useState(false)
  const [vdShowEnd, setVdShowEnd] = useState(false)
  const sadGaanaRef = useRef(null)
  const scratchSoundRef = useRef(null)

  // Initialize Audio Context
  const getAudioContext = () => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioContextRef.current
  }

  // Sound Effects Generator using Web Audio API
  const playSound = (type) => {
    if (!soundEnabled) return

    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      switch(type) {
        case 'siren':
          // War hooter/siren sound
          oscillator.type = 'sawtooth'
          oscillator.frequency.setValueAtTime(400, ctx.currentTime)
          oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.5)
          oscillator.frequency.linearRampToValueAtTime(400, ctx.currentTime + 1)
          oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 1.5)
          oscillator.frequency.linearRampToValueAtTime(400, ctx.currentTime + 2)
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
          gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 2)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 2)
          break

        case 'click':
          // Button click sound
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(800, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1)
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.1)
          break

        case 'celebration':
          // Celebration fanfare
          const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.type = 'triangle'
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15)
            gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.3)
            osc.start(ctx.currentTime + i * 0.15)
            osc.stop(ctx.currentTime + i * 0.15 + 0.3)
          })
          return // Don't use the main oscillator

        case 'escape':
          // Funny escape/boing sound
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(200, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1)
          oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2)
          gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.2)
          break

        case 'success':
          // Success ding
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(880, ctx.currentTime)
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.5)
          break

        case 'error':
          // Error buzz
          oscillator.type = 'square'
          oscillator.frequency.setValueAtTime(150, ctx.currentTime)
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.2)
          break

        case 'whoosh':
          // Menu transition whoosh
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(100, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.15)
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.15)
          break

        case 'wrongBuzzer':
          // Absurd wrong answer sound - descending wah-wah
          oscillator.type = 'sawtooth'
          oscillator.frequency.setValueAtTime(500, ctx.currentTime)
          oscillator.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.6)
          gainNode.gain.setValueAtTime(0.35, ctx.currentTime)
          gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.6)
          // Second sad trombone note
          setTimeout(() => {
            if (!soundEnabled) return
            try {
              const osc2 = ctx.createOscillator()
              const gain2 = ctx.createGain()
              osc2.connect(gain2)
              gain2.connect(ctx.destination)
              osc2.type = 'sawtooth'
              osc2.frequency.setValueAtTime(400, ctx.currentTime)
              osc2.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.8)
              gain2.gain.setValueAtTime(0.3, ctx.currentTime)
              gain2.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
              osc2.start(ctx.currentTime)
              osc2.stop(ctx.currentTime + 0.8)
            } catch(e) {}
          }, 500)
          break

        case 'quizWin':
          // Triumphant fanfare for winning the quiz
          const winNotes = [523, 659, 784, 880, 1047, 1319, 1568] // C5 to G6
          winNotes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.type = 'triangle'
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12)
            gain.gain.setValueAtTime(0.35, ctx.currentTime + i * 0.12)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.4)
            osc.start(ctx.currentTime + i * 0.12)
            osc.stop(ctx.currentTime + i * 0.12 + 0.4)
          })
          return // Don't use the main oscillator

        case 'heartbeat':
          // Heartbeat thump
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(60, ctx.currentTime)
          gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.15)
          // Second beat
          setTimeout(() => {
            if (!soundEnabled) return
            const osc2 = ctx.createOscillator()
            const gain2 = ctx.createGain()
            osc2.connect(gain2)
            gain2.connect(ctx.destination)
            osc2.type = 'sine'
            osc2.frequency.setValueAtTime(50, ctx.currentTime)
            gain2.gain.setValueAtTime(0.4, ctx.currentTime)
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
            osc2.start(ctx.currentTime)
            osc2.stop(ctx.currentTime + 0.1)
          }, 200)
          break

        default:
          return
      }
    } catch (e) {
      console.log('Audio error:', e)
    }
  }

  // Enable sound on first user interaction
  const enableSound = () => {
    if (soundEnabled) return
    setSoundEnabled(true)
  }

  // Activate sound with hooter - called when user clicks the overlay
  const activateSoundWithHooter = () => {
    setShowSoundOverlay(false)
    setSoundEnabled(true)

    // Initialize audio context
    const ctx = getAudioContext()
    if (!ctx) return

    // Resume audio context (required by browsers)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    // Play war hooter/siren sound immediately
    if (activeDay === 'rose' && !sirenPlayed) {
      setSirenPlayed(true)

      // Create a more dramatic war siren
      const playWarSiren = () => {
        try {
          // First siren wave
          const osc1 = ctx.createOscillator()
          const gain1 = ctx.createGain()
          osc1.connect(gain1)
          gain1.connect(ctx.destination)
          osc1.type = 'sawtooth'
          osc1.frequency.setValueAtTime(200, ctx.currentTime)
          osc1.frequency.linearRampToValueAtTime(600, ctx.currentTime + 1)
          osc1.frequency.linearRampToValueAtTime(200, ctx.currentTime + 2)
          osc1.frequency.linearRampToValueAtTime(600, ctx.currentTime + 3)
          osc1.frequency.linearRampToValueAtTime(200, ctx.currentTime + 4)
          gain1.gain.setValueAtTime(0.4, ctx.currentTime)
          gain1.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2)
          gain1.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 3)
          gain1.gain.linearRampToValueAtTime(0, ctx.currentTime + 4)
          osc1.start(ctx.currentTime)
          osc1.stop(ctx.currentTime + 4)

          // Add a second oscillator for richer sound
          const osc2 = ctx.createOscillator()
          const gain2 = ctx.createGain()
          osc2.connect(gain2)
          gain2.connect(ctx.destination)
          osc2.type = 'square'
          osc2.frequency.setValueAtTime(150, ctx.currentTime)
          osc2.frequency.linearRampToValueAtTime(450, ctx.currentTime + 1)
          osc2.frequency.linearRampToValueAtTime(150, ctx.currentTime + 2)
          osc2.frequency.linearRampToValueAtTime(450, ctx.currentTime + 3)
          osc2.frequency.linearRampToValueAtTime(150, ctx.currentTime + 4)
          gain2.gain.setValueAtTime(0.2, ctx.currentTime)
          gain2.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2)
          gain2.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 3)
          gain2.gain.linearRampToValueAtTime(0, ctx.currentTime + 4)
          osc2.start(ctx.currentTime)
          osc2.stop(ctx.currentTime + 4)

          console.log('🚨 WAR HOOTER ACTIVATED!')
        } catch (e) {
          console.log('Siren error:', e)
        }
      }

      playWarSiren()
    }

    logInteraction('sound_enabled', { method: 'overlay_click' })
  }

  // Get comprehensive device and browser information
  const getDeviceInfo = () => {
    if (typeof window === 'undefined') return {}

    const nav = navigator
    const screen = window.screen

    return {
      // Browser Info
      userAgent: nav.userAgent,
      platform: nav.platform,
      language: nav.language,
      languages: nav.languages ? nav.languages.join(', ') : nav.language,
      cookiesEnabled: nav.cookieEnabled,
      doNotTrack: nav.doNotTrack,
      online: nav.onLine,

      // Screen Info
      screenWidth: screen.width,
      screenHeight: screen.height,
      screenAvailWidth: screen.availWidth,
      screenAvailHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,

      // Window Info
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,

      // Device Memory (if available)
      deviceMemory: nav.deviceMemory || 'unknown',

      // CPU Cores (if available)
      hardwareConcurrency: nav.hardwareConcurrency || 'unknown',

      // Connection Info (if available)
      connectionType: nav.connection ? nav.connection.effectiveType : 'unknown',
      connectionDownlink: nav.connection ? nav.connection.downlink : 'unknown',

      // Touch Support
      touchSupport: 'ontouchstart' in window || nav.maxTouchPoints > 0,
      maxTouchPoints: nav.maxTouchPoints || 0,

      // Timezone
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),

      // Date/Time
      localTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),

      // Referrer
      referrer: document.referrer || 'direct',

      // Page URL
      currentURL: window.location.href,

      // Battery (async, will be added separately)
      // Geolocation (requires permission)
    }
  }

  // Get IP address and location from free API
  const getIPInfo = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      if (response.ok) {
        const data = await response.json()
        return {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          countryCode: data.country_code,
          postal: data.postal,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
          isp: data.org,
          asn: data.asn
        }
      }
    } catch (e) {
      console.log('IP fetch error:', e)
    }
    return { ip: 'unavailable' }
  }

  // Get battery info (async)
  const getBatteryInfo = async () => {
    try {
      if (navigator.getBattery) {
        const battery = await navigator.getBattery()
        return {
          level: Math.round(battery.level * 100) + '%',
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        }
      }
    } catch (e) {
      console.log('Battery info unavailable')
    }
    return { level: 'unavailable' }
  }

  // Comprehensive logging function - captures ALL user interactions
  const logInteraction = (eventType, details) => {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const logEntry = {
      timestamp,
      eventType,
      details,
      id: Date.now()
    }

    // Add to state logs
    setInteractionLogs(prev => [...prev, logEntry])

    // Console log for debugging
    console.log(`📝 [${timestamp}] ${eventType}:`, details)

    // Store in localStorage for persistence
    try {
      const existingLogs = JSON.parse(localStorage.getItem('roseDayLogs') || '[]')
      existingLogs.push(logEntry)
      localStorage.setItem('roseDayLogs', JSON.stringify(existingLogs))
    } catch (e) {
      console.log('LocalStorage not available')
    }
  }

  // Send WhatsApp update
  const sendWhatsAppUpdate = (message) => {
    const encodedMessage = encodeURIComponent(message)
    // Open in new tab for updates
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
  }

  // Send silent update (background notification concept - will use WhatsApp link)
  const sendUpdate = (updateType, data) => {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    let message = `🌹 ROSE DAY UPDATE 🌹\n⏰ ${timestamp}\n\n`

    switch(updateType) {
      case 'wrong_name':
        message += `❌ Wrong Name Attempt:\n"${data}"\n\nHint given to user.`
        break
      case 'page_visit':
        message += `👀 Someone visited the website!`
        break
      case 'yes_clicked':
        message += `💕 SHE CLICKED YES! Valentine accepted! 🎉`
        break
      case 'form_submit':
        message += `🎁 FORM SUBMITTED!\n\n👸 Name: ${data.name}\n📍 Address: ${data.address}\n\nReady for surprise delivery! 🚚🌹`
        break
      case 'name_input':
        message += `⌨️ Name Input:\n"${data.value}"\nValid: ${data.isValid}`
        break
      case 'address_input':
        message += `📍 Address Input:\n"${data}"`
        break
      case 'no_button_hover':
        message += `🏃 No Button Escape Attempt #${data}`
        break
    }

    // For critical updates, open WhatsApp
    if (updateType === 'form_submit' || updateType === 'yes_clicked') {
      sendWhatsAppUpdate(message)
    }

    // Log all updates to console
    console.log('Update:', message)

    // Also add to interaction logs
    logInteraction(updateType, data)
  }

  // Name validation with hints
  const validateName = (name) => {
    const lowerName = name.toLowerCase().trim()
    setQueenName(name)

    // Log EVERY name input keystroke
    logInteraction('name_input', { value: name, isValid: lowerName === 'queen' })

    if (lowerName === 'queen') {
      setNameHint("👸 Yes! You ARE my Queen! 💕")
      setNameValid(true)
      setShowKBCMeme(true)
      playSound('success')
      playSound('celebration')
      logInteraction('name_correct', { finalValue: name })

      // Hide meme after 5 seconds
      setTimeout(() => setShowKBCMeme(false), 5000)
      return
    }

    setNameValid(false)

    if (name.length === 0) {
      setNameHint("")
      return
    }

    // Track wrong attempts
    if (name.length >= 3 && lowerName !== 'queen'.substring(0, lowerName.length)) {
      setWrongAttempts(prev => [...prev, name])
      logInteraction('wrong_name_attempt', { value: name, attemptNumber: wrongAttempts.length + 1 })
      // Send update for wrong attempts (every 3rd attempt to avoid spam)
      if (wrongAttempts.length > 0 && wrongAttempts.length % 3 === 0) {
        sendUpdate('wrong_name', name)
      }
    }

    // Give progressive hints
    if (lowerName.startsWith('q')) {
      if (lowerName === 'q') {
        setNameHint("🔥 Good start! Q for... what? Keep typing!")
      } else if (lowerName.startsWith('qu')) {
        if (lowerName === 'qu') {
          setNameHint("🔥🔥 Getting warmer! Qu... something royal!")
        } else if (lowerName.startsWith('que')) {
          if (lowerName === 'que') {
            setNameHint("🔥🔥🔥 Almost there! Que... you're royalty!")
          } else if (lowerName.startsWith('quee')) {
            if (lowerName === 'quee') {
              setNameHint("🔥🔥🔥🔥 SO CLOSE! One more letter!")
            }
          }
        }
      }
    } else {
      // Wrong direction hints
      const hints = [
        "❌ Hmm... think royalty! 👑",
        "❌ Nope! What do you call a female ruler? 👸",
        "❌ Hint: Starts with 'Q'! 🔤",
        "❌ Tu meri _____ hai! (Royal wali!) 👑",
        "❌ Drag Queen... Chess Queen... MY ____? 💕",
        "❌ Rhymes with 'seen'! 👀",
        "❌ 5 letters, starts with Q, ends with N! 🎯",
        "❌ Q-U-E-E-? Complete karo! 📝"
      ]
      setNameHint(hints[Math.floor(Math.random() * hints.length)])
    }
  }

  // Handle address input with logging
  const handleAddressChange = (value) => {
    setQueenAddress(value)
    // Log address input (debounced by checking length changes)
    if (value.length % 10 === 0 || value.length === 1) {
      logInteraction('address_input', { value: value, length: value.length })
    }
  }

  // Handle form submission
  const handleGiftFormSubmit = () => {
    logInteraction('form_submit_attempt', { name: queenName, addressLength: queenAddress.length })

    if (!nameValid || queenAddress.trim().length < 10) {
      if (!nameValid) {
        setNameHint("❌ Pehle sahi naam daal! Hint: Tu meri _____ hai! 👑")
        logInteraction('form_submit_failed', { reason: 'invalid_name' })
      } else {
        logInteraction('form_submit_failed', { reason: 'address_too_short' })
      }
      return
    }

    setFormSubmitted(true)
    triggerConfetti()

    // Play success sounds
    playSound('success')
    setTimeout(() => playSound('celebration'), 300)

    // Log successful submission
    logInteraction('form_submit_success', { name: queenName, address: queenAddress })

    // Send WhatsApp update with details
    sendUpdate('form_submit', { name: queenName, address: queenAddress })

    // Extra celebration
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createHeart(), i * 100)
    }

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200, 100, 400])
    }
  }

  // Track Yes click
  const handleYesClickWithUpdate = () => {
    logInteraction('yes_button_clicked', { timestamp: new Date().toISOString() })
    setYesClicked(true)
    triggerConfetti()
    sendUpdate('yes_clicked', null)

    // Play celebration sound
    playSound('celebration')
    // Play heartbeat after celebration
    setTimeout(() => playSound('heartbeat'), 800)

    for (let i = 0; i < 50; i++) {
      setTimeout(() => createHeart(), i * 100)
    }

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 400])
    }
  }

  // Log page visit on mount with comprehensive device info
  useEffect(() => {
    const captureVisitorInfo = async () => {
      // Get basic device info immediately
      const deviceInfo = getDeviceInfo()

      // Log basic visit first
      logInteraction('page_visit', deviceInfo)

      // Then fetch IP info asynchronously
      const ipInfo = await getIPInfo()
      const batteryInfo = await getBatteryInfo()

      // Combine all info
      const fullVisitorInfo = {
        ...deviceInfo,
        ...ipInfo,
        battery: batteryInfo,
        visitTime: new Date().toISOString()
      }

      // Log complete info
      logInteraction('visitor_details', fullVisitorInfo)
      console.log('📱 Complete Visitor Info:', fullVisitorInfo)

      // Store complete info separately for easy access
      try {
        localStorage.setItem('lastVisitorInfo', JSON.stringify(fullVisitorInfo))
      } catch (e) {
        // Silent fail
      }

      // Send WhatsApp notification with visitor details
      const visitorMessage = `🌹 NEW VISITOR ALERT! 🌹
⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

📍 LOCATION:
• IP: ${ipInfo.ip || 'unknown'}
• City: ${ipInfo.city || 'unknown'}
• Region: ${ipInfo.region || 'unknown'}
• Country: ${ipInfo.country || 'unknown'}
• ISP: ${ipInfo.isp || 'unknown'}

📱 DEVICE:
• Platform: ${deviceInfo.platform}
• Screen: ${deviceInfo.screenWidth}x${deviceInfo.screenHeight}
• Window: ${deviceInfo.windowWidth}x${deviceInfo.windowHeight}
• Touch: ${deviceInfo.touchSupport ? 'Yes' : 'No'}
• Battery: ${batteryInfo.level}

🌐 BROWSER:
• Language: ${deviceInfo.language}
• Timezone: ${deviceInfo.timezone}
• Online: ${deviceInfo.online ? 'Yes' : 'No'}
• Referrer: ${deviceInfo.referrer}

🔧 HARDWARE:
• Memory: ${deviceInfo.deviceMemory}GB
• CPU Cores: ${deviceInfo.hardwareConcurrency}
• Connection: ${deviceInfo.connectionType}

📝 User Agent:
${deviceInfo.userAgent}`

      // Auto-send visitor notification (only on first visit)
      const hasVisited = localStorage.getItem('hasVisitedBefore')
      if (!hasVisited) {
        localStorage.setItem('hasVisitedBefore', 'true')
        // Uncomment below to auto-send WhatsApp on first visit
        // sendWhatsAppUpdate(visitorMessage)
      }

      // Always log to console
      console.log('📩 Visitor notification ready:', visitorMessage)
    }

    captureVisitorInfo()

    // Log all previous interactions from localStorage
    try {
      const existingLogs = JSON.parse(localStorage.getItem('roseDayLogs') || '[]')
      if (existingLogs.length > 0) {
        console.log('📊 Previous interaction logs:', existingLogs)
      }
    } catch (e) {
      // Silent fail
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
      setShowScrollIndicator(scrollTop < 200)

      // Create hearts when scrolling past 80%
      if (progress > 80) {
        createHeart()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Heart creation interval for final section
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollProgress > 80) {
        createHeart()
      }
    }, 500)
    return () => clearInterval(interval)
  }, [scrollProgress])

  const createHeart = () => {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '🌹', '✨']
    const newHeart = {
      id: Date.now() + Math.random(),
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      left: Math.random() * 100,
      duration: 3 + Math.random() * 2
    }
    setHearts(prev => [...prev.slice(-20), newHeart])
  }

  const triggerConfetti = () => {
    const colors = ['#ff4444', '#ffd700', '#00ff88', '#ff69b4', '#4a90d9', '#ff6b6b']
    const newConfetti = []

    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: i * 30,
        duration: 2 + Math.random() * 2
      })
    }
    setConfetti(newConfetti)

    // Create extra hearts
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createHeart(), i * 50)
    }

    // Clear confetti after animation
    setTimeout(() => setConfetti([]), 5000)
  }

  // ===== TEDDY DAY - WHACK-A-BEAR GAME CONFIG & LOGIC =====

  const wabBearTypes = {
    normal: { emoji: '🧸', points: 10, duration: 1800, name: 'Teddy', color: '#a1887f' },
    brown: { emoji: '🐻', points: 20, duration: 1300, name: 'Bhalu', color: '#795548' },
    panda: { emoji: '🐼', points: 30, duration: 1000, name: 'Panda Ji', color: '#424242' },
    golden: { emoji: '✨', points: 50, duration: 650, name: 'Golden Teddy', color: '#ffd700' },
    bomb: { emoji: '💣', points: -30, duration: 1600, name: 'BOMB', color: '#f44336', isBomb: true },
    love: { emoji: '💝', points: 0, duration: 1100, name: 'Love Bear', color: '#e91e63', isLife: true },
    boss: { emoji: '👑', points: 0, duration: 4000, name: 'Boss Bear', color: '#ff6f00', isHard: true },
  }

  const wabLevels = [
    {
      level: 1, name: 'Teddy Training',
      time: 30, spawnRate: 1600, maxBears: 2,
      bearPool: ['normal', 'normal', 'normal', 'normal'],
      targetScore: 60,
      intro: 'Welcome to Teddy Training!',
      introSub: 'In pyaare bears ko tap karo... pyaar se! 😅',
      bg: 'linear-gradient(135deg, #5d4037 0%, #795548 50%, #8d6e63 100%)'
    },
    {
      level: 2, name: 'Bear Bazaar',
      time: 30, spawnRate: 1300, maxBears: 2,
      bearPool: ['normal', 'normal', 'brown', 'brown', 'panda', 'bomb'],
      targetScore: 150,
      intro: 'Ab aaye variety mein bears!',
      introSub: 'Bombs se bachna... warna BOOM! 💥',
      bg: 'linear-gradient(135deg, #4e342e 0%, #6d4c41 50%, #8d6e63 100%)'
    },
    {
      level: 3, name: 'Fluffy Fury',
      time: 28, spawnRate: 1100, maxBears: 3,
      bearPool: ['normal', 'brown', 'brown', 'panda', 'panda', 'golden', 'bomb', 'bomb', 'love'],
      targetScore: 300,
      intro: 'Fluffy Fury mode ON!',
      introSub: 'Golden bears = jackpot! 💝 = extra life!',
      bg: 'linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #795548 100%)'
    },
    {
      level: 4, name: 'Bear-mageddon',
      time: 25, spawnRate: 900, maxBears: 4,
      bearPool: ['brown', 'panda', 'panda', 'golden', 'golden', 'bomb', 'bomb', 'bomb', 'love'],
      targetScore: 500,
      intro: 'BEAR-MAGEDDON! 🌪️',
      introSub: 'Ye bears tumse zyada fast hain... ya nahi? 😏',
      bg: 'linear-gradient(135deg, #1b0000 0%, #4e342e 50%, #6d4c41 100%)'
    },
    {
      level: 5, name: 'Boss Bear Showdown',
      time: 35, spawnRate: 1000, maxBears: 3,
      bearPool: ['panda', 'golden', 'bomb', 'love'],
      targetScore: 700,
      hasBoss: true,
      intro: 'FINAL BOSS FIGHT! 👑🐻',
      introSub: 'Boss Bear ko 10 baar maaro! Baaki bears se points lo!',
      bg: 'linear-gradient(135deg, #0d0000 0%, #3e2723 50%, #4e342e 100%)'
    }
  ]

  const wabWhackMsgs = [
    "Ouch! 😭", "Kyu maara?!", "Meri teddy! 😢",
    "Why you bully me?! 😤", "I was just saying hi!",
    "Arey arey! 🥴", "*bonk* 🤕",
    "Teddy abuse hotline: 1800-FLUFFY 📞",
    "Main toh pyaar dene aaya tha! 💔",
    "Tera haath bahut bhaari hai! 😵",
    "Bear lives matter! ✊🐻",
    "Mummy! Ye maarta hai! 😭",
  ]

  const wabMissMsgs = [
    "Haha missed! 😜", "Too slow! 🐌",
    "Catch me if you can! 🏃", "Nah nah nah! 😝",
    "I'm faster than your wifi! 📶",
    "Is that your best? 😏", "Better luck next time!",
    "Tera aim toh... 😂", "Aankh band karke maar! 🙈",
  ]

  const wabAppearMsgs = [
    "Peek-a-boo! 👀", "Miss me? 😏", "Can't touch this!",
    "I'm too fluffy!", "Main aa gaya! 🎉",
    "Teddy power! 💪", "Pakad ke dikha! 🐻",
    "Boo! 👻", "Surprise! 🎁",
  ]

  const wabComboNames = {
    3: { msg: 'Triple Whack! 🔥', color: '#ff9800' },
    5: { msg: 'PENTA-BEAR! ⚡', color: '#ffeb3b' },
    7: { msg: 'BEAR SLAYER! 🗡️', color: '#4caf50' },
    10: { msg: 'TEDDY TERMINATOR! 🤖', color: '#2196f3' },
    15: { msg: 'GOD MODE! 👑', color: '#9c27b0' },
    20: { msg: 'UNBELIEVABLE! 🤯', color: '#f44336' },
  }

  const wabGameOverRoasts = [
    { max: 50, msg: "Bhai... teddy ne tujhe maara ya tune teddy ko? 😂", title: "Teddy's Revenge 🧸" },
    { max: 150, msg: "Thoda aur practice kar... teddy bhi sharma rahi hai 😅", title: "Beginner Bear 🐻" },
    { max: 300, msg: "Not bad! Par golden teddy ne tujhe miss kiya 🌟", title: "Bear Apprentice 🎓" },
    { max: 500, msg: "Solid performance! Bears tujhse darne lage hain! 💪", title: "Bear Hunter 🏹" },
    { max: 800, msg: "Kya baat hai! Teddy factory mein job lagwa doon? 🏭", title: "Bear Commander 🎖️" },
    { max: Infinity, msg: "LEGEND! Teddy universe ka naya champion! 👑", title: "Teddy GOD 🌟👑" },
  ]

  // Whack-a-Bear Sound Effects
  const playWabSound = (type) => {
    if (!soundEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      switch(type) {
        case 'whack':
          osc.type = 'square'
          osc.frequency.setValueAtTime(300, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12)
          gain.gain.setValueAtTime(0.4, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.12)
          break
        case 'miss':
          osc.type = 'sine'
          osc.frequency.setValueAtTime(600, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15)
          gain.gain.setValueAtTime(0.15, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.15)
          break
        case 'bomb':
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(100, ctx.currentTime)
          osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.4)
          gain.gain.setValueAtTime(0.5, ctx.currentTime)
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.4)
          // Second explosion rumble
          const osc2b = ctx.createOscillator()
          const gain2b = ctx.createGain()
          osc2b.connect(gain2b)
          gain2b.connect(ctx.destination)
          osc2b.type = 'square'
          osc2b.frequency.setValueAtTime(60, ctx.currentTime + 0.1)
          osc2b.frequency.linearRampToValueAtTime(20, ctx.currentTime + 0.5)
          gain2b.gain.setValueAtTime(0.3, ctx.currentTime + 0.1)
          gain2b.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
          osc2b.start(ctx.currentTime + 0.1)
          osc2b.stop(ctx.currentTime + 0.5)
          break
        case 'golden':
          // Sparkly bling sound
          const gNotes = [1047, 1319, 1568, 2093]
          gNotes.forEach((freq, i) => {
            const o = ctx.createOscillator()
            const g = ctx.createGain()
            o.connect(g)
            g.connect(ctx.destination)
            o.type = 'sine'
            o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)
            g.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.08)
            g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.2)
            o.start(ctx.currentTime + i * 0.08)
            o.stop(ctx.currentTime + i * 0.08 + 0.2)
          })
          return
        case 'powerup':
          osc.type = 'sine'
          osc.frequency.setValueAtTime(400, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.25)
          gain.gain.setValueAtTime(0.3, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.25)
          break
        case 'levelup':
          const luNotes = [523, 659, 784, 1047, 1319]
          luNotes.forEach((freq, i) => {
            const o = ctx.createOscillator()
            const g = ctx.createGain()
            o.connect(g)
            g.connect(ctx.destination)
            o.type = 'triangle'
            o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)
            g.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.1)
            g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.25)
            o.start(ctx.currentTime + i * 0.1)
            o.stop(ctx.currentTime + i * 0.1 + 0.25)
          })
          return
        case 'bosshit':
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(200, ctx.currentTime)
          osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.1)
          osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2)
          gain.gain.setValueAtTime(0.4, ctx.currentTime)
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.2)
          break
        case 'life':
          osc.type = 'sine'
          osc.frequency.setValueAtTime(660, ctx.currentTime)
          osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1)
          osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.2)
          gain.gain.setValueAtTime(0.3, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.3)
          break
        case 'gameover':
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(400, ctx.currentTime)
          osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.5)
          osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 1)
          gain.gain.setValueAtTime(0.35, ctx.currentTime)
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 1)
          break
        case 'combo':
          const cNotes = [784, 988, 1175]
          cNotes.forEach((freq, i) => {
            const o = ctx.createOscillator()
            const g = ctx.createGain()
            o.connect(g)
            g.connect(ctx.destination)
            o.type = 'square'
            o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06)
            g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.06)
            g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.06 + 0.12)
            o.start(ctx.currentTime + i * 0.06)
            o.stop(ctx.currentTime + i * 0.06 + 0.12)
          })
          return
        case 'freeze':
          osc.type = 'sine'
          osc.frequency.setValueAtTime(2000, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3)
          gain.gain.setValueAtTime(0.2, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.3)
          break
        default:
          return
      }
    } catch(e) {}
  }

  // Load high score from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wabHighScore')
      if (saved) setWabHighScore(parseInt(saved) || 0)
    }
  }, [])

  // ===== WHACK-A-BEAR MUSIC SYSTEM =====
  // Note frequencies (C4=262, D4=294, E4=330, F4=349, G4=392, A4=440, B4=494, C5=523 etc.)
  const wabMusicPatterns = {
    intro: {
      melody: [392, 440, 494, 523, 494, 440, 392, 330, 392, 440, 494, 523, 587, 523, 494, 523],
      bass:   [196, 196, 220, 220, 247, 247, 196, 196, 196, 196, 220, 220, 262, 262, 247, 247],
      drums:  [1,   0,   0.5, 0,   1,   0,   0.5, 0,   1,   0,   0.5, 0,   1,   0.5, 1,   0  ],
      tempo: 210,
      melodyType: 'triangle',
      bassType: 'sine',
      melodyVol: 0.09,
      bassVol: 0.07,
      drumVol: 0.06,
      noteLen: 0.75,
    },
    playing: {
      melody: [523, 494, 440, 494, 523, 587, 659, 587, 523, 494, 440, 392, 440, 494, 523, 587],
      bass:   [262, 262, 220, 220, 262, 262, 330, 330, 262, 262, 220, 220, 196, 196, 262, 262],
      drums:  [1,   0,   0.6, 0,   1,   0,   0.6, 0.3, 1,   0,   0.6, 0,   1,   0.6, 1,   0.3],
      tempo: 170,
      melodyType: 'square',
      bassType: 'triangle',
      melodyVol: 0.07,
      bassVol: 0.06,
      drumVol: 0.05,
      noteLen: 0.7,
    },
    playingFast: {
      melody: [587, 659, 698, 784, 698, 659, 587, 523, 587, 659, 784, 880, 784, 698, 659, 587],
      bass:   [294, 294, 330, 330, 349, 349, 294, 294, 262, 262, 330, 330, 392, 392, 330, 330],
      drums:  [1,   0.4, 0.7, 0.3, 1,   0.4, 0.7, 0.3, 1,   0.4, 0.7, 0.3, 1,   0.7, 1,   0.5],
      tempo: 145,
      melodyType: 'square',
      bassType: 'triangle',
      melodyVol: 0.07,
      bassVol: 0.06,
      drumVol: 0.06,
      noteLen: 0.65,
    },
    boss: {
      melody: [220, 262, 220, 196, 220, 262, 330, 262, 220, 196, 175, 196, 220, 262, 330, 349],
      bass:   [110, 110, 98,  98,  110, 110, 131, 131, 110, 110, 88,  88,  110, 110, 131, 131],
      drums:  [1,   0.5, 0.8, 0.5, 1,   0.5, 0.8, 0.5, 1,   0.5, 0.8, 0.5, 1,   0.8, 1,   0.8],
      tempo: 155,
      melodyType: 'sawtooth',
      bassType: 'square',
      melodyVol: 0.06,
      bassVol: 0.07,
      drumVol: 0.07,
      noteLen: 0.8,
    },
    victory: {
      melody: [523, 587, 659, 784, 880, 784, 880, 1047, 880, 784, 659, 784, 880, 1047, 1175, 1047],
      bass:   [262, 262, 330, 330, 392, 392, 440, 440,  392, 392, 330, 330, 392, 392,  523,  523 ],
      drums:  [1,   0,   0.5, 0,   1,   0,   0.5, 0,    1,   0.5, 1,   0,   1,   0.5,  1,    0.5],
      tempo: 190,
      melodyType: 'triangle',
      bassType: 'sine',
      melodyVol: 0.1,
      bassVol: 0.07,
      drumVol: 0.05,
      noteLen: 0.7,
    },
    gameover: {
      melody: [392, 370, 349, 330, 311, 294, 277, 262, 247, 233, 220, 208, 196, 185, 175, 165],
      bass:   [196, 185, 175, 165, 156, 147, 139, 131, 123, 117, 110, 104, 98,  93,  88,  82 ],
      drums:  [1,   0,   0,   0,   0.5, 0,   0,   0,   1,   0,   0,   0,   0.5, 0,   0,   0  ],
      tempo: 320,
      melodyType: 'sawtooth',
      bassType: 'triangle',
      melodyVol: 0.08,
      bassVol: 0.06,
      drumVol: 0.04,
      noteLen: 0.85,
    },
  }

  const stopWabMusic = () => {
    wabMusicActiveRef.current = false
    if (wabMusicIntervalRef.current) { clearInterval(wabMusicIntervalRef.current); wabMusicIntervalRef.current = null }
    if (wabMusicBassRef.current) { clearInterval(wabMusicBassRef.current); wabMusicBassRef.current = null }
    if (wabMusicDrumRef.current) { clearInterval(wabMusicDrumRef.current); wabMusicDrumRef.current = null }
  }

  const startWabMusic = (mood) => {
    stopWabMusic()
    if (!soundEnabled || !wabMusicOn) return
    const ctx = getAudioContext()
    if (!ctx) return
    const p = wabMusicPatterns[mood]
    if (!p) return

    wabMusicActiveRef.current = true
    let melodyIdx = 0
    let bassIdx = 0
    let drumIdx = 0

    // Melody loop
    wabMusicIntervalRef.current = setInterval(() => {
      if (!wabMusicActiveRef.current || !soundEnabled) { stopWabMusic(); return }
      try {
        const now = ctx.currentTime
        const dur = (p.tempo / 1000) * p.noteLen
        const freq = p.melody[melodyIdx % p.melody.length]

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = p.melodyType
        osc.frequency.setValueAtTime(freq, now)
        // Slight vibrato for character
        osc.frequency.setValueAtTime(freq, now)
        osc.frequency.linearRampToValueAtTime(freq * 1.003, now + dur * 0.5)
        osc.frequency.linearRampToValueAtTime(freq, now + dur)
        gain.gain.setValueAtTime(p.melodyVol, now)
        gain.gain.setValueAtTime(p.melodyVol * 0.9, now + dur * 0.6)
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur)
        osc.start(now)
        osc.stop(now + dur + 0.01)

        melodyIdx++
      } catch(e) {}
    }, p.tempo)

    // Bass loop (offset by half a beat for groove)
    setTimeout(() => {
      if (!wabMusicActiveRef.current) return
      wabMusicBassRef.current = setInterval(() => {
        if (!wabMusicActiveRef.current || !soundEnabled) return
        try {
          const now = ctx.currentTime
          const dur = (p.tempo / 1000) * p.noteLen * 1.1
          const freq = p.bass[bassIdx % p.bass.length]

          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.type = p.bassType
          osc.frequency.setValueAtTime(freq, now)
          gain.gain.setValueAtTime(p.bassVol, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + dur)
          osc.start(now)
          osc.stop(now + dur + 0.01)

          bassIdx++
        } catch(e) {}
      }, p.tempo)
    }, p.tempo * 0.5)

    // Drum/percussion loop (noise-based kick and hihat)
    let drumBeatIdx = 0
    wabMusicDrumRef.current = setInterval(() => {
      if (!wabMusicActiveRef.current || !soundEnabled) return
      try {
        const now = ctx.currentTime
        const hitStrength = p.drums[drumBeatIdx % p.drums.length]
        if (hitStrength <= 0) { drumBeatIdx++; return }

        const dur = 0.08

        // Kick: low frequency burst
        if (hitStrength >= 0.8) {
          const kickOsc = ctx.createOscillator()
          const kickGain = ctx.createGain()
          kickOsc.connect(kickGain)
          kickGain.connect(ctx.destination)
          kickOsc.type = 'sine'
          kickOsc.frequency.setValueAtTime(150, now)
          kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.08)
          kickGain.gain.setValueAtTime(p.drumVol * hitStrength, now)
          kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
          kickOsc.start(now)
          kickOsc.stop(now + 0.1)
        }

        // Hihat: high frequency noise-like
        if (hitStrength > 0 && hitStrength < 1) {
          const hhOsc = ctx.createOscillator()
          const hhGain = ctx.createGain()
          hhOsc.connect(hhGain)
          hhGain.connect(ctx.destination)
          hhOsc.type = 'square'
          hhOsc.frequency.setValueAtTime(800 + Math.random() * 400, now)
          hhGain.gain.setValueAtTime(p.drumVol * hitStrength * 0.3, now)
          hhGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
          hhOsc.start(now)
          hhOsc.stop(now + 0.05)
        }

        drumBeatIdx++
      } catch(e) {}
    }, p.tempo * 0.5)
  }

  // Sync music with game state
  useEffect(() => {
    if (activeDay !== 'teddy') { stopWabMusic(); return }
    if (!wabMusicOn || !soundEnabled) { stopWabMusic(); return }

    switch (wabState) {
      case 'intro':
        startWabMusic('intro')
        break
      case 'levelIntro':
        stopWabMusic()
        break
      case 'playing':
        if (wabLevel === 5) startWabMusic('boss')
        else if (wabLevel >= 3) startWabMusic('playingFast')
        else startWabMusic('playing')
        break
      case 'levelComplete':
        stopWabMusic()
        break
      case 'gameOver':
        startWabMusic('gameover')
        break
      case 'victory':
        startWabMusic('victory')
        break
      default:
        stopWabMusic()
    }

    return () => stopWabMusic()
  }, [wabState, wabLevel, activeDay, wabMusicOn, soundEnabled])

  // Clean up game intervals on unmount or day change
  useEffect(() => {
    return () => {
      wabActiveRef.current = false
      stopWabMusic()
      if (wabTimerRef.current) clearInterval(wabTimerRef.current)
      if (wabSpawnRef.current) clearInterval(wabSpawnRef.current)
    }
  }, [activeDay])

  const stopWabIntervals = () => {
    if (wabTimerRef.current) { clearInterval(wabTimerRef.current); wabTimerRef.current = null }
    if (wabSpawnRef.current) { clearInterval(wabSpawnRef.current); wabSpawnRef.current = null }
  }

  const startWabGame = () => {
    setWabScore(0)
    setWabLives(3)
    setWabCombo(0)
    setWabMaxCombo(0)
    setWabStats({ whacks: 0, misses: 0 })
    setWabBossHP(0)
    setWabPowerUp(null)
    setWabFrozen(false)
    setWabDouble(false)
    setWabMessage('')
    setWabComboMsg('')
    wabLivesRef.current = 3
    wabComboRef.current = 0
    wabFrozenRef.current = false
    setWabLevel(1)
    setWabState('levelIntro')
  }

  const beginWabLevel = (lvl) => {
    const config = wabLevels[lvl - 1]
    setWabHoles(Array(9).fill(null))
    setWabWhacked(Array(9).fill(false))
    wabHolesRef.current = Array(9).fill(null)
    setWabTimer(config.time)
    setWabMessage('')
    setWabComboMsg('')
    setWabPowerUp(null)
    setWabFrozen(false)
    setWabDouble(false)
    wabFrozenRef.current = false
    wabActiveRef.current = true

    if (config.hasBoss) {
      setWabBossHP(10)
      setWabBossMaxHP(10)
    }

    setWabState('playing')

    // Timer countdown
    let timeLeft = config.time
    wabTimerRef.current = setInterval(() => {
      if (!wabActiveRef.current) return
      timeLeft--
      setWabTimer(timeLeft)
      if (timeLeft <= 0) {
        stopWabIntervals()
        wabActiveRef.current = false
        // Check if boss level and boss not defeated
        if (config.hasBoss) {
          // Boss level: you need to defeat boss
          handleWabLevelEnd(lvl, true)
        } else {
          handleWabLevelEnd(lvl, false)
        }
      }
    }, 1000)

    // Bear spawning
    wabSpawnRef.current = setInterval(() => {
      if (!wabActiveRef.current) return
      if (wabFrozenRef.current) return

      const currentHoles = wabHolesRef.current
      const emptyIndices = []
      for (let i = 0; i < 9; i++) {
        if (!currentHoles[i]) emptyIndices.push(i)
      }
      if (emptyIndices.length === 0) return

      const activeCount = currentHoles.filter(h => h !== null).length
      if (activeCount >= config.maxBears) return

      const holeIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]

      // Decide bear type
      let bearTypeKey = config.bearPool[Math.floor(Math.random() * config.bearPool.length)]

      // Boss level: spawn boss bear in center hole sometimes
      if (config.hasBoss && Math.random() < 0.15 && !currentHoles[4]) {
        bearTypeKey = 'boss'
      }

      const bearInfo = wabBearTypes[bearTypeKey]
      const bearId = Date.now() + Math.random()
      const appearMsg = wabAppearMsgs[Math.floor(Math.random() * wabAppearMsgs.length)]
      const targetHole = (bearTypeKey === 'boss' && !currentHoles[4]) ? 4 : holeIdx

      const newBear = {
        ...bearInfo,
        type: bearTypeKey,
        id: bearId,
        msg: appearMsg,
        hitsLeft: bearTypeKey === 'boss' ? 3 : 1,
      }

      const updatedHoles = [...currentHoles]
      updatedHoles[targetHole] = newBear
      wabHolesRef.current = updatedHoles
      setWabHoles([...updatedHoles])

      // Auto-hide bear after duration
      const hideDuration = bearInfo.duration * (lvl <= 2 ? 1 : 0.85)
      setTimeout(() => {
        const h = wabHolesRef.current
        if (h[targetHole] && h[targetHole].id === bearId) {
          const hideHoles = [...h]
          hideHoles[targetHole] = null
          wabHolesRef.current = hideHoles
          setWabHoles([...hideHoles])

          // Bear escaped = miss (only for non-bomb bears)
          if (!bearInfo.isBomb) {
            wabComboRef.current = 0
            setWabCombo(0)
            setWabStats(prev => ({ ...prev, misses: prev.misses + 1 }))
            const missMsg = wabMissMsgs[Math.floor(Math.random() * wabMissMsgs.length)]
            setWabMessage(missMsg)
            setTimeout(() => setWabMessage(''), 1200)
          }
        }
      }, hideDuration)

    }, config.spawnRate)
  }

  const handleWabLevelEnd = (lvl, isBossLevel) => {
    setWabHoles(Array(9).fill(null))
    wabHolesRef.current = Array(9).fill(null)
    setWabWhacked(Array(9).fill(false))

    if (isBossLevel) {
      // Boss not defeated in time
      setWabState('gameOver')
      playWabSound('gameover')
      setWabMessage('Boss Bear jeet gaya! 👑🐻')
      saveWabHighScore()
      return
    }

    if (wabLivesRef.current <= 0) {
      setWabState('gameOver')
      playWabSound('gameover')
      saveWabHighScore()
      return
    }

    if (lvl >= 5) {
      setWabState('victory')
      playWabSound('levelup')
      triggerConfetti()
      saveWabHighScore()
      return
    }

    // Next level
    playWabSound('levelup')
    setWabLevel(lvl + 1)
    setWabState('levelComplete')
  }

  const saveWabHighScore = () => {
    setWabScore(prev => {
      if (prev > wabHighScore) {
        setWabHighScore(prev)
        if (typeof window !== 'undefined') {
          localStorage.setItem('wabHighScore', prev.toString())
        }
      }
      return prev
    })
  }

  const whackBear = (holeIdx) => {
    const bear = wabHolesRef.current[holeIdx]
    if (!bear) {
      // Missed - tapped empty hole
      playWabSound('miss')
      return
    }

    // Bomb bear
    if (bear.isBomb) {
      playWabSound('bomb')
      setWabShake(true)
      setTimeout(() => setWabShake(false), 500)

      // Clear this hole
      const h = [...wabHolesRef.current]
      h[holeIdx] = null
      wabHolesRef.current = h
      setWabHoles([...h])
      setWabWhacked(prev => { const w = [...prev]; w[holeIdx] = true; setTimeout(() => setWabWhacked(p => { const x = [...p]; x[holeIdx] = false; return x }), 300); return w })

      // Lose life and points
      wabLivesRef.current = Math.max(0, wabLivesRef.current - 1)
      setWabLives(wabLivesRef.current)
      setWabScore(prev => Math.max(0, prev + bear.points))
      wabComboRef.current = 0
      setWabCombo(0)
      setWabMessage('BOOM! 💥 -1 Life!')

      if (wabLivesRef.current <= 0) {
        stopWabIntervals()
        wabActiveRef.current = false
        setTimeout(() => {
          setWabState('gameOver')
          playWabSound('gameover')
          saveWabHighScore()
        }, 500)
      }
      setTimeout(() => setWabMessage(''), 1500)
      return
    }

    // Love bear - extra life
    if (bear.isLife) {
      playWabSound('life')
      wabLivesRef.current = Math.min(5, wabLivesRef.current + 1)
      setWabLives(wabLivesRef.current)
      setWabMessage('+1 Life! 💝')
      const h = [...wabHolesRef.current]
      h[holeIdx] = null
      wabHolesRef.current = h
      setWabHoles([...h])
      setWabWhacked(prev => { const w = [...prev]; w[holeIdx] = true; setTimeout(() => setWabWhacked(p => { const x = [...p]; x[holeIdx] = false; return x }), 300); return w })
      setWabStats(prev => ({ ...prev, whacks: prev.whacks + 1 }))
      setTimeout(() => setWabMessage(''), 1200)
      return
    }

    // Boss bear - needs multiple hits
    if (bear.isHard) {
      const newHitsLeft = bear.hitsLeft - 1
      playWabSound('bosshit')
      setWabWhacked(prev => { const w = [...prev]; w[holeIdx] = true; setTimeout(() => setWabWhacked(p => { const x = [...p]; x[holeIdx] = false; return x }), 200); return w })

      if (newHitsLeft <= 0) {
        // Boss hit defeated for this pop-up
        const h = [...wabHolesRef.current]
        h[holeIdx] = null
        wabHolesRef.current = h
        setWabHoles([...h])
        setWabScore(prev => prev + 100)
        setWabBossHP(prev => {
          const newHP = prev - 1
          if (newHP <= 0) {
            // Boss defeated!
            stopWabIntervals()
            wabActiveRef.current = false
            setTimeout(() => {
              setWabState('victory')
              playWabSound('levelup')
              triggerConfetti()
              saveWabHighScore()
            }, 500)
          }
          return Math.max(0, newHP)
        })
        setWabMessage('Boss hit! -1 HP! 💥')
      } else {
        // Boss still alive this popup
        const h = [...wabHolesRef.current]
        h[holeIdx] = { ...bear, hitsLeft: newHitsLeft }
        wabHolesRef.current = h
        setWabHoles([...h])
        setWabMessage(`Boss: ${newHitsLeft} hits left! 👑`)
      }
      setWabStats(prev => ({ ...prev, whacks: prev.whacks + 1 }))
      setTimeout(() => setWabMessage(''), 1200)
      return
    }

    // Normal bears (normal, brown, panda, golden)
    if (bear.type === 'golden') {
      playWabSound('golden')
    } else {
      playWabSound('whack')
    }

    // Clear hole + show whack animation
    const h = [...wabHolesRef.current]
    h[holeIdx] = null
    wabHolesRef.current = h
    setWabHoles([...h])
    setWabWhacked(prev => { const w = [...prev]; w[holeIdx] = true; setTimeout(() => setWabWhacked(p => { const x = [...p]; x[holeIdx] = false; return x }), 300); return w })

    // Points
    const multiplier = wabDouble ? 2 : 1
    const pts = bear.points * multiplier
    setWabScore(prev => prev + pts)

    // Combo
    wabComboRef.current += 1
    const newCombo = wabComboRef.current
    setWabCombo(newCombo)
    if (newCombo > wabMaxCombo) setWabMaxCombo(newCombo)

    // Check for combo milestone
    if (wabComboNames[newCombo]) {
      playWabSound('combo')
      setWabComboMsg(wabComboNames[newCombo].msg)
      setTimeout(() => setWabComboMsg(''), 1500)
    }

    // Bonus points for combos
    let comboBonus = 0
    if (newCombo >= 5) comboBonus = 5
    if (newCombo >= 10) comboBonus = 10
    if (newCombo >= 15) comboBonus = 20
    if (comboBonus > 0) setWabScore(prev => prev + comboBonus)

    // Random power-up drop (8% chance on whack, not in level 1)
    if (wabLevel > 1 && Math.random() < 0.08 && !wabPowerUp) {
      const powerups = ['freeze', 'double']
      const pu = powerups[Math.floor(Math.random() * powerups.length)]
      setWabPowerUp(pu)
      playWabSound('powerup')
    }

    // Funny whack message
    const whackMsg = wabWhackMsgs[Math.floor(Math.random() * wabWhackMsgs.length)]
    setWabMessage(`+${pts}! ${whackMsg}`)
    setWabStats(prev => ({ ...prev, whacks: prev.whacks + 1 }))
    setTimeout(() => setWabMessage(''), 1000)
  }

  const activateWabPowerUp = () => {
    if (!wabPowerUp) return

    if (wabPowerUp === 'freeze') {
      playWabSound('freeze')
      wabFrozenRef.current = true
      setWabFrozen(true)
      setWabMessage('FREEZE! Bears can\'t move! ❄️')
      setTimeout(() => {
        wabFrozenRef.current = false
        setWabFrozen(false)
        setWabMessage('')
      }, 3500)
    } else if (wabPowerUp === 'double') {
      playWabSound('powerup')
      setWabDouble(true)
      setWabMessage('DOUBLE POINTS! x2! 🔥')
      setTimeout(() => {
        setWabDouble(false)
        setWabMessage('')
      }, 6000)
    }
    setWabPowerUp(null)
  }

  const getWabRoast = (score) => {
    for (const r of wabGameOverRoasts) {
      if (score <= r.max) return r
    }
    return wabGameOverRoasts[wabGameOverRoasts.length - 1]
  }

  // ===== CHOCOLATE DAY QUIZ DATA & HANDLERS =====
  const chocoQuizQuestions = [
    {
      q: "Where did we first meet?",
      options: [
        "Your home",
        "My home",
        "Sadak pe",
        "Begani shaadi mein Abdullah deewana"
      ],
      answer: 3,
      wrongMsgs: [
        "Ghar pe? Itni jaldi ghar bula liya? Sharafat ka zamana nahi raha! 😂",
        "Mere ghar? Bhai mummy ne toh chai bhi nahi pilayi thi tujhe tab! 🫖",
        "Sadak pe? Ye kya roadside romeo ban raha hai! 😤🛣️"
      ]
    },
    {
      q: "What gift did you first receive from me?",
      options: [
        "10 rs ki Pepsi",
        "Rasgulla without chashni",
        "Variety of chocolates",
        "Teddy baddie"
      ],
      answer: 2,
      wrongMsgs: [
        "10 rs ki Pepsi?! Bhai inflation se pehle ka time yaad aa gaya! Budget lover! 💀",
        "Rasgulla WITHOUT chashni?! Wo toh torture gift hota... sukha rasgulla kaun deta hai! 😭",
        "Teddy baddie?! Ye kya Build-A-Bear workshop chal rahi hai kya?! 🧸💀"
      ]
    },
    {
      q: "Who is our fav singer out of these?",
      options: [
        "Karan Aujla",
        "KK",
        "Diljit",
        "Cheema Y"
      ],
      answer: 0,
      wrongMsgs: [
        "",
        "KK?! Bhai nostalgia trip pe mat le ja! Hum modern hai! 🎵😤",
        "Diljit?! Wo toh Dil-jeet liya Kylie ka... humara singer alag hai! 🤪",
        "Cheema Y?! Ye kaun hai? Google pe search karna padega! 🔍😂"
      ]
    },
    {
      q: "What's my fav song?",
      options: [
        "For A Reason",
        "No Love",
        "Jhol",
        "Pal Pal (yaad teri tadpave :))"
      ],
      answer: 0,
      wrongMsgs: [
        "",
        "No Love?! Are bhai No Love nahi... Full Love chal rahi hai idhar! 💔➡️❤️",
        "Jhol?! Relationship mein jhol hai kya? Seedha baat kar! 🫣",
        "Pal Pal yaad teri tadpave?! Itna dramatic mat ban filmy babu! 🎬😂"
      ]
    },
    {
      q: "Where was this video taken? 🎥",
      options: [
        "Chandigarh",
        "Munnar",
        "Kodaikanal",
        "Madurai"
      ],
      answer: 1,
      video: "/8E3E472E-384E-45D0-88CD-7B7D66698E30.mov",
      wrongMsgs: [
        "Chandigarh?! Bhai Chandigarh mein itni greenery? Sector 17 mein jungle nahi hota! 🏙️😂",
        "",
        "Kodaikanal?! Close but no cigar! Ye Kerala ki chai ki khushbu hai, Tamil Nadu ki nahi! ☕😤",
        "Madurai?! Temple city mein honeymoon? Bhai thoda romantic soch! 🛕💀"
      ]
    }
  ]

  const handleChocoAnswer = (optionIndex) => {
    if (chocoQuizAnswered) return
    setChocoQuizAnswered(true)

    const currentQ = chocoQuizQuestions[chocoQuizIndex]
    if (optionIndex === currentQ.answer) {
      setChocoQuizCorrect(true)
      setChocoQuizScore(prev => prev + 1)
      playSound('celebration')
      triggerConfetti()
    } else {
      setChocoQuizCorrect(false)
      setChocoWrongMsg(currentQ.wrongMsgs[optionIndex] || "Galat! Soch ke bata! 😜")
      playSound('wrongBuzzer')
    }
  }

  const handleChocoNext = () => {
    const nextIndex = chocoQuizIndex + 1
    if (nextIndex >= chocoQuizQuestions.length) {
      setChocoQuizDone(true)
      playSound('quizWin')
      triggerConfetti()
      setTimeout(() => triggerConfetti(), 1500)
    } else {
      setChocoSwipeDir('swipe-left')
      setTimeout(() => {
        setChocoQuizIndex(nextIndex)
        setChocoQuizAnswered(false)
        setChocoQuizCorrect(false)
        setChocoWrongMsg('')
        setChocoSwipeDir('swipe-right-enter')
        setTimeout(() => setChocoSwipeDir(''), 400)
      }, 300)
    }
  }

  const handleChocoTouchStart = (e) => {
    chocoTouchStartRef.current = e.touches[0].clientX
  }

  const handleChocoTouchEnd = (e) => {
    if (!chocoTouchStartRef.current) return
    const diff = chocoTouchStartRef.current - e.changedTouches[0].clientX
    if (diff > 60 && chocoQuizAnswered) {
      handleChocoNext()
    }
    chocoTouchStartRef.current = null
  }

  const resetChocoQuiz = () => {
    setChocoQuizIndex(0)
    setChocoQuizAnswered(false)
    setChocoQuizCorrect(false)
    setChocoQuizScore(0)
    setChocoQuizDone(false)
    setChocoWrongMsg('')
    setChocoSwipeDir('')
  }

  // ===== VALENTINE SPINNER GAME =====
  // YES positions: 0° (top), 90° (right), 180° (bottom), 270° (left) — every even slot
  // NO positions: 45°, 135°, 225°, 315° — every odd slot
  // 8 slots of 45° each, alternating YES/NO
  const spinnerLabels = [
    { text: 'YES', angle: 0 },
    { text: 'NO', angle: 45 },
    { text: 'YES', angle: 90 },
    { text: 'NO', angle: 135 },
    { text: 'YES', angle: 180 },
    { text: 'NO', angle: 225 },
    { text: 'YES', angle: 270 },
    { text: 'NO', angle: 315 }
  ]

  // Continuous spinning animation
  useEffect(() => {
    if (activeDay !== 'chocolate') return
    if (spinnerStopped) return

    let running = true
    const animate = () => {
      if (!running) return
      spinnerAngleRef.current = (spinnerAngleRef.current + spinnerSpeedRef.current) % 360
      setSpinnerAngle(spinnerAngleRef.current)
      spinnerAnimRef.current = requestAnimationFrame(animate)
    }
    spinnerAnimRef.current = requestAnimationFrame(animate)

    return () => {
      running = false
      if (spinnerAnimRef.current) cancelAnimationFrame(spinnerAnimRef.current)
    }
  }, [activeDay, spinnerStopped])

  const handleSpinnerTap = () => {
    if (spinnerStopped) return

    // Stop the continuous animation
    if (spinnerAnimRef.current) cancelAnimationFrame(spinnerAnimRef.current)

    // Calculate a target angle that lands on YES (0°, 90°, 180°, 270°)
    // The hand points at spinnerAngle, so we need it to land where a YES is
    const currentAngle = spinnerAngleRef.current
    // Pick a random YES position
    const yesPositions = [0, 90, 180, 270]
    const targetYes = yesPositions[Math.floor(Math.random() * yesPositions.length)]
    // Add extra full rotations for dramatic spinning effect (3-5 more spins)
    const extraSpins = (3 + Math.floor(Math.random() * 3)) * 360
    const targetAngle = currentAngle + extraSpins + ((targetYes - (currentAngle % 360) + 360) % 360)

    setSpinnerSpinning(false)

    // Animate deceleration
    const startAngle = currentAngle
    const totalDelta = targetAngle - startAngle
    const duration = 3000 // 3 seconds of spinning down
    const startTime = performance.now()

    const decelerate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      const newAngle = startAngle + totalDelta * eased
      spinnerAngleRef.current = newAngle % 360
      setSpinnerAngle(newAngle % 360)

      if (progress < 1) {
        spinnerAnimRef.current = requestAnimationFrame(decelerate)
      } else {
        // Landed!
        setSpinnerStopped(true)
        setSpinnerResult('YES')
        playSound('celebration')
        triggerConfetti()
        setTimeout(() => triggerConfetti(), 800)
      }
    }
    spinnerAnimRef.current = requestAnimationFrame(decelerate)
  }

  const resetSpinner = () => {
    setSpinnerAngle(0)
    spinnerAngleRef.current = 0
    spinnerSpeedRef.current = 3
    setSpinnerSpinning(true)
    setSpinnerStopped(false)
    setSpinnerResult('')
  }

  const scrollToSection = (num) => {
    playSound('click')
    logInteraction('menu_navigation', { section: num })
    document.getElementById(`section${num}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Export all logs to console (for debugging)
  const exportLogs = () => {
    try {
      const allLogs = JSON.parse(localStorage.getItem('roseDayLogs') || '[]')
      const visitorInfo = JSON.parse(localStorage.getItem('lastVisitorInfo') || '{}')

      console.log('📊 ===== ALL INTERACTION LOGS =====')
      console.table(allLogs)
      console.log('Total interactions:', allLogs.length)

      console.log('\n📱 ===== VISITOR INFO =====')
      console.log(visitorInfo)

      return { logs: allLogs, visitor: visitorInfo }
    } catch (e) {
      console.log('No logs available')
      return { logs: [], visitor: {} }
    }
  }

  // Get current visitor info
  const getVisitorInfo = () => {
    try {
      return JSON.parse(localStorage.getItem('lastVisitorInfo') || '{}')
    } catch (e) {
      return {}
    }
  }

  // Send visitor info to WhatsApp manually
  const sendVisitorInfoToWhatsApp = () => {
    const info = getVisitorInfo()
    const deviceInfo = getDeviceInfo()

    const message = `🌹 VISITOR INFO 🌹
⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

📍 LOCATION:
• IP: ${info.ip || 'unknown'}
• City: ${info.city || 'unknown'}
• Region: ${info.region || 'unknown'}
• Country: ${info.country || 'unknown'}
• Postal: ${info.postal || 'unknown'}
• Coords: ${info.latitude || '?'}, ${info.longitude || '?'}
• ISP: ${info.isp || 'unknown'}

📱 DEVICE:
• Platform: ${deviceInfo.platform}
• Screen: ${deviceInfo.screenWidth}x${deviceInfo.screenHeight}
• Window: ${deviceInfo.windowWidth}x${deviceInfo.windowHeight}
• Pixel Ratio: ${deviceInfo.pixelRatio}
• Touch: ${deviceInfo.touchSupport ? 'Yes (' + deviceInfo.maxTouchPoints + ' points)' : 'No'}
• Memory: ${deviceInfo.deviceMemory}GB
• CPU Cores: ${deviceInfo.hardwareConcurrency}

🔋 BATTERY:
• Level: ${info.battery?.level || 'unknown'}
• Charging: ${info.battery?.charging ? 'Yes' : 'No'}

🌐 BROWSER:
• Language: ${deviceInfo.language}
• Languages: ${deviceInfo.languages}
• Timezone: ${deviceInfo.timezone}
• Online: ${deviceInfo.online ? 'Yes' : 'No'}
• Cookies: ${deviceInfo.cookiesEnabled ? 'Enabled' : 'Disabled'}
• DNT: ${deviceInfo.doNotTrack || 'unset'}

📶 CONNECTION:
• Type: ${deviceInfo.connectionType}
• Speed: ${deviceInfo.connectionDownlink}Mbps

🔗 SOURCE:
• Referrer: ${deviceInfo.referrer}
• URL: ${deviceInfo.currentURL}

📝 User Agent:
${deviceInfo.userAgent}`

    sendWhatsAppUpdate(message)
    console.log('📩 Sent visitor info to WhatsApp')
  }

  // Make exportLogs available globally for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.exportRoseDayLogs = exportLogs
      window.getVisitorInfo = getVisitorInfo
      window.sendVisitorInfo = sendVisitorInfoToWhatsApp
      console.log('💡 Debug commands available:')
      console.log('  • window.exportRoseDayLogs() - View all interaction logs')
      console.log('  • window.getVisitorInfo() - Get visitor device/IP info')
      console.log('  • window.sendVisitorInfo() - Send visitor info to WhatsApp')
    }
  }, [])

  // Valentine Question - Running No Button
  const runawayMessages = [
    "Oye arre nahi! Tractor bhi itni fast nahi bhagda! 😂🚜",
    "Nahi bolke kya fayda? Dil toh pehle hi haan keh chuka ae! ❤️",
    "Button bhag raha hai tujhse! 🏃💨",
    "Pakadke dikha agar himmat hai! 😜",
    "Chole bhature nahi khilaunga agar nahi boli! 🍲",
    "Arre ruk ja, itni bhi kya jaldi hai nahi bolne ki! 😅"
  ]

  const handleNoHover = () => {
    if (yesClicked) return

    const newAttempts = noAttempts + 1
    setNoAttempts(newAttempts)

    // Play escape sound
    playSound('escape')

    // Log No button hover/touch attempt
    logInteraction('no_button_escape', { attemptNumber: newAttempts })

    // Random position
    const maxX = window.innerWidth - 150
    const maxY = 300
    const newX = Math.random() * maxX
    const newY = Math.random() * maxY

    setNoButtonPosition({ x: newX, y: newY })

    // Show random message
    setShowRunawayMessage(runawayMessages[Math.floor(Math.random() * runawayMessages.length)])

    // Shrink button
    const newSize = Math.max(20, 100 - (newAttempts * 15))
    setNoButtonSize(newSize)

    // Change button text after attempts
    if (newAttempts >= 3) {
      setNoButtonText("Pakad ke dikha! 🏃")
    }
    if (newAttempts >= 5) {
      setNoButtonText("Main haar gaya! 😭")
    }
    if (newAttempts >= 7) {
      setNoButtonText("...")
      setNoButtonSize(10)
    }

    // Vibrate on mobile
    if (navigator.vibrate) {
      navigator.vibrate(100)
    }

    // Clear message after 2 seconds
    setTimeout(() => setShowRunawayMessage(""), 2000)
  }

  const handleYesClick = () => {
    setYesClicked(true)
    triggerConfetti()

    // Extra celebration
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createHeart(), i * 100)
    }

    // Vibrate celebration pattern
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 400])
    }
  }

  // Keep-alive ping every 1 minute to prevent server sleep
  // NOTE: This only works when page is open in browser
  useEffect(() => {
    let pingCount = 0

    const pingServer = async () => {
      try {
        const response = await fetch('/api/health')
        if (response.ok) {
          pingCount++
          console.log(`🏓 Keep-alive ping #${pingCount} successful at ${new Date().toLocaleTimeString()}`)
        }
      } catch (e) {
        console.log('❌ Keep-alive ping failed:', e.message)
      }
    }

    // Initial ping
    pingServer()

    // Ping every 1 minute (60 seconds)
    const keepAliveInterval = setInterval(pingServer, 60000)

    // Also ping on visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('👀 Tab became visible, sending ping...')
        pingServer()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(keepAliveInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Countdown timer observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !timerStarted) {
            setTimerStarted(true)
            setTimer(10)
            let count = 10
            const interval = setInterval(() => {
              count--
              setTimer(count)
              if (count <= 0) {
                clearInterval(interval)
              }
            }, 1000)
            countdownRef.current = interval
          }
        })
      },
      { threshold: 0.5 }
    )

    const section9 = document.getElementById('section9')
    if (section9) observer.observe(section9)

    return () => {
      observer.disconnect()
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [timerStarted])

  // ===== VALENTINE'S DAY - SAD GAANA FUNCTIONS =====

  // Auto-play sad gaana when Valentine's Day tab is opened
  useEffect(() => {
    if (activeDay === 'valentine' && !vdSadnessBandKar) {
      // Start playing sad gaana on low volume
      try {
        if (!sadGaanaRef.current) {
          sadGaanaRef.current = new Audio('/Sad_Gaana.mp3')
          sadGaanaRef.current.loop = true
        }
        sadGaanaRef.current.volume = 0.3
        sadGaanaRef.current.currentTime = 0
        const playPromise = sadGaanaRef.current.play()
        if (playPromise) {
          playPromise.then(() => {
            setVdSadPlaying(true)
          }).catch(() => {
            // Autoplay blocked, will play on interaction
            setVdSadPlaying(false)
          })
        }
      } catch (e) {
        console.log('Sad gaana autoplay blocked')
      }
    }
    // Stop when leaving valentine tab
    if (activeDay !== 'valentine' && sadGaanaRef.current) {
      sadGaanaRef.current.pause()
      setVdSadPlaying(false)
    }
  }, [activeDay, vdSadnessBandKar])

  // Play sad gaana manually (if autoplay was blocked)
  const vdPlaySadGaana = () => {
    try {
      if (!sadGaanaRef.current) {
        sadGaanaRef.current = new Audio('/Sad_Gaana.mp3')
        sadGaanaRef.current.loop = true
      }
      sadGaanaRef.current.volume = 0.3
      sadGaanaRef.current.play()
      setVdSadPlaying(true)
    } catch (e) {}
  }

  // Sadness Band Kar - stop sad song, switch to happy mode
  const vdStopSadness = () => {
    setVdSadnessBandKar(true)
    setVdRecordScratch(true)

    // Stop sad gaana abruptly
    if (sadGaanaRef.current) {
      sadGaanaRef.current.pause()
      sadGaanaRef.current.currentTime = 0
    }
    setVdSadPlaying(false)

    // Play record scratch sound effect
    playSound('escape')
    setTimeout(() => playSound('celebration'), 300)

    // Trigger confetti and happy mode
    setTimeout(() => {
      setVdRecordScratch(false)
      setVdHappyMode(true)
      triggerConfetti()
      setTimeout(() => triggerConfetti(), 800)
    }, 600)
  }

  // Act 2 card navigation
  const vdNextCard = () => {
    setVdCardFlip(true)
    // Play 2sec sad snippet then cut to balle balle
    if (sadGaanaRef.current) {
      sadGaanaRef.current.volume = 0.4
      sadGaanaRef.current.play()
      setTimeout(() => {
        if (sadGaanaRef.current) {
          sadGaanaRef.current.pause()
          sadGaanaRef.current.currentTime = 0
        }
        playSound('celebration')
      }, 2000)
    } else {
      playSound('click')
    }
    setTimeout(() => {
      setVdCardFlip(false)
      setVdCardIndex(prev => prev + 1)
    }, 400)
  }

  const vdPrevCard = () => {
    if (vdCardIndex > 0) {
      setVdCardFlip(true)
      playSound('click')
      setTimeout(() => {
        setVdCardFlip(false)
        setVdCardIndex(prev => prev - 1)
      }, 400)
    }
  }

  // Act 3 - Sad Mode Trap
  const vdTapSadMode = () => {
    const attempts = vdSadAttempts + 1
    setVdSadAttempts(attempts)

    if (attempts >= 3) {
      // Lock sad button after 3 attempts
      setVdSadLocked(true)
      playSound('celebration')
      triggerConfetti()
      setTimeout(() => triggerConfetti(), 800)
      return
    }

    // Play sad gaana for 10 sec then force happy
    setVdFakeTears(true)
    if (sadGaanaRef.current) {
      sadGaanaRef.current.volume = 0.5
      sadGaanaRef.current.play()
    }

    const roasts = [
      "Bali vi thak gaya tere sad attempts se! 😴",
      "Ek aur try? Oye sadness ka quota khatam! 😂",
    ]

    setTimeout(() => {
      if (sadGaanaRef.current) {
        sadGaanaRef.current.pause()
        sadGaanaRef.current.currentTime = 0
      }
      setVdFakeTears(false)
      playSound('escape')
      setTimeout(() => {
        playSound('celebration')
        triggerConfetti()
      }, 300)
    }, 8000)
  }

  // Act 3 - Happy Jatt Mode Direct
  const vdTapHappyMode = () => {
    if (sadGaanaRef.current) {
      sadGaanaRef.current.pause()
      sadGaanaRef.current.currentTime = 0
    }
    playSound('celebration')
    triggerConfetti()
    setTimeout(() => triggerConfetti(), 600)
    setVdHappyMode(true)
  }

  // Navigate between acts
  const vdGoToAct = (act) => {
    playSound('whoosh')
    setVdAct(act)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sadGaanaRef.current) {
        sadGaanaRef.current.pause()
        sadGaanaRef.current = null
      }
    }
  }, [])

  // Handle day change with logging
  const handleDayChange = (dayId) => {
    playSound('whoosh')
    logInteraction('day_change', { from: activeDay, to: dayId })
    setActiveDay(dayId)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Play siren on Rose Day
    if (dayId === 'rose' && !sirenPlayed) {
      setTimeout(() => {
        playSound('siren')
        setSirenPlayed(true)
      }, 500)
    }
  }

  // ========== PROPOSE DAY FUNCTIONS ==========

  const handleProposeEntry = () => {
    const now = Date.now()
    const timeSinceLastTap = now - lastTapRef.current
    lastTapRef.current = now

    if (timeSinceLastTap < 400 && proposeFastTap < 3) {
      setProposeFastTap(prev => prev + 1)
      setRingMessage("Arre slow ja! Ring slip ho rahi ae finger te! 😅")
      setTimeout(() => setRingMessage(''), 2000)
      return
    }

    setProposeFastTap(0)
    setProposeStarted(true)
    playSound('click')
    logInteraction('propose_day_entry', { timestamp: new Date().toISOString() })

    // Scroll to Act 1 content
    setTimeout(() => {
      document.getElementById('propose-act1-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  // Ring Catch Game
  const startRingGame = () => {
    setRingCatchState('playing')
    setRingScore(0)
    setRingMisses(0)
    setRingMessage('')
    playSound('click')
    logInteraction('ring_game_start', {})
    dropNewRing()
  }

  const dropNewRing = () => {
    const startX = Math.random() * 80 + 10
    setRingPosition({ x: startX, y: -10 })

    let currentY = -10
    if (ringIntervalRef.current) clearInterval(ringIntervalRef.current)

    ringIntervalRef.current = setInterval(() => {
      currentY += 2
      setRingPosition(prev => ({ ...prev, y: currentY }))

      if (currentY >= 85) {
        clearInterval(ringIntervalRef.current)
        // Check if caught
        setFingerPosition(prevFinger => {
          setRingPosition(prevRing => {
            const distance = Math.abs(prevRing.x - prevFinger)
            if (distance < 15) {
              // Caught!
              setRingScore(prev => {
                const newScore = prev + 1
                if (newScore >= 3) {
                  setRingCatchState('caught')
                  playSound('celebration')
                  triggerConfetti()
                  setRingMessage("Caught! Ab asli wala milega! 💍")
                  logInteraction('ring_game_won', { score: newScore })
                } else {
                  playSound('success')
                  setRingMessage("Nice catch! Keep going! 💍")
                  setTimeout(() => {
                    setRingMessage('')
                    dropNewRing()
                  }, 1000)
                }
                return newScore
              })
            } else {
              // Missed
              setRingMisses(prev => {
                const newMisses = prev + 1
                playSound('error')
                const missMessages = [
                  "Ouch! Dil toot gaya... try again sohniye! 😭",
                  "Yeet! Abhi ready nahi? 😂",
                  "Ring bhi tujhse bach ke bhag rahi! 🏃",
                ]
                setRingMessage(missMessages[Math.min(newMisses - 1, missMessages.length - 1)])
                if (newMisses >= 5) {
                  setRingCatchState('caught') // Let her through anyway
                  playSound('celebration')
                  triggerConfetti()
                  setRingMessage("Chalo ring nahi pakdi but dil toh pakda! 💍😂")
                  logInteraction('ring_game_mercy_win', { misses: newMisses })
                } else {
                  setTimeout(() => {
                    setRingMessage('')
                    dropNewRing()
                  }, 1500)
                }
                return newMisses
              })
            }
            return prevRing
          })
          return prevFinger
        })
      }
    }, 50)
  }

  const handleFingerMove = (e) => {
    if (ringCatchState !== 'playing') return
    const touch = e.touches ? e.touches[0] : e
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    setFingerPosition(Math.max(5, Math.min(95, x)))
  }

  const handleProposeYes = () => {
    setProposeYesClicked(true)
    playSound('celebration')
    setTimeout(() => playSound('heartbeat'), 800)
    triggerConfetti()
    logInteraction('propose_yes_clicked', { timestamp: new Date().toISOString() })
    sendUpdate('yes_clicked', null)

    for (let i = 0; i < 50; i++) {
      setTimeout(() => createHeart(), i * 100)
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 400])
    }
  }

  const handleProposeNo = () => {
    setProposeNoJump(prev => prev + 1)
    playSound('escape')
    const maxX = typeof window !== 'undefined' ? window.innerWidth - 150 : 200
    const maxY = 200
    setProposeNoPos({ x: Math.random() * maxX, y: Math.random() * maxY })

    if (proposeNoJump >= 1) {
      // After 1 jump, just say "Just kidding"
      setRingMessage("Just kidding, haan hi bol! 😂")
      setTimeout(() => {
        setRingMessage('')
        setProposeYesClicked(true)
        playSound('celebration')
        triggerConfetti()
        logInteraction('propose_no_auto_yes', {})
      }, 1500)
    }
  }

  // Cleanup ring game interval on unmount or day change
  useEffect(() => {
    return () => {
      if (ringIntervalRef.current) clearInterval(ringIntervalRef.current)
    }
  }, [activeDay])

  // Play/pause Propose Day song when day changes
  useEffect(() => {
    if (activeDay === 'propose') {
      if (!proposeSongRef.current) {
        proposeSongRef.current = new Audio('/itni-si-baat.mp3')
        proposeSongRef.current.loop = true
        proposeSongRef.current.volume = 0.5
      }
      proposeSongRef.current.play().catch(() => {
        // Autoplay blocked — will retry on next user interaction
        const playOnInteraction = () => {
          if (proposeSongRef.current) {
            proposeSongRef.current.play().catch(() => {})
          }
          document.removeEventListener('click', playOnInteraction)
          document.removeEventListener('touchstart', playOnInteraction)
        }
        document.addEventListener('click', playOnInteraction, { once: true })
        document.addEventListener('touchstart', playOnInteraction, { once: true })
      })
    } else {
      if (proposeSongRef.current) {
        proposeSongRef.current.pause()
      }
    }

    return () => {
      if (proposeSongRef.current && activeDay === 'propose') {
        proposeSongRef.current.pause()
      }
    }
  }, [activeDay])

  // ===== PROMISE DAY - PUZZLE HUNGAMA DATA & LOGIC =====
  const pdWords = [
    { word: 'VADA', hint: 'Jo nibhaaunga lifetime! 🤝' },
    { word: 'PYAR', hint: 'Tere naal bohot saara... ❤️' },
    { word: 'FOREVER', hint: 'Kitna time saath rahunga? 😏' },
    { word: 'JAAN', hint: 'Tu meri ___! 💕' },
    { word: 'PROMISE', hint: 'Aaj ka din! 🤞' },
    { word: 'TRACTOR', hint: 'Jatt da ride! 🚜' },
    { word: 'DILJIT', hint: 'Punjab da King! 🎵' },
    { word: 'CHOLE', hint: 'Bhature ke saathi! 😋' },
  ]

  const pdWrongWordMsgs = [
    "Arre galat! Eh vada nahi, tractor da brake fail ho gaya! 😂",
    "Oye nahi! Jatt da spelling bhi weak? Try again! 🚜",
    "Galat bae! Pehle chole khaa, phir soch! 😋",
    "Wrong! Tere bina mera brain bhi kaam nahi karda! 🧠❌",
    "Nope! Itna easy tha... tu soch mein kho gayi? 😏",
    "Eh ki? Gurudwara jaake ardaas kar phir try kar! 😂",
  ]

  const pdMatchPairs = [
    { id: 0, scenario: 'Jadon tu gussa karegi 😤', promise: 'Teri favorite ice cream laake manaaunga! 🍦' },
    { id: 1, scenario: 'Chole khake food poisoning 🤢', promise: 'Davaai + cuddles dunga lifetime! 🤢❤️' },
    { id: 2, scenario: 'Mera naach dekh ke sharma jaegi 💃', promise: 'Sirf tere layi Bhangra karunga! 🕺' },
    { id: 3, scenario: 'Late ho jaunga date te ⏰', promise: 'Next time tractor te jaldi aaunga! 🚜' },
    { id: 4, scenario: 'Teri shopping mein bore hounga 🛍️', promise: 'Main bags khushi se uthaunga! 💪' },
    { id: 5, scenario: 'Meri cooking se ghar jalega 🔥', promise: 'Swiggy da VIP member banunga! 📱' },
    { id: 6, scenario: 'Selfie mein bura laguga tere saath 🤳', promise: 'Tere saath toh main hero lagda! 😎' },
    { id: 7, scenario: 'Raat ko tera phone nahi uthaunga 📱', promise: 'Kabhi nahi! 24/7 on call humesha! 📞' },
  ]

  const pdMismatchMsgs = [
    "Oye mismatch! Jaise mera pehla propose fail! 😭",
    "Galat pair! Jaise chole bina bhature! 😂",
    "Nahi match hua! Tere bina meri memory bhi weak! 🧠",
    "Wrong! Jatt confused ho gaya! 🤯",
    "Mismatch! Par mera pyar perfect match ae! ❤️",
    "Oye hoye! Sahi se dekh ke flip kar! 👀",
  ]

  const pdJigsawData = [
    { id: 0, emoji: '🤝', text: 'Main' },
    { id: 1, emoji: '💕', text: 'Vada' },
    { id: 2, emoji: '🚜', text: 'Karda' },
    { id: 3, emoji: '🌹', text: 'Haan' },
    { id: 4, emoji: '❤️', text: 'Tere' },
    { id: 5, emoji: '💍', text: 'Naal' },
    { id: 6, emoji: '🤞', text: 'Har' },
    { id: 7, emoji: '🎵', text: 'Pal' },
    { id: 8, emoji: '✨', text: 'Forever' },
  ]

  const pdEscRiddles = [
    {
      q: 'Main red hoon, pyar da symbol, par kande vi ne – ki haan?',
      opts: ['Gulab 🌹', 'Dil ❤️', 'Tomato 🍅', 'Traffic Light 🚦'],
      ans: 0,
      unlock: 'Sahi! Par mera pyar kande bina! 😂🌹',
      wrong: 'Galat! Tu taan mera dil tod rahi ae... try again pagli! 😭'
    },
    {
      q: 'Tu isnu khandi ae subah, main vi tere naal share karda – ki?',
      opts: ['Chai ☕', 'Gaaliyan 😂', 'Wifi Password 📶', 'Noodles 🍜'],
      ans: 0,
      unlock: 'Promise: Har subah tere naal chai peeunga! ☕❤️',
      wrong: 'Arre galat! Subah subah ki chahiye tujhe? ☕'
    },
    {
      q: 'Jatt da vehicle, par pyar vich speed deta – ki?',
      opts: ['Tractor 🚜', 'Bicycle 🚲', 'Auto Rickshaw 🛺', 'Rocket 🚀'],
      ans: 0,
      unlock: 'Vada: Tere layi full speed rahunga! 🚜💨',
      wrong: 'Oye Jatt da vehicle toh pata hona chahida! 🚜'
    },
    {
      q: 'Pyar mein sabse zaroori cheez ki ae?',
      opts: ['Trust 🤝', 'Money 💰', 'Insta Followers 📸', 'Chole Bhature 😂'],
      ans: 0,
      unlock: 'Promise: Tera trust kabhi nahi todunga! 🤝💕',
      wrong: 'Nahi nahi! Dil se soch... sahi answer kya hoga? 💕'
    },
    {
      q: 'Tere bina main ki ban jaunga?',
      opts: ['Sad 😢', 'Happy 😊', 'Billi da dost 🐱', 'TikTok Star 🤳'],
      ans: 0,
      unlock: 'Isiliye hamesha tere saath rahunga! Forever! 💕',
      wrong: 'Galat! Sachchi bata... tere bina kya hoga mera? 😭'
    },
  ]

  // Scramble a word
  const scrambleWord = (word) => {
    const letters = word.split('')
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[letters[i], letters[j]] = [letters[j], letters[i]]
    }
    // Make sure it's not the same as original
    if (letters.join('') === word) {
      ;[letters[0], letters[1]] = [letters[1], letters[0]]
    }
    return letters.map((l, i) => ({ letter: l, origIdx: i, used: false }))
  }

  // Initialize Unscramble
  const initPdUnscramble = () => {
    setPdView('unscramble')
    setPdUIdx(0)
    setPdUDone(false)
    setPdUMsg('')
    const pool = scrambleWord(pdWords[0].word)
    setPdUPool(pool)
    setPdUAns([])
    playSound('click')
  }

  // Tap letter from pool
  const pdTapPoolLetter = (poolIdx) => {
    if (pdUPool[poolIdx].used) return
    playSound('click')
    const newPool = [...pdUPool]
    newPool[poolIdx] = { ...newPool[poolIdx], used: true }
    setPdUPool(newPool)
    setPdUAns(prev => [...prev, { letter: pdUPool[poolIdx].letter, poolIdx }])
    setPdUMsg('')
  }

  // Remove letter from answer
  const pdRemoveAnsLetter = (ansIdx) => {
    playSound('click')
    const removed = pdUAns[ansIdx]
    const newPool = [...pdUPool]
    newPool[removed.poolIdx] = { ...newPool[removed.poolIdx], used: false }
    setPdUPool(newPool)
    setPdUAns(prev => prev.filter((_, i) => i !== ansIdx))
  }

  // Check unscramble answer
  const pdCheckWord = () => {
    const currentWord = pdWords[pdUIdx].word
    const userWord = pdUAns.map(a => a.letter).join('')
    if (userWord === currentWord) {
      playSound('celebration')
      setPdHasdi(prev => Math.min(100, prev + 12))
      if (pdUIdx >= pdWords.length - 1) {
        setPdUDone(true)
        setPdUMsg('')
        setPdDone(prev => ({ ...prev, u: true }))
        triggerConfetti()
      } else {
        setPdUMsg('Sahi jawab! 🎉 Next word loading...')
        setTimeout(() => {
          const nextIdx = pdUIdx + 1
          setPdUIdx(nextIdx)
          setPdUPool(scrambleWord(pdWords[nextIdx].word))
          setPdUAns([])
          setPdUMsg('')
        }, 1200)
      }
    } else {
      playSound('error')
      setPdUShake(true)
      setPdUMsg(pdWrongWordMsgs[Math.floor(Math.random() * pdWrongWordMsgs.length)])
      if (navigator.vibrate) navigator.vibrate(200)
      setTimeout(() => setPdUShake(false), 500)
    }
  }

  // Initialize Memory Match
  const initPdMatch = () => {
    setPdView('match')
    setPdMDone(false)
    setPdMMsg('')
    setPdMMoves(0)
    setPdMFlip([])
    setPdMFound([])
    setPdMLock(false)
    // Create card pairs: scenario cards + promise cards
    const cards = []
    pdMatchPairs.forEach((pair) => {
      cards.push({ pairId: pair.id, type: 'scenario', text: pair.scenario, flipped: false })
      cards.push({ pairId: pair.id, type: 'promise', text: pair.promise, flipped: false })
    })
    // Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[cards[i], cards[j]] = [cards[j], cards[i]]
    }
    setPdMCards(cards)
    playSound('click')
  }

  // Flip a memory card
  const pdFlipCard = (idx) => {
    if (pdMLock || pdMFound.includes(pdMCards[idx].pairId) || pdMFlip.includes(idx)) return
    playSound('click')
    const newFlip = [...pdMFlip, idx]
    setPdMFlip(newFlip)

    if (newFlip.length === 2) {
      setPdMMoves(prev => prev + 1)
      setPdMLock(true)
      const card1 = pdMCards[newFlip[0]]
      const card2 = pdMCards[newFlip[1]]

      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        // Match!
        playSound('celebration')
        setPdHasdi(prev => Math.min(100, prev + 6))
        const newFound = [...pdMFound, card1.pairId]
        setPdMFound(newFound)
        setPdMMsg('Match ho gaya! 🎉')
        setTimeout(() => {
          setPdMFlip([])
          setPdMLock(false)
          setPdMMsg('')
          if (newFound.length === pdMatchPairs.length) {
            setPdMDone(true)
            setPdDone(prev => ({ ...prev, m: true }))
            triggerConfetti()
          }
        }, 800)
      } else {
        // No match
        playSound('error')
        setPdMMsg(pdMismatchMsgs[Math.floor(Math.random() * pdMismatchMsgs.length)])
        if (navigator.vibrate) navigator.vibrate(150)
        setTimeout(() => {
          setPdMFlip([])
          setPdMLock(false)
          setPdMMsg('')
        }, 1200)
      }
    }
  }

  // Initialize Jigsaw
  const initPdJigsaw = () => {
    setPdView('jigsaw')
    setPdJDone(false)
    setPdJMsg('')
    setPdJMoves(0)
    setPdJSel(null)
    // Shuffle tiles
    const tiles = pdJigsawData.map(t => ({ ...t }))
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[tiles[i], tiles[j]] = [tiles[j], tiles[i]]
    }
    // Make sure it's not already solved
    if (tiles.every((t, i) => t.id === i)) {
      ;[tiles[0], tiles[1]] = [tiles[1], tiles[0]]
    }
    setPdJTiles(tiles)
    playSound('click')
  }

  // Tap jigsaw tile
  const pdTapTile = (idx) => {
    if (pdJDone) return
    if (pdJSel === null) {
      setPdJSel(idx)
      setPdJMsg('Ab doosri tile tap kar ke swap kar! 🔄')
      playSound('click')
    } else if (pdJSel === idx) {
      setPdJSel(null)
      setPdJMsg('')
    } else {
      // Swap tiles
      playSound('click')
      const newTiles = [...pdJTiles]
      ;[newTiles[pdJSel], newTiles[idx]] = [newTiles[idx], newTiles[pdJSel]]
      setPdJTiles(newTiles)
      setPdJSel(null)
      setPdJMoves(prev => prev + 1)
      setPdJMsg('')
      // Check if solved
      if (newTiles.every((t, i) => t.id === i)) {
        setPdJDone(true)
        setPdJMsg('')
        setPdDone(prev => ({ ...prev, j: true }))
        setPdHasdi(prev => Math.min(100, prev + 25))
        playSound('celebration')
        triggerConfetti()
      }
    }
  }

  // Initialize Escape Room
  const initPdEscape = () => {
    setPdView('escape')
    setPdEStep(0)
    setPdEMsg('')
    setPdEDone(false)
    setPdEShake(false)
    setPdEUnlocked([])
    playSound('click')
  }

  // Check escape room answer
  const pdCheckEsc = (optIdx) => {
    const riddle = pdEscRiddles[pdEStep]
    if (optIdx === riddle.ans) {
      playSound('celebration')
      setPdHasdi(prev => Math.min(100, prev + 10))
      const newUnlocked = [...pdEUnlocked, pdEStep]
      setPdEUnlocked(newUnlocked)
      setPdEMsg(riddle.unlock)
      if (pdEStep >= pdEscRiddles.length - 1) {
        // All done!
        setTimeout(() => {
          setPdEDone(true)
          setPdDone(prev => ({ ...prev, e: true }))
          triggerConfetti()
        }, 1500)
      } else {
        setTimeout(() => {
          setPdEStep(prev => prev + 1)
          setPdEMsg('')
        }, 2000)
      }
    } else {
      playSound('error')
      setPdEShake(true)
      setPdEMsg(riddle.wrong)
      if (navigator.vibrate) navigator.vibrate(200)
      setTimeout(() => setPdEShake(false), 500)
    }
  }

  // Back to hub
  const pdBackToHub = () => {
    setPdView('hub')
    playSound('click')
  }

  // Promise Day sound effects
  const playPdSound = (type) => {
    if (!soundEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      if (type === 'dhol') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(80, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.5, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.15)
        // Second hit
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.type = 'triangle'
        osc2.frequency.setValueAtTime(100, ctx.currentTime + 0.2)
        osc2.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.35)
        gain2.gain.setValueAtTime(0.4, ctx.currentTime + 0.2)
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35)
        osc2.start(ctx.currentTime + 0.2)
        osc2.stop(ctx.currentTime + 0.35)
      } else if (type === 'oyehoye') {
        // Fun ascending tone
        const notes = [330, 440, 554, 660]
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator()
          const g = ctx.createGain()
          o.connect(g)
          g.connect(ctx.destination)
          o.type = 'sine'
          o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)
          g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1)
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.15)
          o.start(ctx.currentTime + i * 0.1)
          o.stop(ctx.currentTime + i * 0.1 + 0.15)
        })
        return
      }
    } catch(e) {}
  }

  // Check if all promise day puzzles complete
  const pdAllDone = pdDone.u && pdDone.m && pdDone.j && pdDone.e

  // ===== HUG DAY - LATE NIGHT HUG DA HUNGAMA LOGIC =====
  const hugRandomMsgs = [
    "Ouch! Itna tight ki mera dil vi squeeze ho gaya! 😂",
    "Hor tight! Pillow jealous ho rahi ae! 😜",
    "Hug level: Jatt Mode Activated! 🚜🤗",
    "Teri jappi > Amritsari Chole! Aur oh bahut tasty ne! 😋",
    "Ab kiss add kar dun? Dream repeat mode on! 💋",
    "Main drool kar raha tha dream vich... sorry not sorry! 😏",
    "Whiskers dekh rahi ae judgingly... ignore kar! 🐱",
    "Tera hug = mera charger! 100% charged! 🔋",
    "Itni tight jappi? Meri bones crack ho gayi! 😂💀",
    "Hug count badh rahi... tera addiction dangerous ae! ⚠️",
    "Dream vich vi itni tight jappi nahi si! 😏",
    "Tu squeeze karti ae ya wrestling karti ae? 🤼😂",
    "Mera pillow bhi itna tight hug nahi karda! 🛏️",
    "Jappi da meter overload ho raha ae! ⚡",
    "Ek hor? Tu taan greedy ae hugs vich! 😂🤗",
  ]

  const hugMilestones = {
    3: {
      title: 'Warm-Up Overload! 😏',
      text: "Oye 3 hugs already? Tu taan pro ae! Par mera dil abhi warm-up kar raha... dream wala hug repeat ho raha mind vich! 😏💭 Ab hor tight kar!",
      effect: 'blush'
    },
    7: {
      title: 'Billi Jealous Mode! 🐱😤',
      text: "7 hugs! Whiskers jealous ho gayi – boli 'oye Jatt, menu hug kyun nahi? Pillow tere paas, main yahan akeli!' 🐱😤 Ab tu hi bacha le, hor hugs de!",
      effect: 'billi'
    },
    10: {
      title: 'IRL Hug Pending! 🚚',
      text: "10 hugs! Ab IRL hug pending – asli wali jaldi de de! Virtual se dil nahi bharda... address confirm kar waise! 🚚😘",
      effect: 'confetti'
    },
    12: {
      title: 'Tractor Hug Crash! 🚜💥',
      text: "12 hugs! Itna tight ki mera imaginary tractor vi crash ho gaya – brake fail tere pyar naal! 🚜💥 Ab IRL hug se recover karna padega!",
      effect: 'tractor'
    },
    15: {
      title: 'OVERHEAT WARNING! 🔥',
      text: "15+ hugs! Virtual hug vi limit cross kar gayi – screen overheat ho rahi ae! 🔥 Bas kar pagli, pet dukh jauga has has ke! 💀😂",
      effect: 'overheat'
    },
    18: {
      title: 'Kiss Sneak Attack! 💋',
      text: "18 hugs! Ab dream upgrade – hug ke saath kiss vi add ho gaya! 😘 Screen fog ho gaya... saaf karne layi hor tap kar! Real wala jaldi plan kar rahe hain shhh 💋",
      effect: 'kiss'
    },
    25: {
      title: 'ULTIMATE SURRENDER! 🏳️',
      text: "25+ hugs! Bas kar meri jaan, main surrender kar dita! Tu jeet gayi 🤗🏳️ Pet dukh gaya has has ke, neend vi aa rahi fer se! 😴💀 Ab asli hug/vada: Lifetime unlimited, no oversleep excuse! Love you pagli ❤️",
      effect: 'chaos'
    },
    30: {
      title: 'HUG LIMIT MAXED! 🤯',
      text: "30 hugs! Hug factory shutdown! 🏭 Ab WhatsApp pe aa ja real plan banane! Virtual jappi ki vi limit hoti ae... par meri pyar di nahi! 😘❤️ Ab asli wali jappi ka time ae!",
      effect: 'maxed'
    }
  }

  const playHugSound = (type) => {
    if (!soundEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return
    try {
      if (type === 'squish') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.setValueAtTime(300, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.35, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.2)
        // Bounce back
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(100, ctx.currentTime + 0.15)
        osc2.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3)
        gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.15)
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35)
        osc2.start(ctx.currentTime + 0.15)
        osc2.stop(ctx.currentTime + 0.35)
      } else if (type === 'horn') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(220, ctx.currentTime)
        osc.frequency.setValueAtTime(280, ctx.currentTime + 0.15)
        osc.frequency.setValueAtTime(220, ctx.currentTime + 0.3)
        gain.gain.setValueAtTime(0.25, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.4)
      } else if (type === 'meow') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.setValueAtTime(600, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15)
        osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.35)
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.4)
      } else if (type === 'crash') {
        // Tractor crash
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(150, ctx.currentTime)
        osc.frequency.linearRampToValueAtTime(30, ctx.currentTime + 0.5)
        gain.gain.setValueAtTime(0.5, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.5)
      } else if (type === 'smooch') {
        const notes = [800, 1000, 1200, 800]
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator()
          const g = ctx.createGain()
          o.connect(g)
          g.connect(ctx.destination)
          o.type = 'sine'
          o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)
          g.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08)
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.1)
          o.start(ctx.currentTime + i * 0.08)
          o.stop(ctx.currentTime + i * 0.08 + 0.1)
        })
        return
      } else if (type === 'lullaby') {
        // Soft dhol lullaby - gentle low tones
        const notes = [80, 100, 80, 60]
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator()
          const g = ctx.createGain()
          o.connect(g)
          g.connect(ctx.destination)
          o.type = 'triangle'
          o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.25)
          g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.25)
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.25 + 0.3)
          o.start(ctx.currentTime + i * 0.25)
          o.stop(ctx.currentTime + i * 0.25 + 0.3)
        })
        return
      }
    } catch(e) {}
  }

  // Spawn a Zzz particle
  const spawnZzz = () => {
    const newZ = {
      id: Date.now() + Math.random(),
      left: 10 + Math.random() * 80,
      size: 0.8 + Math.random() * 0.8,
      dur: 3 + Math.random() * 2
    }
    setHugZzz(prev => [...prev.slice(-12), newZ])
  }

  // Auto-spawn Zzz on hug day
  useEffect(() => {
    if (activeDay !== 'hug') return
    const interval = setInterval(spawnZzz, 1500)
    // Play lullaby on load
    const timer = setTimeout(() => playHugSound('lullaby'), 500)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [activeDay])

  const handleHug = () => {
    if (hugMaxed) return
    const newCount = hugCountRef.current + 1
    hugCountRef.current = newCount
    setHugCount(newCount)

    // Squeeze animation
    setHugSqueeze(true)
    setTimeout(() => setHugSqueeze(false), 300)

    // Vibration
    if (navigator.vibrate) navigator.vibrate(200)

    // Sound
    const sounds = ['squish', 'horn', 'squish', 'squish']
    playHugSound(sounds[newCount % sounds.length])

    // Random message for non-milestone taps
    setHugMsg(hugRandomMsgs[Math.floor(Math.random() * hugRandomMsgs.length)])
    setTimeout(() => { if (hugCountRef.current === newCount) setHugMsg('') }, 2500)

    // Check milestones
    const milestone = hugMilestones[newCount]
    if (milestone) {
      setHugMilestone(milestone)
      setTimeout(() => setHugMilestone(null), 5000)

      switch (milestone.effect) {
        case 'blush':
          setHugBlush(true)
          playHugSound('squish')
          setTimeout(() => setHugBlush(false), 2000)
          break
        case 'billi':
          setHugBilli(true)
          playHugSound('meow')
          setTimeout(() => setHugBilli(false), 4000)
          break
        case 'confetti':
          triggerConfetti()
          playSound('celebration')
          break
        case 'tractor':
          setHugTractor(true)
          playHugSound('crash')
          triggerConfetti()
          setTimeout(() => setHugTractor(false), 3000)
          break
        case 'overheat':
          setHugOverheat(true)
          playSound('error')
          if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200])
          setTimeout(() => setHugOverheat(false), 3000)
          break
        case 'kiss':
          setHugKissRain(true)
          setHugFog(true)
          playHugSound('smooch')
          setTimeout(() => { setHugKissRain(false); setHugFog(false) }, 4000)
          break
        case 'chaos':
          setHugChaos(true)
          playSound('celebration')
          triggerConfetti()
          if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200, 100, 400])
          setTimeout(() => setHugChaos(false), 5000)
          break
        case 'maxed':
          setHugMaxed(true)
          playSound('celebration')
          triggerConfetti()
          setTimeout(() => triggerConfetti(), 1000)
          break
      }
    }

    // At 5 hugs: confetti -> Zzz
    if (newCount === 5) {
      triggerConfetti()
    }

    // Flip hug at 3
    if (newCount === 3) {
      setTimeout(() => {
        setHugFlip(true)
        setTimeout(() => setHugFlip(false), 4000)
      }, 2500)
    }
  }

  return (
    <div onClick={enableSound}>
      {/* Sound Enable Overlay - Shows on first visit */}
      {showSoundOverlay && activeDay === 'rose' && (
        <div className="sound-overlay" onClick={activateSoundWithHooter}>
          <div className="sound-overlay-content">
            <div className="sound-overlay-icon">🚨</div>
            <h2 className="sound-overlay-title">EMERGENCY ALERT!</h2>
            <p className="sound-overlay-text">Rose Day Emergency Broadcast</p>
            <button className="sound-overlay-btn">
              🔊 Tap to Enable Sound & Start
            </button>
            <p className="sound-overlay-hint">Best experience with sound ON!</p>
          </div>
        </div>
      )}

      {/* Sound Toggle Button */}
      <button
        className="sound-toggle"
        onClick={(e) => {
          e.stopPropagation()
          if (!soundEnabled) {
            activateSoundWithHooter()
          } else {
            setSoundEnabled(false)
          }
        }}
        title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      {/* Valentine Week Navigation */}
      <nav className="week-nav">
        <h2 className="week-nav-title">💕 Valentine Week 2025 💕</h2>
        <div className="week-nav-items">
          {valentineWeekDays.map((day) => (
            <button
              key={day.id}
              className={`week-nav-item ${activeDay === day.id ? 'active' : ''}`}
              onClick={() => handleDayChange(day.id)}
            >
              <span className="week-nav-emoji">{day.emoji}</span>
              <span className="week-nav-name">{day.name}</span>
              <span className="week-nav-date">{day.date}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ========== ROSE DAY CONTENT ========== */}
      {activeDay === 'rose' && (
        <>
          {/* Siren Header */}
          <div className="siren">
        <span className="ticker">
          🚨 BREAKING NEWS: Boyfriend attempts romance... results may be disastrous 🚨
          ALERT: Rose Day emergency in progress 🌹
          CRITICAL: Simp levels reaching maximum capacity 💀
          WARNING: Cringe immunity required 🚨
        </span>
      </div>

      {/* Menu Bar */}
      <nav className="menu-bar">
        <button className="menu-item" onClick={() => scrollToSection(1)}>
          <span>🚨</span>Alert
        </button>
        <button className="menu-item" onClick={() => scrollToSection(2)}>
          <span>📖</span>5 Stages
        </button>
        <button className="menu-item" onClick={() => scrollToSection(3)}>
          <span>💭</span>Said vs Actual
        </button>
        <button className="menu-item" onClick={() => scrollToSection(4)}>
          <span>🎤</span>Rap Battle
        </button>
        <button className="menu-item" onClick={() => scrollToSection(5)}>
          <span>🎬</span>Bollywood
        </button>
        <button className="menu-item" onClick={() => scrollToSection(6)}>
          <span>🔬</span>Science
        </button>
        <button className="menu-item" onClick={() => scrollToSection('jokes')}>
          <span>😂</span>Jokes
        </button>
        <button className="menu-item" onClick={() => scrollToSection('shayari')}>
          <span>📝</span>Shayari
        </button>
        <button className="menu-item" onClick={() => scrollToSection(7)}>
          <span>🌹</span>Reality
        </button>
        <button className="menu-item" onClick={() => scrollToSection(8)}>
          <span>📋</span>Guide
        </button>
        <button className="menu-item" onClick={() => scrollToSection(9)}>
          <span>⏰</span>Countdown
        </button>
        <button className="menu-item" onClick={() => scrollToSection(10)}>
          <span>💖</span>Finale
        </button>
        <button className="menu-item" onClick={() => scrollToSection('valentine')}>
          <span>💘</span>Question
        </button>
        <button className="menu-item" onClick={() => scrollToSection('gift')}>
          <span>🎁</span>Gift
        </button>
      </nav>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" style={{ opacity: showScrollIndicator ? 1 : 0 }}>
        👇 Scroll for chaos 👇
      </div>

      {/* SECTION 1: Emergency Broadcast */}
      <section className="section emergency-section" id="section1">
        <h1 className="emergency-title">🚨 ROSE DAY EMERGENCY BROADCAST 🚨</h1>

        <div className="emergency-content">
          <p>📢 <strong>This just in:</strong> Lakshay has purchased ONE rose. Sources say he spent 17 minutes choosing between red and... <em>slightly darker red.</em></p>

          <p>🔍 <strong>Investigation reveals:</strong> Subject rehearsed &quot;Happy Rose Day&quot; in mirror 47 times. Still sounds weird.</p>

          <div className="alert-level">⚠️ ALERT LEVEL: CRITICAL SIMP</div>

          <p>📊 <strong>Current Status:</strong> Girlfriend immunity to cringe at 3% and dropping rapidly.</p>
        </div>

        <button className="continue-btn" onClick={() => scrollToSection(2)}>
          Continue if you dare... 💀
        </button>
      </section>

      {/* SECTION 2: 5 Stages */}
      <section className="section stages-section" id="section2">
        <h2 className="stages-title">📖 The 5 Stages of Me Buying Your Rose</h2>

        <div className="stages-container">
          <div className="stage-card">
            <div className="stage-number">1</div>
            <div className="stage-title-text">💪 Confidence Level: 100</div>
            <div className="stage-content">&quot;Today, I become a poet. Shakespeare could never. Watch me rizz.&quot;</div>
            <span className="sound-effect">MOTIVATED!</span>
          </div>

          <div className="stage-card">
            <div className="stage-number">2</div>
            <div className="stage-title-text">🌹 At The Flower Shop</div>
            <div className="stage-content">&quot;Bhaiya... yeh wala rose kitne ka? ...aur yeh thoda sasta wala? ...ek minute, Google Pay chalega?&quot;</div>
            <span className="sound-effect">BROKE!</span>
          </div>

          <div className="stage-card">
            <div className="stage-number">3</div>
            <div className="stage-title-text">💳 Payment Disaster</div>
            <div className="stage-content">&quot;UPI failed 3 times. Net banking crashed. Finally paid ₹80 in coins. Shopkeeper judging my entire existence.&quot;</div>
            <span className="sound-effect">EMBARRASSING!</span>
          </div>

          <div className="stage-card">
            <div className="stage-number">4</div>
            <div className="stage-title-text">🚶 Walking Home</div>
            <div className="stage-content">&quot;Why is everyone staring? Oh wait... I&apos;m holding this rose like it&apos;s a sword. Aunties whispering &apos;ladka pagal hai.&apos;&quot;</div>
            <span className="sound-effect">AWKWARD!</span>
          </div>

          <div className="stage-card">
            <div className="stage-number">5</div>
            <div className="stage-title-text">🪞 Final Mirror Check</div>
            <div className="stage-content">&quot;You look romantic, bro... no you don&apos;t... yes you do... bro shut up... okay final pose... nope that&apos;s worse...&quot;</div>
            <span className="sound-effect">DISASTER!</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: Wanted vs Actual */}
      <section className="section comparison-section" id="section3">
        <h2 className="comparison-title">💭 What I Wanted to Say<br/>vs<br/>🗣️ What I Actually Said</h2>

        <div className="comparison-card">
          <div className="comparison-row">
            <div className="wanted-box">
              <span className="wanted-label">✨ POETIC VERSION</span>
              <p>&quot;Your smile is more beautiful than a thousand roses blooming in spring.&quot;</p>
            </div>
            <div className="emoji-explosion">💖✨💖</div>
            <div className="actual-box">
              <span className="actual-label">🤦 LAKSHAY VERSION</span>
              <p>&quot;Teri smile se toh rose bhi jealous ho raha hai bhai... matlab flower jealous ho raha hai... tu samjhi na?&quot;</p>
            </div>
            <div className="emoji-explosion">🤦💀🤦</div>
          </div>
        </div>

        <div className="comparison-card">
          <div className="comparison-row">
            <div className="wanted-box">
              <span className="wanted-label">✨ POETIC VERSION</span>
              <p>&quot;I would cross oceans and climb mountains just to see you.&quot;</p>
            </div>
            <div className="emoji-explosion">🌊⛰️💕</div>
            <div className="actual-box">
              <span className="actual-label">🤦 LAKSHAY VERSION</span>
              <p>&quot;Main tere liye 2 metro change kar chuka hoon yaar. DMRC should give me award.&quot;</p>
            </div>
            <div className="emoji-explosion">🚇😭🚇</div>
          </div>
        </div>

        <div className="comparison-card">
          <div className="comparison-row">
            <div className="wanted-box">
              <span className="wanted-label">✨ POETIC VERSION</span>
              <p>&quot;Every moment with you feels like a beautiful dream.&quot;</p>
            </div>
            <div className="emoji-explosion">😴💫💖</div>
            <div className="actual-box">
              <span className="actual-label">🤦 LAKSHAY VERSION</span>
              <p>&quot;Tujhse baat karke neend aa jaati hai... WAIT NO I MEANT PEACEFULLY!&quot;</p>
            </div>
            <div className="emoji-explosion">💀⚰️💀</div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Rap Battle */}
      <section className="section battle-section" id="section4">
        <h2 className="battle-title">🎤 ROSE DAY RAP BATTLE 🎤</h2>

        <div className="battle-arena">
          <div className="vs-badge">VS</div>

          <div className="battle-lines">
            <div className="battle-line left">
              <div className="battle-avatar rose-avatar">🌹</div>
              <div className="battle-bubble">
                <p><strong>Rose:</strong> &quot;Bro you bought me for ₹80... that&apos;s literally an insult to my whole species.&quot;</p>
              </div>
            </div>

            <div className="battle-line right">
              <div className="battle-avatar me-avatar">😰</div>
              <div className="battle-bubble">
                <p><strong>Me:</strong> &quot;At least someone is willing to stay with me longer than 7 days!&quot;</p>
              </div>
            </div>

            <div className="battle-line left">
              <div className="battle-avatar rose-avatar">🌹</div>
              <div className="battle-bubble">
                <p><strong>Rose:</strong> &quot;I come with thorns. What&apos;s your excuse for being prickly?&quot;</p>
              </div>
            </div>

            <div className="battle-line right">
              <div className="battle-avatar me-avatar">😤</div>
              <div className="battle-bubble">
                <p><strong>Me:</strong> &quot;Bro her personality also has thorns sometimes... we&apos;re a perfect match!&quot;</p>
              </div>
            </div>

            <div className="battle-line left">
              <div className="battle-avatar rose-avatar">🌹</div>
              <div className="battle-bubble">
                <p><strong>Rose:</strong> &quot;I&apos;m gonna die in 5 days. What&apos;s your life plan?&quot;</p>
              </div>
            </div>

            <div className="battle-line right">
              <div className="battle-avatar me-avatar">😭</div>
              <div className="battle-bubble">
                <p><strong>Me:</strong> &quot;Same energy as my New Year resolutions... gone by January 6th.&quot;</p>
              </div>
            </div>

            <div className="battle-line left">
              <div className="battle-avatar rose-avatar">🌹</div>
              <div className="battle-bubble">
                <p><strong>Rose:</strong> &quot;At least I&apos;m red. You turn red just saying &apos;I love you.&apos;&quot;</p>
              </div>
            </div>

            <div className="battle-line right">
              <div className="battle-avatar me-avatar">🏳️</div>
              <div className="battle-bubble">
                <p><strong>Me:</strong> &quot;...okay you win. Happy Rose Day to you too, traitor.&quot;</p>
              </div>
            </div>
          </div>

          <div className="mic-drop">🎤⬇️</div>
        </div>
      </section>

      {/* SECTION 5: Bollywood Titles */}
      <section className="section bollywood-section" id="section5">
        <h2 className="bollywood-title">🎬 If Our Relationship Was a Bollywood Movie...</h2>

        <div className="movie-poster">
          <h3>Ek Rose Ki Jungli Kahani</h3>
          <p>&quot;One rose. One broke boy. Unlimited cringe.&quot;</p>
          <div className="star-rating">⭐⭐⭐⭐⭐</div>
        </div>

        <div className="movie-poster">
          <h3>Rose Day: Return of The Simp</h3>
          <p>&quot;He&apos;s back. He&apos;s broke. He&apos;s still trying.&quot;</p>
          <div className="star-rating">⭐⭐⭐⭐⭐</div>
        </div>

        <div className="movie-poster">
          <h3>Golmaal Returns... With One Flower Only</h3>
          <p>&quot;Because budget mein ek hi aata hai&quot;</p>
          <div className="star-rating">⭐⭐⭐⭐⭐</div>
        </div>

        <div className="movie-poster">
          <h3>Tere Naam... Par Rose Nahi Mila</h3>
          <p>&quot;A tragic tale of sold-out flower shops&quot;</p>
          <div className="star-rating">⭐⭐⭐⭐⭐</div>
        </div>

        <div className="movie-poster">
          <h3>Main Hoon Na... Budget Mein Rose Laaya</h3>
          <p>&quot;Starring: One wilting rose and zero dignity&quot;</p>
          <div className="star-rating">⭐⭐⭐⭐⭐</div>
        </div>
      </section>

      {/* SECTION 6: Scientific Proof */}
      <section className="section science-section" id="section6">
        <h2 className="science-title">🔬 Scientific Proof That I&apos;m Biologically Incapable of Romance</h2>

        <div className="lab-report">
          <h3>📊 Brain Activity Analysis</h3>

          <div className="pie-chart-container">
            <div className="pie-chart"></div>
          </div>

          <div className="pie-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#ff6b6b' }}></div>
              <span>70% - Hunger & Food Thoughts</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#4a90d9' }}></div>
              <span>20% - Sleep Deficiency</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#ffd700' }}></div>
              <span>9% - Thinking About You</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#00ff88' }}></div>
              <span>1% - Remembering Anniversaries</span>
            </div>
          </div>
        </div>

        <div className="lab-report">
          <h3>🧠 MRI Scan Results</h3>

          <div className="mri-scan">
            <div className="brain-emoji">🧠</div>
            <div className="scan-result">
              ⚠️ ZERO poetic neurons detected<br/>
              ⚠️ Romance cortex: OFFLINE<br/>
              ⚠️ Dad joke generator: OVERACTIVE
            </div>
          </div>
        </div>

        <div className="lab-report">
          <h3>⚗️ Lab Test: Romance Capability</h3>

          <div className="loading-label">Romance Level Loading...</div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <p style={{ textAlign: 'center', color: '#ff4444', fontWeight: 'bold' }}>Result: 3% (Critical Failure)</p>

          <p style={{ marginTop: '20px', textAlign: 'center', color: '#888' }}>
            <em>When asked to be romantic → produces dad jokes at 300% speed</em>
          </p>
        </div>
      </section>

      {/* JOKES KA PITARA - Gulab Da Hungama */}
      <section className="section jokes-section" id="sectionjokes">
        <h2 className="jokes-title">😂 JOKES KA PITARA 😂</h2>
        <p className="jokes-subtitle">🚜 Gulab Da Hungama - Punjabi Style! 🌹</p>

        <div className="laugh-meter">
          <h4>📊 Hassi Meter Loading...</h4>
          <div className="laugh-bar">
            <div className="laugh-fill"></div>
          </div>
          <p className="laugh-text">Warning: Side effects include snorting chai! ☕😂</p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Classic</span>
          <span className="joke-emoji">🌹</span>
          <p className="joke-text">
            <span className="punjabi">&quot;Roses are red, violets are blue,</span> ehni sohni ban ke kithe chali tu?
            Main tractor te wait karda, par tu Uber book kar leti! 😂🚜&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Budget Wala</span>
          <span className="joke-emoji">💸</span>
          <p className="joke-text">
            &quot;Gulab laaya si gift vich, par tu boli <span className="punjabi">&apos;eh taan gas station da wilted wala ae!&apos;</span>
            Oye, budget Jatt da budget! 🌹😭&quot;
          </p>
        </div>

        <div className="tractor-divider">🚜💨</div>

        <div className="joke-card">
          <span className="joke-category">Deep</span>
          <span className="joke-emoji">🥀</span>
          <p className="joke-text">
            &quot;Happy Rose Day! <span className="punjabi">Menu pyar da gulab chahida si, par life ne menu sirf kanda hi ditte ne.</span>
            Tu hi meri khushboo ae! (Par allergy na ho jaave 😷)&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Filmy</span>
          <span className="joke-emoji">💃</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Roses are red, pataka boom,</span> teri smile dekh ke mera dil &apos;balle balle&apos; karda zoom! 🕺💃&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Warning</span>
          <span className="joke-emoji">⚠️</span>
          <p className="joke-text">
            &quot;Warning: <span className="punjabi">Eh site vich itni bakwas hai ki rose vi sharma jauga.</span>
            Scroll kar, has has ke pet dukh jauga – par blame mat karna, mainu &apos;pyar vich pagal&apos; keh ke!&quot;
          </p>
        </div>

        <div className="tractor-divider">🌹🚜🌹</div>

        <div className="joke-card">
          <span className="joke-category">First Date</span>
          <span className="joke-emoji">😅</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Jadon pehli vaar date te gaya:</span> Rose laaya, par hotel vich waiter ne poochya
            &apos;saab, eh taan plastic da ae?&apos; Beizzati level: Expert! 🤡&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Reason #1</span>
          <span className="joke-emoji">⚡</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Teri hasi – jaise khet vich bijli gir gayi ho!</span>
            Fake chhink maar ke vi sunna painda, warna full voltage lag jauga 😂⚡&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Reason #2</span>
          <span className="joke-emoji">🚜</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Tu meri Bhangra tolerate kardi.</span>
            Jo basically tractor di steering ghumande ghumande disco steps lag rahe ne! 💪🕺&quot;
          </p>
        </div>

        <div className="tractor-divider">💃🚜💃</div>

        <div className="joke-card">
          <span className="joke-category">Reason #3</span>
          <span className="joke-emoji">👀</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Teri akhan – jaise Amritsari jalebi vich extra chashni!</span>
            Sparkle itna ki main blind ho jaan wala si, par chashma nahi pehna! 🍯✨&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Reason #4</span>
          <span className="joke-emoji">🍲</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Tu mere naal chole bhature khake food poisoning enjoy kardi.</span>
            Pyar vich zehar vi sweet lagda ae! 🤢❤️&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Reason #5</span>
          <span className="joke-emoji">🔥</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Tu microwave vich rose ton vi hot ae.</span>
            Par ghar aake try kitti – rose jal gaya, mera ego vi! 🔥😭&quot;
          </p>
        </div>

        <div className="tractor-divider">🔥🚜🔥</div>

        <div className="joke-card">
          <span className="joke-category">Reason #6</span>
          <span className="joke-emoji">🤗</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Teri hug fix sab kardi.</span> Par romance allergy?
            Menu chhink aa rahi, tu &apos;bless you&apos; keh ke hasdi rehndi! 🤧😂&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Reason #7</span>
          <span className="joke-emoji">🐱</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Tere bina main apne billi nu gulab dinda.</span>
            Whiskers boli &apos;oye Jatt, eh taan fake love ae – asli milk la!&apos; 🐱🥛&quot;
          </p>
        </div>

        <div className="joke-card">
          <span className="joke-category">Epic</span>
          <span className="joke-emoji">🍺</span>
          <p className="joke-text">
            &quot;<span className="punjabi">Roses are red, patiala peg blue,</span> tu naal pyar karda,
            menu lagda &apos;full volume&apos; wala mood! Chal celebrate karange – chole bhature te dance? 💃🕺&quot;
          </p>
        </div>

        <div className="laugh-meter">
          <h4>🎉 Hassi Complete!</h4>
          <p className="laugh-text">Agar has has ke mar gayi taan blame mera nahi, teri hasi da dosh! 😂💕</p>
        </div>
      </section>

      {/* SHAYARI SECTION - Dil Ki Baat */}
      <section className="section shayari-section" id="sectionshayari">
        <h2 className="shayari-title">📝 SHAYARI CORNER 📝</h2>
        <p className="shayari-subtitle">🌹 Dil Ki Baat - Romantic & Funny Shayari 💕</p>

        <div className="shayari-category-title">💕 Romantic Shayari 💕</div>

        <div className="shayari-card romantic">
          <span className="shayari-badge">❤️ Romantic</span>
          <div className="shayari-icon">🌹</div>
          <p className="shayari-text">
            &quot;तू वो गुलाब है जिसमें खूशबू भी है, सुंदरता भी है,<br/>
            न कांटे हैं न मुरझाने की फितरत है,<br/>
            बस तुझमें मेरी जिंदगी की हर खुशी है।&quot;
          </p>
          <p className="shayari-ending">Happy Rose Day, meri jaan! 🌹❤️</p>
        </div>

        <div className="shayari-card romantic">
          <span className="shayari-badge">💖 Filmy</span>
          <div className="shayari-icon">🎬</div>
          <p className="shayari-text">
            &quot;मिले थे तुम जिस रोज, तब से चाहा है तुम्हें हर रोज,<br/>
            मेरी तरफ से कुबूल कर लेना ये प्यारा सा रेड रोज।<br/>
            तुझ बिन जिंदगी अधूरी, जैसे बिना खुशबू का गुलाब।&quot;
          </p>
          <p className="shayari-ending">Happy Rose Day, sohniye! 🌹</p>
        </div>

        <div className="shayari-card romantic">
          <span className="shayari-badge">✨ Sweet</span>
          <div className="shayari-icon">😘</div>
          <p className="shayari-text">
            &quot;गुलाब की तरह तेरी हर बात प्यारी लगे,<br/>
            तेरी मुस्कान से मेरी दुनिया महक उठे।<br/>
            तू है मेरी वो खुशबू जो कभी नहीं जाती,<br/>
            बस तुझसे ही तो दिल की हर धड़कन बढ़ती है।&quot;
          </p>
          <p className="shayari-ending">Rose Day Mubarak! 😘🌹</p>
        </div>

        <div className="shayari-card romantic">
          <span className="shayari-badge">💫 Dreamy</span>
          <div className="shayari-icon">💭</div>
          <p className="shayari-text">
            &quot;एक खूबसूरत ख्वाब हो तुम,<br/>
            दिल को छू जाने वाले एहसास हो तुम,<br/>
            गुलाबों में क्या दूं मैं तुझे,<br/>
            गुलाबों से भी खूबसूरत गुलाब हो तुम।&quot;
          </p>
          <p className="shayari-ending">Happy Rose Day, my love! 💕🌹</p>
        </div>

        <div className="shayari-card romantic">
          <span className="shayari-badge">🙏 Emotional</span>
          <div className="shayari-icon">💗</div>
          <p className="shayari-text">
            &quot;हर लम्हा तुझ पर कुर्बान कर दूं,<br/>
            हर फूल की खुशबू तेरे नाम कर दूं।<br/>
            बस यही दुआ है इस Rose Day पर,<br/>
            तुझे खुद से भी ज्यादा प्यार कर दूं।&quot;
          </p>
          <p className="shayari-ending">Forever yours! 🌹💕</p>
        </div>

        <div className="rose-divider">🌹✨🌹✨🌹</div>

        <div className="shayari-category-title">😂 Funny Shayari 😂</div>

        <div className="shayari-card funny">
          <span className="shayari-badge funny-badge">🤣 Budget Wala</span>
          <div className="shayari-icon">🚜</div>
          <p className="shayari-text">
            &quot;Roses are red, pataka boom boom,<br/>
            Teri smile dekh ke mera dil &apos;balle balle&apos; zoom zoom!<br/>
            Par budget khatam, sirf ek gulab laaya hoon,<br/>
            Baaki pyar free mein, accept kar le yaar!&quot;
          </p>
          <p className="shayari-ending">😂🌹🚜</p>
        </div>

        <div className="shayari-card funny">
          <span className="shayari-badge funny-badge">😅 Desi Fail</span>
          <div className="shayari-icon">🤡</div>
          <p className="shayari-text">
            &quot;Gulab laaya si gift vich,<br/>
            par tu boli &apos;oye eh taan gas station da wilted wala ae!&apos;<br/>
            Budget Jatt da budget,<br/>
            par dil da pyar full premium!&quot;
          </p>
          <p className="shayari-ending">Happy Rose Day, warna ghost mat kar dena! 🤡🌹</p>
        </div>

        <div className="shayari-card funny">
          <span className="shayari-badge funny-badge">⚡ Hyena Wali</span>
          <div className="shayari-icon">😂</div>
          <p className="shayari-text">
            &quot;Teri hasi jaise hyena ne tickle fight jeet liya,<br/>
            Main fake chhink maar ke sunta hoon har roz!<br/>
            Gulab se zyada teri hasi dangerous ae,<br/>
            pet dukh jaanda has has ke!&quot;
          </p>
          <p className="shayari-ending">😂⚡🌹</p>
        </div>

        <div className="shayari-card funny">
          <span className="shayari-badge funny-badge">🔥 Microwave</span>
          <div className="shayari-icon">🔥</div>
          <p className="shayari-text">
            &quot;Rose Day te gulab dena si plan,<br/>
            Par tu taan microwave vich try kar ke jalaa deti!<br/>
            Ab virtual gulab hi bhej raha hoon,<br/>
            real wala wait kar – na jalana!&quot;
          </p>
          <p className="shayari-ending">🔥😭🌹</p>
        </div>

        <div className="shayari-card funny">
          <span className="shayari-badge funny-badge">🐱 Billi Wala</span>
          <div className="shayari-icon">🐱</div>
          <p className="shayari-text">
            &quot;Tere bina main apne billi nu gulab dinda,<br/>
            Whiskers boli &apos;oye Jatt, eh fake love ae – asli milk la!&apos;<br/>
            Tu hi meri asli rose ae,<br/>
            baaki sab kande!&quot;
          </p>
          <p className="shayari-ending">🐱🌹🥛</p>
        </div>

        <div className="shayari-card funny">
          <span className="shayari-badge funny-badge">📱 Tilt Wala</span>
          <div className="shayari-icon">📱</div>
          <p className="shayari-text">
            &quot;Phone tilt kar grow karegi gulab,<br/>
            Par yaad rakh: Main tilt nahi karda,<br/>
            bas teri photo dekh ke high ho janda!<br/>
            Oye has le pagli, eh romance nahi comedy show ae!&quot;
          </p>
          <p className="shayari-ending">🤣📱🌹</p>
        </div>

        <div className="shayari-card funny">
          <span className="shayari-badge funny-badge">😅 Confidence</span>
          <div className="shayari-icon">😰</div>
          <p className="shayari-text">
            &quot;Roses are red, violets are fine,<br/>
            Tu naal pyar karda, menu lagda full volume mood!<br/>
            Par agar late hui date te,<br/>
            wilt ho jaunga jaise mera confidence pehli date te!&quot;
          </p>
          <p className="shayari-ending">😅🌹💀</p>
        </div>

        <div className="shayari-final-card">
          <div className="shayari-final-icon">🌹</div>
          <p className="shayari-final-text">
            &quot;Teri shayari ne doodh snort kara ditta!<br/>
            Date pakki, par gulab na bhulana<br/>
            warna kanda wala pyar!&quot;
          </p>
          <p className="shayari-final-ending">😂🥛🌹 Jatt da pyar forever! 💪❤️</p>
        </div>
      </section>

      {/* SECTION 7: Expectation vs Reality */}
      <section className="section reality-section" id="section7">
        <h2 className="reality-title">🌹 Giving You The Rose</h2>

        <div className="reality-container">
          <div className="expectation-card">
            <h3>✨ EXPECTATION ✨</h3>
            <div className="srk-pose">🕺</div>
            <p>Shah Rukh Khan arms open</p>
            <p><em>&quot;Tujhe dekha toh yeh jaana sanam...&quot;</em></p>
          </div>

          <div className="reality-card">
            <h3>💀 REALITY 💀</h3>
            <div className="auto-pose">🛺</div>
            <p>Auto driver asking for extra ₹10 energy</p>
            <p><em>&quot;Yeh le... happy rose day... chal ab khana khate hain&quot;</em></p>
          </div>
        </div>
      </section>

      {/* SECTION 8: Survival Guide */}
      <section className="section guide-section" id="section8">
        <h2 className="guide-title">📋 Rose Day Survival Guide (For You)</h2>

        <div className="guide-card">
          <div className="warning-icon">⚠️</div>
          <div className="guide-text">
            <h4>Rule #1: The Smelling Protocol</h4>
            <p>Do NOT smell the rose too hard → it will judge your entire life choices and find you lacking.</p>
          </div>
        </div>

        <div className="guide-card">
          <div className="warning-icon">🔍</div>
          <div className="guide-text">
            <h4>Rule #2: Translation Guide</h4>
            <p>If he says &quot;yeh special hai&quot; → Translation: &quot;yeh last piece bacha tha aur bhaiya ne extra ₹10 liye&quot;</p>
          </div>
        </div>

        <div className="guide-card">
          <div className="warning-icon">✅</div>
          <div className="guide-text">
            <h4>Rule #3: Expected Reactions</h4>
            <p><strong>Expected:</strong> &quot;Awww!&quot; + tight hug<br/>
            <strong>Acceptable:</strong> Laugh + roast him for 47 minutes straight</p>
          </div>
        </div>

        <div className="guide-card">
          <div className="warning-icon">💊</div>
          <div className="guide-text">
            <h4>Rule #4: Side Effects Warning</h4>
            <p>Side effects may include: unlimited dad jokes for 48 hours, random &quot;I love you yaar&quot; texts at 3 AM, and excessive use of 🌹 emoji.</p>
          </div>
        </div>

        <div className="guide-card">
          <div className="warning-icon">🆘</div>
          <div className="guide-text">
            <h4>Rule #5: Emergency Protocol</h4>
            <p>If cringe levels exceed 9000, remind yourself: &quot;At least he tried. At least he TRIED.&quot;</p>
          </div>
        </div>
      </section>

      {/* SECTION 9: Countdown */}
      <section className="section countdown-section" id="section9">
        <h2 className="countdown-title">⏰ Countdown: How Long Until I Ruin This Moment</h2>

        <div className="timer-display">{timer <= 0 ? '💀' : timer}</div>

        <div className="predictions">
          <div className="prediction-card">
            <div className="prediction-time">10 sec</div>
            <div className="prediction-text">I&apos;ll probably sneeze directly onto the rose petals 🤧</div>
          </div>

          <div className="prediction-card">
            <div className="prediction-time">7 sec</div>
            <div className="prediction-text">I&apos;ll accidentally call you &quot;bro&quot; or &quot;yaar&quot; while giving the rose 😅</div>
          </div>

          <div className="prediction-card">
            <div className="prediction-time">4 sec</div>
            <div className="prediction-text">I&apos;ll attempt a filmi SRK pose and trip over absolutely nothing 🤸</div>
          </div>

          <div className="prediction-card">
            <div className="prediction-time">0 sec</div>
            <div className="prediction-text">&quot;Happy Rose Day... yaar... bhai... I mean... you know what I mean&quot; 💀</div>
          </div>
        </div>
      </section>

      {/* SECTION 10: Final Verdict */}
      <section className="section final-section" id="section10">
        <div className="final-rose">🌹</div>

        <h2 className="final-title">💖 Final Verdict: Why You&apos;re Still With Me 💖</h2>

        <div className="final-content">
          <p>You tolerate my ₹80 rose... 🌹</p>
          <p>My zero poetry skills... 📝❌</p>
          <p>My 983 dad jokes per day... 👨</p>
          <p>My &quot;bro&quot; and &quot;yaar&quot; slip-ups... 😅</p>
          <p>My UPI failures at flower shops... 💳❌</p>
          <p>My SRK poses that look like seizures... 🕺💀</p>

          <hr />

          <p style={{ fontSize: '1.2rem' }}>
            So either you&apos;re a saint... 😇<br/>
            Or you secretly love this disaster package 📦💕
          </p>

          <p style={{ fontSize: '1.1rem', marginTop: '20px' }}>
            Either way...<br/>
            <strong>Thank you for laughing WITH me</strong><br/>
            (and mostly AT me) 😂
          </p>

          <div className="final-message">
            Happy Rose Day, Meri Favourite Reason to be Cringe! 🌹❤️
          </div>

          <p style={{ marginTop: '30px', fontSize: '1.3rem' }}>
            I love you, pagal! 💕
          </p>

          <button className="celebrate-btn" onClick={triggerConfetti}>
            🎉 Celebrate My Stupidity 🎉
          </button>
        </div>
      </section>

      {/* VALENTINE QUESTION - Life/Death Question */}
      <section className="section valentine-section" id="sectionvalentine">
        {!yesClicked ? (
          <>
            <h2 className="valentine-title">💘 AB BADA SAWAL! 💘</h2>
            <p className="valentine-subtitle">Will You Be My Valentine? 🌹❤️</p>
            <p className="valentine-warning">⚠️ No bolne ka chance nahi hai, warning! ⚠️</p>

            {showRunawayMessage && (
              <div className="runaway-message">
                {showRunawayMessage}
              </div>
            )}

            <div className="valentine-buttons">
              <button
                className="yes-btn"
                onClick={handleYesClickWithUpdate}
              >
                Haan Ji! 💃❤️
              </button>

              <button
                className="no-btn"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonSize / 100})`,
                  opacity: noButtonSize < 20 ? 0 : 1
                }}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onClick={handleNoHover}
              >
                {noButtonText}
              </button>
            </div>

            <div className="attempt-counter">
              {noAttempts > 0 && (
                <p>🏃 Bhagne ki koshish: {noAttempts} baar!</p>
              )}
              {noAttempts >= 5 && (
                <p className="give-up-text">Haar maan le, Yes hi bolna padega! 😂</p>
              )}
            </div>

            <div className="floating-roses">
              🌹 🌹 🌹 🌹 🌹
            </div>
          </>
        ) : (
          <div className="yes-response">
            <div className="celebration-hearts">💕💖💗💓💘</div>

            <h2 className="yes-title">🎉 YESSSS! 🎉</h2>

            <div className="emotional-message">
              <div className="message-rose">🌹</div>

              <h3 className="message-header">Meri Jaan</h3>

              <p className="hindi-message">
                आज ये &apos;हाँ&apos; सिर्फ एक बटन नहीं, मेरे दिल की हर धड़कन है।
              </p>

              <p className="hindi-message">
                तू मेरी वो खुशबू है जो कभी नहीं जाती,<br/>
                वो रोशनी है जो अंधेरों में भी चमकती है।
              </p>

              <p className="hindi-message">
                पहली मुलाकात से लेकर आज तक,<br/>
                हर पल तूने मुझे पूरा किया है –<br/>
                मेरी हंसी, मेरी कमजोरियां, मेरे सपने,<br/>
                सब कुछ तुझमें बस गया है।
              </p>

              <p className="hindi-message highlight">
                तू मेरे लिए वो गुलाब है<br/>
                जिसमें कांटे नहीं,<br/>
                सिर्फ प्यार की महक है।
              </p>

              <p className="hindi-message">
                बिना तेरे जिंदगी अधूरी लगती है,<br/>
                जैसे बिना खुशबू का फूल।
              </p>

              <p className="hindi-message promise">
                मैं वादा करता हूँ,<br/>
                हर Rose Day, हर Valentine,<br/>
                हर लम्हा तुझे और ज्यादा प्यार करूंगा,<br/>
                संभालूंगा, और तेरे साथ हंसता-रोता रहूंगा।
              </p>

              <p className="hindi-message big">
                तू मेरी जान है,<br/>
                मेरी दुनिया है,<br/>
                मेरी जिंदगी है।
              </p>

              <div className="final-question">
                Will you be my Valentine… forever? 💕
              </div>

              <p className="english-ending">
                I love you more than words,<br/>
                more than gulabs,<br/>
                more than anything.
              </p>

              <div className="signature">
                Forever yours,<br/>
                <span className="name">तुम्हारा Lakshay ❤️🌹</span>
              </div>
            </div>

            <button className="celebrate-btn" onClick={triggerConfetti}>
              🎉 Celebrate Our Love! 🎉
            </button>

            <p className="made-by">
              Made with ❤️ (and ChatGPT under record time 😂)
            </p>
          </div>
        )}
      </section>

      {/* SURPRISE GIFT FORM SECTION */}
      <section className="section gift-form-section" id="sectiongift">
        <h2 className="gift-title">🎁 SURPRISE GIFT TIME! 🎁</h2>
        <p className="gift-subtitle">Real gulab bhejna hai tujhe! 🌹🚚</p>

        {!formSubmitted ? (
          <div className="gift-form-container">
            <div className="form-card">
              <div className="form-icon">👸</div>
              <h3 className="form-heading">Pehle bata, tu kaun hai? 💕</h3>

              <div className="input-group">
                <label className="input-label">Tera naam kya hai, meri...?</label>
                <input
                  type="text"
                  className={`name-input ${nameValid ? 'valid' : queenName.length > 0 ? 'invalid' : ''}`}
                  placeholder="Hint: Tu meri _____ hai! 👑"
                  value={queenName}
                  onChange={(e) => validateName(e.target.value)}
                  maxLength={20}
                />
                {nameHint && (
                  <div className={`hint-text ${nameValid ? 'success' : 'error'}`}>
                    {nameHint}
                  </div>
                )}

                {/* KBC 7 Crore Meme */}
                {showKBCMeme && (
                  <div className="kbc-meme-container">
                    <div className="kbc-celebration">
                      <div className="kbc-big-emoji">🎊👑🎊</div>
                      <div className="kbc-amount">₹7,00,00,000</div>
                      <div className="kbc-confetti-text">🎉✨🎉✨🎉</div>
                    </div>
                    <div className="kbc-text">
                      <h3>🎉 SAT CRORE! 🎉</h3>
                      <p>COMPUTERJI, LOCK KAR DIYA JAYE!</p>
                      <p className="kbc-winner">👸 You are my QUEEN! 💕</p>
                    </div>
                  </div>
                )}
              </div>

              {nameValid && (
                <div className="input-group address-group">
                  <label className="input-label">Ab address bata, surprise bhejna hai! 📦</label>
                  <textarea
                    className="address-input"
                    placeholder="Full address with pincode... (min 10 characters)"
                    value={queenAddress}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    rows={4}
                  />
                  {queenAddress.length > 0 && queenAddress.length < 10 && (
                    <div className="hint-text error">
                      ❌ Thoda aur detail de! Courier wala confuse ho jayega! 📮
                    </div>
                  )}
                  {queenAddress.length >= 10 && (
                    <div className="hint-text success">
                      ✅ Perfect! Courier bhai ready hai! 🚚
                    </div>
                  )}
                </div>
              )}

              <button
                className={`submit-btn ${nameValid && queenAddress.trim().length >= 10 ? 'active' : 'disabled'}`}
                onClick={handleGiftFormSubmit}
                disabled={!nameValid || queenAddress.trim().length < 10}
              >
                {nameValid && queenAddress.trim().length >= 10 ? '🌹 Bhej Do Surprise! 🎉' : '👆 Pehle form bharo!'}
              </button>
            </div>

            <div className="form-fun-facts">
              <p>🤫 Secret: Real gulab + surprise gift incoming!</p>
              <p>📦 Delivery: Jaldi hi!</p>
              <p>💕 Pyar: Unlimited!</p>
            </div>
          </div>
        ) : (
          <div className="form-success">
            <div className="success-icon">🎉</div>
            <h3 className="success-title">DONE! 💕</h3>
            <p className="success-text">
              Teri details mil gayi, meri Queen! 👸<br/>
              Ab bas wait kar surprise ke liye! 🌹📦
            </p>
            <div className="success-hearts">💕 💖 💗 💓 💘</div>
            <p className="success-note">
              Real gulab + gift jaldi aa raha hai tere paas! 🚚✨
            </p>
          </div>
        )}

        <div className="gift-footer">
          <p>Made with ❤️ by तुम्हारा Lakshay</p>
          <p className="footer-small">(Agar surprise boring laga toh blame ChatGPT! 😂)</p>
        </div>
      </section>
        </>
      )}

      {/* ========== PROPOSE DAY - FULL PAGE ========== */}
      {activeDay === 'propose' && (
        <>
          {/* ACT 1: Grand Entry - Hero Section */}
          <section className="propose-section propose-hero">
            <div className="propose-petals-bg">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`propose-petal petal-${i % 4}`} style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                }} />
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={`ring-${i}`} className="propose-falling-ring" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 1.5 + 2}s`,
                  animationDuration: `${5 + Math.random() * 2}s`
                }}>💍</div>
              ))}
            </div>

            <div className="propose-hero-content">
              <div className="propose-groom-emoji">🤵💍</div>
              <h1 className="propose-hero-title">
                Happy Propose Day, Meri Jaan! 💍
              </h1>
              <p className="propose-hero-subtitle">
                Oye Hoye, Ab Sirf Valentine Nahi &ndash; Shaadi Da Proposal Time Aa Gaya!
                <br/>(Par pehle has le thoda! 😂)
              </p>
              <p className="propose-hero-warning">
                Warning: Eh page vich 200% bakwas, 100% dil se dil tak, te full cringe hai.
                Scroll kar, warna mainu &apos;nahi&apos; bol ke block kar dena! Jatt heartbroken ho jauga! 😭🚜
              </p>

              {ringMessage && (
                <div className="propose-ring-message">{ringMessage}</div>
              )}

              <button className="propose-entry-btn" onClick={handleProposeEntry}>
                <span className="propose-ring-icon">💍</span>
                Andar Aa Ja Meri Dulhan-To-Be!
              </button>
            </div>
          </section>

          {/* ACT 2: Meri Proposal Fail History */}
          {proposeStarted && (
            <section className="propose-section propose-fails" id="propose-act1-content">
              <h2 className="propose-section-title">
                Chapter 2: Kaise Bana Main Propose Da Sabse Bada Loser
                <br/><span className="propose-section-subtitle">(Tere Aane Se Pehle!)</span>
              </h2>

              <div className="propose-timeline">
                <div className="propose-timeline-item" onClick={() => playSound('click')}>
                  <div className="propose-timeline-dot">🍱</div>
                  <div className="propose-timeline-card">
                    <h3>School Time</h3>
                    <p>Crush nu &apos;I like you&apos; bolna si, par bol diya &apos;I like your lunchbox&apos;! Rejection level: Expert! 🍱😭</p>
                    <span className="propose-fail-badge">EPIC FAIL #1</span>
                  </div>
                </div>

                <div className="propose-timeline-item" onClick={() => playSound('click')}>
                  <div className="propose-timeline-dot">🍫</div>
                  <div className="propose-timeline-card">
                    <h3>College Days</h3>
                    <p>Ring ki jagah chocolate diya propose karte time &ndash; tu has has ke kha gayi, par &apos;yes&apos; nahi boli! 🍫</p>
                    <span className="propose-fail-badge">EPIC FAIL #2</span>
                  </div>
                </div>

                <div className="propose-timeline-item" onClick={() => playSound('click')}>
                  <div className="propose-timeline-dot">🧎</div>
                  <div className="propose-timeline-card">
                    <h3>Knee Pe Girte Time</h3>
                    <p>Romantic proposal planned si, par knee pe girte time pant phat gayi! Grace? Negative Jatt! 🤡</p>
                    <span className="propose-fail-badge">EPIC FAIL #3</span>
                  </div>
                </div>

                <div className="propose-timeline-item propose-timeline-success" onClick={() => playSound('success')}>
                  <div className="propose-timeline-dot">💍</div>
                  <div className="propose-timeline-card">
                    <h3>Ab Tere Saath</h3>
                    <p>Har din propose feel karda, par aaj officially kar raha &ndash; no more fails, promise! 💍</p>
                    <span className="propose-success-badge">TODAY IS THE DAY!</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ACT 3: Funny Reasons Cards */}
          {proposeStarted && (
            <section className="propose-section propose-reasons">
              <h2 className="propose-section-title">
                Tujhe Propose Kyun Kar Raha Hoon?
                <br/><span className="propose-section-subtitle">Funny Reasons (But 100% Sach!)</span>
              </h2>

              <div className="propose-reasons-grid">
                <div className="propose-reason-card" onClick={() => { playSound('click'); triggerConfetti() }}>
                  <div className="propose-reason-number">#1</div>
                  <p>Tu meri hasi nu full volume kardi &ndash; bina tere ghar mandir jaise silent ho jaanda! 🛕😂</p>
                </div>

                <div className="propose-reason-card" onClick={() => { playSound('click'); triggerConfetti() }}>
                  <div className="propose-reason-number">#2</div>
                  <p>Tu chole bhature fight tolerate kardi bina divorce maang ke! Future wife material! 🍲💍</p>
                </div>

                <div className="propose-reason-card" onClick={() => { playSound('click'); triggerConfetti() }}>
                  <div className="propose-reason-number">#3</div>
                  <p>Teri akhan &ndash; jaise Diwali lights! Propose na kiya taan blackout ho jauga mera dil! 💡</p>
                </div>

                <div className="propose-reason-card" onClick={() => { playSound('click'); triggerConfetti() }}>
                  <div className="propose-reason-number">#4</div>
                  <p>Tu mere naal Bhangra karti &ndash; jo basically do pagals di ladai lagdi! Perfect jodi! 🕺</p>
                </div>

                <div className="propose-reason-card" onClick={() => { playSound('click'); triggerConfetti() }}>
                  <div className="propose-reason-number">#5</div>
                  <p>Tere bina main billi nu propose karda &ndash; Whiskers boli &apos;ring nahi, milk la!&apos; 🐱</p>
                </div>

                <div className="propose-reason-card propose-reason-boss" onClick={() => { playSound('celebration'); triggerConfetti() }}>
                  <div className="propose-reason-number">#6</div>
                  <p>Because tu hi ae oh sohni jehdi naal lifetime hungama karna ae! Accept kar le! 💍</p>
                </div>
              </div>
            </section>
          )}

          {/* ACT 4: Ring Catch Game */}
          {proposeStarted && (
            <section className="propose-section propose-game">
              <h2 className="propose-section-title">
                Catch The Ring, Jaan! 💍
                <br/><span className="propose-section-subtitle">(Propose Accept Karne Ka Sign!)</span>
              </h2>

              {ringCatchState === 'idle' && (
                <div className="propose-game-intro">
                  <p>Ring catch kar! Tilt/move your finger to catch the falling rings!</p>
                  <p>3 rings catch kar le = Propose accepted! 💍</p>
                  <button className="propose-game-start-btn" onClick={startRingGame}>
                    🎮 Start Ring Catch!
                  </button>
                </div>
              )}

              {ringCatchState === 'playing' && (
                <div
                  className="propose-game-arena"
                  onTouchMove={handleFingerMove}
                  onMouseMove={handleFingerMove}
                >
                  <div className="propose-game-score">
                    💍 {ringScore}/3 caught | 💔 {ringMisses} missed
                  </div>

                  <div className="propose-ring-falling" style={{
                    left: `${ringPosition.x}%`,
                    top: `${ringPosition.y}%`
                  }}>💍</div>

                  <div className="propose-finger" style={{
                    left: `${fingerPosition}%`
                  }}>👆</div>

                  {ringMessage && (
                    <div className="propose-game-message">{ringMessage}</div>
                  )}
                </div>
              )}

              {ringCatchState === 'caught' && (
                <div className="propose-game-won">
                  <div className="propose-game-won-emoji">💍🎉💍</div>
                  <h3>{ringMessage || "Ring pakad li! Ab asli proposal time! 💍"}</h3>
                  <p>Screen hearts + dhol music... bas ab scroll kar neeche! 🥁</p>
                </div>
              )}
            </section>
          )}

          {/* ACT 5: The Real Proposal - Emotional Climax */}
          {proposeStarted && (
            <section className="propose-section propose-real">
              <div className="propose-mandap-bg">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="propose-mandap-light" style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }} />
                ))}
              </div>

              <div className="propose-real-content">
                <h2 className="propose-real-title">Ab Serious Ho Ja, Meri Jaan...</h2>

                <div className="propose-emotional-message">
                  <p className="propose-hindi-text">
                    मेरी जान, आज Propose Day पर सिर्फ़ एक सवाल नहीं, मेरे दिल की पूरी कहानी है।
                  </p>

                  <p className="propose-hindi-text">
                    तू वो लड़की है जो मेरी हर बकवास पर हंसती है, हर गलती को प्यार से सुधारती है,
                    और मेरी ज़िंदगी को रंगों से भर देती है।
                  </p>

                  <p className="propose-hindi-text">
                    पहली मुलाकात से लेकर आज तक, तूने मुझे बेहतर इंसान बनाया है &ndash;
                    मेरी हंसी, मेरे सपने, मेरा सब कुछ तुझमें है।
                  </p>

                  <p className="propose-hindi-text highlight">
                    बिना तेरे आगे की ज़िंदगी सोच भी नहीं सकता।
                    तू मेरी दोस्त है, मेरी साथी है, मेरी आने वाली हर खुशी है।
                  </p>

                  <p className="propose-hindi-text">
                    वादा करता हूँ &ndash; हर सुख-दुख में साथ रहूंगा, तेरे सपनों को अपना बनाऊंगा,
                    और तुझे दुनिया का सबसे ख़ुश रखूंगा।
                  </p>

                  <div className="propose-big-question">
                    Will you marry me&hellip; one day? 💍
                    <br/>
                    <span className="propose-parenthetical">(Ya phir abhi se haan bol de! 💍)</span>
                  </div>

                  <p className="propose-love-declaration">
                    I love you more than chole bhature, more than anything.
                    <br/>Forever tera, <strong>Lakshay</strong> ❤️
                  </p>
                </div>

                {/* Proposal Buttons */}
                {!proposeYesClicked ? (
                  <div className="propose-buttons">
                    <button className="propose-yes-btn" onClick={handleProposeYes}>
                      💍 Haan Ji! 💍
                    </button>

                    <button
                      className="propose-no-btn"
                      style={proposeNoJump > 0 ? {
                        position: 'absolute',
                        left: `${proposeNoPos.x}px`,
                        top: `${proposeNoPos.y}px`
                      } : {}}
                      onMouseEnter={handleProposeNo}
                      onTouchStart={handleProposeNo}
                    >
                      {proposeNoJump === 0 ? "Nahi... 😢" : "Just kidding, haan hi bol! 😂"}
                    </button>

                    {ringMessage && (
                      <div className="propose-ring-message">{ringMessage}</div>
                    )}
                  </div>
                ) : (
                  <div className="propose-accepted">
                    <div className="propose-accepted-emoji">🎉💍🎉</div>
                    <h3 className="propose-accepted-title">HAAN BOL DITTA! 🥳</h3>
                    <p className="propose-accepted-text">
                      Ab ring shopping? 😍<br/>
                      Tere saath lifetime hungama confirmed! 💕
                    </p>
                    <div className="propose-accepted-hearts">💍 💕 💍 💕 💍</div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ACT 6: Address/Surprise Tie-In */}
          {proposeStarted && proposeYesClicked && (
            <section className="propose-section propose-surprise">
              <div className="propose-surprise-content">
                <div className="propose-surprise-emoji">🚚💍</div>
                <h2 className="propose-surprise-title">Propose Accept Ho Gaya?!</h2>
                <p className="propose-surprise-text">
                  Ab address confirm kar de taaki asli ring + gift pahunche! 🚚💍
                </p>
                <button className="propose-surprise-btn" onClick={() => {
                  playSound('click')
                  handleDayChange('rose')
                  setTimeout(() => {
                    document.getElementById('sectiongift')?.scrollIntoView({ behavior: 'smooth' })
                  }, 500)
                }}>
                  🎁 Gift Form Pe Chal! 🌹
                </button>
                <p className="propose-surprise-footer">
                  Made with ❤️ by tumhara Lakshay
                  <br/><span className="propose-footer-small">(Agar cringe laga toh blame the Jatt romance gene! 😂)</span>
                </p>
              </div>
            </section>
          )}
        </>
      )}

      {/* ========== CHOCOLATE DAY - QUIZ ========== */}
      {activeDay === 'chocolate' && (
        <section className="choco-quiz-section">
          <div className="choco-quiz-header">
            <div className="choco-header-emoji">🍫</div>
            <h1 className="choco-header-title">Chocolate Day Quiz</h1>
            <p className="choco-header-subtitle">9th February</p>
            <p className="choco-header-tagline">Kitna jaanti hai tu mujhe? Chal prove kar! 😏</p>
          </div>

          {!chocoQuizDone ? (
            <div className="choco-quiz-carousel"
              onTouchStart={handleChocoTouchStart}
              onTouchEnd={handleChocoTouchEnd}
            >
              {/* Progress bar */}
              <div className="choco-progress-bar">
                {chocoQuizQuestions.map((_, i) => (
                  <div key={i} className={`choco-progress-dot ${i < chocoQuizIndex ? 'done' : ''} ${i === chocoQuizIndex ? 'active' : ''}`}>
                    {i < chocoQuizIndex ? '✓' : i + 1}
                  </div>
                ))}
              </div>

              {/* Question Card */}
              <div className={`choco-question-card ${chocoSwipeDir}`}>
                <div className="choco-q-number">Q{chocoQuizIndex + 1} / {chocoQuizQuestions.length}</div>

                {/* Video player for video questions */}
                {chocoQuizQuestions[chocoQuizIndex].video && (
                  <div className="choco-video-wrapper">
                    <video
                      className="choco-video-player"
                      src={chocoQuizQuestions[chocoQuizIndex].video}
                      controls
                      playsInline
                      loop
                      muted
                      autoPlay
                    />
                    <div className="choco-video-label">👆 Dekh ke bata!</div>
                  </div>
                )}

                <h2 className="choco-q-text">{chocoQuizQuestions[chocoQuizIndex].q}</h2>

                <div className="choco-options">
                  {chocoQuizQuestions[chocoQuizIndex].options.map((opt, i) => {
                    let optClass = 'choco-option'
                    if (chocoQuizAnswered) {
                      if (i === chocoQuizQuestions[chocoQuizIndex].answer) {
                        optClass += ' correct'
                      } else if (!chocoQuizCorrect && i !== chocoQuizQuestions[chocoQuizIndex].answer) {
                        optClass += ' wrong'
                      }
                    }
                    return (
                      <button
                        key={i}
                        className={optClass}
                        onClick={() => handleChocoAnswer(i)}
                        disabled={chocoQuizAnswered}
                      >
                        <span className="choco-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span className="choco-option-text">{opt}</span>
                        {chocoQuizAnswered && i === chocoQuizQuestions[chocoQuizIndex].answer && (
                          <span className="choco-option-icon">✅</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Feedback */}
                {chocoQuizAnswered && (
                  <div className={`choco-feedback ${chocoQuizCorrect ? 'correct' : 'wrong'}`}>
                    {chocoQuizCorrect ? (
                      <div className="choco-feedback-correct">
                        <span className="choco-feedback-emoji">🎉🍫</span>
                        <p>Sahi jawab! Tu toh meri expert nikli! 💕</p>
                      </div>
                    ) : (
                      <div className="choco-feedback-wrong">
                        <span className="choco-feedback-emoji">😂💀</span>
                        <p>{chocoWrongMsg}</p>
                      </div>
                    )}
                    <button className="choco-next-btn" onClick={handleChocoNext}>
                      {chocoQuizIndex < chocoQuizQuestions.length - 1 ? 'Next Question ➡️' : 'See Results 🏆'}
                    </button>
                    <p className="choco-swipe-hint">👆 Swipe left ya button daba</p>
                  </div>
                )}
              </div>

              {/* Score tracker */}
              <div className="choco-score-tracker">
                Score: {chocoQuizScore} / {chocoQuizQuestions.length} 🍫
              </div>
            </div>
          ) : (
            /* ===== QUIZ COMPLETE SCREEN ===== */
            <div className="choco-quiz-result">
              <div className="choco-result-emoji">
                {chocoQuizScore === chocoQuizQuestions.length ? '👑🍫' : chocoQuizScore >= 3 ? '🎉🍫' : chocoQuizScore >= 2 ? '😅🍫' : '💀🍫'}
              </div>
              <h2 className="choco-result-title">
                {chocoQuizScore === chocoQuizQuestions.length
                  ? 'PERFECT SCORE!'
                  : chocoQuizScore >= 3
                  ? 'Almost Perfect!'
                  : chocoQuizScore >= 2
                  ? 'Theek-thaak hai...'
                  : 'Ye kya tha?!'}
              </h2>
              <div className="choco-result-score">
                {chocoQuizScore} / {chocoQuizQuestions.length}
              </div>
              <p className="choco-result-msg">
                {chocoQuizScore === chocoQuizQuestions.length
                  ? 'Waah! Sab sahi! Tu toh sachchi mein meri soulmate hai! Extra Dairy Milk tere liye! 🍫❤️'
                  : chocoQuizScore >= 3
                  ? 'Badhiya! Almost perfect! Ek aur chocolate milegi consolation mein! 🍬'
                  : chocoQuizScore >= 2
                  ? 'Hmm... 50-50 hai... jaise KBC mein lifeline lagti hai waise mujhse puchh lena next time! 😂'
                  : 'Arre yaar! Itna bhi nahi pata? Kya relationship mein Google Maps lagake chal rahi hai? 🗺️💀'}
              </p>
              <div className="choco-result-chocolates">
                {'🍫'.repeat(chocoQuizScore)} {'💔'.repeat(chocoQuizQuestions.length - chocoQuizScore)}
              </div>
              <button className="choco-retry-btn" onClick={resetChocoQuiz}>
                🔄 Dobara Try Kar!
              </button>
              <p className="choco-result-footer">
                Happy Chocolate Day! 🍫💕<br/>
                <span style={{fontSize: '0.9rem', opacity: 0.8}}>Calories nahi, memories count hoti hai! 😘</span>
              </p>
            </div>
          )}

          {/* ===== VALENTINE SPINNER GAME ===== */}
          <div className="spinner-game-section">
            <div className="spinner-game-header">
              <h2 className="spinner-game-title">
                Pause the video to see...<br/>
                will you be my <span className="spinner-valentine-text">Valentine</span>?
              </h2>
              <p className="spinner-game-subtitle">(Tap to stop the hand! 👆)</p>
            </div>

            <div className="spinner-wheel-container" onClick={handleSpinnerTap}>
              {/* YES/NO labels arranged in circle */}
              {spinnerLabels.map((label, i) => {
                const radians = (label.angle - 90) * (Math.PI / 180)
                const radius = 42
                const x = 50 + radius * Math.cos(radians)
                const y = 50 + radius * Math.sin(radians)
                return (
                  <span
                    key={i}
                    className={`spinner-label ${label.text === 'YES' ? 'spinner-yes' : 'spinner-no'} ${spinnerStopped && spinnerResult === 'YES' && label.text === 'YES' ? 'spinner-label-win' : ''}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {label.text}
                  </span>
                )
              })}

              {/* Center character - penguin-like creature */}
              <div className="spinner-center-character">
                <div className="spinner-penguin">
                  <div className="spinner-penguin-halo">😇</div>
                  <div className="spinner-penguin-body">🐧</div>
                  <div className="spinner-penguin-glasses">😎</div>
                </div>
                {/* Rotating hand/pointer */}
                <div
                  className="spinner-hand"
                  style={{ transform: `rotate(${spinnerAngle}deg)` }}
                >
                  <div className="spinner-hand-pointer">👆</div>
                </div>
              </div>

              {/* Tap hint ripple */}
              {!spinnerStopped && (
                <div className="spinner-tap-hint">TAP!</div>
              )}
            </div>

            {/* Result message */}
            {spinnerStopped && (
              <div className="spinner-result-area">
                <div className="spinner-result-msg">
                  <span className="spinner-result-emoji">💕🎉💕</span>
                  <h3>It&apos;s a YES!</h3>
                  <p>Dekha? Universe bhi chaahta hai ki tu meri Valentine ho! 😏❤️</p>
                  <p className="spinner-result-sub">Haath bhi tere taraf hi ruka... kismat hai ya setting? 😂🍫</p>
                </div>
                <button className="spinner-retry-btn" onClick={resetSpinner}>
                  🔄 Ek Aur Baar Try Kar (Result Same Aayega 😜)
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========== TEDDY DAY - WHACK-A-BEAR GAME ========== */}
      {activeDay === 'teddy' && (
        <section className="wab-section" style={{ background: wabState === 'playing' ? (wabLevels[wabLevel - 1]?.bg || '#5d4037') : 'linear-gradient(135deg, #4e342e 0%, #6d4c41 40%, #8d6e63 100%)' }}>

          {/* ---- INTRO SCREEN ---- */}
          {wabState === 'intro' && (
            <div className="wab-intro">
              <div className="wab-intro-bear">🧸</div>
              <h1 className="wab-title">WHACK-A-BEAR!</h1>
              <p className="wab-subtitle">Teddy Day Special Edition</p>
              <div className="wab-intro-story">
                <p>Tere teddy bears pagal ho gaye hain! 🤪</p>
                <p>Ye randomly holes se bahar aa rahe hain...</p>
                <p>Tera mission: Inhe wapas holes mein bhejo! 🔨</p>
              </div>
              <div className="wab-intro-bears-row">
                <span className="wab-intro-bear-item">🧸<small>10 pts</small></span>
                <span className="wab-intro-bear-item">🐻<small>20 pts</small></span>
                <span className="wab-intro-bear-item">🐼<small>30 pts</small></span>
                <span className="wab-intro-bear-item">✨<small>50 pts</small></span>
                <span className="wab-intro-bear-item wab-bomb-item">💣<small>BOOM!</small></span>
                <span className="wab-intro-bear-item">💝<small>+1 Life</small></span>
              </div>
              <div className="wab-intro-rules">
                <p>🧸 Bears ko tap karo = Points!</p>
                <p>💣 Bombs se bachna = Survive!</p>
                <p>💝 Love bears = Extra life!</p>
                <p>⚡ Combos = Bonus points!</p>
                <p>👑 Level 5 mein Boss Bear se ladna hai!</p>
              </div>
              {wabHighScore > 0 && (
                <div className="wab-high-score-badge">
                  🏆 High Score: {wabHighScore}
                </div>
              )}
              <button className="wab-start-btn" onClick={() => { playSound('click'); startWabGame() }}>
                🔨 SHURU KARO! 🐻
              </button>
              <button className="wab-music-toggle" onClick={() => setWabMusicOn(prev => !prev)}>
                {wabMusicOn ? '🎵 Music: ON' : '🔇 Music: OFF'}
              </button>
              <p className="wab-intro-hint">Teddy se zyada cute tu hai... par teddy zyada fast hai! 😏</p>
            </div>
          )}

          {/* ---- LEVEL INTRO SCREEN ---- */}
          {wabState === 'levelIntro' && (
            <div className="wab-level-intro">
              <div className="wab-level-badge">LEVEL {wabLevel}</div>
              <h2 className="wab-level-name">{wabLevels[wabLevel - 1]?.name}</h2>
              <div className="wab-level-intro-emoji">
                {wabLevel === 1 && '🧸'}
                {wabLevel === 2 && '🐻'}
                {wabLevel === 3 && '🔥'}
                {wabLevel === 4 && '🌪️'}
                {wabLevel === 5 && '👑'}
              </div>
              <p className="wab-level-intro-text">{wabLevels[wabLevel - 1]?.intro}</p>
              <p className="wab-level-intro-sub">{wabLevels[wabLevel - 1]?.introSub}</p>
              {wabLevel === 5 && (
                <div className="wab-boss-warning">
                  <p>⚠️ BOSS BEAR: 10 HP ⚠️</p>
                  <p>Har popup mein 3 baar maaro!</p>
                </div>
              )}
              <button className="wab-ready-btn" onClick={() => { playSound('click'); beginWabLevel(wabLevel) }}>
                {wabLevel === 5 ? '⚔️ FIGHT! ⚔️' : '👊 READY!'}
              </button>
            </div>
          )}

          {/* ---- PLAYING SCREEN ---- */}
          {wabState === 'playing' && (
            <div className={`wab-game ${wabShake ? 'wab-shake' : ''} ${wabFrozen ? 'wab-frozen-mode' : ''}`}>
              {/* HUD */}
              <div className="wab-hud">
                <div className="wab-hud-item wab-hud-score">
                  <span className="wab-hud-label">Score</span>
                  <span className="wab-hud-value">{wabScore}</span>
                </div>
                <div className="wab-hud-item wab-hud-level">
                  <span className="wab-hud-label">Level {wabLevel}</span>
                  <span className="wab-hud-value wab-hud-level-name">{wabLevels[wabLevel - 1]?.name}</span>
                </div>
                <div className="wab-hud-item wab-hud-timer">
                  <span className="wab-hud-label">Time</span>
                  <span className={`wab-hud-value ${wabTimer <= 5 ? 'wab-timer-danger' : ''}`}>{wabTimer}s</span>
                </div>
              </div>

              {/* Lives + Music toggle */}
              <div className="wab-lives-row">
                <div className="wab-lives">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`wab-life ${i < wabLives ? 'wab-life-active' : 'wab-life-lost'}`}>
                      {i < wabLives ? '❤️' : '🖤'}
                  </span>
                ))}
                </div>
                <button className="wab-music-toggle-mini" onClick={() => setWabMusicOn(prev => !prev)}>
                  {wabMusicOn ? '🎵' : '🔇'}
                </button>
              </div>

              {/* Combo display */}
              {wabCombo >= 2 && (
                <div className="wab-combo-display">
                  🔥 {wabCombo}x COMBO!
                </div>
              )}

              {/* Combo milestone message */}
              {wabComboMsg && (
                <div className="wab-combo-msg">{wabComboMsg}</div>
              )}

              {/* Boss HP bar */}
              {wabLevels[wabLevel - 1]?.hasBoss && (
                <div className="wab-boss-bar">
                  <div className="wab-boss-bar-label">👑 BOSS BEAR HP</div>
                  <div className="wab-boss-bar-track">
                    <div className="wab-boss-bar-fill" style={{ width: `${(wabBossHP / wabBossMaxHP) * 100}%` }}></div>
                  </div>
                  <div className="wab-boss-bar-text">{wabBossHP}/{wabBossMaxHP}</div>
                </div>
              )}

              {/* Game message */}
              {wabMessage && (
                <div className="wab-game-message">{wabMessage}</div>
              )}

              {/* Power-up button */}
              {wabPowerUp && (
                <button className="wab-powerup-btn" onClick={activateWabPowerUp}>
                  {wabPowerUp === 'freeze' ? '❄️ FREEZE!' : '🔥 2x POINTS!'}
                </button>
              )}

              {/* Double points indicator */}
              {wabDouble && (
                <div className="wab-double-indicator">🔥 DOUBLE POINTS ACTIVE! 🔥</div>
              )}

              {/* Frozen overlay */}
              {wabFrozen && (
                <div className="wab-frozen-overlay">❄️ FROZEN! ❄️</div>
              )}

              {/* THE GAME GRID */}
              <div className="wab-grid">
                {wabHoles.map((bear, idx) => (
                  <div
                    key={idx}
                    className={`wab-hole ${bear ? 'wab-hole-active' : ''} ${wabWhacked[idx] ? 'wab-hole-whacked' : ''}`}
                    onClick={() => whackBear(idx)}
                  >
                    <div className="wab-hole-dirt"></div>
                    {bear && (
                      <div className={`wab-bear wab-bear-${bear.type} ${wabFrozen ? 'wab-bear-frozen' : ''}`}>
                        <span className="wab-bear-emoji">{bear.emoji}</span>
                        {bear.type === 'boss' && <span className="wab-bear-crown">👑</span>}
                        {bear.msg && <span className="wab-bear-speech">{bear.msg}</span>}
                        {bear.type === 'boss' && bear.hitsLeft > 0 && (
                          <span className="wab-bear-hits">{bear.hitsLeft} hits!</span>
                        )}
                      </div>
                    )}
                    {wabWhacked[idx] && !bear && (
                      <div className="wab-whack-effect">💥</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Fun footer */}
              <div className="wab-game-footer">
                <span>Whacks: {wabStats.whacks}</span>
                <span>|</span>
                <span>Misses: {wabStats.misses}</span>
                <span>|</span>
                <span>Best Combo: {wabMaxCombo}x</span>
              </div>
            </div>
          )}

          {/* ---- LEVEL COMPLETE SCREEN ---- */}
          {wabState === 'levelComplete' && (
            <div className="wab-level-complete">
              <div className="wab-complete-emoji">🎉</div>
              <h2 className="wab-complete-title">LEVEL {wabLevel - 1} COMPLETE!</h2>
              <p className="wab-complete-level-name">{wabLevels[wabLevel - 2]?.name}</p>
              <div className="wab-complete-stats">
                <div className="wab-stat-row">
                  <span>Score</span>
                  <span className="wab-stat-val">{wabScore}</span>
                </div>
                <div className="wab-stat-row">
                  <span>Combo</span>
                  <span className="wab-stat-val">{wabMaxCombo}x</span>
                </div>
                <div className="wab-stat-row">
                  <span>Lives</span>
                  <span className="wab-stat-val">{'❤️'.repeat(wabLives)}</span>
                </div>
              </div>
              <p className="wab-complete-next">Get ready for Level {wabLevel}...</p>
              <p className="wab-complete-next-name">{wabLevels[wabLevel - 1]?.name}!</p>
              <button className="wab-next-btn" onClick={() => { playSound('click'); setWabState('levelIntro') }}>
                NEXT LEVEL ➡️
              </button>
            </div>
          )}

          {/* ---- GAME OVER SCREEN ---- */}
          {wabState === 'gameOver' && (
            <div className="wab-gameover">
              <div className="wab-gameover-emoji">😵</div>
              <h2 className="wab-gameover-title">GAME OVER!</h2>
              <div className="wab-gameover-roast-badge">{getWabRoast(wabScore).title}</div>
              <p className="wab-gameover-roast">{getWabRoast(wabScore).msg}</p>
              <div className="wab-gameover-stats">
                <div className="wab-go-stat">
                  <span className="wab-go-stat-num">{wabScore}</span>
                  <span className="wab-go-stat-label">Final Score</span>
                </div>
                <div className="wab-go-stat">
                  <span className="wab-go-stat-num">Level {wabLevel}</span>
                  <span className="wab-go-stat-label">Reached</span>
                </div>
                <div className="wab-go-stat">
                  <span className="wab-go-stat-num">{wabMaxCombo}x</span>
                  <span className="wab-go-stat-label">Best Combo</span>
                </div>
                <div className="wab-go-stat">
                  <span className="wab-go-stat-num">{wabStats.whacks}</span>
                  <span className="wab-go-stat-label">Bears Whacked</span>
                </div>
              </div>
              {wabScore >= wabHighScore && wabScore > 0 && (
                <div className="wab-new-high">🏆 NEW HIGH SCORE! 🏆</div>
              )}
              <div className="wab-gameover-btns">
                <button className="wab-retry-btn" onClick={() => { playSound('click'); startWabGame() }}>
                  🔄 DOBARA TRY KARO!
                </button>
                <button className="wab-home-btn" onClick={() => { playSound('click'); setWabState('intro') }}>
                  🏠 Main Menu
                </button>
              </div>
              <p className="wab-gameover-taunt">
                {wabScore < 100 ? "Teddy bol raha hai: 'Main toh dabba hun, tu kya hai?' 😂" :
                 wabScore < 300 ? "Ek aur try de... bears bhi bore ho rahe hain! 😴" :
                 "Accha khele! Par boss bear abhi bhi has raha hai 😏"}
              </p>
            </div>
          )}

          {/* ---- VICTORY SCREEN ---- */}
          {wabState === 'victory' && (
            <div className="wab-victory">
              <div className="wab-victory-emoji">🏆</div>
              <h2 className="wab-victory-title">VICTORY! 👑</h2>
              <p className="wab-victory-subtitle">Tune Boss Bear ko hara diya!</p>
              <div className="wab-victory-crown">
                <span>🧸</span>
                <span>👑</span>
                <span>🧸</span>
              </div>
              <div className="wab-victory-msg">
                <p>Ab tu official Teddy Master hai! 🎓</p>
                <p>Saare bears tere control mein hain! 💪</p>
                <p>Teddy Day pe sabse bada champion! 🏆</p>
              </div>
              <div className="wab-gameover-stats">
                <div className="wab-go-stat">
                  <span className="wab-go-stat-num">{wabScore}</span>
                  <span className="wab-go-stat-label">Final Score</span>
                </div>
                <div className="wab-go-stat">
                  <span className="wab-go-stat-num">{wabMaxCombo}x</span>
                  <span className="wab-go-stat-label">Best Combo</span>
                </div>
                <div className="wab-go-stat">
                  <span className="wab-go-stat-num">{wabStats.whacks}</span>
                  <span className="wab-go-stat-label">Bears Whacked</span>
                </div>
                <div className="wab-go-stat">
                  <span className="wab-go-stat-num">{wabStats.misses}</span>
                  <span className="wab-go-stat-label">Misses</span>
                </div>
              </div>
              {wabScore >= wabHighScore && wabScore > 0 && (
                <div className="wab-new-high">🏆 NEW HIGH SCORE! 🏆</div>
              )}
              <div className="wab-victory-love">
                <p>Jaise tune saare bears ko handle kiya...</p>
                <p>Waise hi meri zindagi bhi handle kar le! 🧸💕</p>
              </div>
              <div className="wab-gameover-btns">
                <button className="wab-retry-btn" onClick={() => { playSound('click'); startWabGame() }}>
                  🔄 PLAY AGAIN!
                </button>
                <button className="wab-home-btn" onClick={() => { playSound('click'); setWabState('intro') }}>
                  🏠 Main Menu
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========== PROMISE DAY - PUZZLE HUNGAMA ========== */}
      {activeDay === 'promise' && (
        <section className="pd-section">
          {/* Floating handshakes background */}
          <div className="pd-bg-emojis">
            {['🤝','🌹','🤝','💕','🤝','🌹','💕','🤝'].map((e, i) => (
              <span key={i} className="pd-bg-emoji" style={{ left: `${(i * 13) + 3}%`, animationDelay: `${i * 0.7}s`, animationDuration: `${4 + (i % 3)}s` }}>{e}</span>
            ))}
          </div>

          {/* Hasdi Reh Meter */}
          <div className="pd-hasdi-meter">
            <span className="pd-hasdi-label">Hasdi Reh Meter</span>
            <div className="pd-hasdi-bar">
              <div className="pd-hasdi-fill" style={{ width: `${pdHasdi}%` }}></div>
            </div>
            <span className="pd-hasdi-val">{pdHasdi}% 😂</span>
          </div>

          {/* ===== HUB VIEW ===== */}
          {pdView === 'hub' && (
            <div className="pd-hub">
              <div className="pd-hub-emoji">🤝</div>
              <h1 className="pd-hub-title">Promise Da Puzzle Hungama</h1>
              <p className="pd-hub-subtitle">Vada Nibhaunga Lifetime! 🤝😂🚜</p>
              <p className="pd-hub-header">
                Oye sohniye, aaj puzzle solve kar ke mera vada accept kar&hellip; warna main billi nu promise kar dunga! 🐱💍
              </p>

              <div className="pd-hub-grid">
                <button className={`pd-hub-card ${pdDone.u ? 'pd-hub-done' : ''}`} onClick={initPdUnscramble}>
                  <span className="pd-hub-card-emoji">🔤</span>
                  <span className="pd-hub-card-name">Vada Unscramble</span>
                  <span className="pd-hub-card-desc">Punjabi words solve kar!</span>
                  {pdDone.u && <span className="pd-hub-check">✅</span>}
                </button>

                <button className={`pd-hub-card ${pdDone.m ? 'pd-hub-done' : ''}`} onClick={initPdMatch}>
                  <span className="pd-hub-card-emoji">🃏</span>
                  <span className="pd-hub-card-name">Promise Pair Match</span>
                  <span className="pd-hub-card-desc">Memory cards flip kar!</span>
                  {pdDone.m && <span className="pd-hub-check">✅</span>}
                </button>

                <button className={`pd-hub-card ${pdDone.j ? 'pd-hub-done' : ''}`} onClick={initPdJigsaw}>
                  <span className="pd-hub-card-emoji">🧩</span>
                  <span className="pd-hub-card-name">Jigsaw Promise</span>
                  <span className="pd-hub-card-desc">Tiles arrange kar!</span>
                  {pdDone.j && <span className="pd-hub-check">✅</span>}
                </button>

                <button className={`pd-hub-card ${pdDone.e ? 'pd-hub-done' : ''}`} onClick={initPdEscape}>
                  <span className="pd-hub-card-emoji">🔐</span>
                  <span className="pd-hub-card-name">Promise Escape Room</span>
                  <span className="pd-hub-card-desc">Riddles solve kar!</span>
                  {pdDone.e && <span className="pd-hub-check">✅</span>}
                </button>
              </div>

              {pdAllDone && (
                <div className="pd-all-done">
                  <div className="pd-all-done-emoji">🏆🤝🌹</div>
                  <h2 className="pd-all-done-title">SAB PUZZLE COMPLETE! 🎉</h2>
                  <div className="pd-all-done-msg">
                    <p>Jaan, tu ne saare puzzles jeet liye!</p>
                    <p>Ab mera sabse bada vada sun:</p>
                  </div>
                  <div className="pd-final-promise">
                    <p>Main promise karda haan &ndash;</p>
                    <p>Teri har khushi mein share hona,</p>
                    <p>Har dukh mein tractor ban ke khada rehna,</p>
                    <p>Har subah tere naal chai peena,</p>
                    <p>Har raat tere naal gallan karna,</p>
                    <p>Aur hamesha tujhe hasaunda rehna.</p>
                    <p className="pd-final-sign">Tu meri zindagi da sabse pakka vada ae.</p>
                    <p className="pd-final-sign">Forever yours &ndash; Lakshay ❤️🤝🌹</p>
                  </div>
                </div>
              )}

              <p className="pd-hub-footer">Choose Your Puzzle Hungama! 🚜</p>
            </div>
          )}

          {/* ===== PUZZLE 1: VADA UNSCRAMBLE ===== */}
          {pdView === 'unscramble' && (
            <div className="pd-game-container">
              <button className="pd-back-btn" onClick={pdBackToHub}>← Wapas Hub</button>
              <div className="pd-game-header">
                <span className="pd-game-icon">🔤</span>
                <h2 className="pd-game-title">Vada Unscramble!</h2>
                <p className="pd-game-sub">Jumbled letters ko sahi order mein laga!</p>
              </div>

              {!pdUDone ? (
                <div className={`pd-unscramble ${pdUShake ? 'pd-shake' : ''}`}>
                  <div className="pd-word-progress">
                    Word {pdUIdx + 1} / {pdWords.length}
                    <div className="pd-word-progress-bar">
                      <div className="pd-word-progress-fill" style={{ width: `${((pdUIdx) / pdWords.length) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="pd-word-hint">
                    💡 Hint: {pdWords[pdUIdx].hint}
                  </div>

                  {/* Answer slots */}
                  <div className="pd-word-answer">
                    {pdWords[pdUIdx].word.split('').map((_, i) => (
                      <div
                        key={i}
                        className={`pd-word-slot ${pdUAns[i] ? 'pd-word-slot-filled' : ''}`}
                        onClick={() => pdUAns[i] && pdRemoveAnsLetter(i)}
                      >
                        {pdUAns[i] ? pdUAns[i].letter : ''}
                      </div>
                    ))}
                  </div>

                  {/* Letter pool */}
                  <div className="pd-word-pool">
                    {pdUPool.map((item, i) => (
                      <button
                        key={i}
                        className={`pd-pool-letter ${item.used ? 'pd-pool-used' : ''}`}
                        onClick={() => pdTapPoolLetter(i)}
                        disabled={item.used}
                      >
                        {item.letter}
                      </button>
                    ))}
                  </div>

                  <button
                    className="pd-check-btn"
                    onClick={pdCheckWord}
                    disabled={pdUAns.length !== pdWords[pdUIdx].word.length}
                  >
                    Check Karo! ✅
                  </button>

                  {pdUMsg && <div className={`pd-msg ${pdUMsg.includes('🎉') ? 'pd-msg-success' : 'pd-msg-error'}`}>{pdUMsg}</div>}
                </div>
              ) : (
                <div className="pd-game-complete">
                  <div className="pd-complete-emoji">🎉🔤✅</div>
                  <h3 className="pd-complete-title">Saare Words Solve Ho Gaye!</h3>
                  <div className="pd-unlock-promise">
                    <p className="pd-unlock-label">🔓 Unlocked Promise:</p>
                    <p className="pd-unlock-text">
                      Main vada karda haan, tere naal har Promise Day te extra chole bhature treat dunga&hellip; aur har dukh vich tractor ban ke khada rahunga! Love you jaan ❤️🚜
                    </p>
                  </div>
                  <button className="pd-hub-return-btn" onClick={pdBackToHub}>🏠 Hub te Wapas Ja</button>
                </div>
              )}
            </div>
          )}

          {/* ===== PUZZLE 2: PROMISE PAIR MATCH ===== */}
          {pdView === 'match' && (
            <div className="pd-game-container">
              <button className="pd-back-btn" onClick={pdBackToHub}>← Wapas Hub</button>
              <div className="pd-game-header">
                <span className="pd-game-icon">🃏</span>
                <h2 className="pd-game-title">Promise Pair Match!</h2>
                <p className="pd-game-sub">Scenario aur Promise cards match kar!</p>
              </div>

              {!pdMDone ? (
                <div className="pd-match-game">
                  <div className="pd-match-stats">
                    <span>Moves: {pdMMoves}</span>
                    <span>Found: {pdMFound.length}/{pdMatchPairs.length}</span>
                  </div>

                  <div className="pd-match-grid">
                    {pdMCards.map((card, idx) => {
                      const isFlipped = pdMFlip.includes(idx) || pdMFound.includes(card.pairId)
                      const isMatched = pdMFound.includes(card.pairId)
                      return (
                        <div
                          key={idx}
                          className={`pd-match-card ${isFlipped ? 'pd-match-flipped' : ''} ${isMatched ? 'pd-match-matched' : ''}`}
                          onClick={() => pdFlipCard(idx)}
                        >
                          <div className="pd-match-card-inner">
                            <div className="pd-match-card-front">🤝</div>
                            <div className={`pd-match-card-back ${card.type === 'scenario' ? 'pd-card-scenario' : 'pd-card-promise'}`}>
                              <span className="pd-card-type-badge">{card.type === 'scenario' ? '😤' : '💕'}</span>
                              <span className="pd-card-text">{card.text}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {pdMMsg && <div className={`pd-msg ${pdMMsg.includes('🎉') ? 'pd-msg-success' : 'pd-msg-error'}`}>{pdMMsg}</div>}
                </div>
              ) : (
                <div className="pd-game-complete">
                  <div className="pd-complete-emoji">🎉🃏✅</div>
                  <h3 className="pd-complete-title">Sab Match Ho Gaya!</h3>
                  <p className="pd-complete-stats">Moves: {pdMMoves} | Pairs: {pdMFound.length}</p>
                  <div className="pd-unlock-promise">
                    <p className="pd-unlock-label">🔓 Unlocked Promise:</p>
                    <p className="pd-unlock-text">
                      Jaan, main promise karda haan &ndash; har pal tere saath rahunga, teri har khushi apni banaunga, aur kabhi nahi chhodunga. Tu meri zindagi da sabse pakka vada ae. Forever yours ❤️
                    </p>
                  </div>
                  <button className="pd-hub-return-btn" onClick={pdBackToHub}>🏠 Hub te Wapas Ja</button>
                </div>
              )}
            </div>
          )}

          {/* ===== PUZZLE 3: JIGSAW PROMISE PUZZLE ===== */}
          {pdView === 'jigsaw' && (
            <div className="pd-game-container">
              <button className="pd-back-btn" onClick={pdBackToHub}>← Wapas Hub</button>
              <div className="pd-game-header">
                <span className="pd-game-icon">🧩</span>
                <h2 className="pd-game-title">Jigsaw Promise Puzzle!</h2>
                <p className="pd-game-sub">Tiles sahi order mein arrange kar ke message reveal kar!</p>
              </div>

              {!pdJDone ? (
                <div className="pd-jigsaw-game">
                  <div className="pd-jigsaw-stats">
                    <span>Moves: {pdJMoves}</span>
                    <span>Tap 2 tiles to swap! 🔄</span>
                  </div>

                  <div className="pd-jigsaw-grid">
                    {pdJTiles.map((tile, idx) => (
                      <div
                        key={idx}
                        className={`pd-jigsaw-tile ${pdJSel === idx ? 'pd-jigsaw-selected' : ''} ${tile.id === idx ? 'pd-jigsaw-correct' : ''}`}
                        onClick={() => pdTapTile(idx)}
                      >
                        <span className="pd-jigsaw-tile-emoji">{tile.emoji}</span>
                        <span className="pd-jigsaw-tile-text">{tile.text}</span>
                        <span className="pd-jigsaw-tile-num">{tile.id + 1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pd-jigsaw-hint">
                    <p>🧩 Hint: &quot;Main Vada Karda Haan Tere Naal Har Pal Forever&quot;</p>
                    <p className="pd-jigsaw-hint-sub">Tiles ko 1-9 order mein lagao! 🤝</p>
                  </div>

                  {pdJMsg && <div className="pd-msg pd-msg-info">{pdJMsg}</div>}
                </div>
              ) : (
                <div className="pd-game-complete">
                  <div className="pd-complete-emoji">🎉🧩✅</div>
                  <h3 className="pd-complete-title">Puzzle Poora!</h3>
                  <div className="pd-jigsaw-solved">
                    <div className="pd-jigsaw-solved-grid">
                      {pdJigsawData.map((tile) => (
                        <div key={tile.id} className="pd-jigsaw-solved-tile">
                          <span>{tile.emoji}</span>
                          <span>{tile.text}</span>
                        </div>
                      ))}
                    </div>
                    <p className="pd-jigsaw-solved-msg">🤝 Main Vada Karda Haan Tere Naal Har Pal Forever ✨</p>
                  </div>
                  <p className="pd-complete-stats">Moves: {pdJMoves}</p>
                  <div className="pd-unlock-promise">
                    <p className="pd-unlock-label">🔓 Unlocked Promise:</p>
                    <p className="pd-unlock-text">
                      Puzzle poora! Ab asli vada: Main promise karda haan, tere sapne poore karunga, har ladai baad cuddle karunga, aur tujhe hamesha hasaunga. Tu meri jaan ae, meri everything. Happy Promise Day! 🤝🌹
                    </p>
                  </div>
                  <button className="pd-hub-return-btn" onClick={pdBackToHub}>🏠 Hub te Wapas Ja</button>
                </div>
              )}
            </div>
          )}

          {/* ===== PUZZLE 4: PROMISE ESCAPE ROOM ===== */}
          {pdView === 'escape' && (
            <div className="pd-game-container">
              <button className="pd-back-btn" onClick={pdBackToHub}>← Wapas Hub</button>
              <div className="pd-game-header">
                <span className="pd-game-icon">🔐</span>
                <h2 className="pd-game-title">Promise Escape Room!</h2>
                <p className="pd-game-sub">Riddles solve kar ke promises unlock kar!</p>
              </div>

              {!pdEDone ? (
                <div className={`pd-escape-game ${pdEShake ? 'pd-shake' : ''}`}>
                  <div className="pd-escape-progress">
                    <div className="pd-escape-locks">
                      {pdEscRiddles.map((_, i) => (
                        <span key={i} className={`pd-escape-lock ${pdEUnlocked.includes(i) ? 'pd-lock-open' : ''}`}>
                          {pdEUnlocked.includes(i) ? '🔓' : '🔒'}
                        </span>
                      ))}
                    </div>
                    <span className="pd-escape-step">Riddle {pdEStep + 1}/{pdEscRiddles.length}</span>
                  </div>

                  <div className="pd-escape-riddle">
                    <div className="pd-escape-q-emoji">🤔</div>
                    <p className="pd-escape-question">{pdEscRiddles[pdEStep].q}</p>
                  </div>

                  <div className="pd-escape-options">
                    {pdEscRiddles[pdEStep].opts.map((opt, i) => (
                      <button
                        key={i}
                        className="pd-escape-option"
                        onClick={() => pdCheckEsc(i)}
                        disabled={pdEUnlocked.includes(pdEStep)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {pdEMsg && (
                    <div className={`pd-msg ${pdEMsg.includes('!') && !pdEMsg.includes('Galat') && !pdEMsg.includes('galat') && !pdEMsg.includes('Nahi') && !pdEMsg.includes('Oye') ? 'pd-msg-success' : 'pd-msg-error'}`}>
                      {pdEMsg}
                    </div>
                  )}
                </div>
              ) : (
                <div className="pd-game-complete">
                  <div className="pd-complete-emoji">🎉🔐✅</div>
                  <h3 className="pd-complete-title">Escape Successful!</h3>
                  <div className="pd-escape-unlocked-all">
                    {pdEscRiddles.map((r, i) => (
                      <div key={i} className="pd-escape-unlocked-item">
                        <span>🔓 Riddle {i + 1}: {r.unlock}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pd-unlock-promise">
                    <p className="pd-unlock-label">🔓 Final Lifetime Vada:</p>
                    <p className="pd-unlock-text">
                      Main hamesha tera saath dunga, har promise nibhaunga, aur teri smile nu kabhi nahi jaane dunga. Tu meri duniya ae, meri jaan. I promise ❤️🤝
                    </p>
                  </div>
                  <button className="pd-hub-return-btn" onClick={pdBackToHub}>🏠 Hub te Wapas Ja</button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ========== HUG DAY - LATE NIGHT HUG DA HUNGAMA ========== */}
      {activeDay === 'hug' && (
        <section className={`hd-section ${hugSqueeze ? 'hd-squeeze' : ''} ${hugChaos ? 'hd-chaos' : ''}`}>
          {/* Floating Zzz + hearts + pillows background */}
          <div className="hd-bg-layer">
            {hugZzz.map(z => (
              <span key={z.id} className="hd-zzz" style={{ left: `${z.left}%`, fontSize: `${z.size}rem`, animationDuration: `${z.dur}s` }}>
                💤
              </span>
            ))}
            {['🛏️','❤️','🤗','💕','🛌','❤️','🤗','💕','🛏️','🤗'].map((e, i) => (
              <span key={i} className="hd-bg-float" style={{ left: `${(i * 10) + 2}%`, animationDelay: `${i * 0.8}s`, animationDuration: `${4 + (i % 3)}s` }}>{e}</span>
            ))}
          </div>

          {/* Pink blush overlay */}
          {hugBlush && <div className="hd-blush-overlay"></div>}

          {/* Overheat red flash */}
          {hugOverheat && <div className="hd-overheat-overlay"></div>}

          {/* Kiss rain */}
          {hugKissRain && (
            <div className="hd-kiss-rain">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="hd-kiss-emoji" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 1.5}s`, animationDuration: `${1.5 + Math.random()}s` }}>💋</span>
              ))}
            </div>
          )}

          {/* Fog overlay */}
          {hugFog && <div className="hd-fog-overlay" onClick={() => setHugFog(false)}><p>Tap to clear fog! 👆</p></div>}

          {/* Billi popup */}
          {hugBilli && (
            <div className="hd-billi-popup">
              <span className="hd-billi-emoji">🐱</span>
              <p>Whiskers: &quot;Oye! Menu hug kyun nahi?!&quot; 😤</p>
            </div>
          )}

          {/* Tractor zoom */}
          {hugTractor && (
            <div className="hd-tractor-zoom">🚜💨</div>
          )}

          <div className="hd-content">
            {/* Header */}
            <div className="hd-header">
              <h1 className="hd-title">
                Happy Hug Day, Raima! 🤗
              </h1>
              <p className="hd-title-sub">Oye Sohniye, Aaj Page Late Ho Gaya&hellip; Meri Galti Nahi! 😴😂</p>
            </div>

            {/* Pillow squeeze visual */}
            <div className={`hd-pillow-area ${hugSqueeze ? 'hd-pillow-squeezed' : ''}`}>
              <div className="hd-pillow">
                <span className="hd-pillow-emoji">🛏️</span>
                <span className="hd-pillow-label">Raima&apos;s Pillow</span>
                <span className="hd-pillow-arms">🤗</span>
              </div>
              <div className="hd-sleepy-jatt">
                <span className="hd-sleepy-face">😴</span>
                <span className="hd-sleepy-zzz">💤</span>
              </div>
            </div>

            {/* Confession text */}
            <div className="hd-confession">
              <p>Arre jaan, aaj subah page update karna si&hellip; par kal raat tere bare soch soch ke neend aa gayi! 😏</p>
              <p>Dream vich tu si, main tainu tight hug kar raha, kiss kar raha&hellip; itna intensely ki pillow vi crush ho gaya! 🤗💋</p>
              <p>Subah utha taan alarm baj raha, par main &lsquo;5 min hor&rsquo; bol ke fer so gaya &ndash; teri virtual jappi repeat karte karte! Oversleep ho gaya, page late! Sorry pagli&hellip; par blame tere pyar da! 😂🚜</p>
              <p className="hd-confession-cta">Ab compensation: Virtual hug unlimited &ndash; click kar ke le le, warna main billi nu hug kar lunga (Whiskers jealous ho rahi ae)! 🐱</p>
            </div>

            {/* Hug Counter */}
            <div className="hd-counter">
              <span className="hd-counter-label">Hugs From Your Sleepy Jatt:</span>
              <span className="hd-counter-num">{hugCount} 🤗</span>
              {hugCount > 0 && hugCount < 30 && <span className="hd-counter-sub">(Milestone Loading... 😂)</span>}
            </div>

            {/* The Big Hug Button */}
            {!hugMaxed ? (
              <div className="hd-btn-area">
                {!hugFlip ? (
                  <button className="hd-hug-btn" onClick={handleHug}>
                    <span className="hd-btn-arms">🤗</span>
                    <span className="hd-btn-text">Click For Tight Hug<br/>From Your Jatt!</span>
                    <span className="hd-btn-sub">(Unlimited, No Wilt!)</span>
                  </button>
                ) : (
                  <div className="hd-reverse-hug">
                    <p className="hd-reverse-title">Ab Tu Mujhe Hug De! 🥺</p>
                    <a
                      className="hd-reverse-btn"
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Teri virtual jappi ne hasa ditta! Ab asli wali kab? 😘🤗")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Send Hug Back via WhatsApp! 💚
                    </a>
                    <button className="hd-reverse-skip" onClick={() => setHugFlip(false)}>
                      Nahi abhi nahi 😜 Continue hugging!
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hd-maxed-out">
                <div className="hd-maxed-emoji">🤯🤗🏆</div>
                <h3 className="hd-maxed-title">HUG FACTORY SHUTDOWN!</h3>
                <p className="hd-maxed-text">30 hugs complete! Ab WhatsApp pe aa ja real plan banane! 😘</p>
                <a
                  className="hd-maxed-wa-btn"
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Maine 30 virtual hugs le liye! Ab asli wali jappi ka time ae! 🤗❤️")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Pe Aa Ja! 💚📱
                </a>
              </div>
            )}

            {/* Random hug message */}
            {hugMsg && !hugMilestone && (
              <div className="hd-random-msg">{hugMsg}</div>
            )}

            {/* Milestone popup */}
            {hugMilestone && (
              <div className="hd-milestone">
                <div className="hd-milestone-badge">{hugMilestone.title}</div>
                <p className="hd-milestone-text">{hugMilestone.text}</p>
              </div>
            )}

            {/* Outro / Sticky Bottom Promise */}
            <div className="hd-outro">
              <div className="hd-outro-divider">🤗 ❤️ 🤗</div>
              <p className="hd-outro-text">
                Jaan, aaj Hug Day te vada: Har din tujhe tight hug dunga (virtual taan abhi diya, asli jaldi!). Tu meri favorite pillow ae&hellip; matlab dream girl! Love you more than late-night oversleep! 🤗❤️
              </p>
              <p className="hd-outro-sign">&ndash; Tera sleepy Jatt, Lakshay 😴🚜</p>
            </div>
          </div>
        </section>
      )}

      {/* ========== KISS DAY ========== */}
      {activeDay === 'kiss' && (
        <section className="kiss-day-section">
          <div className="kiss-day-container">
            <div className="kiss-day-emoji">😞</div>
            <h1 className="kiss-day-title">Happy Kiss Day</h1>
            <p className="kiss-day-text">...koi nahi hai kiss karne ko 😔</p>
          </div>
        </section>
      )}

      {/* ========== VALENTINE'S DAY - SAD GAANA DRAMA ========== */}
      {activeDay === 'valentine' && (
        <section className={`vd-section ${vdSadnessBandKar && vdHappyMode ? 'vd-happy' : 'vd-sad'}`}>

          {/* ===== ACT 1: SAD GAANA DRAMA ENTRY ===== */}
          {vdAct === 'act1' && (
            <div className="vd-act1">
              {/* Fake CSS Tears when sad mode active */}
              {!vdSadnessBandKar && (
                <div className="vd-tears-container">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="vd-tear" style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${1.5 + Math.random() * 2}s`
                    }}>💧</div>
                  ))}
                </div>
              )}

              {/* Record scratch flash */}
              {vdRecordScratch && (
                <div className="vd-record-scratch">
                  <span>🎵 *SCRATCH* 🎵</span>
                </div>
              )}

              {/* Confetti overlay for happy mode */}
              {vdSadnessBandKar && vdHappyMode && (
                <div className="vd-happy-overlay">
                  <div className="vd-happy-text-big">
                    Oye Hoye! Bali da gaana off – ab dhol on! 🕺❤️
                  </div>
                  <p className="vd-happy-sub">Tu hai na, sadness ka chance hi nahi! 🎉💃</p>
                </div>
              )}

              <div className="vd-act1-content">
                <div className="vd-hero-emoji">{vdSadnessBandKar ? '🥳' : '😭'}</div>
                <div className="vd-wilted-rose">{vdSadnessBandKar ? '🌹' : '🥀'}</div>

                <h1 className="vd-title">
                  {vdSadnessBandKar
                    ? "Happy Valentine's Day, Raima! ❤️🎉"
                    : "Happy Valentine's Day, Raima! ❤️ Par Pehle Thoda Sad Hungama… Bali Da Gaana Sun! 😬💔"
                  }
                </h1>

                {!vdSadnessBandKar ? (
                  <div className="vd-sad-content">
                    <div className="vd-sad-bullets">
                      <p className="vd-bullet">😭 &quot;Aaj Valentine&apos;s, par main soch raha – tere bina yeh din kitna sad hoga! Isliye Bali da sad gaana play kar ditta… feel kar na jaan!&quot;</p>
                      <p className="vd-bullet">🚜😢 &quot;Lyrics sun: &apos;Tere bina dil lagda nahi…&apos; – exactly mera feel tere bina! Tractor vi sad mode vich park ho gaya&quot;</p>
                      <p className="vd-bullet">😂 &quot;Par wait… yeh sadness sirf trailer si! Ab asli twist aa raha – because TU meri Valentine ae, sadness cancel!&quot;</p>
                    </div>

                    {!vdSadPlaying && (
                      <button className="vd-play-btn" onClick={vdPlaySadGaana}>
                        🎵 Sad Gaana Play Kar! 🎵
                      </button>
                    )}
                    {vdSadPlaying && (
                      <div className="vd-now-playing">
                        <span className="vd-music-wave">🎶</span> Bali da sad gaana playing... <span className="vd-music-wave">🎶</span>
                      </div>
                    )}

                    <button className="vd-band-kar-btn" onClick={vdStopSadness}>
                      😭 Sadness Band Kar! 😭
                    </button>
                  </div>
                ) : (
                  <div className="vd-happy-content">
                    <p className="vd-happy-msg">Sadness CANCELLED! Ab sirf khushi! 🎊💖</p>
                    <button className="vd-next-act-btn" onClick={() => vdGoToAct('act2')}>
                      ➡️ Ab Funny Roast Cards Dekh! 😂
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== ACT 2: SAD SE FUNNY ROAST SWIPE CARDS ===== */}
          {vdAct === 'act2' && (
            <div className="vd-act2">
              <h1 className="vd-act2-title">
                Bali Da Sad Gaana Kyun Play Kiya? 🤔
              </h1>
              <p className="vd-act2-sub">Because Tere Bina… (Par Tere Saath Toh Sab Funny Ae!) 😂</p>

              <div className="vd-cards-container">
                {[
                  {
                    sad: "Tere bina: Bali da gaana sun ke ro raha…",
                    happy: "Tere saath: Teri hasi sun ke pet pakad ke has raha! 😂🤣",
                    emoji: "😢➡️😂",
                    bg: "card-bg-1"
                  },
                  {
                    sad: "Tere bina: Tractor vi sad, dust kha raha…",
                    happy: "Tere saath: Full speed tere layi pataka phodne! 🚜💥",
                    emoji: "🚜😢➡️🚜💥",
                    bg: "card-bg-2"
                  },
                  {
                    sad: "Tere bina: Billi nu hug – Whiskers boli 'oye depressed Jatt!' 🐱😿",
                    happy: "Tere saath: Sirf tujhe lifetime tight jappi! 🤗",
                    emoji: "🐱😿➡️🤗",
                    bg: "card-bg-3"
                  },
                  {
                    sad: "Tere bina: Dream vich sad gaana repeat…",
                    happy: "Tere saath: Dream vich hug-kiss repeat (Hug Day wala upgrade! 😘)",
                    emoji: "😴😭➡️😴😘",
                    bg: "card-bg-4"
                  },
                  {
                    sad: "Tere bina: Valentine's akela chole bhature kha ke food poisoning!",
                    happy: "Tere saath: Saath mein epic stories banayenge! 🍲❤️",
                    emoji: "🤢➡️🍲❤️",
                    bg: "card-bg-5"
                  },
                  {
                    sad: "Final Reason:",
                    happy: "Bali da sad gaana sirf excuse si – asli baat, tu meri Valentine hai, sadness banned forever! 💍",
                    emoji: "💔➡️💍",
                    bg: "card-bg-6"
                  }
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className={`vd-card ${idx === vdCardIndex ? 'vd-card-active' : ''} ${idx < vdCardIndex ? 'vd-card-done' : ''} ${idx > vdCardIndex ? 'vd-card-next' : ''} ${vdCardFlip && idx === vdCardIndex ? 'vd-card-flip' : ''} ${card.bg}`}
                  >
                    <div className="vd-card-emoji">{card.emoji}</div>
                    <div className="vd-card-sad">
                      <p>{card.sad}</p>
                    </div>
                    <div className="vd-card-happy">
                      <p>{card.happy}</p>
                    </div>
                    <div className="vd-card-number">Card {idx + 1}/6</div>
                  </div>
                ))}
              </div>

              <div className="vd-card-nav">
                {vdCardIndex > 0 && (
                  <button className="vd-card-prev-btn" onClick={vdPrevCard}>
                    ⬅️ Pichla
                  </button>
                )}
                {vdCardIndex < 5 ? (
                  <button className="vd-card-next-btn" onClick={vdNextCard}>
                    Agla Card ➡️
                  </button>
                ) : (
                  <button className="vd-next-act-btn" onClick={() => vdGoToAct('act3')}>
                    🎮 Ab Interactive Game! 🕺
                  </button>
                )}
              </div>

              <div className="vd-card-dots">
                {[0,1,2,3,4,5].map(i => (
                  <span key={i} className={`vd-dot ${i === vdCardIndex ? 'vd-dot-active' : ''} ${i < vdCardIndex ? 'vd-dot-done' : ''}`}>●</span>
                ))}
              </div>
            </div>
          )}

          {/* ===== ACT 3: INTERACTIVE SAD GAANA TO HAPPY DANCE GAME ===== */}
          {vdAct === 'act3' && (
            <div className="vd-act3">
              {/* Fake tears CSS rain for sad mode */}
              {vdFakeTears && (
                <div className="vd-tears-container">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="vd-tear" style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 1.5}s`
                    }}>💧</div>
                  ))}
                </div>
              )}

              <h1 className="vd-act3-title">
                🎵 Play Bali Sad Gaana… Or Happy Twist? 🎵
              </h1>

              {!vdSadLocked ? (
                <div className="vd-act3-buttons">
                  <button
                    className="vd-sad-mode-btn"
                    onClick={vdTapSadMode}
                    disabled={vdFakeTears}
                  >
                    <span className="vd-btn-emoji">😬</span>
                    <span className="vd-btn-label">Sad Mode</span>
                    {vdSadAttempts > 0 && (
                      <span className="vd-sad-counter">({vdSadAttempts}/3 attempts)</span>
                    )}
                  </button>

                  <span className="vd-vs">VS</span>

                  <button className="vd-happy-mode-btn" onClick={vdTapHappyMode}>
                    <span className="vd-btn-emoji">🕺</span>
                    <span className="vd-btn-label">Happy Jatt Mode</span>
                  </button>
                </div>
              ) : (
                <div className="vd-locked-result">
                  <div className="vd-locked-emoji">🎉🎊🥳</div>
                  <h2 className="vd-locked-title">Auto Valentine Accept Ho Gaya! 🎉</h2>
                  <p className="vd-locked-text">
                    Ter sad attempts khatam! Bali vi bola &quot;oye chhod, khush reh!&quot; 😂
                  </p>
                  <p className="vd-locked-text">
                    Sadness nahi chalta yahan! Tu meri Valentine, sirf khushi allowed! ❤️
                  </p>
                </div>
              )}

              {vdFakeTears && (
                <div className="vd-fake-tears-msg">
                  <p>Ab ro le… par sirf 10 sec! 😭</p>
                  <p className="vd-tears-sub">
                    {vdSadAttempts === 1 ? "Fer sad? Bali vi thak gaya! 😴" : "Ek aur try? Oye sadness ka quota khatam! 😂"}
                  </p>
                </div>
              )}

              {(vdSadLocked || vdHappyMode) && (
                <div className="vd-act3-happy-result">
                  <div className="vd-happy-dance">🕺💃🕺💃</div>
                  <p className="vd-happy-result-text">
                    Fooled you! Sadness nahi chalta yahan! 😂<br/>
                    Tu meri Valentine, sirf khushi allowed! ❤️
                  </p>
                  <button className="vd-next-act-btn" onClick={() => vdGoToAct('end')}>
                    🎬 Ab Final Surprise! ➡️
                  </button>
                </div>
              )}

              {!vdSadLocked && !vdHappyMode && !vdFakeTears && (
                <div className="vd-act3-hint">
                  <p>👆 Koi bhi choose kar... result toh ek hi hai! 😏</p>
                </div>
              )}
            </div>
          )}

          {/* ===== END SECTION: VIDEO + YOUTUBE + VALENTINE WISH ===== */}
          {vdAct === 'end' && (
            <div className="vd-end">
              <div className="vd-end-wish">
                <div className="vd-end-hearts">💕💖💕💖💕</div>
                <h1 className="vd-end-title">Happy Valentine&apos;s Day, Raima! 💝</h1>
                <p className="vd-end-subtitle">Tu meri Valentine ae… aaj, kal, hamesha! ❤️🥰</p>
              </div>

              <div className="vd-end-video-section">
                <h2 className="vd-end-video-title">🎬 Pehle Yeh Dekh… 😂</h2>
                <div className="vd-video-wrapper">
                  <video
                    className="vd-end-video"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="/resigned-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="vd-end-movie-section">
                <h2 className="vd-end-movie-title">🎬 Chal Ab Ye Movie Dekh! 🍿</h2>
                <p className="vd-end-movie-sub">Valentine&apos;s Day special movie plan! 💑</p>
                <a
                  href="https://youtu.be/l7E0kTvARsA?si=gnkVyMAF4fhlBtFg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vd-movie-link"
                >
                  🎥 Movie Dekh! ➡️
                </a>
              </div>

              <div className="vd-end-final">
                <div className="vd-end-final-emoji">🥰💕</div>
                <p className="vd-end-final-text">
                  Bali da sad gaana se happy ending tak – yeh hai tera Valentine&apos;s Day surprise! 💖
                </p>
                <p className="vd-end-sign">— Tera Lakshay, Forever ❤️</p>
              </div>
            </div>
          )}

          {/* Act Navigation Bar */}
          {vdAct !== 'act1' && (
            <div className="vd-act-nav">
              <button
                className={`vd-act-nav-btn ${vdAct === 'act1' ? 'active' : ''}`}
                onClick={() => vdGoToAct('act1')}
              >
                💔 Act 1
              </button>
              <button
                className={`vd-act-nav-btn ${vdAct === 'act2' ? 'active' : ''}`}
                onClick={() => vdGoToAct('act2')}
              >
                🃏 Act 2
              </button>
              <button
                className={`vd-act-nav-btn ${vdAct === 'act3' ? 'active' : ''}`}
                onClick={() => vdGoToAct('act3')}
              >
                🎮 Act 3
              </button>
              <button
                className={`vd-act-nav-btn ${vdAct === 'end' ? 'active' : ''}`}
                onClick={() => vdGoToAct('end')}
              >
                🎬 Finale
              </button>
            </div>
          )}

        </section>
      )}

      {/* Floating Hearts (visible on all days) */}
      <div className="hearts-container">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              animationDuration: `${heart.duration}s`
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Confetti (visible on all days) */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: `${c.left}%`,
            background: c.color,
            animationDelay: `${c.delay}ms`,
            animationDuration: `${c.duration}s`
          }}
        />
      ))}
    </div>
  )
}
