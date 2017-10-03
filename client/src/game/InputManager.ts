import { EventEmitter } from "./EventEmitter";

export class InputManager {
    inputStateChanged: EventEmitter<InputChangeEvent> = new EventEmitter<InputChangeEvent>();
    inputState: InputState;

    constructor() {
        // Subscribe to the appropriate browser events, to trigger own events
        window.onkeydown = this.keyDownCallback;
        window.onkeyup = this.keyUpCallback;
    }

    private keyDownCallback = (e:Event) => {
        console.log("Key Down event", e);
        this.inputStateChanged.emit(new InputChangeEvent());
    }

    private keyUpCallback = (e: Event) => {
        console.log("Key Up event", e);
    }
}

export class InputState {

}

export class InputChangeEvent {
    oldState: InputState;
    newState: InputState;
}