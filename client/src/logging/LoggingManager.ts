// LoggingManager is a simple class to manage logging. For now, just dumps things to the console. 
// Maybe more flexible in the future
export class LoggingManager {

    static log(message: string) {
        console.log("Logged message at " + new Date() + ":\n" + message);
    }

    private static instance: LoggingManager;

    public static getInstance (): LoggingManager {
        if(!this.instance) {
            this.instance = new LoggingManager();
        } 

        return this.instance;
    }
}