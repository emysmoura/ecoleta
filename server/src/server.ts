import express from 'express';
// o express é uma biblioteca que não vem com a tipagem juntamente com ela
// e no typescript precisamos declarar essa tipagem, para que o aviso '...express' não apareça
// então ao passar o mouse em cima do express, ele mostrará qual é a dependência que precisamos instalar
// pra ter essa definição das tipagens no express, no caso é: @types/
// ela é uma dependência que vamos instalar como DevDependence porque ela não precisa ser instalada
// quando a aplicação estiver em produção
const app = express();

app.get('/users', (request, response)=>{
    response.status(200).json(
        [
            {
                'id': 1,
                'name': "Emilly Moura"
            },
            {
                'id': 2,
                'name': "Kaic Garcia"
            }
        ]
    );
})

app.listen(3333, ()=>{
    return console.log('Server working');
});

