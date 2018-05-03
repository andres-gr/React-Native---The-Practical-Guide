const API_KEY = 'AIzaSyD1QGgpI121qRj1fvj54aCR4G_9EPyK0E4'

export const FIREBASE_URI = 'https://tutorialapp-1522128831135.firebaseio.com/places.json'

export const FIREBASE_DELETE_URI = (id, token) => `https://tutorialapp-1522128831135.firebaseio.com/places/${id}.json?auth=${token}`

export const FIREBASE_STOREIMAGE = 'https://us-central1-tutorialapp-1522128831135.cloudfunctions.net/storeImage'

export const FIREBASE_SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`

export const FIREBASE_LOGIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`

export const TOKEN_KEY = '@auth/token'

export const EXPIRY_DATE = '@auth/expiresIn'
