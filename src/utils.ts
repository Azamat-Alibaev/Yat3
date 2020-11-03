export function uid(): string {
    return Math.random()
        .toString(16)
        .slice(2)
}

export function saveStatePlugin(store: any) {
    store.subscribe((mutation: any, state: any) => {
        localStorage.setItem('board', JSON.stringify(state.board))
    })
}
