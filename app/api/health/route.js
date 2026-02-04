export async function GET() {
  const timestamp = new Date().toISOString()

  // Log the ping on server side
  console.log(`🏓 Health check ping received at ${timestamp}`)

  return Response.json({
    status: 'alive',
    timestamp: timestamp,
    uptime: process.uptime ? Math.floor(process.uptime()) : 'N/A',
    message: '🌹 Rose Day server is running!'
  })
}

// Also handle HEAD requests (some ping services use HEAD)
export async function HEAD() {
  return new Response(null, { status: 200 })
}
