export async function GET(/* _request: Request*/) {
  return Response.json({
    code: 'OK',
    data: null,
    message: 'Hello, Next.js!',
    success: true
  })
}
