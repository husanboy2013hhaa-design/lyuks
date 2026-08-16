// Short tap feedback via the Vibration API. Supported on Android browsers;
// desktop and iOS Safari ignore it, so the optional call just does nothing.
export function haptic(ms = 10) {
  navigator.vibrate?.(ms);
}
