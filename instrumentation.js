export async function register() {
  // Only run server-side keep-alive in the Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const url = process.env.RENDER_EXTERNAL_URL
    if (!url) {
      console.log('⚠️ RENDER_EXTERNAL_URL not set — skipping server-side keep-alive')
      return
    }

    const PING_INTERVAL = 4 * 60 * 1000 // 4 minutes (Render sleeps after ~15 min)

    setInterval(async () => {
      try {
        const res = await fetch(`${url}/api/health`)
        if (res.ok) {
          console.log(`🏓 Server self-ping OK at ${new Date().toISOString()}`)
        }
      } catch (e) {
        console.log('❌ Server self-ping failed:', e.message)
      }
    }, PING_INTERVAL)

    console.log(`✅ Keep-alive started — pinging ${url}/api/health every 4 minutes`)
  }
}
