import { useEffect, useState } from "react"
import axios from "axios"

const baseURL = "http://localhost:8000/api/posts";

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
      console.log(data);
      setBottles(data.data);
    })
    .catch(err => {
      console.log(err);
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


