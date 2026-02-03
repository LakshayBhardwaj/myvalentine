export async function GET() {
  return Response.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    message: '🌹 Rose Day server is running!'
  })
}
