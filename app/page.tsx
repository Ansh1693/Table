"use client";
import React from "react";
import "./globals.css";

type Props = {};


interface Person {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  phone: string;
  image: string;
  address: {
    street: string;
    city: string;
    zipcode: number;
    buildingNumber : number ;
    streetName: string;
    country: string;
  };
}
const page = (props: Props) => {
  const [data, setData] = React.useState<Array<Person>>([]);
  const [expandedRow, setExpandedRow] = React.useState<number>();
  const [rowCount, setRowCount] = React.useState<number>(10);
  const [sortBy, setSortBy] = React.useState<string>("id");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  React.useEffect(() => {
    const func = async () => {
      const data1 = await fetch(
        `https://fakerapi.it/api/v1/persons?_quantity=${rowCount}`
      );
      const data2 = await data1.json();
      // console.log(data2);
      setData(data2.data);
    };

    func();

    // console.log(data);
  }, [rowCount]);

  React.useEffect(() => {
    // console.log(sortBy , sortOrder);
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy as keyof Person] > b[sortBy as keyof Person] ? 1 : -1;
      } else {
        return a[sortBy as keyof Person] < b[sortBy as keyof Person] ? 1 : -1;
      }
    });
    // console.log(sortedData)
    setData(sortedData);
  }, [sortBy, sortOrder]);

  const handleSortClick = (column: string) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
      setSortBy(column);
    }
  };

  const handleClick = (id: number) => {
    // console.log(id)
    if (expandedRow === id) {
      setExpandedRow(-1);
    } else {
      setExpandedRow(id);
    }
  };
  return (
    <div className="w-[60vw] flex flex-col justify-center">
      <div>
        <label htmlFor="numRows">Select Number of Rows</label>
        <select
          id="numRows"
          className="rounded-lg"
          value={rowCount}
          onChange={(e) => setRowCount(parseInt(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>

      <table className="divide-y divide-slate-900  table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-2  text-center text-xs text-gray-500 cursor-pointer"
              onClick={() => handleSortClick("id")}
            >
              ID
            </th>
            <th className="px-6 py-2  text-center text-xs text-gray-500">Avatar</th>
            <th
              className="px-6 py-2  text-center text-xs text-gray-500 cursor-pointer"
              onClick={() => handleSortClick("firstname")}
            >
              First Name
            </th>
            <th
              className="px-6 py-2  text-center text-xs text-gray-500 cursor-pointer"
              onClick={() => handleSortClick("lastname")}
            >
              Last Name
            </th>
            <th
              className="px-6 py-2  text-center text-xs text-gray-500 cursor-pointer"
              onClick={() => handleSortClick("gender")}
            >
              Gender
            </th>
            <th
              className="px-6 py-2  text-center text-xs text-gray-500 cursor-pointer"
              onClick={() => handleSortClick("birthday")}
            >
              Age
            </th>
            <th className="px-6 py-2  text-center text-xs text-gray-500">Contact</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 w-[60vw]">
          {data.map((item) => {
            const birthdate = new Date(item.birthday);
            const ageInMilliseconds = Date.now() - birthdate.getTime();
            var ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365.25;
            ageInYears = parseInt(ageInYears.toFixed(0));

            return (
              <React.Fragment key={item.id}>
                <tr
                  className="whitespace-nowrap"
                  onClick={() => handleClick(item.id)}
                >
                  <td className="px-6 py-4 text-center  text-sm text-gray-500 text-wrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <img
                      src={item.image}
                      alt={item.firstname}
                      className="h-8 w-8 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm text-gray-500">
                      {item.firstname}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                    {item.lastname}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                    {item.gender}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                    {ageInYears}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                    {item.phone}
                  </td>
                </tr>

                {expandedRow === item.id && (
                  <tr
                    key={`${item.id}-expanded`}
                    className="whitespace-nowrap bg-slate-400"
                  >
                    <td className="px-6 py-4 text-center"></td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                      {item.address.buildingNumber}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                      {item.address.street}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                      {item.address.streetName}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                      {item.address.city}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                      {item.address.country}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 text-wrap">
                      {item.address.zipcode}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default page;
