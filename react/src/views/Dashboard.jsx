import { useEffect, useState } from "react"
import axios from "axios"

const baseURL = "http://localhost:8000/api/posts";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = () => {
    setLoading(true);
    axios.get(baseURL)
    .then(({data}) => {
      setLoading(false);
      console.log(data);
      setPosts(data.data);
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
      {posts.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.title}</td>
                <td>{u.body}</td>
                <td>{u.created_at}</td>
              </tr>
      ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}


