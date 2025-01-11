import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const apiUrl = 'http://localhost:8080';

  // Estados para formulários
  const [novoCliente, setNovoCliente] = useState({ clienteNome: '', telefone: '', email: '', endereco: '' });
  const [novoPedido, setNovoPedido] = useState({ clienteId: '', itensPedido: [{ idItem: '', quantidade: 1 }], statusPedido: '', dataHoraPedido: '' });
  const [novoItem, setNovoItem] = useState({ nomeItem: '', descricao: '', precoUnitario: '', categoria: '', alergicos: [] });
  const [clienteEditando, setClienteEditando] = useState(null);
  const [itemEditando, setItemEditando] = useState(null);
  const [pedidoEditando, setPedidoEditando] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/cliente`).then(response => setClientes(response.data));
    axios.get(`${apiUrl}/pedido`).then(response => setPedidos(response.data));
    axios.get(`${apiUrl}/item`).then(response => setMenu(response.data));
  }, []);

  // Adicionar Cliente
  const addCliente = async () => {
    const response = await axios.post(`${apiUrl}/cliente`, { ...novoCliente, historicoPedidos: [] });
    setClientes([...clientes, response.data]);
    setNovoCliente({ clienteNome: '', telefone: '', email: '', endereco: '' });
  };

  // Adicionar Pedido
  const addPedido = async () => {
    try {
      const dataAtual = new Date().toISOString(); // Pega a data e hora atual do computador

      // Ajustando o formato do pedido
      const novoPedidoComData = {
        clientePedido: {
          clienteId: novoPedido.clienteId,
          clienteNome: clientes.find(cliente => cliente.clienteId === novoPedido.clienteId)?.clienteNome,
          endereco: clientes.find(cliente => cliente.clienteId === novoPedido.clienteId)?.endereco,
          telefone: clientes.find(cliente => cliente.clienteId === novoPedido.clienteId)?.telefone,
        },
        itensPedido: novoPedido.itensPedido.map(item => ({
          idItem: item.idItem,
          quantidade: item.quantidade,
          subTotal: menu.find(menuItem => menuItem.idItem === item.idItem)?.precoUnitario * item.quantidade
        })),
        statusPedido: novoPedido.statusPedido,
        dataHoraPedido: dataAtual,
        valorTotal: novoPedido.itensPedido.reduce((total, item) => total + (menu.find(menuItem => menuItem.idItem === item.idItem)?.precoUnitario * item.quantidade), 0)
      };

      // Envia a requisição para o backend
      const response = await axios.post(`${apiUrl}/pedido`, novoPedidoComData);
      setPedidos([...pedidos, response.data]);
      setNovoPedido({
        clienteId: '',
        itensPedido: [{ idItem: '', quantidade: 1 }],
        statusPedido: '',
        dataHoraPedido: ''
      });

      alert("Pedido adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar pedido:", error);
      alert("Houve um erro ao adicionar o pedido. Por favor, tente novamente mais tarde.");
    }
  };

  // Adicionar Item ao Pedido
  const addItemAoPedido = () => {
    setNovoPedido({
      ...novoPedido,
      itensPedido: [...novoPedido.itensPedido, { idItem: '', quantidade: 1 }]
    });
  };

  // Remover Item do Pedido
  const removeItemDoPedido = (index) => {
    setNovoPedido({
      ...novoPedido,
      itensPedido: novoPedido.itensPedido.filter((_, i) => i !== index)
    });
  };


  // Adicionar Item
  const addItem = async () => {
    const response = await axios.post(`${apiUrl}/item`, novoItem);
    setMenu([...menu, response.data]);
    setNovoItem({ nomeItem: '', descricao: '', precoUnitario: '', categoria: '', alergicos: [] });
  };

  // Carregar dados no formulário ao clicar em "Editar" para Cliente
  const preencherFormularioCliente = (cliente) => {
    setNovoCliente({
      clienteNome: cliente.clienteNome,
      telefone: cliente.telefone,
      email: cliente.email,
      endereco: cliente.endereco
    });
    setClienteEditando(cliente.clienteId);
  };

  // Atualizar Cliente
  const updateCliente = async () => {
    if (!clienteEditando) return;
    const response = await axios.put(`${apiUrl}/cliente/${clienteEditando}`, novoCliente);
    setClientes(clientes.map(cliente =>
      cliente.clienteId === clienteEditando ? response.data : cliente
    ));
    setNovoCliente({ clienteNome: '', telefone: '', email: '', endereco: '' });
    setClienteEditando(null);
  };

  // Carregar dados no formulário ao clicar em "Editar" para Pedido
  const preencherFormularioPedido = (pedido) => {
    setNovoPedido({
      clienteId: pedido.clientePedido.clienteId,
      itensPedido: pedido.itensPedido.map(item => ({
        idItem: item.idItem,
        quantidade: item.quantidade
      })),
      statusPedido: pedido.statusPedido,
      dataHoraPedido: pedido.dataHoraPedido
    });
    setPedidoEditando(pedido.idPedido);
  };

  // Atualizar Pedido
  const updatePedido = async () => {
    if (!pedidoEditando) return; // Verifica se existe um ID de pedido para atualizar

    try {
      const dataAtual = new Date().toISOString(); // Pega a data e hora atual do computador

      // Ajustando o formato do pedido para atualização
      const pedidoAtualizado = {
        clientePedido: {
          clienteId: novoPedido.clienteId,
          clienteNome: clientes.find(cliente => cliente.clienteId === novoPedido.clienteId)?.clienteNome,
          endereco: clientes.find(cliente => cliente.clienteId === novoPedido.clienteId)?.endereco,
          telefone: clientes.find(cliente => cliente.clienteId === novoPedido.clienteId)?.telefone,
        },
        itensPedido: novoPedido.itensPedido.map(item => ({
          idItem: item.idItem,
          quantidade: item.quantidade,
          subTotal: menu.find(menuItem => menuItem.idItem === item.idItem)?.precoUnitario * item.quantidade
        })),
        statusPedido: novoPedido.statusPedido,
        dataHoraPedido: dataAtual,
        valorTotal: novoPedido.itensPedido.reduce((total, item) => total + (menu.find(menuItem => menuItem.idItem === item.idItem)?.precoUnitario * item.quantidade), 0)
      };

      // Envia a requisição PUT para atualizar o pedido
      const response = await axios.put(`${apiUrl}/pedido/${pedidoEditando}`, pedidoAtualizado);

      // Atualiza o estado com os dados do pedido atualizado
      setPedidos(pedidos.map(pedido =>
        pedido.idPedido === pedidoEditando ? response.data : pedido
      ));

      // Limpa o formulário e o estado de edição
      setNovoPedido({
        clienteId: '',
        itensPedido: [{ idItem: '', quantidade: 1 }],
        statusPedido: '',
        dataHoraPedido: ''
      });
      setPedidoEditando(null);

      alert("Pedido atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      alert("Houve um erro ao atualizar o pedido. Por favor, tente novamente mais tarde.");
    }
  };

  // Carregar dados no formulário ao clicar em "Editar" para Item
  const preencherFormularioItem = (item) => {
    setNovoItem({
      nomeItem: item.nomeItem,
      descricao: item.descricao,
      precoUnitario: item.precoUnitario,
      categoria: item.categoria,
      alergicos: item.alergicos
    });
    setItemEditando(item.idItem);
  };

  // Atualizar Item
  const updateItem = async () => {
    if (!itemEditando) return;
    const response = await axios.put(`${apiUrl}/item/${itemEditando}`, novoItem);
    setMenu(menu.map(item =>
      item.idItem === itemEditando ? response.data : item
    ));
    setNovoItem({ nomeItem: '', descricao: '', precoUnitario: '', categoria: '', alergicos: [] });
    setItemEditando(null);
  };

  // Deletar Cliente
  const deleteCliente = async (clienteId) => {
    await axios.delete(`${apiUrl}/cliente/${clienteId}`);
    setClientes(clientes.filter(cliente => cliente.clienteId !== clienteId));
  };

  // Deletar Pedido
  const deletePedido = async (pedidoId) => {
    await axios.delete(`${apiUrl}/pedido/${pedidoId}`);
    setPedidos(pedidos.filter(pedido => pedido.idPedido !== pedidoId));
  };

  // Deletar Item
  const deleteItem = async (itemId) => {
    await axios.delete(`${apiUrl}/item/${itemId}`);
    setMenu(menu.filter(item => item.idItem !== itemId));
  };

  return (
    <div className="container">
      <h1 className="header">CRUD de Clientes, Pedidos e Itens</h1>

      <select
        className="select-option"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Selecione...</option>
        <option value="clientes">Clientes</option>
        <option value="pedidos">Pedidos</option>
        <option value="itens">Itens</option>
      </select>

      {/* Formulário de Cliente */}
      {selectedOption === 'clientes' && (
        <div className="form-section">
          <h2 className="form-title">Adicionar Cliente</h2>
          <input
            className="input-field"
            type="text"
            placeholder="Nome"
            value={novoCliente.clienteNome}
            onChange={(e) => setNovoCliente({ ...novoCliente, clienteNome: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Telefone"
            value={novoCliente.telefone}
            onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
          />
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={novoCliente.email}
            onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Endereço"
            value={novoCliente.endereco}
            onChange={(e) => setNovoCliente({ ...novoCliente, endereco: e.target.value })}
          />
          <button className="button" onClick={addCliente}>Adicionar Cliente</button>

          <h3 className="list-title">Lista de Clientes</h3>
          {clientes.map(cliente => (
            <div key={cliente.clienteId} className="list-item">
              <p>Nome: {cliente.clienteNome}</p>
              <p>Telefone: {cliente.telefone}</p>
              <p>Email: {cliente.email}</p>
              <p>Endereço: {cliente.endereco}</p>
              <button className="button" onClick={() => preencherFormularioCliente(cliente)}>Editar</button>
              <button className="button" onClick={updateCliente}>Salvar Atualização</button>
              <button className="button" onClick={() => deleteCliente(cliente.clienteId)}>Deletar</button>
            </div>
          ))}
        </div>
      )}

      {/* Formulário de Pedido */}
      {selectedOption === 'pedidos' && (
        <div className="form-section">
          <h2 className="form-title">{pedidoEditando ? "Editar Pedido" : "Adicionar Pedido"}</h2>
          <label className="label">Selecione o Cliente:</label>
          <select
            className="select-field"
            value={novoPedido.clienteId}
            onChange={(e) => setNovoPedido({ ...novoPedido, clienteId: e.target.value })}
          >
            <option value="">Selecione o Cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.clienteId} value={cliente.clienteId}>
                {cliente.clienteId} - {cliente.clienteNome}
              </option>
            ))}
          </select>

          {novoPedido.itensPedido.map((item, index) => (
            <div key={index}>
              <label className="label">Selecione o Item:</label>
              <select
                className="select-field"
                value={item.idItem}
                onChange={(e) => {
                  const itensPedido = [...novoPedido.itensPedido];
                  itensPedido[index].idItem = e.target.value;
                  setNovoPedido({ ...novoPedido, itensPedido });
                }}
              >
                <option value="">Selecione o Item</option>
                {menu.map(menuItem => (
                  <option key={menuItem.idItem} value={menuItem.idItem}>
                    {menuItem.idItem} - {menuItem.nomeItem}
                  </option>
                ))}
              </select>

              <label className="label">Quantidade:</label>
              <input
                className="input-field"
                type="number"
                value={item.quantidade}
                onChange={(e) => {
                  const itensPedido = [...novoPedido.itensPedido];
                  itensPedido[index].quantidade = e.target.value;
                  setNovoPedido({ ...novoPedido, itensPedido });
                }}
              />

              <button className="button" onClick={() => removeItemDoPedido(index)}>Remover item</button>
            </div>
          ))}

          <br />
          <button className="button" onClick={addItemAoPedido}>Adicionar mais itens</button>


          <label className="label">Status:</label>
          <input
            className="input-field"
            type="text"
            placeholder="Status do Pedido"
            value={novoPedido.statusPedido}
            onChange={(e) => setNovoPedido({ ...novoPedido, statusPedido: e.target.value })}
          />

          <button className="button" onClick={pedidoEditando ? updatePedido : addPedido}>
            {pedidoEditando ? "Salvar Atualização" : "Adicionar Pedido"}
          </button>

          <h3 className="list-title">Lista de Pedidos</h3>
          {pedidos.map(pedido => (
            <div key={pedido.idPedido} className="list-item">
              <p><strong>Cliente:</strong> {pedido.clientePedido.clienteNome}</p>
              <p><strong>Itens:</strong> {pedido.itensPedido.map(item => (
                <span key={item.idItem}>
                  {item.idItem} - Quantidade: {item.quantidade} | SubTotal: R${item.subTotal.toFixed(2)}
                </span>
              )).reduce((prev, curr) => [prev, ', ', curr])}</p>
              <p><strong>Valor Total:</strong> R${pedido.valorTotal.toFixed(2)}</p>
              <button className="button" onClick={() => preencherFormularioPedido(pedido)}>Editar</button>
              <button className="button" onClick={() => deletePedido(pedido.idPedido)}>Deletar</button>
            </div>
          ))}

        </div>
      )}

      {/* Formulário de Item */}
      {selectedOption === 'itens' && (
        <div className="form-section">
          <h2 className="form-title">Adicionar Item</h2>
          <input
            className="input-field"
            type="text"
            placeholder="Nome do Item"
            value={novoItem.nomeItem}
            onChange={(e) => setNovoItem({ ...novoItem, nomeItem: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Descrição"
            value={novoItem.descricao}
            onChange={(e) => setNovoItem({ ...novoItem, descricao: e.target.value })}
          />
          <input
            className="input-field"
            type="number"
            placeholder="Preço"
            value={novoItem.precoUnitario}
            onChange={(e) => setNovoItem({ ...novoItem, precoUnitario: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Categoria"
            value={novoItem.categoria}
            onChange={(e) => setNovoItem({ ...novoItem, categoria: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Alergicos (separados por vírgula)"
            value={novoItem.alergicos}
            onChange={(e) => setNovoItem({ ...novoItem, alergicos: e.target.value.split(',').map(item => item.trim()) })}
          />

          <button className="button" onClick={addItem}>Adicionar Item</button>

          <h3 className="list-title">Lista de Itens</h3>
          {menu.map(item => (
            <div key={item.idItem} className="list-item">
              <p>{item.nomeItem} - R${item.precoUnitario} - {item.alergicos} - {item.categoria}</p>
              <button className="button" onClick={() => preencherFormularioItem(item)}>Editar</button>
              <button className="button" onClick={updateItem}>Salvar Atualização</button>
              <button className="button" onClick={() => deleteItem(item.idItem)}>Deletar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;