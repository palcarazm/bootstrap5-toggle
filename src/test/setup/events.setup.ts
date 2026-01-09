/* eslint-disable @typescript-eslint/no-explicit-any */

function createPointerEvent(type: string, props: any = {}) {
    const event = new Event(type, {
        bubbles: true,
        cancelable: true,
    }) as any;

    event.pointerId = props.pointerId ?? 1;
    event.width = props.width ?? 1;
    event.height = props.height ?? 1;
    event.pressure = props.pressure ?? 0;
    event.tiltX = props.tiltX ?? 0;
    event.tiltY = props.tiltY ?? 0;
    event.pointerType = props.pointerType ?? "mouse";
    event.isPrimary = props.isPrimary ?? true;
    event.button = props.button ?? 0;
    event.clientX = props.clientX ?? 0;
    event.clientY = props.clientY ?? 0;

    return event;
}

(global as any).PointerEvent = function PointerEvent(
    type: string,
    props?: any
) {
    return createPointerEvent(type, props);
};
