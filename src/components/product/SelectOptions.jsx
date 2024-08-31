import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectOptions = ({ provinces, cities, provinsi, kota }) => {
  const handleProvince = (value) => {
    provinsi(value); // Call the function passed as prop with selected province value
  };

  const handleCity = (value) => {
    kota(value); // Call the function passed as prop with selected city value
  };

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="font-bold text-sm">Alamat Pengiriman</h3>
      {/* province select */}
      <Select onValueChange={handleProvince}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Provinsi" />
        </SelectTrigger>
        <SelectContent>
          {provinces?.map((province) => (
            <SelectItem key={province.province_id} value={province.province_id}>
              {province.province}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* city select */}
      <Select onValueChange={handleCity}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Kota" />
        </SelectTrigger>
        <SelectContent>
          {cities?.map((city) => (
            <SelectItem key={city.city_id} value={city.city_id}>
              {city.type} {city.city_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* kurir select */}
      <Select>
        <SelectTrigger>
            <SelectValue placeholder="Pilih Expedisi" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="jne">JNE</SelectItem>
            <SelectItem value="pos">POS</SelectItem>
            <SelectItem value="tiki">TIKI</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOptions;
