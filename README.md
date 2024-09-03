Installation

Clone
git clone https://github.com/Trawollta/videoflix-frontend
Install
npm install
Configure Environment
ng g environments/environments

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/'  // URL zu deiner lokalen Django API
};

and go to environment.development.ts and type:

Run local host
ng s
