import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/form-new-list.css';

function FormNewList({ setIsFormOpen, onCreate }) {
  const [icones, setIcones] = useState([]);
  const [message, setMessage] = useState('');
  const [listData, setListData] = useState({
    nome_lista: '',
    id_icone: 0,
    caminho_icone: ''
  });

  // console.log("Icones", icones);
  // console.log("ListData", listData);

  const fetchData = async () => {
    try {
      let selectedIcons = localStorage.getItem('selectedIcons');
      selectedIcons = selectedIcons ? JSON.parse(selectedIcons) : [];
      // console.log("iCONE SELECIONADO", selectedIcons);

      const response = await fetch('http://localhost:3001/lists/icones');
      const data = await response.json();

      // Filtra os ícones para remover o ícone selecionado, se houver
      const icons = data.filter(icon => !selectedIcons.find(selectedIcon => selectedIcon.id_icone === icon.id_icone));
      setIcones(icons)
      // console.log("FILTRO", icons);

      if (selectedIcons.length == 0) {
        setIcones(data)
        return
      }

    } catch (error) {
      console.error('Erro ao buscar ícones da API:', error);
    }
  };


  const handleSelectChange = (event) => {
    const { value } = event.target;
    const icone = icones.find(icon => icon.id_icone === parseInt(value, 10));

    setListData(prevListData => ({
      ...prevListData,
      id_icone: parseInt(value, 10),
      caminho_icone: icone ? icone.caminho_icone : ''
    }));

  };


  const getFileName = (path) => {
    const fileName = path.split('/').pop();
    return fileName.split('.').slice(0, -1).join('.');
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nome_lista, id_icone } = listData;
    const token = localStorage.getItem('token');

    if (!id_icone) {
      setMessage('Selecione um ícone');
      return
    }

    try {
      const response = await fetch('http://localhost:3001/lists/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome_lista, id_icone }),
      });


      if (response.ok) {
        setListData({
          nome_lista: '',
          id_icone: 1,
          caminho_icone: ''
        });
        setMessage('Lista criada com sucesso!');
        onCreate();
        setIsFormOpen(false);

        // Adiciona o ícone selecionado ao array de ícones selecionados
        const [selectedIcon] = icones.filter(icone => icone.id_icone === id_icone);

        // Recupera os ícones selecionados do localStorage ou inicializa um novo array vazio
        let selectedIcons = JSON.parse(localStorage.getItem('selectedIcons')) || [];

        // Adiciona o ícone selecionado ao array de ícones selecionados
        selectedIcons.push(selectedIcon);

        // Armazena o array atualizado de ícones selecionados de volta no localStorage
        localStorage.setItem('selectedIcons', JSON.stringify(selectedIcons));

      } else {
        setMessage('Erro ao criar a lista');
      }
    } catch (error) {
      setMessage('Erro ao criar a lista', error.message);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className='form-list-modal'>
      <span className="close" onClick={() => setIsFormOpen(false)}>&times;</span>
      <form onSubmit={handleSubmit} className='form-list'>
        <h2>Nova lista</h2>

        <div className='select-icon'>
          <div className='div-select-icon'>
            <label htmlFor="icone-dropdown">ícone da lista:</label>
            <select
              id="icone-dropdown"
              value={listData.id_icone}
              onChange={handleSelectChange}
            >
              <option value={0}>Selecione um ícone</option>
              {icones.map((icone) => (
                <option key={icone.id_icone} value={icone.id_icone}>
                  {getFileName(icone.caminho_icone)}
                </option>
              ))}
            </select>
          </div>

          {listData.caminho_icone && (
            <div key={listData.id_icone}>
              <img src={listData.caminho_icone} alt="Ícone selecionado" className='selected-icon' />
            </div>
          )}
        </div>

        <div className='name-list'>
          <input
            type="text"
            id="name-list"
            name="name-list"
            placeholder="Nome da lista"
            value={listData.nome_lista}
            onChange={(e) => setListData({ ...listData, nome_lista: e.target.value })}
          />

          {message && <div className='message-list'><span>{message}</span></div>}
        </div>


        <div className='btn-create-list'>
          <button
            type="submit"
            disabled={listData.nome_lista.length < 4}
          >
            Criar
          </button>
        </div>

      </form>
    </div>
  )
}

FormNewList.propTypes = {
  setIsFormOpen: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default FormNewList;
