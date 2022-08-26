# qr-code-discord

### Description
qr-code-discord est un bot qui permet de se connecter sur le compte d'un membre d'un serveur en le faisant scanner un qr-code. Ce type de bot est présent sur certains serveurs discord (souvent des serveurs un peu ilégaux mais pas que.). Ce genre de bot prennent l'apparence de bot de confiance, que tout le monde connait et apprécie comme Koya, Mee6 etc.
Ce bot est réalisé après que l’un de mes amis ait été victime d’une telle supercherie. Je souhaitais comprendre comment c’était prise la personne et je pense avoir trouver (Ou du moins une solution proche de la sienne.)
## Procédé utiliser
En résumer il y a un client web qui tourne (ici j'utilise Selenium qui permet d'automatiser des tests web), il récupère un qrcode valide de discord et demande au membre de le scanner pour une raison x ou y. Apres ça il n’a plus qu’a utiliser le client dès qu’il souhaite accéder à votre compte. (Pour plus de détails je vous invite à lire le code:))
## Comment s’en prévenir ?
Il faut en aucun cas scanner un qrcode sur discord peu importe la raison, si une personne, un site ou un serveur vous propose de le faire il faut signaler le serveur et avertir Discord et/ou les autres membres du serveur en question. Actuellement un seul qrcode officiel de discord se trouve à l'adresse : https://discord.com/login.
Malgré tout, verifier toujours l'url de la page avant d'essayer de scanner le qrcode. 
## Que faire si on est victime ? 
Il faut rapidement modifier ses mots de passes de discord, mail et sur tous les sites ou vous utilisez le même mail et mot de passe (le mieux étant d’activer l’A2F sur vos comptes dés à présent). Mon ami en question semble avoir pu retrouver le contrôle de son compte en changeant sont mot de passe discord.
## Avertissement
Ce projet est à but pédagogique et informatif. Tous les tests qui ont été réaliser ont été fait sur mon compte, mon bot et un serveur ou il n'y avait personne d'autre.
Si vous décidez d'utiliser ce projet peu importe l'utilisation, vous serez les seuls responsables de toute réclamation, dommage ou autre responsabilité, que ce soit dans une action contractuelle, délictuelle ou autre, résultant de,en dehors ou en relation avec le logiciel ou l'utilisation ou d'autres transactions dans le logiciel.

### Installation

1. Git: `https://github.com/elamani-drawing/qr-code-discord`
2. Instalation des nodes-modules: `npm install`

### Configuration du bot 

1. Un fichier config.json dans le répertoire courant
```json
    {
        "channel_welcome_id": "",
        "lien": "",
        "role_id_nouveau": "",
        "role_id_membre" :""
    }
```
`channel_welcome_id` est l'id du salon ou seront envoyé les qr code.
`lien` est un lien d'invitation de votre bot.
`role_id_nouveau` est l'id du role que le bot doit donner au membre qui rejoigne votre serveur.
`role_id_membre` est l'id du role que le bot doit donner au membre une fois qu'ils ont correctement scanner le qr code.

2. Un fichier .env dans le répertoire courant
```env
TOKEN=
GUILD_ID=
```
`TOKEN` est le token du bot.
`GUILD_ID` est l'id du serveur.

3. Lancer le bot avec : `node index.js`

### License

Ce projet est sous [``licence MIT``](LICENSE).


### Auteurs

1. [Au = Or [79]](https://github.com/elamani-drawing)