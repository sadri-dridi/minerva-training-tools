import { User } from 'src/models/User'

export default {
  async AuthMiddleware(to, _from, next) {
    let authenticated = User.isAuthenticated()

    if (to.name === 'auth.login' && authenticated) {
      return next({ name: 'home' })
    }
    
    if (!to.meta.authRequired) return next()
    if (!authenticated) return next({ name: 'auth.login' })
    
    return next()
  }
}
