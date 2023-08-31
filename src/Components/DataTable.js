import axiosInstance from '@/external/axiosapi'
import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce';

const rates = [0.02, 0.03, 0.04, 0.05, 0.06]

const transactions = [
  {
    rate: '2.20%',
    monthly_p: 1350,
    charges: 150,
    works: 200,
  },
  {
    rate: '2.25%',
    monthly_p: 1370,
    charges: 150,
    works: 200,
  },
  {
    rate: '2.30%',
    monthly_p: 1390,
    charges: 150,
    works: 200,
  },
  {
    rate: '2.35%',
    monthly_p: 1410,
    charges: 150,
    works: 200,
  },
  {
    rate: '2.40%',
    monthly_p: 1430,
    charges: 150,
    works: 200,
  },
  // More transactions...
]

const functionMappings = {
  'STR': (str) => str,
  'CCY': (num) =>
    `${num.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} €`,
}


function getDisplayedColumns(responsiveColumns, windowWidth) {
  {
    const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl']; // As per Tailwind's default breakpoints

    let currentBreakpoint;

    if (windowWidth < 640) currentBreakpoint = 'sm';
    else if (windowWidth < 768) currentBreakpoint = 'md';
    else if (windowWidth < 1024) currentBreakpoint = 'lg';
    else if (windowWidth < 1280) currentBreakpoint = 'xl';
    else currentBreakpoint = '2xl';

    // This check ensures that responsiveColumns is defined
    if (!responsiveColumns || typeof responsiveColumns !== "object") return null;

    for (let breakpoint of breakpoints) {
      if (responsiveColumns[breakpoint] === true) {
        return null;  // Return null to indicate all columns should be displayed
      }
      if (responsiveColumns[breakpoint] && breakpoint === currentBreakpoint) {
        return responsiveColumns[breakpoint];
      }
    }
    return null; // Default to displaying all columns
  }
}


export default function DataTable({ data, loading, error, responsiveColumns = {} }) {
  const rows = data?.table_data || [];
  const titles = data?.additional_data?.col_titles;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const displayedColumns = getDisplayedColumns(responsiveColumns, windowWidth);

  useEffect(() => {
    const handleResize = debounce(() => setWindowWidth(window.innerWidth), 100);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mt-2 flow-root min-w-full">
      <div className="min-w-full overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {titles.map((title, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`p-2 text-center text-sm font-semibold text-gray-900 
                  ${displayedColumns && !displayedColumns.includes(title) ? 'hidden' : ''}`}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((val, valIndex) => (
                  <td
                    key={valIndex}
                    className={`py-1 text-center text-xs text-gray-500 
                    ${displayedColumns && !displayedColumns.includes(titles[valIndex]) ? 'hidden' : ''}`}
                  >
                    {valIndex === 2 || valIndex === 3
                    ? (typeof val === 'number' ? `${val.toFixed(2)} %` : val)
                    : typeof val === 'number'
                    ? val.toLocaleString('fr-FR')
                    : val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}