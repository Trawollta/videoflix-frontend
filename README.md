Installation
1. Repository klonen
bash
Code kopieren
git clone https://github.com/Trawollta/videoflix-frontend
2. Abhängigkeiten installieren
bash
Code kopieren
npm install
3. Umgebungsdateien konfigurieren
Erstelle die Umgebungsdateien:

bash
Code kopieren
ng g environments/environments
Füge dann in der Datei environment.development.ts folgenden Code hinzu:

typescript
Code kopieren
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/'  // URL zu deiner lokalen Django API
};
4. Lokalen Server starten
Um den lokalen Entwicklungsserver zu starten, führe folgenden Befehl aus:

bash
Code kopieren
ng serve
Navigiere dann zu http://localhost:4200/, um die Anwendung in deinem Browser zu sehen.
