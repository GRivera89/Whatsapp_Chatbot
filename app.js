const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrimario = addKeyword(['Hola', 'Buen dia', 'Buenos dias', 'Buenas tardes', 'quiero informacion', 'estoy interesado', 'Buenas noches']).addAnswer(
    'Bienvenido al chat de Transforma Perú , ¿Qué te gustaría hacer el día de hoy?')
    .addAnswer(
        [
            '👉 *Servicios* para ver los servicios disponibles',
            '👉 *Contactar a un asesor* para que un asesor se contacte contigo'
        ]
    )

const flowInformacion = addKeyword(['Servicios']).addAnswer(['Selecciona el servicio del que deseas conocer más información'])
.addAnswer(
    [
        '👉 *Web* para el servicio de Webs',
        '👉 *Chatbot*  para el servicio de asistente virtual',
        '👉 *Mail* para el servicio de mails masivos',
        '👉 *GB* para el servicio de Google Business Management'
    ]
)

const flowWeb = addKeyword(['Web']).addAnswer(
    [
        'Nuestro servicio de desarrollo web brinda a las pequeñas empresas la oportunidad de tener su propia página web profesional. Entregamos en un máximo de 48 horas o es gratis, para que puedan comenzar a expandir su presencia en línea rápidamente.',
        '¿Estarías interesado?'
    ]
)

const flowChatbot = addKeyword(['Web']).addAnswer(
    [
        'Nuestro servicio de asistentes virtuales utiliza chatbots para proporcionar respuestas automatizadas a los clientes que se contacten a través de cualquier chat. Ahorre tiempo y mejore la satisfacción del cliente con respuestas rápidas y precisas las 24 horas del día.',
        '¿Estarías interesado?'
    ]
)

const flowMail = addKeyword(['Web']).addAnswer(
    [
        'Nuestro servicio de campañas de mails masivos le permite enviar correos promocionales e informativos a cientos de clientes simultáneamente. Establezca una red de clientes recurrentes y manténgalos comprometidos con su negocio.',
        '¿Estarías interesado?'
    ]
)

const flowGB = addKeyword(['Web']).addAnswer(
    [
        'Nuestro servicio de Google Business Management te ayudará a establecer la presencia de tu negocio en Google para facilitar su descubrimiento. Asegúrate que los clientes te encuentren fácilmente, con información precisa y actualizada en Google Maps y en los resultados de búsqueda.',
        '¿Estarías interesado?'
    ]
)

const flowYes = addKeyword(['Si', 'Sí', 'estoy interesado', 'estoy interesada']).addAnswer(
    '¡Excelente! En breves momentos un asesor se comunicará contigo para indicarte cuál es el siguiente paso'
)

const flowNo = addKeyword(['No', 'No gracias', 'no estoy interesado', 'no estoy interesada']).addAnswer(
    [
        'De igual manera puedes revisar nuestros servicios en https://www.transforma-peru.com/',
        'No dudes en contactarnos si tienes alguna duda',
        'Gracias por usar el chatbot de Transforma Peru'
    ]
)

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrimario, flowInformacion, flowChatbot, flowGB, flowMail, flowWeb, flowNo, flowYes])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
