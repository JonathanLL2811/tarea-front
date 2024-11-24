'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Graficas() {
  const [datos, setDatos] = useState<number[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('http://localhost:5000/producto/valor-maximo');
        const resultado = await respuesta.json();
        
        if (resultado.valor) {
          setDatos([resultado.valor]); 
          setCategorias(['Producto con Valor Máximo']); 
        } else {
          console.error('No se encontró el valor máximo en la respuesta');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  if (datos.length === 0 || categorias.length === 0) {
    return <div>Cargando...</div>;
  }

  const data = {
    labels: categorias,
    datasets: [
      {
        label: 'Valor Máximo',
        data: datos,
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };
  return (
    <div className="container mt-5">
      <h2>Gráfica del Valor Máximo</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
