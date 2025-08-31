import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FactCheckDetail = () => {
  const { id } = useParams();
  const [factCheck, setFactCheck] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFactCheck();
  }, [id]);

  const fetchFactCheck = async () => {
    try {
      const response = await axios.get(`${VITE_API_BASE_URL}/api/factchecks/${id}/`);
      setFactCheck(response.data);
    } catch (error) {
      console.error('Error fetching fact-check:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!factCheck) return <div>Fact-check not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{factCheck.title}</h1>
      {/* Display full fact-check content */}
    </div>
  );
};

export default FactCheckDetail;