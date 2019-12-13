
# BACKEND
Mongo ATLAS:
https://cloud.mongodb.com/v2/5dc93e44c56c981c06bc3921#clusters/connect?clusterId=Cluster0
MONGO URI:
mongodb+srv://Gugu:Pwdalm123@cluster0-zztcl.mongodb.net/test?retryWrites=true&w=majority
MONGO SHELL METHODS:
https://docs.mongodb.com/manual/reference/method/
Express Validator:
https://express-validator.github.io/docs/
Gravatar JS
https://github.com/emerleite/node-gravata
Bcrypt
https://www.npmjs.com/package/bcrypt
JWT:
https://jwt.io/
https://www.npmjs.com/package/jsonwebtoken
# githubClientId && githubToken/secret
https://github.com/settings/applications/1176481

# Por cada model, se crea una nueva collection en la db mongoDB Atlas
# En el try se hacen las queries de mongo
# Añadiendo auth como 2º parametro de cada url, hacemos la ruta privada y dependiente del token

# ----------------------------------------------------------------------------------------------------------------------------------------------------  #

# FRONTEND
npx create-react-app client
# Los ficheros .js para react deben ser .jsx
# AXIOS: Para peticiones HTTP
https://alligator.io/react/axios-react/
# HOOKS
useState() 
https://es.reactjs.org/docs/hooks-state.html
useEffects()
https://es.reactjs.org/docs/hooks-effect.html
# REDUX
https://carlosazaustre.es/como-funciona-redux-conceptos-basicos/

# store --> import in App.jsx
# actions --> dispatch actions
# reducers  --> receive actions

# ----------------------------------------------------------------------------------------------------------------------------------------------------  #

# RUN BACKEND && FRONTEND IN THE SAME SERVER
 "concurrently": "^4.1.2",
 in client package => "proxy": "http://localhost:5000",
 in server package =>  "dev": "concurrently \"npm run server\" \"npm run client\"",
 npm run dev
