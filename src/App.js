import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [state, setState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setState(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(state.length / rowPerPage);
  const firstElementIndex = (currentPage - 1) * rowPerPage;
  const lastElementIndex = firstElementIndex + rowPerPage;

  const handleClick = (x) => {
    setCurrentPage(x);
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {state.length > 0 &&
            state.slice(firstElementIndex, lastElementIndex).map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handleClick(currentPage - 1)}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (x) => (
            <button key={x} onClick={() => handleClick(x)}>
              {x}
            </button>
          ),
        )}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleClick(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
