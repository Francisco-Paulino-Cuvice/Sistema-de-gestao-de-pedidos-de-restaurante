import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [menu, setMenu] = useState([]);
  const apiUrl = 'http://localhost:3001'; // URL do seu servidor JSON

  // Carregar os dados automaticamente
  useEffect(() => {
    // Carrega os dados de clientes, pedidos e menu automaticamente
    axios.get(`${apiUrl}/clientes`).then(response => setClientes(response.data));
    axios.get(`${apiUrl}/pedidos`).then(response => setPedidos(response.data));
    axios.get(`${apiUrl}/menu`).then(response => setMenu(response.data));
  }, []);

  // Função para adicionar cliente (usando dados pré-definidos)
  const addCliente = async () => {
    const newCliente = {
      clienteNome: 'Novo Cliente',
      telefone: '999999999',
      email: 'novo@cliente.com',
      endereco: 'Rua Exemplo, 123',
    };
    const response = await axios.post(`${apiUrl}/clientes`, newCliente);
    setClientes([...clientes, response.data]);
  };

  // Função para editar um cliente
  const editCliente = async (clienteId) => {
    const cliente = clientes.find(c => c.id === clienteId);
    const updatedCliente = { ...cliente, clienteNome: 'Cliente Editado' }; // Simulação de edição
    const response = await axios.put(`${apiUrl}/clientes/${clienteId}`, updatedCliente);
    setClientes(clientes.map(c => (c.id === clienteId ? response.data : c)));
  };

  // Função para excluir um cliente
  const deleteCliente = async (clienteId) => {
    await axios.delete(`${apiUrl}/clientes/${clienteId}`);
    setClientes(clientes.filter(c => c.id !== clienteId));
  };

  // Função para adicionar pedido (usando dados pré-definidos)
  const addPedido = async () => {
    const newPedido = {
      clientePedido: {
        clienteId: '1',
        clienteNome: 'Francisco',
        endereco: 'Rua 31, 87',
        telefone: '(19) 99263-4528',
      },
      itensPedido: [
        { idItem: '1', quantidade: 1, subTotal: 12.99 },
        { idItem: '2', quantidade: 1, subTotal: 15.99 }
      ],
      valorTotal: 28.98,
      statusPedido: 'Entregue',
      dataHoraPedido: '2024-12-30T03:16:00'
    };
    const response = await axios.post(`${apiUrl}/pedidos`, newPedido);
    setPedidos([...pedidos, response.data]);
  };

  // Função para adicionar item ao menu com o id correto e ordem desejada
  const addItem = async () => {
    // Pegando o último idItem do menu e incrementando
    const lastItem = menu[menu.length - 1];
    const newId = lastItem ? parseInt(lastItem.idItem) + 1 : 1; // Se não houver item, começa do ID 1

    const newItem = {
      nomeItem: 'Novo Item',
      descricao: 'Descrição do item',
      precoUnitario: 20.99,
      categoria: 'Categoria Exemplo',
      alergicos: [],
      idItem: newId.toString(),  // O idItem vai ser gerado depois de alergicos
      id: 'dbc9'  // O id também é colocado no final, como você pediu
    };

    const response = await axios.post(`${apiUrl}/menu`, newItem);
    setMenu([...menu, response.data]);
  };

  return (
    <div>
      <h1>CRUD de Clientes, Pedidos e Menu</h1>

      {/* Botão para adicionar Cliente */}
      <div>
        <button onClick={addCliente}>Adicionar Cliente (Exemplo)</button>
      </div>

      {/* Lista de Clientes */}
      <div>
        <h2>Clientes</h2>
        {clientes.map(cliente => (
          <div key={cliente.id}>
            <p>{cliente.clienteNome} - {cliente.telefone}</p>
            <button onClick={() => editCliente(cliente.id)}>Editar Cliente</button>
            <button onClick={() => deleteCliente(cliente.id)}>Deletar Cliente</button>
          </div>
        ))}
      </div>

      {/* Botão para adicionar Pedido */}
      <div>
        <button onClick={addPedido}>Adicionar Pedido (Exemplo)</button>
      </div>

      {/* Lista de Pedidos */}
      <div>
        <h2>Pedidos</h2>
        {pedidos.map(pedido => (
          <div key={pedido.idPedido}>
            <p>{pedido.clientePedido.clienteNome} - {pedido.valorTotal}</p>
            <p>Status: {pedido.statusPedido}</p>
            <p>Data: {pedido.dataHoraPedido}</p>
          </div>
        ))}
      </div>

      {/* Botão para adicionar Item ao Menu */}
      <div>
        <button onClick={addItem}>Adicionar Item ao Menu (Exemplo)</button>
      </div>

      {/* Lista de Menu */}
      <div>
        <h2>Menu</h2>
        {menu.map(item => (
          <div key={item.idItem}>
            <p>{item.nomeItem} - {item.descricao} - R${item.precoUnitario}</p>
            <p><strong>ID do Item:</strong> {item.idItem}</p>
            <p><strong>ID:</strong> {item.id}</p>  {/* Exibindo o ID conforme desejado */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
