import { Button } from "@/components/ui/button";
import React from "react";

const LeftHero = () => {
  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <h1 className="text-4xl font-extrabold">
        Ahlan Wa Sahlan <br />{" "}
        <span className="text-yellow-400">Ass-Sakinah</span>
        {""} Store
      </h1>
      <p className="text-lg font-semibold">
        Belanja lebih mudah dan murah,Mari berbelanja kebutuhan anda di Ass-Sakinah Store, dengan barang yang
        berkualitas dan terjamin halal
      </p>
      <Button className="max-w-[200px]">Belanja Sekarang</Button>
    </div>
  );
};

export default LeftHero;
