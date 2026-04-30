import { useEffect, useState } from "react";
import { getItems, createItem, deleteItem, updateItem } from "./itemsAPI";

function App() {
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");

  const [itemCreator, setItemCreator] = useState(false);
  const [itemUpdate, setItemUpdate] = useState(false);
  const [itemID, setItemID] = useState(null);

  async function listItems() {
    setItems(await getItems());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createItem({ name, desc });
    setName("");
    setDesc("");
    listItems();
    setItemCreator(false);
  }

  async function handleDelete(id) {
    await deleteItem(id);
    listItems();
  }

  function handleUpdateFront(id) {
    setItemUpdate(true);
    setItemID(id);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await updateItem(itemID, { name, desc });
    setName("");
    setDesc("");
    listItems();
    setItemUpdate(false);
  }

  useEffect(() => {
    listItems();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="flex flex-col fixed w-2xs h-screen bg-neutral-800">
          <button
            className="bg-amber-500 p-4 text-2xl hover:brightness-75"
            onClick={() => setItemCreator(true)}
          >
            Criar Novo Item
          </button>
        </div>
        <div>
          <ul className="m-4 ml-80 flex gap-3 flex-wrap">
            {items.map((item) =>
              itemUpdate === true && item.id === itemID ? (
                <form key={item.id} onSubmit={handleUpdate}>
                  <li className="text-[#FFF44F] gap-6 max-w-2xl p-4 text-3xl bg-neutral-900 flex flex-col items-center">
                    <input
                      className="bg-neutral-950 p-1"
                      placeholder={item.name}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="bg-neutral-950 p-1"
                      placeholder={item.desc}
                      type="text"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-green-500 p-2 text-black hover:brightness-75"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => {
                        setItemUpdate(false);
                        setName("");
                        setDesc("");
                      }}
                      className="bg-red-500 text-white p-2 hover:brightness-75"
                    >
                      Cancelar
                    </button>
                  </li>
                </form>
              ) : (
                <li
                  className="text-[#FFF44F] gap-6 max-w-2xl p-4 text-3xl bg-neutral-900 flex flex-col items-center"
                  key={item.id}
                >
                  <h1>{item.name}</h1>
                  <h2>{item.desc}</h2>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 p-2 text-white hover:brightness-75"
                  >
                    Deletar Item
                  </button>
                  <button
                    onClick={() => handleUpdateFront(item.id)}
                    className="bg-amber-300 text-black p-2 hover:brightness-75"
                  >
                    Editar
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      {itemCreator ? (
        <div>
          <form
            className="flex flex-col bg-neutral-900 p-5 gap-2 absolute top-[50%] left-[50%] translate-[-50%]"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-neutral-700 p-3"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              required
            />

            <textarea
              className="bg-neutral-700 p-3"
              type=""
              placeholder="Descrição"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>

            <button
              className="bg-neutral-800 hover:brightness-75 p-2"
              type="submit"
            >
              Salvar
            </button>

            <button
              onClick={() => {
                setItemCreator(false);
                setName("");
                setDesc("");
              }}
              className="bg-neutral-800 hover:brightness-75 p-2"
            >
              Cancelar
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default App;
