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
  const handleButtonClick = (value: string) => {
    console.log(value);

    setQuery(value);
  };
  useEffect(() => {
    if (query !== "") {
      getTableData();
      console.log();
    }
  }, [query]);
  useEffect(() => {
    console.log("Object:", Object.keys(response.data));
  }, [response]);

  console.log(query);
  const getTableData = async () => {
    try {
      setIsLoading(true);

      const res: any = await axios.post("/data/query", {
        query: query,
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

  return (
    <div className="bg-gray-100">
      <div className="input shadow-md fixed w-screen bg-white">
        <Input handleButtonClick={handleButtonClick} />
      </div>

      <div className="">
        <div className="flex pt-40 justify-center min-h-screen">
          <div className="w-full sm:max-w-3xl bg-white shadow-md rounded my-6">
            <div className="px-6 py-4 border-b">
              <h2 className="font-semibold text-2xl">Table Name</h2>
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
                          {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                            {data.ID}
                          </td>
                          <td className="py-3 px-6 text-left">{data.Artist}</td>
                          <td className="py-3 px-6 text-left">
                            {data.Url_Artist}
                          </td>
                          <td className="py-3 px-6 text-left">{data.Track}</td>
                          <td className="py-3 px-6 text-left">{data.Album}</td>
                          <td className="py-3 px-6 text-left">
                            {data.Album_type}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {data.Uri_song}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {data.Duration_ms}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {data.No_of_Streams}
                          </td> */}
                        </tr>
                      ))
                    ) : (
                      <div>Data not found</div>
                    )}
                  </tbody>
                </table>
              ) : (
                <div>data not found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
