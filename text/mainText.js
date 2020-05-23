const startMessage = 
`
Аккумуятор орталығының ботқа қош келдің!
Онлайн дүкенмен өзара әрекеттесу үшін төмендегі батырмаларды пайдаланыңыз.

Бот жұмысы туралы толық ақпарат алу үшін /help командасын қолдаңыз.
` //Бас текст

const orderMessage = 
`
Тапсырыс беру үшін /order команданы қолдаңыз.

/order [Аты-жөні] [Телефон нөмірі] [Таңдалған аккумулятор]

Мысал: 
/order Талғат Талғатов 87001111111 Voltman 6ct 60

Тапсырыс берген кейін біз сізбен байланысамыз.
`

const helpMessage =
`
Онлайн-магазинмен жұмыс істеу үшін батырмаларды басыңыз.
`

const contactMessage =
`
Телефон нөмірі: +7(777)777-77-77
Веб-сайт: www.accumulator.kz
e-mail: support@support.kz
`

module.exports.startMessage = startMessage
module.exports.orderMessage = orderMessage
module.exports.helpMessage = helpMessage
module.exports.contactMessage = contactMessage