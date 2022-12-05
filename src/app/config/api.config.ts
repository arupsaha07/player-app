export class ApiConfig {
    public static host: string = "ngular7.herokuapp.com";
    public static port: string = "";
    public static getBaseUrl() {
        if (this.port) {
            return "https://" + this.host + ":" + this.port + "/api";
        } else {
            return "https://" + this.host + "/api";
        }
    }
    public static getRootUrl(){
        if (this.port) {
            return "https://" + this.host + ":" + this.port + "/";
        } else {
            return "https://" + this.host + "/";
        }
    }
}