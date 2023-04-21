import { useEffect, useState } from "react"
import axios from "axios"

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/bottles`;

export default function Dashboard() {
  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBottles();
  }, [])

  const getBottles = () => {
    setLoading(true);
    axios.get(baseURL)
    .then(({data}) => {
      setLoading(false);
      setBottles(data.data);
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  return (
    <div>
      Tableau de bord
      <div>
        <table>
          <tbody>
      {bottles.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.code_saq}</td>
                <td>{b.description}</td>
              </tr>
      ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}


