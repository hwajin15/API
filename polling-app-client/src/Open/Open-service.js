import http from "./open-http"

class OpenService{
    
    openupload(username, userkey){
        return http.post("/start?user=" + username +"&userKey="+userkey)
    }
}
export default new OpenService();