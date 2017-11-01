import { EventEmitter } from "./EventEmitter";

export class InputManager {
    inputStateChanged: EventEmitter<InputChangeEvent> = new EventEmitter<InputChangeEvent>();
    inputState: InputState;

    keyMap: {[key:string]: string} = {
        "KeyW": "playerForward",
        "KeyS": "playerBack",
        "KeyA": "playerTurnLeft",
        "KeyD": "playerTurnRight",
        "KeyP": "togglePause"
    }

    constructor() {
        // Subscribe to the appropriate browser events, to trigger own events
        window.onkeydown = this.keyDownCallback;
        window.onkeyup = this.keyUpCallback;

        this.inputState = new InputState();
    }

    private keyDownCallback = (e:KeyboardEvent) => {
        let newInputState = this.inputState.clone();
        
        if(this.keyMap[e.code]){
            newInputState.state[this.keyMap[e.code]] = true;
        }

        this.triggerEmitter(newInputState);
    }

    private keyUpCallback = (e: KeyboardEvent) => {
        let newInputState = this.inputState.clone();

        if(this.keyMap[e.code]){
            newInputState.state[this.keyMap[e.code]] = false;
        }

        this.triggerEmitter(newInputState);
    }

    triggerEmitter(newState: InputState) {
        if(!newState.isEqual(this.inputState)) {
            let event = new InputChangeEvent();
            event.oldState = this.inputState;
            event.newState = newState;

            this.inputStateChanged.emit(event);
            this.inputState = newState;
        }
    }
}



export class InputState {
    state: {[key:string]: boolean} = {};

    clone(): InputState {
        let newState = new InputState();
        for(let k in this.state) {
            newState.state[k] = this.state[k];
        }
        return newState;
    }

    isEqual(o: InputState): boolean {
        let out = true;
        let keys: string[] = [];
        for(let k in this.state) {
            // Compare all the keys in this state
            keys.push(k);
        }

        for(let k in o.state) {
            // Compare all the keys in the other state
            keys.push(k);
        }

        for(let i = 0; i < keys.length; i++) {
            if(this.state[keys[i]] != o.state[keys[i]]) {
                out = false;
                i = keys.length;
            }
        }

        return out;
    }
}

export class InputChangeEvent {
    oldState: InputState;
    newState: InputState;
}