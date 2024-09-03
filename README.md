Installation
1. Repository klonen

git clone <https://github.com/Trawollta/videoflix-frontend>
2. Abhängigkeiten installieren

npm install
3. Umgebungsdateien konfigurieren
Erstelle die Umgebungsdateien:


ng g environments/environments
Füge dann in der Datei environment.ts folgenden Code hinzu:

<export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/'  // URL zu deiner lokalen Django API
};>

4. Lokalen Server starten
Um den lokalen Entwicklungsserver zu starten, führe folgenden Befehl aus:


ng serve
Navigiere dann zu <http://localhost:4200/>, um die Anwendung in deinem Browser zu sehen.
