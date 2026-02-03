'use client'

import { useState, useEffect, useRef } from 'react'

export default function RoseDayPage() {
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
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState([])
  const [interactionLogs, setInteractionLogs] = useState([])
  const whatsappNumber = "918512022116"

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
      logInteraction('name_correct', { finalValue: name })
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

    for (let i = 0; i < 50; i++) {
      setTimeout(() => createHeart(), i * 100)
    }

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 400])
    }
  }

  // Log page visit on mount
  useEffect(() => {
    logInteraction('page_visit', {
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
      screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0
    })

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

  const scrollToSection = (num) => {
    logInteraction('menu_navigation', { section: num })
    document.getElementById(`section${num}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Export all logs to console (for debugging)
  const exportLogs = () => {
    try {
      const allLogs = JSON.parse(localStorage.getItem('roseDayLogs') || '[]')
      console.log('📊 ===== ALL INTERACTION LOGS =====')
      console.table(allLogs)
      console.log('Total interactions:', allLogs.length)
      return allLogs
    } catch (e) {
      console.log('No logs available')
      return []
    }
  }

  // Make exportLogs available globally for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.exportRoseDayLogs = exportLogs
      console.log('💡 Tip: Run window.exportRoseDayLogs() in console to see all user interactions!')
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
  useEffect(() => {
    const pingServer = async () => {
      try {
        await fetch('/api/health')
      } catch (e) {
        // Silent fail
      }
    }

    // Initial ping
    pingServer()

    // Ping every 60 seconds
    const keepAliveInterval = setInterval(pingServer, 60000)

    return () => clearInterval(keepAliveInterval)
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

  return (
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

      {/* Hearts Container */}
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

      {/* Confetti */}
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
  )
}
