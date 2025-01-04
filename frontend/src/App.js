import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [menu, setMenu] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [novoCliente, setNovoCliente] = useState({
        clienteId: '',
        clienteNome: '',
        telefone: '',
        email: '',
        endereco: '',
    });

    const [novoItem, setNovoItem] = useState({
        idItem: '',
        nomeItem: '',
        descricao: '',
        precoUnitario: '',
        categoria: '',
        alergicos: [],
        id: ''
    });

    const [novoPedido, setNovoPedido] = useState({
        idPedido: '',
        clientePedido: {},
        itensPedido: [],
        valorTotal: '',
        statusPedido: '',
    });

    const api = axios.create({
        baseURL: 'http://localhost:3001',
    });

    useEffect(() => {
        // Fetch menu
        api.get('/menu')
            .then((response) => setMenu(response.data))
            .catch((error) => console.error('Erro ao buscar menu:', error));

        // Fetch pedidos
        api.get('/pedidos')
            .then((response) => setPedidos(response.data))
            .catch((error) => console.error('Erro ao buscar pedidos:', error));

        // Fetch clientes
        api.get('/clientes')
            .then((response) => setClientes(response.data))
            .catch((error) => console.error('Erro ao buscar clientes:', error));
    }, []);

    // CRUD for Clientes
    const handleClienteChange = (e) => {
        setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value });
    };

    const handleClienteSubmit = (e) => {
        e.preventDefault();
        const newCliente = { 
            ...novoCliente, 
            clienteId: clientes.length + 1, // Adiciona um ID numérico para clienteId
            id: clientes.length + 1 // Adiciona um ID numérico para id
        };
        api.post('/clientes', newCliente)
            .then(() => {
                alert('Cliente criado com sucesso!');
                setNovoCliente({ clienteId: '', clienteNome: '', telefone: '', email: '', endereco: '' });
                return api.get('/clientes');
            })
            .then((response) => setClientes(response.data))
            .catch((error) => console.error('Erro ao criar cliente:', error));
    };

    const handleDeleteCliente = (id) => {
        console.log(`Deletando cliente com ID: ${id}`);
        api.delete(`/clientes/${id}`)
            .then(() => {
                alert('Cliente deletado com sucesso!');
                return api.get('/clientes');
            })
            .then((response) => setClientes(response.data))
            .catch((error) => console.error('Erro ao deletar cliente:', error));
    };

    const handleEditCliente = (cliente) => {
        setNovoCliente(cliente);
    };

    const handleUpdateCliente = (e) => {
        e.preventDefault();
        api.put(`/clientes/${novoCliente.clienteId}`, novoCliente)
            .then(() => {
                alert('Cliente atualizado com sucesso!');
                return api.get('/clientes');
            })
            .then((response) => setClientes(response.data))
            .catch((error) => console.error('Erro ao atualizar cliente:', error));
    };

    // CRUD for Menu
    const handleItemChange = (e) => {
        setNovoItem({ ...novoItem, [e.target.name]: e.target.value });
    };

    const handleItemSubmit = (e) => {
        e.preventDefault();
        const newItem = { 
            ...novoItem, 
            idItem: menu.length + 1, // Adiciona um ID numérico para idItem
            id: menu.length + 1 // Adiciona um ID numérico para id
        };
        api.post('/menu', newItem)
            .then(() => {
                alert('Item criado com sucesso!');
                setNovoItem({ idItem: '', nomeItem: '', descricao: '', precoUnitario: '', categoria: '', alergicos: [], id: '' });
                return api.get('/menu');
            })
            .then((response) => setMenu(response.data))
            .catch((error) => console.error('Erro ao criar item:', error));
    };

    const handleDeleteItem = (id) => {
        console.log(`Deletando item com ID: ${id}`);
        api.delete(`/menu/${id}`)
            .then(() => {
                alert('Item deletado com sucesso!');
                return api.get('/menu');
            })
            .then((response) => setMenu(response.data))
            .catch((error) => console.error('Erro ao deletar item:', error));
    };

    const handleEditItem = (item) => {
        setNovoItem(item);
    };

    const handleUpdateItem = (e) => {
        e.preventDefault();
        api.put(`/menu/${novoItem.id}`, novoItem)
            .then(() => {
                alert('Item atualizado com sucesso!');
                return api.get('/menu');
            })
            .then((response) => setMenu(response.data))
            .catch((error) => console.error('Erro ao atualizar item:', error));
    };

    // CRUD for Pedidos
    const handlePedidoChange = (e) => {
        setNovoPedido({ ...novoPedido, [e.target.name]: e.target.value });
    };

    const handlePedidoSubmit = (e) => {
        e.preventDefault();
        const newPedido = { 
            ...novoPedido, 
            idPedido: pedidos.length + 1, // Adiciona um ID numérico para idPedido
            id: pedidos.length + 1 // Adiciona um ID numérico para id
        };
        api.post('/pedidos', newPedido)
            .then(() => {
                alert('Pedido criado com sucesso!');
                setNovoPedido({ idPedido: '', clientePedido: {}, itensPedido: [], valorTotal: '', statusPedido: '', id: '' });
                return api.get('/pedidos');
            })
            .then((response) => setPedidos(response.data))
            .catch((error) => console.error('Erro ao criar pedido:', error));
    };

    const handleDeletePedido = (id) => {
        console.log(`Deletando pedido com ID: ${id}`);
        api.delete(`/pedidos/${id}`)
            .then(() => {
                alert('Pedido deletado com sucesso!');
                return api.get('/pedidos');
            })
            .then((response) => setPedidos(response.data))
            .catch((error) => console.error('Erro ao deletar pedido:', error));
    };

    const handleEditPedido = (pedido) => {
        setNovoPedido(pedido);
    };

    const handleUpdatePedido = (e) => {
        e.preventDefault();
        api.put(`/pedidos/${novoPedido.idPedido}`, novoPedido)
            .then(() => {
                alert('Pedido atualizado com sucesso!');
                return api.get('/pedidos');
            })
            .then((response) => setPedidos(response.data))
            .catch((error) => console.error('Erro ao atualizar pedido:', error));
    };

    return (
        <div>
            <h1>Menu</h1>
            <ul>
                {menu.map((item) => (
                    <li key={item.id}>
                        {item.nomeItem} - R${item.precoUnitario} ({item.categoria})
                        <button onClick={() => handleDeleteItem(item.id)}>Deletar</button>
                        <button onClick={() => handleEditItem(item)}>Editar</button>
                    </li>
                ))}
            </ul>
            <h2>Criar Novo Item</h2>
            <form onSubmit={handleItemSubmit}>
                <input
                    name="nomeItem"
                    placeholder="Nome do Item"
                    value={novoItem.nomeItem}
                    onChange={handleItemChange}
                />
                <input
                    name="descricao"
                    placeholder="Descrição"
                    value={novoItem.descricao}
                    onChange={handleItemChange}
                />
                <input
                    name="precoUnitario"
                    placeholder="Preço Unitário"
                    value={novoItem.precoUnitario}
                    onChange={handleItemChange}
                />
                <input
                    name="categoria"
                    placeholder="Categoria"
                    value={novoItem.categoria}
                    onChange={handleItemChange}
                />
                <input
                    name="alergicos"
                    placeholder="Alergênicos (separados por vírgula)"
                    value={novoItem.alergicos}
                    onChange={(e) =>
                        setNovoItem({ ...novoItem, alergicos: e.target.value.split(',') })
                    }
                />
                <button type="submit">Criar Item</button>
            </form>

            <h1>Pedidos</h1>
            <ul>
                {pedidos.map((pedido) => (
                    <li key={pedido.idPedido}>
                        Pedido #{pedido.idPedido} - Total: R${pedido.valorTotal} - Status: {pedido.statusPedido}
                        <button onClick={() => handleDeletePedido(pedido.idPedido)}>Deletar</button>
                        <button onClick={() => handleEditPedido(pedido)}>Editar</button>
                    </li>
                ))}
            </ul>
            <h2>Criar Novo Pedido</h2>
            <form onSubmit={handlePedidoSubmit}>
                <textarea
                    name="clientePedido"
                    placeholder="Dados do Cliente (JSON)"
                    value={JSON.stringify(novoPedido.clientePedido)}
                    onChange={(e) =>
                        setNovoPedido({ ...novoPedido, clientePedido: JSON.parse(e.target.value) })
                    }
                />
                <textarea
                    name="itensPedido"
                    placeholder="Itens do Pedido (JSON)"
                    value={JSON.stringify(novoPedido.itensPedido)}
                    onChange={(e) =>
                        setNovoPedido({ ...novoPedido, itensPedido: JSON.parse(e.target.value) })
                    }
                />
                <input
                    name="valorTotal"
                    placeholder="Valor Total"
                    value={novoPedido.valorTotal}
                    onChange={handlePedidoChange}
                />
                <input
                    name="statusPedido"
                    placeholder="Status"
                    value={novoPedido.statusPedido}
                    onChange={handlePedidoChange}
                />
                <button type="submit">Criar Pedido</button>
            </form>

            <h1>Clientes</h1>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.clienteId}>
                        {cliente.clienteNome} - {cliente.email}
                        <button onClick={() => handleDeleteCliente(cliente.clienteId)}>Deletar</button>
                        <button onClick={() => handleEditCliente(cliente)}>Editar</button>
                    </li>
                ))}
            </ul>
            <h2>Criar Novo Cliente</h2>
            <form onSubmit={handleClienteSubmit}>
                <input
                    name="clienteNome"
                    placeholder="Nome"
                    value={novoCliente.clienteNome}
                    onChange={handleClienteChange}
                />
                <input
                    name="telefone"
                    placeholder="Telefone"
                    value={novoCliente.telefone}
                    onChange={handleClienteChange}
                />
                <input
                    name="email"
                    placeholder="E-mail"
                    value={novoCliente.email}
                    onChange={handleClienteChange}
                />
                <input
                    name="endereco"
                    placeholder="Endereço"
                    value={novoCliente.endereco}
                    onChange={handleClienteChange}
                />
                <button type="submit">Criar Cliente</button>
            </form>

            <h2>Editar Cliente</h2>
            <form onSubmit={handleUpdateCliente}>
                <input
                    name="clienteNome"
                    placeholder="Nome"
                    value={novoCliente.clienteNome}
                    onChange={handleClienteChange}
                />
                <input
                    name="telefone"
                    placeholder="Telefone"
                    value={novoCliente.telefone}
                    onChange={handleClienteChange}
                />
                <input
                    name="email"
                    placeholder="E-mail"
                    value={novoCliente.email}
                    onChange={handleClienteChange}
                />
                <input
                    name="endereco"
                    placeholder="Endereço"
                    value={novoCliente.endereco}
                    onChange={handleClienteChange}
                />
                <button type="submit">Atualizar Cliente</button>
            </form>
        </div>
    );
};

export default App;