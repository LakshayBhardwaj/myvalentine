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

      {/* ========== TEDDY DAY - COMING SOON ========== */}
      {activeDay === 'teddy' && (
        <section className="coming-soon-section teddy-theme">
          <div className="coming-soon-container">
            <div className="coming-soon-emoji">🧸</div>
            <h1 className="coming-soon-title">Teddy Day</h1>
            <h2 className="coming-soon-date">10th February</h2>
            <div className="coming-soon-badge">🚧 UPDATE COMING SOON 🚧</div>
            <p className="coming-soon-text">
              Teddy Day pe soft toys ki barish hogi! 🧸<br/>
              Giant teddy bear dreams coming true! 💕
            </p>
            <div className="coming-soon-hearts">🧸 💕 🧸 💕 🧸</div>
            <p className="coming-soon-hint">Teddy se zyada cute tu hai! 😘</p>
          </div>
        </section>
      )}

      {/* ========== PROMISE DAY - COMING SOON ========== */}
      {activeDay === 'promise' && (
        <section className="coming-soon-section promise-theme">
          <div className="coming-soon-container">
            <div className="coming-soon-emoji">🤞</div>
            <h1 className="coming-soon-title">Promise Day</h1>
            <h2 className="coming-soon-date">11th February</h2>
            <div className="coming-soon-badge">🚧 UPDATE COMING SOON 🚧</div>
            <p className="coming-soon-text">
              Promise Day pe dil se waade honge! 🤝<br/>
              Pinky promise se pakka wala promise tak! 💪
            </p>
            <div className="coming-soon-hearts">🤞 💕 🤞 💕 🤞</div>
            <p className="coming-soon-hint">Promise: Content amazing hoga! 😉</p>
          </div>
        </section>
      )}

      {/* ========== HUG DAY - COMING SOON ========== */}
      {activeDay === 'hug' && (
        <section className="coming-soon-section hug-theme">
          <div className="coming-soon-container">
            <div className="coming-soon-emoji">🤗</div>
            <h1 className="coming-soon-title">Hug Day</h1>
            <h2 className="coming-soon-date">12th February</h2>
            <div className="coming-soon-badge">🚧 UPDATE COMING SOON 🚧</div>
            <p className="coming-soon-text">
              Hug Day pe virtual jadu ki jhappi! 🤗<br/>
              Tight wali hug ka content loading... 💕
            </p>
            <div className="coming-soon-hearts">🤗 💕 🤗 💕 🤗</div>
            <p className="coming-soon-hint">*Virtual Hug* 🫂</p>
          </div>
        </section>
      )}

      {/* ========== KISS DAY - COMING SOON ========== */}
      {activeDay === 'kiss' && (
        <section className="coming-soon-section kiss-theme">
          <div className="coming-soon-container">
            <div className="coming-soon-emoji">💋</div>
            <h1 className="coming-soon-title">Kiss Day</h1>
            <h2 className="coming-soon-date">13th February</h2>
            <div className="coming-soon-badge">🚧 UPDATE COMING SOON 🚧</div>
            <p className="coming-soon-text">
              Kiss Day ka romantic content coming soon! 💋<br/>
              Flying kisses unlimited! 😘
            </p>
            <div className="coming-soon-hearts">💋 💕 💋 💕 💋</div>
            <p className="coming-soon-hint">😘😘😘 (ye le advance mein!)</p>
          </div>
        </section>
      )}

      {/* ========== VALENTINE'S DAY - COMING SOON ========== */}
      {activeDay === 'valentine' && (
        <section className="coming-soon-section valentine-theme">
          <div className="coming-soon-container">
            <div className="coming-soon-emoji">💕</div>
            <h1 className="coming-soon-title">Valentine&apos;s Day</h1>
            <h2 className="coming-soon-date">14th February</h2>
            <div className="coming-soon-badge special">✨ GRAND FINALE COMING SOON ✨</div>
            <p className="coming-soon-text">
              Valentine&apos;s Day ka MEGA content under preparation! 🎉<br/>
              Sabse special din ke liye sabse special surprise! 💖
            </p>
            <div className="coming-soon-hearts">💕 💖 💕 💖 💕</div>
            <p className="coming-soon-hint">14 Feb ko yahan milna... kuch bada hone wala hai! 🎁</p>
          </div>
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
