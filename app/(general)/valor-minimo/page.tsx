'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface ProductoMinimo {
  partNumber: string;
  name: string;
  value: number;
}

export default function ValorMinimoPage() {
  const [productoMinimo, setProductoMinimo] = useState<ProductoMinimo | null>(null);

  useEffect(() => {
    const fetchProductoMinimo = async () => {
      try {
        const response = await fetch('http://localhost:5000/producto/valor-minimo');
        const data = await response.json();
        setProductoMinimo(data);
      } catch (error) {
        console.error('Error al obtener el producto con valor mínimo:', error);
      }
    };

    fetchProductoMinimo();
  }, []);

  const mostrarGrafica = productoMinimo && productoMinimo.value > 0;
  const data = {
    labels: mostrarGrafica ? [productoMinimo!.name] : [],
    datasets: mostrarGrafica
      ? [
          {
            label: 'Valor Mínimo',
            data: [productoMinimo!.value],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ]
      : [],
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Valor Mínimo del Producto</h1>

      {productoMinimo ? (
        mostrarGrafica ? (
          <div style={{ height: '400px' }}>
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        ) : (
          <p className="text-center text-danger">
            El dato más bajo es igual a <strong>0</strong>, por lo que no se pueden mostrar datos en la gráfica.
          </p>
        )
      ) : (
        <p className="text-center">espere cargando datos...</p>
      )}
    </div>
  );
}
