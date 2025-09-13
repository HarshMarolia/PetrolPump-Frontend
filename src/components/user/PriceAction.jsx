import React from "react";
import { usePriceAction } from "@/api/price";
import Indicator from "@/components/common/Indicator";

const PriceAction = () => {
  const { data: price, isLoading, isError } = usePriceAction();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!price || !price[0]) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-white text-2xl font-bold">Price Indicator</p>
      <div className="flex flex-row justify-around items-center m-10 w-full">
        <div className="flex flex-col text-center">
          <Indicator data={price[0].petrolPrice} />
          <p>Petrol</p>
        </div>
        <div className="flex flex-col text-center">
          <Indicator data={price[0].dieselPrice} />
          <p>Diesel</p>
        </div>
      </div>
    </div>
  );
};

export default PriceAction;
