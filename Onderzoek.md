## Onderzoek Lively "Kandidaatvinden"

| ![afbeelding van de applicatie](./img/kandidaat.png) | Kandidaatvinden is een extentie waarmee bezoekers die op zoek zijn naar een baan in contact kunnen komen met een recruiter. Samen met de recruiter word door middel van een live chatgesprek een profiel opgezet, waarna de recruiter contact opneemt met het bedrijf. Hierdoor is solliciteren per definitie niet meer nodig. |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |


![Afbeelding van de manier waarop Kandidaatvinden werkt.](./img/goings.png)

Aangezien Kandidaatvinden werkt met persoons gerelateerde data wordt de chat geinitialiseerd nadat er een authorisatie token verstuurd wordt. De chat word hierna geëncrypt voor beveiliging.

### Techniek

Frontend: React (Typescript)
Tracker: iframe en React
Backend: NodeJS (Typescript)
Database: PostgreSQLAPI: GraphQL + subscriptions
Ops: docker container, jenkins

Opbouw live chat
me data (eigen data wordt opgestuurd)
getchats
getcurrentchat
getmessages
getjobs
getcompany's
getmessages
