export function determineTab(location) {
  switch (location) {
    case '/':
    return 0
    break
    case '/signin':
    return 1
    break
    case '/signup':
    return 2
    break
  }
}
