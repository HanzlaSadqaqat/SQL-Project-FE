import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface childProps {
  query: string;
}
interface dataProp {
  ID: string;
  Track: string;
  Url_youtube: string;
  Title: string;
  Channel: string;
  Views: number;
  Likes: number;
  Comments: number;
  Licensed: string;
  official_video: string;
}
export default function Table(props: childProps) {
  const [response, setResponse] = useState<dataProp[]>([]);
  useEffect(() => {
    console.log(props.query);
  }, []);
  useEffect(() => {
    getTableData();
    console.log(response);
  }, [props.query]);

  console.log(props.query);
  const getTableData = async () => {
    try {
      const res: dataProp[] = await axios.post("/data/query", {
        query: props.query,
      });
      setResponse(res);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  };

  return (
    <div className="flex pt-40 justify-center min-h-screen">
      <div className="w-full sm:max-w-3xl bg-white shadow-md rounded my-6">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-2xl">Table Name</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Header 1</th>
                <th className="py-3 px-6 text-left"></th>
                <th className="py-3 px-6 text-left">Header 3</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            {/* <TableRows tableData={response} /> */}
            <tbody>
              {response?.length < 0 ? (
                response.map((data) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {data.ID}
                    </td>
                    <td className="py-3 px-6 text-left">{data.Track}</td>
                    <td className="py-3 px-6 text-left">{data.Url_youtube}</td>
                    <td className="py-3 px-6 text-left">{data.Title}</td>
                    <td className="py-3 px-6 text-left">{data.Channel}</td>
                    <td className="py-3 px-6 text-left">{data.Views}</td>
                    <td className="py-3 px-6 text-left">{data.Likes}</td>
                    <td className="py-3 px-6 text-left">{data.Comments}</td>
                    <td className="py-3 px-6 text-left">{data.Licensed}</td>
                    <td className="py-3 px-6 text-left">
                      {data.official_video}
                    </td>
                  </tr>
                ))
              ) : (
                <div>Data not found</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// interface prop {
//   tableData: dataProp[];
// }
// const TableRows = (props: prop) => {
//   return (
//     <tbody className="text-gray-600 text-sm font-light">
//       {/* Table content rows */}
//       {
//         // props.tableData.length > 0 ? (
//         props.tableData.map((data: dataProp) => (
//           <tr className="border-b border-gray-200 hover:bg-gray-100">
//             <td className="py-3 px-6 text-left whitespace-nowrap">{data.ID}</td>
//             <td className="py-3 px-6 text-left">{data.Track}</td>
//             <td className="py-3 px-6 text-left">{data.Url_youtube}</td>
//             <td className="py-3 px-6 text-left">{data.Title}</td>
//             <td className="py-3 px-6 text-left">{data.Channel}</td>
//             <td className="py-3 px-6 text-left">{data.Views}</td>
//             <td className="py-3 px-6 text-left">{data.Likes}</td>
//             <td className="py-3 px-6 text-left">{data.Comments}</td>
//             <td className="py-3 px-6 text-left">{data.Licensed}</td>
//             <td className="py-3 px-6 text-left">{data.official_video}</td>
//           </tr>
//         ))
//         // ) : (
//         //   <div>data not available</div>
//         // )
//       }

//       {/* Add more rows as needed */}
//     </tbody>
//   );
// };
