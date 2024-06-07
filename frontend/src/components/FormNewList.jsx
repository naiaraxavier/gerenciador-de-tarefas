import { useEffect, useState } from 'react';

function FormNewList() {
  const [icones, setIcones] = useState([]);
  const [listData, setListData] = useState({
    nome_lista: '',
    id_icone: 1,
    caminho_icone: ''
  });

  console.log(listData);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/lists/icones');
      const data = await response.json();
      setIcones(data);
      const defaultIcon = data.find(icon => icon.id_icone === 1);
      setListData(prevListData => ({
        ...prevListData,
        caminho_icone: defaultIcon ? defaultIcon.caminho_icone : ''
      }));
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
        });
        console.log('Lista criada com sucesso!');
      } else {
        console.log('Erro ao criar a lista');
      }
    } catch (error) {
      console.log('Erro ao criar a lista', error.message);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Nova lista</h2>

        <label htmlFor="icone-dropdown">ícone da lista:</label>
        <select
          id="icone-dropdown"
          value={listData.id_icone}
          onChange={handleSelectChange}
        >
          {icones.map((icone) => (
            <option key={icone.id_icone} value={icone.id_icone}>
              {getFileName(icone.caminho_icone)}
            </option>
          ))}
        </select>

        {listData.caminho_icone && (
          <div key={listData.id_icone}>
            <img src={listData.caminho_icone} alt="Ícone selecionado" width="50" height="50" />
          </div>
        )}

        <input
          type="text"
          id="name-list"
          name="name-list"
          placeholder="Nome da lista"
          value={listData.nome_lista}
          onChange={(e) => setListData({ ...listData, nome_lista: e.target.value })}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  )
}

export default FormNewList;
