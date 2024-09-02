import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const SelectOptions = ({
  provinces,
  cities,
  provinsi,
  kota,
  kurir,
  layanan,
  services,
  alamat
}) => {
  const handleProvince = (value) => {
    provinsi(value); // Call the function passed as prop with selected province value
  };

  const handleCity = (value) => {
    kota(value); // Call the function passed as prop with selected city value
  };

  const handleCourier = (value) => {
    kurir(value);
  };

  const handleService = (value) =>{
    layanan(value)
  }

  const handleAddress = (value) =>{
    alamat(value)
  }

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
      <Select onValueChange={handleCity} disabled={!cities}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Kota" />
        </SelectTrigger>
        <SelectContent>
          {cities?.length === 0 ? (
            <SelectValue placeholder="Pilih Kota" />
          ) : (
            cities?.map((city) => (
              <SelectItem key={city.city_id} value={city.city_id}>
                {city.type} {city.city_name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {/* kurir select */}
      <Select onValueChange={handleCourier} disabled={!cities}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Expedisi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="jne">JNE</SelectItem>
          <SelectItem value="pos">POS</SelectItem>
          <SelectItem value="tiki">TIKI</SelectItem>
        </SelectContent>
      </Select>
      {/* service select */}
      <Select onValueChange={handleService} disabled={!cities}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Layanan" />
        </SelectTrigger>
        <SelectContent>
          {services?.map((item) => (
            <SelectItem
              key={item.service}
              value={item.cost[0].value}
              className=""
            >
              {`
                ${item.service} Rp.${item.cost[0].value.toLocaleString(
                "id-ID"
              )} Estimasi ${item.cost[0].etd} Hari
              `}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="">
        <Label htmlFor="address">Alamat</Label>
        <Textarea onChange={handleAddress} placeholder="Jalan, blok, gang, komplek, desa, kecematan, " id="address"/>
      </div>
    </div>
  );
};

export default SelectOptions;
