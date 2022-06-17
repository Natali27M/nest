User Api 

## WebSocket 

**HOST**: `http://localhost:3000`

---

### Listen for join in room

---

Event: `join-in-room`

Data: 
|Property | Description |
|----------------|----------------------|
|`token` | Auth token of user |
|`time` | Time of login |
|`id` | Id of room |

Example:
```angular2html
token: sdflfkgt-dsfdg'gfgf
time: 2022-09-23
id: dsfdsf-345sddf-fddfg
```



---

### Listen for join in chat

---

Event: `join-in-chat`

Data:
|Property | Description |
|----------------|----------------------|
|`token` | Auth token of user |
|`time` | Time of login |
|`id` | Id of chat |
