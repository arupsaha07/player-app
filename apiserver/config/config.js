class Config {
    constructor() {
        this._port = 5000;          // A port number on which the server should accept incoming requests.
        this._host = '';             // Name of the domain. You need to set it when you deploy your apps to the cloud.
        this._backlog = 20;         // The maximum number of queued pending connections. The default is 511.
        this._bootMessage = "Server is running at port " + this.port;
        this._debugMode = false;
    }
    get port(){
        return this._port;
    }
    set port(portNo){
        this._port = portNo;
    }
    get host(){
        return this._host;
    }
    set host(hostName){
        this._host = hostName;
    }
    get backlog(){
        return this._backlog;
    }
    set backlog(maxConnections){
        this._backlog = maxConnections;
    }
    get bootMessage(){
        return this._bootMessage;
    }
    set bootMessage(messageOnBoot){
        this._bootMessage = messageOnBoot;
    }
    get debugMode(){
        return this._debugMode;
    }
    set debugMode(mode){
        this._debugMode = mode;
    }
    server(host, port, backlog) {
        this._host = host;
        this._port = port;
        this._backlog = backlog;
        this._bootMessage = "Server is running at port " + this.port;
    }
}

module.exports = Config;