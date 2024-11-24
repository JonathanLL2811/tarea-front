'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Graficas() {
  const [datos, setDatos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]); 
  const [valores, setValores] = useState<number[]>([]); 
  
  useEffect(() => {
   
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('http://localhost:5000/producto/valor-total-tipo');
        const resultado = await respuesta.json();

       
        const categorias = resultado.map((item: any) => item.productType);
        const valores = resultado.map((item: any) => item.ValorTotal);

        setCategorias(categorias);
        setValores(valores);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []); 

  if (valores.length === 0 || categorias.length === 0) {
    return <div>Espere...</div>;
  }

  const data = {
    labels: categorias, 
    datasets: [
      {
        label: 'Valor Total por Tipo de Producto',
        data: valores, 
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
      <h2>Gráfica del Valor Total por Tipo de Producto</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
