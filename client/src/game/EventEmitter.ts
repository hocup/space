export class EventEmitter<T> {

    private subscribers: ((event: T) => void)[] = [];

    subscribe(subscriber: (event: T) => void){
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriberIndex: number) {
        this.subscribers[subscriberIndex] = null;
    }

    emit(event: T) {
        for(let k in this.subscribers) {
            if(this.subscribers[k] != null) {
                this.subscribers[k](event);
            }
        }
    }
}