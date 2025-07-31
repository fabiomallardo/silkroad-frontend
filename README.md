# SilkRoad E-commerce Platform (Frontend)

![Immagine di Logo Aziendale](https://placehold.co/1200x300/5370A3/FFFFFF?text=SilkRoad+Frontend&font=raleway)

[![Stato Build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=github)](https://github.com/fabiomallardo/silkroad-frontend)
[![Licenza](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.x-purple?style=for-the-badge&logo=mui)](https://mui.com/)

---

**SilkRoad Frontend** è l'interfaccia utente per la piattaforma di e-commerce SilkRoad. Sviluppata come una Single Page Application (SPA) in React, consuma le API RESTful esposte dal backend per offrire un'esperienza utente moderna, reattiva e intuitiva.

Questo repository contiene esclusivamente il codice sorgente del frontend.

## Indice

1.  [Visione del Progetto](#visione-del-progetto)
2.  [Architettura dell'Applicazione](#architettura-dellapplicazione)
3.  [Stack Tecnologico](#stack-tecnologico)
4.  [Guida all'Installazione](#guida-allinstallazione)
    * [Prerequisiti](#prerequisiti)
    * [Configurazione](#configurazione)
    * [Avvio dell'Applicazione](#avvio-dellapplicazione)
5.  [Struttura del Progetto](#struttura-del-progetto)
6.  [Collegamento al Backend](#collegamento-al-backend)
7.  [Autori](#autori)
8.  [Contribuire](#contribuire)
9.  [Licenza](#licenza)

---

## Visione del Progetto

L'obiettivo di **SilkRoad Frontend** è fornire un'interfaccia utente chiara, veloce e facile da usare per interagire con la piattaforma di e-commerce. L'applicazione è progettata per essere completamente disaccoppiata dal backend, permettendo uno sviluppo indipendente e garantendo un'esperienza fluida su diversi dispositivi e browser.

---

## Architettura dell'Applicazione

L'applicazione segue le moderne pratiche di sviluppo React, con una chiara separazione delle responsabilità.

-   **Component-Based Architecture**: L'interfaccia è costruita utilizzando componenti React riutilizzabili (`components`), che compongono le viste principali dell'applicazione (`pages`).
-   **Routing**: La navigazione tra le pagine è gestita da `react-router-dom`, che permette di mappare URL specifici a componenti di pagina, creando un'esperienza da Single Page Application.
-   **State Management**: Lo stato di autenticazione globale è gestito tramite il Context API di React (`context/AuthContext.js`), fornendo un modo efficiente per condividere dati e stato di login tra i componenti.
-   **API Communication**: Le interazioni con il server backend sono gestite tramite `axios`, con un'istanza pre-configurata per semplificare le chiamate API (`api/axios.js`).

![Immagine di Architettura Frontend](https://placehold.co/800x450/E8E8E8/444444?text=React+Components+%E2%86%94+React+Router+%E2%86%94+API+Layer+(Axios)&font=raleway)

---

## Stack Tecnologico

-   **Libreria Principale**: React 18
-   **Routing**: React Router DOM
-   **UI Framework**: Material-UI (MUI)
-   **Chiamate API**: Axios
-   **Build Tool**: Create React App (react-scripts)
-   **Package Manager**: npm

---

## Guida all'Installazione

Seguire questi passaggi per configurare l'ambiente di sviluppo e avviare l'applicazione.

### Prerequisiti
-   **Node.js** v16 o superiore (con npm).
-   Il **backend SilkRoad** deve essere in esecuzione e accessibile.

### Configurazione
1.  Apri il file `src/api/axios.js`.
2.  Assicurati che la variabile `baseURL` corrisponda all'indirizzo in cui è in esecuzione il backend (di default `http://localhost:8080`).

    ```javascript
    // src/api/axios.js
    import axios from 'axios';

    export default axios.create({
        baseURL: 'http://localhost:8080' // Modifica se il tuo backend è su un altro indirizzo
    });
    ```

### Avvio dell'Applicazione
1.  Clona il repository:
    ```bash
    git clone [https://github.com/fabiomallardo/silkroad-frontend.git](https://github.com/fabiomallardo/silkroad-frontend.git)
    cd silkroad-frontend
    ```

2.  Installa le dipendenze del progetto:
    ```bash
    npm install
    ```

3.  Avvia l'applicazione in modalità sviluppo:
    ```bash
    npm start
    ```

4.  L'applicazione sarà accessibile all'indirizzo `http://localhost:3000`.

---

## Struttura del Progetto

La struttura del progetto segue le convenzioni di Create React App, organizzando il codice per funzionalità e responsabilità.

```
silkroad-frontend/
├── 📂 public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── 📂 src/
│   ├── 📂 api/
│   │   └── axios.js              # Configurazione Axios con interceptors
│   │
│   ├── 📂 components/
│   │   ├── Cart.js               # Componente carrello
│   │   ├── Navbar.js             # Barra di navigazione principale  
│   │   └── Sidebar.js            # Menu laterale
│   │
│   ├── 📂 context/
│   │   └── AuthContext.js        # Context per autenticazione
│   │
│   ├── 📂 pages/
│   │   ├── Dashboard.js          # Dashboard principale
│   │   ├── Home.js               # Landing page pubblica
│   │   ├── Login.js              # Pagina login
│   │   ├── OrderDetail.js        # Dettaglio ordine
│   │   ├── Orders.js             # Lista ordini utente
│   │   ├── Products.js           # Gestione prodotti
│   │   ├── Register.js           # Pagina registrazione
│   │   ├── UserCart.js           # Carrello utente
│   │   └── Users.js              # Gestione utenti
│   │
│   ├── App.css                   # Stili App
│   ├── App.js                    # Componente root e layout
│   ├── App.test.js               # Test del componente App
│   ├── index.css                 # Stili globali
│   ├── index.js                  # Entry point React
│   ├── logo.svg                  # Logo React (default)
│   ├── reportWebVitals.js        # Performance monitoring
│   ├── routes.js                 # Configurazione routing
│   ├── setupTests.js             # Setup per i test
│   └── theme.js                  # Tema Material-UI personalizzato
│
├── .gitignore
├── package.json
└── README.md
```

## Collegamento al Backend

Questa applicazione frontend è progettata per funzionare con il suo backend dedicato, che gestisce la logica di business, i dati e la sicurezza.

-   **Repository Backend**: [https://github.com/giovannidadone/silkroad](https://github.com/giovannidadone/silkroad)

---

## Autori

Questo progetto è stato sviluppato e mantenuto dai seguenti autori:

-   **Massimiliano Cassia** - *Back-end developer* - [massimilianocassia](https://github.com/Massyiwnl);
-   **Jacopo De Martino** - *Back-end developer* - [jacopodemartino](https://github.com/Jacopo-De-Martino);
-   **Giovanni Dadone** - *Front-end developer* - [giovannidadone](https://github.com/giovannidadone);
-   **Fabio Mallardo** - *Front-end developer* - [fabiomallardo](https://github.com/fabiomallardo).      

---

## Contribuire

Siamo aperti a contributi dalla community. Se desideri contribuire, per favore segui questi passaggi:
1.  Fai un fork del repository.
2.  Crea un nuovo branch per la tua feature (`git checkout -b feature/AmazingFeature`).
3.  Implementa le tue modifiche.
4.  Esegui il commit delle tue modifiche (`git commit -m 'Add some AmazingFeature'`).
5.  Fai il push sul tuo branch (`git push origin feature/AmazingFeature`).
6.  Apri una Pull Request.

---

## Licenza

Questo progetto è distribuito sotto la licenza MIT.

**Nota Bene**: Questo progetto è stato creato a scopo puramente didattico e non è destinato all'uso in produzione.

