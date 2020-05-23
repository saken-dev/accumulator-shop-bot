const Telegraf = require('telegraf')
const bot = new Telegraf('1123287247:AAGLTSnol0yn4dv1sBa0TM88E3beBmXuKRE')

const automobileText = require('./text/automobileText')
const truckText = require('./text/truckText')
const motoText = require('./text/motoText')
const mainText = require('./text/mainText')

bot.start((ctx) => { // /start командасы
    bot.telegram.sendMessage(ctx.chat.id, mainText.startMessage, {
        reply_markup: {
            keyboard: 
            [
                [
                    { text: "Каталог" },
                    { text: "Тауарға тапсырыс беру" }
                ],
                [
                    { text: "Магазин туралы информация"},
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

bot.help((ctx) => { // /help командасы
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, {source: 'image/helpPhoto/help.jpg'}, {caption: mainText.helpMessage,
    reply_markup:{
        inline_keyboard:
        [
            [ {text: "Жақсы", callback_data: "return"} ]
        ]
    }
}
)})

//Тауарға тапсырыс беру
bot.hears("Тауарға тапсырыс беру", async(ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Тауарға тапсырыс дайын болсаңыз, төменгі батырмасын басыңыз',{
        reply_markup:{
            inline_keyboard:
            [
                [ {text: "Иә, дайынмын", callback_data: "order"} ],
                [ {text: "Жоқ, дайын емеспін", callback_data: "return"} ]
            ]
        }
    })
})

bot.action("order", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, mainText.orderMessage)
})

bot.command("order", (ctx) => {
    const input = ctx.message.text
    const inputArray = input.split(" ")
    inputArray.shift()
    if(inputArray.length >= 3 && inputArray.length <= 15){
        let message = inputArray.join(" ")
        bot.telegram.sendMessage(-274060331,
        `
        ${ctx.message.chat.first_name} ${ctx.message.chat.last_name} (${ctx.message.chat.username}) тапсырыс жіберді.
        Тапсырыс:
        ${message}
        `, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Тапсырыс қабылданды', callback_data: "orderDelete"}]
                ]
            }
        }
        )
        bot.telegram.sendMessage(ctx.chat.id, 'Тапсырыс жіберелді.',{
        reply_markup: {
            keyboard: 
            [
                [
                    { text: "Каталог" },
                    { text: "Тауарға тапсырыс беру" }
                ],
                [
                    { text: "Магазин туралы информация"},
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
        })
    }
    else if(inputArray.length < 3){
        bot.telegram.sendMessage(ctx.chat.id,
        `
        Қате. Тапсырыс дұрыс тапсырымалды.

        /order [Аты-жөні] [Телефон нөмірі] [Таңдалған аккумулятор]

        Мысал: 
        /order Талғат Қайырбеков 87001111111 Voltman 6ct 60
        
        Осы мысал арқылы жазыңыз.
        `)
    }
    else if(inputArray.length > 15){
        bot.telegram.sendMessage(ctx.chat.id,
        `
        Қате. Өте көп сөз жазылды.
        
        /order [Аты-жөні] [Телефон нөмірі] [Таңдалған аккумулятор]

        Мысал: 
        /order Талғат Қайырбеков 87001111111 Voltman 6ct 60
        
        Осы мысал арқылы жазыңыз.
        `
            )
        }
})

bot.action("orderDelete", (ctx) => {
    ctx.deleteMessage()
})

/* Магазин туралы информация*/
bot.hears("Магазин туралы информация", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Информацияны білу үшін астыңғы батырмасын басыңыз", {
        reply_markup: {
            keyboard:
            [
                [
                    { text: "Орналасуы"}
                ],
                [
                    { text: "Контактар"}
                ],
                [
                    { text: "Басына қайту "}
                ]
            ]
        }
    })
})

bot.hears("Орналасуы", (ctx) => {
    bot.telegram.sendLocation(ctx.chat.id, 53.283233, 69.388568)
})

bot.hears("Контактар", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, mainText.contactMessage)
})


//Каталог

bot.hears("Каталог", (ctx) => { 
    bot.telegram.sendMessage(ctx.chat.id, 'Тауар санатын таңдаңыз', {
        reply_markup: {
            inline_keyboard: 
            [
                [
                    {text: "Жеңіл автомобильдер үшін аккумуляторлар", callback_data: "automobile"},
                ],
                [
                    {text: "Жүк көліктері үшін аккумуляторлар", callback_data: "truck"},
                ],
                [
                    {text: "Мотоциклдер мен арнайы техника үшін аккумуляторлар", callback_data: "moto"}
                ],
                [
                    {text: "Қайту", callback_data: "return"}
                ],
            ]
        }
    }) 
})



bot.action("automobile", (ctx) => { //Жеңіл машина
    bot.telegram.sendMessage(ctx.chat.id, automobileText.automobileMessage,{
        reply_markup: {
            keyboard: 
            [
                [
                    { text: "Аккумулятор VOLTMAN 6СТ 60 Ah"},
                    { text: "Аккумулятор T-Rex 6СТ 75 JIS Азия"}
                ],
                [
                    { text: "Аккумулятор FORLUX 6СТ 60 Ah"},
                    { text: "Аккумулятор RACER 6СТ 60 (оң)"}
                ],
                [
                    { text: "Аккумулятор BARS Gold 6СТ 100 Ah"},
                    { text: "Аккумулятор Teyko 6СТ 75 JIS Азия"}
                ],
                [
                    { text: "Аккумулятор ЭЛЕКТРА 6СТ 75"},
                    { text: "Аккумулятор VOLTMAN 6СТ 74 Ah"}
                ],
                [
                    { text: "Қайту"}
                ]
            ],
        }
    })
})

bot.action("truck", (ctx) => { //Жук машина
    bot.telegram.sendMessage(ctx.chat.id, truckText.truckMessage,{
        reply_markup: {
            keyboard: 
            [
                [
                    { text: "Аккумулятор T-Rex Premium 6СТ 74 JIS Азия"},
                    { text: "Аккумулятор RACER 6СТ-190"}
                ],
                [
                    { text: "Аккумулятор BARS Gold 6СТ 100 Ah (жүк)"},
                    { text: "Аккумулятор T-Rex Азия 6СТ 100 JIS (Кері)"}
                ],
                [
                    { text: "Аккумулятор VOLTMAN 6СТ 100 Ah"},
                    { text: "Аккумулятор ENERGIZER EP95J 95 Ah Азия"}
                ],
                [
                    { text: "Аккумулятор Teyko 6СТ 100 JIS Азия"},
                    { text: "Аккумулятор ENERGIZER EM100L5 100 Ah"}
                ],
                [
                    { text: "Қайту"}
                ]
            ],
        }
    })
})

bot.action("moto", (ctx) => { //Мотоцикл мен спецтехника
    bot.telegram.sendMessage(ctx.chat.id, motoText.motoMessage,{
        reply_markup: {
            keyboard: 
            [
                [
                    { text: "Аккумулятор 12N7B-3A"}
                ],
                [
                    { text: "Аккумулятор 6-FM-12A"}
                ],
                [
                    { text: "Аккумулятор 6-FM-9A"}
                ],
                [
                    { text: "Қайту"}
                ]
            ],
        }
    })
})

/* 
    Жеңіл машинанын аккумуляторлары
*/

bot.hears("Аккумулятор VOLTMAN 6СТ 60 Ah", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/automobile/akkumulyator-voltman-6ct60.jpg"
        },
        {
            caption: automobileText.voltman6ct
        })
})

bot.hears("Аккумулятор T-Rex 6СТ 75 JIS Азия", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/automobile/akkumulyator-t-rex-6st-75.jpg"
        },
        {
            caption: automobileText.tRex6ct
        })
})

bot.hears("Аккумулятор FORLUX 6СТ 60 Ah", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/automobile/akkumulyator-forlux-6ct60.jpg"
        },
        {
            caption: automobileText.forlux6ct
        })
})

bot.hears("Аккумулятор RACER 6СТ 60 (оң)", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/automobile/akkumulyator-racer-6st-60.jpg"
        },
        {
            caption: automobileText.racer6ct
        })
})

bot.hears("Аккумулятор BARS Gold 6СТ 100 Ah", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/automobile/akkumulyator-bars-gold-6st-100.jpg"
        },
        {
            caption: automobileText.barc6ct
        })
})

bot.hears("Аккумулятор Teyko 6СТ 75 JIS Азия", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/automobile/akkumulyator-teyko-6st-75.jpg"
        },
        {
            caption: automobileText.teyko6ct
        })
})

bot.hears("Аккумулятор ЭЛЕКТРА 6СТ 75", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/automobile/akkumulyator-elektra-6st-75.jpg"
        },
        {
            caption: automobileText.electro6ct
        })
})

bot.hears("Аккумулятор VOLTMAN 6СТ 74 Ah", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/automobile/akkumulyator-voltman-6st74.jpg"
        },
        {
            caption: automobileText.voltman6ct74
        })
})

/* 
    Жүк көліктері үшін аккумуляторлар 
*/

bot.hears("Аккумулятор T-Rex Premium 6СТ 74 JIS Азия", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/track/akkumulyator-t-rex-6st-75.jpg"
        },
        {
            caption: truckText.tRex6ct75
        })
})

bot.hears("Аккумулятор RACER 6СТ-190", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/track/akkumulyator-racer-6st-190.jpg"
        },
        {
            caption: truckText.racer6ct190
        })
})

bot.hears("Аккумулятор BARS Gold 6СТ 100 Ah (жүк)", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/track/akkumulyator-bars-gold-6st-100.jpg"
        },
        {
            caption: truckText.barc6ct100
        })
})

bot.hears("Аккумулятор T-Rex Азия 6СТ 100 JIS (Кері)", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/track/trex6ct100.jpg"
        },
        {
            caption: truckText.tRex6ct100
        })
})

bot.hears("Аккумулятор VOLTMAN 6СТ 100 Ah", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/track/akkumulyator-voltman-6st-100.jpg"
        },
        {
            caption: truckText.voltman6ct100
        })
})

bot.hears("Аккумулятор ENERGIZER EP95J 95 Ah Азия", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/track/akkumulyator-energizer-ep95j-95ah.jpg"
        },
        {
            caption: truckText.energizer95
        })
})

bot.hears("Аккумулятор Teyko 6СТ 100 JIS Азия", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/track/akkumulyator-teyko-6st-100-jis.jpg"
        },
        {
            caption: truckText.teyko6ct100
        })
})

bot.hears("Аккумулятор ENERGIZER EM100L5 100 Ah", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
        source:"image/track/akkumulyator-energizer-em100l5-100ah.jpg"
        },
        {
            caption: truckText.energizer100
        })
})

/* 
    Мотоциклдер мен арнайы техника үшін аккумуляторлар
*/

bot.hears("Аккумулятор 12N7B-3A", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
            source:"image/moto/akkumulyator-12n7b-3a.jpg"
        },
        {
            caption: motoText.n7b3a
        })
})

bot.hears("Аккумулятор 6-FM-9A", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
            source:"image/moto/akkumulyator-6-fm-9a.jpg"
        },
        {
            caption: motoText.fm9A
        })
})

bot.hears("Аккумулятор 6-FM-12A", async(ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
            source:"image/moto/58d10913e9994.jpg"
        },
        {
            caption: motoText.fm12A
        })
})

/*
    Қайту батырмалары
*/ 

bot.hears("Қайту", async(ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Тауар санатын таңдаңыз', {
        reply_markup: {
            inline_keyboard: 
            [
                [
                    {text: "Жеңіл автомобильдер үшін аккумуляторлар", callback_data: "automobile"},
                ],
                [
                    {text: "Жүк көліктері үшін аккумуляторлар", callback_data: "truck"},
                ],
                [
                    {text: "Мотоциклдер мен арнайы техника үшін аккумуляторлар", callback_data: "moto"}
                ],
                [
                    {text: "Қайту", callback_data: "return"}
                ],
            ]
        }
    }) 
})

bot.action("return", async(ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, mainText.startMessage, {
        reply_markup: {
            keyboard: 
            [
                [
                    { text: "Каталог" },
                    { text: "Тауарға тапсырыс беру" }
                ],
                [
                    { text: "Магазин туралы информация"},
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

bot.hears("Басына қайту", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, mainText.startMessage, {
        reply_markup: {
            keyboard: 
            [
                [
                    { text: "Каталог" },
                    { text: "Тауарға тапсырыс беру" }
                ],
                [
                    { text: "Магазин туралы информация"},
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

/* 
    Қате кезіндегі middleware
*/

bot.use((ctx) => {
    bot.telegram.sendMessage( ctx.chat.id, "Батырмаларды қолдаңыз. Пайдалану нұсқаулығы үшін /help командасын енгізіңіз",{
    reply_markup: {
        keyboard: 
        [
            [
                { text: "Каталог" },
                { text: "Тауарға тапсырыс беру" }
            ],
            [
                { text: "Магазин туралы информация"},
            ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    } } )
    }
)

bot.launch()