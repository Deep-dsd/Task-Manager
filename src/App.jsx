import { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";
const App = () => {
  const localStorageItem = () => {
    let list = localStorage.getItem("itemlist");
    if (list) {
      return JSON.parse(localStorage.getItem("itemlist"));
    } else {
      return [];
    }
  };
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState(localStorageItem());

  const [isEdited, setIsEdited] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!item) {
      showAlert(true, "danger", "Please Enter Item");
    } else if (item && isEdited) {
      const newItem = { id: new Date().getTime().toString(), name: item };
      setItemList((prevlist) => [...prevlist, newItem]);
      setItem("");
      setIsEdited(false);
      showAlert(true, "success", "Item Edited");
    } else {
      showAlert(true, "success", "Item Added");
      const newItem = { id: new Date().getTime().toString(), name: item };
      setItemList((prevlist) => [...prevlist, newItem]);

      setItem("");
    }
  };

  const removeItem = (id) => {
    const newItemList = itemList.filter((item) => item.id !== id);
    setItemList(newItemList);
    showAlert(true, "danger", "Item Deleted");
  };

  const editItem = (id) => {
    setIsEdited((prevIsEdited) => !prevIsEdited);
    const selectedItem = itemList.find((item) => item.id === id);

    setItem(selectedItem.name);
    const modifiedList = itemList.filter((item) => item.id !== selectedItem.id);
    setItemList(modifiedList);
  };

  useEffect(() => {
    localStorage.setItem("itemlist", JSON.stringify(itemList));
  }, [itemList]);

  return (
    <main className="section-center">
      <section>
        <form onSubmit={submitHandler}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={itemList} />
          )}

          <h4>Task Manager</h4>
          <div className="form-control">
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Practice Coding"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button type="submit" className="btn">
              {isEdited ? "Edit" : "submit"}
            </button>
          </div>
        </form>
      </section>
      <section className="items">
        {itemList.map((individualItem) => {
          return (
            <List
              {...individualItem}
              key={individualItem.id}
              editItem={editItem}
              removeItem={removeItem}
            />
          );
        })}
        {itemList.length > 0 && (
          <button className="btn-hipster btn" onClick={() => setItemList([])}>
            Clear Tasks
          </button>
        )}
      </section>
    </main>
  );
};

export default App;
