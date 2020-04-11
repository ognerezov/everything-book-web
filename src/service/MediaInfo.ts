export function isPortrait(): boolean {
    return window.matchMedia("(orientation: portrait)").matches;
//    return window.screen.height > window.screen.width; TODO - screen rotation
}