import { useForm } from 'react-hook-form';
import { usePrintQuote } from '../hooks/usePrintQuote';
import jsPDF from 'jspdf';

interface Props {
  volume: number;
}

interface FormValues {
  material: string;
  pricePerKg: number;
  infill: number;
  layerHeight: number;
  speed: number;
  overhead: number;
}

export default function PriceCalculator({ volume }: Props) {
  const { calculate, quote } = usePrintQuote();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      material: 'PLA',
      pricePerKg: 20,
      infill: 20,
      layerHeight: 0.2,
      speed: 50,
      overhead: 10
    }
  });

  const onSubmit = (data: FormValues) => {
    calculate(data);
  };

  const savePdf = () => {
    const doc = new jsPDF();
    doc.text(`Cost: $${quote.cost.toFixed(2)}`, 10, 10);
    doc.text(`Time: ${quote.time.toFixed(2)}h`, 10, 20);
    doc.save('quote.pdf');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <label className="block">Material</label>
        <select className="border" {...register('material')}>
          <option value="PLA">PLA</option>
          <option value="ABS">ABS</option>
          <option value="PETG">PETG</option>
        </select>
      </div>
      <div>
        <label className="block">Price Per Kg</label>
        <input type="number" step="0.01" className="border w-full" {...register('pricePerKg', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block">Infill %</label>
        <input type="number" className="border w-full" {...register('infill', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block">Layer Height (mm)</label>
        <input type="number" step="0.01" className="border w-full" {...register('layerHeight', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block">Speed (mm/s)</label>
        <input type="number" className="border w-full" {...register('speed', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block">Overhead %</label>
        <input type="number" className="border w-full" {...register('overhead', { valueAsNumber: true })} />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Calculate</button>
      {quote.cost > 0 && (
        <div className="border p-4 mt-2">
          <p>Volume: {volume.toFixed(2)} cm³</p>
          <p>Cost: ${quote.cost.toFixed(2)}</p>
          <p>Time: {quote.time.toFixed(2)}h</p>
          <button type="button" onClick={savePdf} className="mt-2 px-2 py-1 bg-green-600 text-white">
            Save PDF
          </button>
        </div>
      )}
    </form>
  );
}
