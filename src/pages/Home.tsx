import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import axios, { AxiosError } from "axios";
import SpinningLoader from "../components/SpinningLoader";

interface youtubeData {
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
interface data {
  Table: string;
  data: youtubeData[] | spotifyData[];
}
interface spotifyData {
  Table: string;
  ID: number;
  Artist: string;
  Url_Artist: string;
  Track: string;
  Album: string;
  Album_type: string;
  Uri_song: string;
  Duration_ms: string;
  No_of_Streams: number;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<data>({ Table: "", data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handleButtonClick = (value: string) => {
    console.log(value);
    setPage(1);
    setQuery(value);
  };
  useEffect(() => {
    if (query !== "") {
      getTableData();
    }
  }, [query, page, pageSize]);

  const getTableData = async () => {
    try {
      setIsLoading(true);

      const res: any = await axios.post("/data/query", {
        query,
        page,
        pageSize,
      });
      console.log("res:", res.data);
      setResponse(res.data);
      setIsLoading(false);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      setIsLoading(false);
    }
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number for next page
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1)); // Decrement page number for previous page
  };
  return (
    <div className="bg-gray-100">
      <div className="input shadow-md fixed w-screen bg-white">
        <Input handleButtonClick={handleButtonClick} />
      </div>

      <div className="">
        <div className="flex flex-col pt-40 items-center min-h-screen">
          <div className="w-full sm:max-w-3xl bg-white shadow-md rounded my-6">
            <div className="px-6 py-4 border-b">
              <h2 className="font-semibold text-2xl flex justify-center">
                {response.Table.toLocaleUpperCase()}
              </h2>
            </div>
            <div className="overflow-x-auto">
              {/* <TableRows tableData={response} /> */}
              {isLoading ? (
                <SpinningLoader />
              ) : response.Table === "youtube" ? (
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      {Object.keys(response.data[0]).map((data: any) => (
                        <th className="py-3 px-6 text-left">{data}</th>
                      ))}
                    </tr>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {response.data?.length >= 0 ? (
                      response.data.map((data) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                          {Object.values(data).map((res) => (
                            <td className="py-3 px-6 text-left">{res}</td>
                          ))}
                        </tr>
                        // <tr
                        //   className="border-b border-gray-200 hover:bg-gray-100"
                        //   key={data.ID}
                        // >
                        //   {data.ID ? (
                        //     <td className="py-3 px-6 text-left whitespace-nowrap">
                        //       {data.ID || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.Track ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.Track || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.Url_youtube ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.Url_youtube || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.Title ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.Title || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.Channel ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.Channel || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.Views ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.Views || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.Likes ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.Likes || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.Comments ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.Comments || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.Licensed ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.Licensed || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        //   {data.official_video ? (
                        //     <td className="py-3 px-6 text-left">
                        //       {data.official_video || ""}
                        //     </td>
                        //   ) : (
                        //     <div></div>
                        //   )}
                        // </tr>
                      ))
                    ) : (
                      <div>Data not found</div>
                    )}
                  </tbody>
                </table>
              ) : response.Table === "spotify" ? (
                <table className="min-w-full bg-white">
                  <thead>
                    {Object.keys(response.data[0]).map((data: any) => (
                      <th className="py-3 px-6 text-left">{data}</th>
                    ))}
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      {/* <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">Artist</th>
                      <th className="py-3 px-6 text-left">Artist URL</th>
                      <th className="py-3 px-6 text-left">Track</th>
                      <th className="py-3 px-6 text-left">Album</th>
                      <th className="py-3 px-6 text-left">Album_type</th>
                      <th className="py-3 px-6 text-left">Song URI</th>
                      <th className="py-3 px-6 text-left">Duration</th>
                      <th className="py-3 px-6 text-left">Number of Streams</th> */}
                      {/* Add more headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {response.data?.length >= 0 ? (
                      response.data.map((data: any) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                          {Object.values(data).map((res: any) => (
                            <td className="py-3 px-6 text-left">{res}</td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <div>Data not found</div>
                    )}
                  </tbody>
                </table>
              ) : (
                <div className="pl-10 pt-4 text-red-500">NO DATA FOUND</div>
              )}
            </div>
          </div>
          <div className="flex justify-center pt-4 bg relative w-full bottom-5 ">
            <button
              onClick={handlePrevPage}
              className="px-2 py-1 bg-gray-500 w-20 text-white rounded"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-2 py-1">{page}</span>
            <button
              onClick={handleNextPage}
              className="px-2 py-1 bg-gray-500 w-20 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
