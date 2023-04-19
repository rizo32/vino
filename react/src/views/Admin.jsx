import { useEffect, useState } from "react"
import axios from "axios"

const baseURL = "http://localhost:8000/api/admin";

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
      admin testing page
    </div>
  )
}


