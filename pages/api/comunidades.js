import { SiteClient } from 'datocms-client'

export default async function recebeRequests(request, response) {
    //VALIDAÇÃO DOS DADOS, ANTES DE SAIR CADASTRANDO
    if(request.method === 'POST') {
        const TOKEN = 'a4b7641653371d413191dcfd0509a2'
        const client = new SiteClient(TOKEN)

        const registroCriado = await client.items.create({
            itemType: "972014", // model ID criado pelo Dato
            ...request.body,
            //title: "Comunidade de Texto",
            //image: "https://github.com/omariosouto.png",
            //url: "https://github.com/omariosouto",
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}