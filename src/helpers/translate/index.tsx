const Index = (value: string) => {
    value = value.toLowerCase()
    switch (value){
        case 'sentinel':
            return 'Sentinela'
        case 'initiator':
            return 'Iniciador'
        case 'duelist':
            return 'Duelista'
        case 'controller':
            return 'Controlador'
        default:
            return 'Sem traduções'
    }
}

export default Index