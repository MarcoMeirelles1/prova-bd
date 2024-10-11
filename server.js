const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());
const port = 3005;

let funcionario = [];
let cargo = [];
let departamento = [];


// funcionario ================================================================================== //cadastros abaixo POSTS
app.post('/cadastrofun', (req, res) => {
    const { nome, sobrenome, cargo } = req.body;
    // memória volátil(apenas na memória) => funcionario.push({ id, nome, sobrenome, cargo });
    db.query(
        `INSERT INTO funcionario (nome, sobrenome, cargo) VALUES (?, ?, ?)`,
        [nome, sobrenome, cargo],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na inserção:', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    res.send(`funcionario inserido!\nnome: ${nome} \nsobrenome: ${sobrenome} \ncargo: ${cargo}`);
});
//cargo =========================================================================================
app.post('/cadastrocar', (req, res) => {
    const { cargo, departamento } = req.body;
    // memória volátil(apenas na memória) => funcionario.push({ id, nome, sobrenome, cargo });
    db.query(
        `INSERT INTO cargo (cargo, departamento) VALUES (?, ?)`,
        [ cargo,departamento ],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na inserção:', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    res.send(`cargo inserido!\ncargo: ${cargo} \ndepartamento: ${departamento}`);
});
//departamento =================================================================================
app.post('/cadastrodepar', (req, res) => {
    const { departamento } = req.body;
    // memória volátil(apenas na memória) => funcionario.push({ id, nome, sobrenome, cargo });
    db.query(
        `INSERT INTO departamento (departamento) VALUES (?)`,
        [ departamento ],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na inserção:', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    res.send(`cargo inserido!\ndepartamento: ${departamento}`);
});
//===============================================================================================



// selecionar tudo funcionario ================================================================== visualizar abaixo GETS
app.get('/visualizarfun', (req, res) => {
    db.query(
        `SELECT * FROM funcionario`,
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar funcionario' });
            }
            // Retorna os resultados como um objeto JSON
            return res.json(results);
        }
    );
});

// selecionar tudo cargo =========================================================================
app.get('/visualizarcar', (req, res) => {
    db.query(
        `SELECT * FROM cargo`,
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar cargo' });
            }
            // Retorna os resultados como um objeto JSON
            return res.json(results);
        }
    );
});

// selecionar tudo departamento ==================================================================
app.get('/visualizardepar', (req, res) => {
    db.query(
        `SELECT * FROM departamento`,
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar cargo' });
            }
            // Retorna os resultados como um objeto JSON
            return res.json(results);
        }
    );
});
//=================================================================================================



// selecionar por ID
app.get('/departamento/:id', (req, res) => {

    const { id } = req.params;
    const empresa = departamento.find(v => v.id == id); // v recebe v.id igual ao id

    db.query(
        `SELECT * FROM departamento WHERE id = ?`,
        [Number(id)],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos' });
            }
            // Retorna os resultados como um objeto JSON
            return res.json(results);
        }
    );
});

//selecionar nome e sobrenome usando id LOCALHOST:3005/funcionario/1 exemplo
app.get('/funcionario/:id', (req, res) => {

    const { id } = req.params;
    const empresa = funcionario.find(v => v.id == id); // v recebe v.id igual ao id

    db.query(
        `SELECT nome, sobrenome FROM funcionario WHERE id = ?`,
        [Number(id)],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos' });
            }
            // Retorna os resultados como um objeto JSON
            return res.json(results);
        }
    );
});

//selecionar cargo e departamento usando id LOCALHOST:3005/cargo/1 exemplo
app.get('/cargo/:id', (req, res) => {
    const { id } = req.params;
    const empresa = cargo.find(v => v.id == id); // v recebe v.id igual ao id

    db.query(
        `select cargo, departamento from cargo where id = ?`,
        [Number(id)],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos' });
            }
            // Retorna os resultados como um objeto JSON
            return res.json(results);
        }
    );
});

app.get('/visualizar/cargo/:departamento', (req, res) => {
    const departamento = req.params.departamento; 
    db.query(
        `SELECT departamento FROM cargo WHERE departamento = ?`, 
        [departamento], 
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar cargo' });
            }
            return res.json(results);
        }
    );
});

//deletar dados de todas as entidades

// 4. Deletar dados de todas as entidades
// Delete funcionário
app.delete('/funcionario/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `DELETE FROM funcionario WHERE id = ?`,
        [Number(id)],
        function (err, results) {
            if (err) {
                console.error('Erro ao deleta:', err);
                return res.status(500).json({ error: 'Erro ao deletar funcionário' });
            }
            res.json({ message: 'Funcionário deletado!' });
        }
    );
});

// Delete cargo
app.delete('/cargo/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `DELETE FROM cargo WHERE id = ?`,
        [Number(id)],
        function (err, results) {
            if (err) {
                console.error('Erro ao deleta:', err);
                return res.status(500).json({ error: 'Erro ao deletar cargo' });
            }
            res.json({ message: 'Cargo deletado!' });
        }
    );
});

// Delete departamento
app.delete('/departamento/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `DELETE FROM departamento WHERE id = ?`,
        [Number(id)],
        function (err, results) {
            if (err) {
                console.error('Erro ao deleta:', err);
                return res.status(500).json({ error: 'Erro ao deletar departamento' });
            }
            res.json({ message: 'Departamento deletado!' });
        }
    );
});


app.put('/atualizarfun/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, cargo } = req.body;

    db.query(
        `UPDATE funcionario SET nome = ?, sobrenome = ?, cargo = ? WHERE id = ?`,
        [nome, sobrenome, cargo, id],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na atualização:', err);
                return res.status(500).send('Erro na atualização do funcionário');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Funcionário não encontrado');
            }
            console.log(results);
            console.log(fields);
            res.send(`Funcionário atualizado!\nID: ${id}\nNome: ${nome}\nSobrenome: ${sobrenome}\nCargo: ${cargo}`);
        }
    );
});

//deletar dados de todas as entidades

// 4. Deletar dados de todas as entidades
// Delete funcionário
app.delete('/funcionario/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `DELETE FROM funcionario WHERE id = ?`,
        [Number(id)],
        function (err, results) {
            if (err) {
                console.error('Erro ao deleta:', err);
                return res.status(500).json({ error: 'Erro ao deletar funcionário' });
            }
            res.json({ message: 'Funcionário deletado!' });
        }
    );
});

// Delete cargo
app.delete('/cargo/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `DELETE FROM cargo WHERE id = ?`,
        [Number(id)],
        function (err, results) {
            if (err) {
                console.error('Erro ao deleta:', err);
                return res.status(500).json({ error: 'Erro ao deletar cargo' });
            }
            res.json({ message: 'Cargo deletado!' });
        }
    );
});

// Delete departamento
app.delete('/departamento/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `DELETE FROM departamento WHERE id = ?`,
        [Number(id)],
        function (err, results) {
            if (err) {
                console.error('Erro ao deleta:', err);
                return res.status(500).json({ error: 'Erro ao deletar departamento' });
            }
            res.json({ message: 'Departamento deletado!' });
        }
    );
});




app.listen(port, () => {
    console.log(`Server listening on  http://localhost:${port}`);
});
