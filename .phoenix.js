Phoenix.set({
    openAtLogin: true
});

const MODIFIERS = ['control', 'alt'];

const RelativeSize = {
    Full: "Full",
    Half: "Half",
    OneThird: "OneThird",
    TwoThird: "TwoThird",
}

const Direction = {
    TopLeft: "TopLeft",
    TopRight: "TopRight",
    BottomRight: "BottomRight",
    BottomLeft: "BottomLeft",
}

const stickWindow = (window, direction, relativeWidth, relativeHeight) => {
    if (window) {
        const screenFrame = Screen.main().flippedVisibleFrame()
        const targetSize = {
            width: relativeSizeToRatio(relativeWidth) * screenFrame.width,
            height: relativeSizeToRatio(relativeHeight) * screenFrame.height
        }
        const targetPoint = directionToPoint(direction, screenFrame, targetSize)
        window.setFrame({ x: targetPoint.x, y: targetPoint.y, width: targetSize.width, height: targetSize.height })
    }
}

const relativeSizeToRatio = (relativeSize) => {
    switch (relativeSize) {
        case RelativeSize.Full: return 1
        case RelativeSize.Half: return 0.5
        case RelativeSize.OneThird: return 1 / 3
        case RelativeSize.TwoThird: return 2 / 3
    }
}

const directionToPoint = (direction, screenFrame, windowSize) => {
    switch (direction) {
        case Direction.TopLeft: return { x: screenFrame.x, y: screenFrame.y };
        case Direction.TopRight: return { x: screenFrame.x + screenFrame.width - windowSize.width, y: screenFrame.y };
        case Direction.BottomRight: return { x: screenFrame.x + screenFrame.width - windowSize.width, y: screenFrame.y + screenFrame.height - windowSize.height };
        case Direction.BottomLeft: return { x: screenFrame.x, y: screenFrame.y + screenFrame.height - windowSize.height };
    }
}

const modal = text => {
    Modal.build({
        origin: frame => {
            const visibleFrame = Screen.main().flippedVisibleFrame();
            return {
                x: visibleFrame.x + (visibleFrame.width - frame.width) / 2,
                y: 0
            }
        },
        icon: Window.focused().app().icon(),
        text: text,
        duration: 1
    }).show();
}

const fullScreen = new Key('keypadEnter', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.TopLeft, RelativeSize.Full, RelativeSize.Full)
    modal('Expanded window');
});

const center = new Key('keypad5', MODIFIERS, () => {
    const window = Window.focused();
    if (window) {
        const visibleFrame = Screen.main().flippedVisibleFrame();
        const frame = window.frame()
        window.setTopLeft({
            x: visibleFrame.x + (visibleFrame.width - frame.width) / 2,
            y: visibleFrame.y + (visibleFrame.height - frame.height) / 2
        })
    }
    modal('Moved to center');
});

const topLeft = new Key('keypad7', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.TopLeft, RelativeSize.TwoThird, RelativeSize.TwoThird)
    modal('Moved to top left');
});

const topRight = new Key('keypad9', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.TopRight, RelativeSize.TwoThird, RelativeSize.TwoThird)
    modal('Moved to top right');
});

const bottomLeft = new Key('keypad1', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.BottomLeft, RelativeSize.TwoThird, RelativeSize.TwoThird)
    modal('Moved to bottom left');
});

const bottomRight = new Key('keypad3', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.BottomRight, RelativeSize.TwoThird, RelativeSize.TwoThird)
    modal('Moved to bottom right');
});

const top = new Key('keypad8', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.TopLeft, RelativeSize.Full, RelativeSize.Half)
    modal('Moved to top');
});

const bottom = new Key('keypad2', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.BottomLeft, RelativeSize.Full, RelativeSize.Half)
    modal('Moved to bottom');
});

const left = new Key('keypad4', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.TopLeft, RelativeSize.Half, RelativeSize.Full)
    modal('Moved to left');
});

const right = new Key('keypad6', MODIFIERS, () => {
    stickWindow(Window.focused(), Direction.TopRight, RelativeSize.Half, RelativeSize.Full)
    modal('Moved to right');
});

Modal.build({
    text: `Phoenix reloaded at ${new Date().toISOString()}`,
    duration: 3
}).show();
