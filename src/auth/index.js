export const webAuth = (request, response, next) => {
  if (request) next()
  else response.redirect('/login')
}
