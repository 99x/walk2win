# walk2win

### Milestones

- [x] Create initial project files
- [ ] Add html template to the client folder
- [x] Create mongo models (Team, Player, SyncRecord)
- [ ] Create required controllers 
- [ ] Add method to accept timestamp + steps and update accordingly 
- [x] Google Auth and extract daily steps 
- [ ] API integration testing
- [ ] Implement frontend according to the design
- [ ] Create Dockerfile
- [ ] Deploy into a AWS vm
- [ ] User testing

### REST API

- `GET /api/v1/leaderboard/topteams`
- `GET /api/v1/leaderboard/topplayers`
- `GET /api/v1/leaderboard/topmaleplayers`
- `GET /api/v1/leaderboard/topfemaleplayers`
- `POST /api/v1/sync`

```json
{
    "steps": "12002",
    "syncDate": "2019-07-25",
    "playerGmail": "user1@gmail.com"
}
```
