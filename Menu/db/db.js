const tipoctas=[
    {tipo:1,
     nombre:'Basica',
     minimo:10,
     maximo:990},
    {tipo:2,
     nombre:'Platimun',
     minimo:100,
     maximo:9990},
];

let usuario=[
    {
        id:1,
        nombre:'Mario Olivo',
        gmail:'mario@correo.com',
        telefono:'6699223366',

    },
    {
        id:2,
        nombre:'Pedro Lopez',
        gmail:'pedro@correo.com',
        telefono:'6699223366',
        
    },
    {
        id:3,
        nombre:'Alma Gonzalez',
        gmail:'Alma@correo.com',
        telefono:'6699223366',
    }
];

let cuentas=[
    {   id:1,
        idusuario:1,
        idcta:1,
        cuenta:'5500123498764563',
        saldo:900
    },
    {id:2,
        idusuario:1,
        idcta:2,
        cuenta:'5500121498779564',
        saldo:1500
    },
    {id:3,
        idusuario:2,
        idcta:1,
        cuenta:'7560179498764517',
        saldo:400
    },
    {id:4,
        idusuario:3,
        idcta:1,
        cuenta:'586017539879178',
        saldo:50
    },
    {id:5,
        idusuario:3,
        idcta:2,
        cuenta:'5860121498795561',
        saldo:1500
    },
];
let movimientos=[
    {
        idusuario:1,
        cuenta:'5500123498764563',
        tipo:'D',
        importe:890,
        saldoant:10,
        fecha:'25-07-2022'
    },
    {
        idusuario:1,
        cuenta:'5500121498779564',
        tipo:'D',
        importe:1000,
        saldoant:10,
        fecha:'25-07-2022'
    },
    {
        idusuario:1,
        cuenta:'5500121498779564',
        tipo:'D',
        importe:490,
        saldoant:1010,
        fecha:'25-07-2022'
    },
    {
        idusuario:2,
        cuenta:'7560179498764517',
        tipo:'D',
        importe:390,
        saldoant:10,
        fecha:'25-07-2022'
    },
    {
        idusuario:3,
        cuenta:'586017539879178',
        tipo:'D',
        importe:890,
        saldoant:10,
        fecha:'25-07-2022'
    },
    {
        idusuario:3,
        cuenta:'586017539879178',
        tipo:'R',
        importe:850,
        saldoant:900,
        fecha:'25-07-2022'
    },
    {
        idusuario:1,
        cuenta:'5860121498795561',
        tipo:'D',
        importe:1490,
        saldoant:10,
        fecha:'25-07-2022'
    },
]