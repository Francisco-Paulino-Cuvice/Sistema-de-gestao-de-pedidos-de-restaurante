import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [menu, setMenu] = useState([]);
  const [searchCliente, setSearchCliente] = useState('');
  const [searchPedido, setSearchPedido] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const apiUrl = 'http://localhost:8080'; // URL do seu servidor JSON

  // Carregar os dados automaticamente
  useEffect(() => {
    // Carrega os dados de clientes, pedidos e itens automaticamente
    axios.get(`${apiUrl}/cliente`).then(response => {
      setClientes(response.data);
      setFilteredClientes(response.data);
    });
    axios.get(`${apiUrl}/pedido`).then(response => {
      setPedidos(response.data);
      setFilteredPedidos(response.data);
    });
    axios.get(`${apiUrl}/item`).then(response => {
      setMenu(response.data);
      setFilteredMenu(response.data);
    });
  }, []);

  // Função para adicionar cliente (usando dados fornecidos)
  const addCliente = async () => {
    const newCliente = {
      clienteNome: 'Nome do Cliente',
      telefone: '123456789',
      email: 'email@exemplo.com',
      endereco: 'Endereço do Cliente',
      historicoPedidos: []
    };
    const response = await axios.post(`${apiUrl}/cliente`, newCliente);
    setClientes([...clientes, response.data]);
    if (selectedOption === 'clientes') setFilteredClientes([...clientes, response.data]);
  };

  // Função para adicionar pedido (usando dados fornecidos)
  const addPedido = async () => {
    const newPedido = {
      clientePedido: {
        clienteId: '677e6124c602b23f61158f59',
      },
      itensPedido: [
        { idItem: '677e6608a1d8e82bd62710b2', quantidade: 1 },
      ],
      statusPedido: 'Entregue',
      dataHoraPedido: '2024-12-30T03:16:00'
    };
    const response = await axios.post(`${apiUrl}/pedido`, newPedido);
    setPedidos([...pedidos, response.data]);
    if (selectedOption === 'pedidos') setFilteredPedidos([...pedidos, response.data]);
  };

  // Função para adicionar item ao menu (usando dados fornecidos)
  const addItem = async () => {
    const newItem = {
      nomeItem: 'Novo Item',
      descricao: 'Descrição do item',
      precoUnitario: 20.99,
      categoria: 'Categoria Exemplo',
      alergicos: []
    };
    const response = await axios.post(`${apiUrl}/item`, newItem);
    setMenu([...menu, response.data]);
    if (selectedOption === 'itens') setFilteredMenu([...menu, response.data]);
  };

  // Função para selecionar a opção de pesquisa
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Funções para lidar com a mudança nas barras de pesquisa
  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (selectedOption === 'clientes') {
      setSearchCliente(value);
    } else if (selectedOption === 'pedidos') {
      setSearchPedido(value);
    } else if (selectedOption === 'itens') {
      setSearchItem(value);
    }
  };

  // Funções para buscar e filtrar os dados
  const buscar = () => {
    if (selectedOption === 'clientes') {
      setFilteredClientes(clientes.filter(cliente =>
        cliente.clienteNome.toLowerCase().includes(searchCliente.toLowerCase())
      ));
    } else if (selectedOption === 'pedidos') {
      setFilteredPedidos(pedidos.filter(pedido =>
        pedido.clientePedido.clienteNome.toLowerCase().includes(searchPedido.toLowerCase())
      ));
    } else if (selectedOption === 'itens') {
      setFilteredMenu(menu.filter(item =>
        item.nomeItem.toLowerCase().includes(searchItem.toLowerCase())
      ));
    }
  };

  return (
    <div>
      <h1>CRUD de Clientes, Pedidos e Itens</h1>

      {/* Dropdown para selecionar a opção de pesquisa */}
      <div>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Selecione uma opção...</option>
          <option value="clientes">Clientes</option>
          <option value="pedidos">Pedidos</option>
          <option value="itens">Itens</option>
        </select>
      </div>

      {/* Barra de Pesquisa */}
      {selectedOption && (
        <div>
          <input
            type="text"
            placeholder={`Pesquisar ${selectedOption}...`}
            value={selectedOption === 'clientes' ? searchCliente : selectedOption === 'pedidos' ? searchPedido : searchItem}
            onChange={handleSearchChange}
          />
          <button onClick={buscar}>Buscar</button>
        </div>
      )}

      {/* Botão para adicionar Cliente */}
      <div>
        <button onClick={addCliente}>Adicionar Cliente</button>
      </div>

      {/* Lista de Clientes */}
      <div>
        <h2>Clientes</h2>
        {selectedOption === 'clientes' && filteredClientes.map(cliente => (
          <div key={cliente.clienteId}>
            <p>{cliente.clienteNome} - {cliente.telefone}</p>
          </div>
        ))}
      </div>

      {/* Botão para adicionar Pedido */}
      <div>
        <button onClick={addPedido}>Adicionar Pedido</button>
      </div>

      {/* Lista de Pedidos */}
      <div>
        <h2>Pedidos</h2>
        {selectedOption === 'pedidos' && filteredPedidos.map(pedido => (
          <div key={pedido.idPedido}>
            <p>{pedido.clientePedido.clienteNome} - {pedido.valorTotal}</p>
            <p>Status: {pedido.statusPedido}</p>
            <p>Data: {pedido.dataHoraPedido}</p>
          </div>
        ))}
      </div>

      {/* Botão para adicionar Item */}
      <div>
        <button onClick={addItem}>Adicionar Item</button>
      </div>

      {/* Lista de Itens */}
      <div>
        <h2>Itens</h2>
        {selectedOption === 'itens' && filteredMenu.map(item => (
          <div key={item.idItem}>
            <p>{item.nomeItem} - {item.descricao} - R${item.precoUnitario}</p>
            <p><strong>ID do Item:</strong> {item.idItem}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
